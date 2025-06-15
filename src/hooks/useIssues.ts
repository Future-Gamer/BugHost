import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Issue = Tables<'issues'>;
type IssueInsert = TablesInsert<'issues'>;
type IssueUpdate = TablesUpdate<'issues'>;

type IssueWithProfiles = Issue & {
  assignee_profile?: { first_name: string | null; last_name: string | null } | null;
  reporter_profile?: { first_name: string | null; last_name: string | null } | null;
};

export const useIssues = (projectId: string | null) => {
  return useQuery({
    queryKey: ['issues', projectId],
    queryFn: async () => {
      let query = supabase
        .from('issues')
        .select(`
          *,
          assignee_profile:profiles!issues_assignee_id_fkey(first_name, last_name),
          reporter_profile:profiles!issues_reporter_id_fkey(first_name, last_name)
        `)
        .order('created_at', { ascending: false });
      
      // Only filter by project if projectId is provided
      if (projectId) {
        query = query.eq('project_id', projectId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return (data || []) as IssueWithProfiles[];
    },
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
