import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from '@/hooks/useProfiles';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type Project = Tables<'projects'>;
type ProjectInsert = TablesInsert<'projects'>;

export const useProjects = (teamId?: string | null) => {
  const { data: profile } = useProfile();

  return useQuery({
    queryKey: ['projects', profile?.id, teamId],
    queryFn: async (): Promise<Project[]> => {
      if (!profile?.id) return [];
      let query = supabase
        .from('projects')
        .select('*')
        .eq('created_by', profile.id) // default: own projects

      // If teamId is provided, expand to team projects as well as own
      if (teamId) {
        query = supabase
          .from('projects')
          .select('*')
          .or(`created_by.eq.${profile.id},team_id.eq.${teamId}`)
          .order('created_at', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      return (data ?? []) as Project[];
    },
    enabled: !!profile?.id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: profile } = useProfile();

  return useMutation({
    mutationFn: async (project: { name: string; description?: string | null; team_id?: string | null }) => {
      if (!profile?.id) throw new Error('User profile not found.');

      const { data, error } = await supabase
        .from('projects')
        .insert({
          ...project,
          created_by: profile.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
      console.error('Error creating project:', error);
    },
  });
};
