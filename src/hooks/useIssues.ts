
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfiles';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Issue = Tables<'issues'>;
type IssueInsert = TablesInsert<'issues'>;
type IssueUpdate = TablesUpdate<'issues'>;

type IssueWithProfiles = Issue & {
  assignee_profile?: { first_name: string | null; last_name: string | null; email?: string | null } | null;
  reporter_profile?: { first_name: string | null; last_name: string | null; email?: string | null } | null;
};

export const useIssues = (projectId: string | null, teamId?: string | null) => {
  const { data: profile } = useProfile();

  return useQuery({
    queryKey: ['issues', projectId, teamId, profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];
      let query = supabase
        .from('issues')
        .select(`
          *,
          assignee_profile:profiles!issues_assignee_id_fkey(first_name, last_name, email),
          reporter_profile:profiles!issues_reporter_id_fkey(first_name, last_name, email)
        `)

      if (projectId) {
        query = query.eq('project_id', projectId);
      }
      if (teamId) {
        query = query.eq('team_id', teamId);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      return (data || []) as IssueWithProfiles[];
    },
    enabled: !!profile?.id,
  });
};

export const useIssueCount = (projectId: string | null) => {
  const { data: profile } = useProfile();
  
  return useQuery({
    queryKey: ['issue-count', projectId, profile?.id],
    queryFn: async () => {
      if (!profile?.id || !projectId) return 0;
      
      const { count, error } = await supabase
        .from('issues')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', projectId);

      if (error) throw error;
      return count || 0;
    },
    enabled: !!profile?.id && !!projectId,
  });
};

export const useCreateIssue = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: profile } = useProfile();

  return useMutation({
    mutationFn: async (
      issue: Omit<IssueInsert, 'id' | 'created_at' | 'updated_at' | 'created_by'> & { 
        team_id?: string | null;
        assignee_email?: string | null;
      }
    ) => {
      if (!profile?.id) throw new Error('User profile not found.');
      
      // If assignee_email is provided, try to find the assignee_id
      let assignee_id = issue.assignee_id;
      if (issue.assignee_email && !assignee_id) {
        const { data: assigneeProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', issue.assignee_email)
          .single();
        
        if (assigneeProfile) {
          assignee_id = assigneeProfile.id;
        }
      }

      const fullIssue = {
        ...issue,
        created_by: profile.id,
        assignee_id,
        assignee_email: issue.assignee_email,
      };
      
      const { data, error } = await supabase
        .from('issues')
        .insert(fullIssue)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      queryClient.invalidateQueries({ queryKey: ['issue-count'] });
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
    mutationFn: async ({ id, updates }: { id: string; updates: IssueUpdate & { assignee_email?: string | null } }) => {
      // If assignee_email is provided, try to find the assignee_id
      let assignee_id = updates.assignee_id;
      if (updates.assignee_email && !assignee_id) {
        const { data: assigneeProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', updates.assignee_email)
          .single();
        
        if (assigneeProfile) {
          assignee_id = assigneeProfile.id;
        }
      }

      const finalUpdates = {
        ...updates,
        assignee_id,
        assignee_email: updates.assignee_email,
      };

      const { data, error } = await supabase
        .from('issues')
        .update(finalUpdates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      queryClient.invalidateQueries({ queryKey: ['issue-count'] });
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
