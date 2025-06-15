
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Invitation = Tables<'invitations'>;
type InvitationInsert = TablesInsert<'invitations'>;
type InvitationUpdate = TablesUpdate<'invitations'>;

export const useTeamInvitations = (teamId: string | null) => {
  return useQuery({
    queryKey: ['team-invitations', teamId],
    queryFn: async () => {
      if (!teamId) return [];
      
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('team_id', teamId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data || []) as Invitation[];
    },
    enabled: !!teamId,
  });
};

export const useCreateInvitation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (invitation: { 
      teamId: string; 
      email: string; 
      role: 'admin' | 'manager' | 'developer' | 'tester';
      invitedBy: string;
    }) => {
      // Generate a random token
      const token = crypto.randomUUID();
      
      const { data, error } = await supabase
        .from('invitations')
        .insert({
          team_id: invitation.teamId,
          email: invitation.email,
          role: invitation.role,
          invited_by: invitation.invitedBy,
          token: token,
        })
        .select()
        .single();
      
      if (error) throw error;

      // Get team and inviter details for email
      const [teamResult, inviterResult] = await Promise.all([
        supabase.from('teams').select('name').eq('id', invitation.teamId).single(),
        supabase.from('profiles').select('first_name, last_name').eq('id', invitation.invitedBy).single()
      ]);

      const teamName = teamResult.data?.name || 'Unknown Team';
      const inviterName = inviterResult.data 
        ? `${inviterResult.data.first_name || ''} ${inviterResult.data.last_name || ''}`.trim() || 'Someone'
        : 'Someone';

      // Send invitation email
      const emailResponse = await supabase.functions.invoke('send-invitation', {
        body: {
          invitationId: data.id,
          email: invitation.email,
          teamName,
          role: invitation.role,
          inviterName,
        },
      });

      if (emailResponse.error) {
        console.error('Email sending failed:', emailResponse.error);
        // Don't throw error - invitation is created, just email failed
        toast({
          title: "Invitation created",
          description: "Invitation was created but email sending failed. Please share the invitation link manually.",
          variant: "default",
        });
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-invitations'] });
      toast({
        title: "Success",
        description: "Invitation sent successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
      console.error('Error creating invitation:', error);
    },
  });
};

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (token: string) => {
      // First get the invitation
      const { data: invitation, error: inviteError } = await supabase
        .from('invitations')
        .select('*')
        .eq('token', token)
        .single();
      
      if (inviteError) throw inviteError;
      
      // Check if invitation is still valid
      if (invitation.accepted_at || new Date(invitation.expires_at) < new Date()) {
        throw new Error('Invitation is no longer valid');
      }
      
      // Add user to team
      const { error: memberError } = await supabase
        .from('team_members')
        .insert({
          team_id: invitation.team_id,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          role: invitation.role,
          status: 'active',
        });
      
      if (memberError) throw memberError;
      
      // Mark invitation as accepted
      const { error: updateError } = await supabase
        .from('invitations')
        .update({ accepted_at: new Date().toISOString() })
        .eq('id', invitation.id);
      
      if (updateError) throw updateError;
      
      return invitation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-invitations'] });
      toast({
        title: "Success",
        description: "You have joined the team!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to accept invitation",
        variant: "destructive",
      });
      console.error('Error accepting invitation:', error);
    },
  });
};
