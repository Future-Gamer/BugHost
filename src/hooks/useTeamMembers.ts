
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type TeamMember = Tables<'team_members'>;
type TeamMemberInsert = TablesInsert<'team_members'>;
type TeamMemberUpdate = TablesUpdate<'team_members'>;

type TeamMemberWithProfile = TeamMember & {
  profile?: { first_name: string | null; last_name: string | null; email: string } | null;
};

export const useTeamMembers = (teamId: string | null) => {
  return useQuery({
    queryKey: ['team-members', teamId],
    queryFn: async () => {
      if (!teamId) return [];
      
      const { data, error } = await supabase
        .from('team_members')
        .select(`
          *,
          profile:profiles!team_members_user_id_fkey(first_name, last_name, email)
        `)
        .eq('team_id', teamId)
        .order('joined_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching team members:', error);
        throw error;
      }
      return (data || []) as TeamMemberWithProfile[];
    },
    enabled: !!teamId,
  });
};

export const useAddTeamMember = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (member: Omit<TeamMemberInsert, 'id' | 'joined_at'>) => {
      const { data, error } = await supabase
        .from('team_members')
        .insert({
          team_id: member.team_id,
          user_id: member.user_id || '', // Provide empty string as fallback
          role: member.role,
          status: member.status || 'pending',
          member_name: member.member_name,
          member_email: member.member_email,
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error adding team member:', error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({
        title: "Success",
        description: "Team member added successfully",
      });
    },
    onError: (error: any) => {
      console.error('Error adding team member:', error);
      toast({
        title: "Error",
        description: error?.message || "Failed to add team member",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: TeamMemberUpdate }) => {
      const { data, error } = await supabase
        .from('team_members')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating team member:', error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({
        title: "Success",
        description: "Team member updated successfully",
      });
    },
    onError: (error: any) => {
      console.error('Error updating team member:', error);
      toast({
        title: "Error",
        description: error?.message || "Failed to update team member",
        variant: "destructive",
      });
    },
  });
};

export const useRemoveTeamMember = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      console.log('Removing team member with ID:', id);
      
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Database error removing team member:', error);
        throw error;
      }
      
      console.log('Team member removed successfully from database');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      toast({
        title: "Success",
        description: "Team member removed successfully",
      });
    },
    onError: (error: any) => {
      console.error('Error removing team member:', error);
      toast({
        title: "Error",
        description: error?.message || "Failed to remove team member",
        variant: "destructive",
      });
    },
  });
};
