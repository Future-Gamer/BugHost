
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from '@/hooks/useProfiles';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type Project = Tables<'projects'>;
type ProjectInsert = TablesInsert<'projects'>;

export const useProjects = () => {
  const { data: profile } = useProfile();

  return useQuery({
    queryKey: ['projects', profile?.id],
    queryFn: async (): Promise<Project[]> => {
      if (!profile?.id) return [];
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('created_by', profile.id) // Only fetch projects owned by the current user
        .order('created_at', { ascending: false });

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
    mutationFn: async (project: any) => {
      if (!profile?.id) throw new Error('User profile not found.');

      const { data, error } = await supabase
        .from('projects')
        .insert({
          ...project,
          created_by: profile.id, // Set created_by to current user
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
