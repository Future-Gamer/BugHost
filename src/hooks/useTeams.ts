
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfiles';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Team = Tables<'teams'>;
type TeamInsert = TablesInsert<'teams'>;
type TeamUpdate = TablesUpdate<'teams'>;

export const useTeams = () => {
  const { data: profile } = useProfile();

  return useQuery({
    queryKey: ['teams', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('created_by', profile.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data || []) as Team[];
    },
    enabled: !!profile?.id,
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: profile } = useProfile();

  return useMutation({
    mutationFn: async (team: Omit<TeamInsert, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
      if (!profile?.id) throw new Error('User profile not found.');
      const fullTeam = {
        ...team,
        created_by: profile.id,
      };
      const { data, error } = await supabase
        .from('teams')
        .insert(fullTeam)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast({
        title: "Success",
        description: "Team created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create team",
        variant: "destructive",
      });
      console.error('Error creating team:', error);
    },
  });
};

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: TeamUpdate }) => {
      const { data, error } = await supabase
        .from('teams')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update team",
        variant: "destructive",
      });
      console.error('Error updating team:', error);
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting team with ID:', id);
      
      // First delete all team members
      const { error: membersError } = await supabase
        .from('team_members')
        .delete()
        .eq('team_id', id);
      
      if (membersError) {
        console.error('Error deleting team members:', membersError);
        throw membersError;
      }
      
      // Then delete all invitations
      const { error: invitationsError } = await supabase
        .from('invitations')
        .delete()
        .eq('team_id', id);
      
      if (invitationsError) {
        console.error('Error deleting invitations:', invitationsError);
        throw invitationsError;
      }
      
      // Finally delete the team
      const { error: teamError } = await supabase
        .from('teams')
        .delete()
        .eq('id', id);
      
      if (teamError) {
        console.error('Error deleting team:', teamError);
        throw teamError;
      }
      
      console.log('Team and related data deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-invitations'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      toast({
        title: "Success",
        description: "Team deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete team",
        variant: "destructive",
      });
      console.error('Error deleting team:', error);
    },
  });
};
