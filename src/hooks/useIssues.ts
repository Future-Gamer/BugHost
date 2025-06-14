
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Issue = Tables<'issues'>;
type IssueInsert = TablesInsert<'issues'>;
type IssueUpdate = TablesUpdate<'issues'>;

export const useIssues = (projectId: string | null) => {
  return useQuery({
    queryKey: ['issues', projectId],
    queryFn: async () => {
      if (!projectId) return [];
      
      const { data, error } = await supabase
        .from('issues')
        .select(`
          *,
          assignee_profile:assignee_id(first_name, last_name),
          reporter_profile:reporter_id(first_name, last_name)
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as (Issue & {
        assignee_profile?: { first_name: string | null; last_name: string | null };
        reporter_profile?: { first_name: string | null; last_name: string | null };
      })[];
    },
    enabled: !!projectId,
  });
};

export const useCreateIssue = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (issue: Omit<IssueInsert, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('issues')
        .insert(issue)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      toast({
        title: "Success",
        description: "Issue created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create issue",
        variant: "destructive",
      });
      console.error('Error creating issue:', error);
    },
  });
};

export const useUpdateIssue = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: IssueUpdate }) => {
      const { data, error } = await supabase
        .from('issues')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update issue",
        variant: "destructive",
      });
      console.error('Error updating issue:', error);
    },
  });
};
