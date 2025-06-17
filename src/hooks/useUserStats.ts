
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUserStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      // Get user's projects
      const { data: projects = [] } = await supabase
        .from('projects')
        .select('id, status')
        .eq('created_by', user.id);

      // Get user's issues (both created and assigned)
      const { data: createdIssues = [] } = await supabase
        .from('issues')
        .select('id, status')
        .eq('created_by', user.id);

      const { data: assignedIssues = [] } = await supabase
        .from('issues')
        .select('id, status')
        .eq('assignee_id', user.id);

      // Combine and deduplicate issues
      const allUserIssues = [...createdIssues, ...assignedIssues].reduce((acc, issue) => {
        if (!acc.find(i => i.id === issue.id)) {
          acc.push(issue);
        }
        return acc;
      }, []);

      // Get user's teams (where they are creator or member)
      const { data: createdTeams = [] } = await supabase
        .from('teams')
        .select('id')
        .eq('created_by', user.id);

      const { data: teamMemberships = [] } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', user.id);

      const totalTeams = createdTeams.length + teamMemberships.length;

      // Calculate stats
      const totalProjects = projects.length;
      const totalIssues = allUserIssues.length;
      const resolvedIssues = allUserIssues.filter(issue => issue.status === 'done').length;
      
      // Calculate days active (since user creation)
      const { data: profile } = await supabase
        .from('profiles')
        .select('created_at')
        .eq('id', user.id)
        .single();

      const daysActive = profile?.created_at 
        ? Math.floor((new Date().getTime() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24))
        : 0;

      return {
        totalProjects,
        totalIssues,
        resolvedIssues,
        totalTeams,
        daysActive,
        userIssues: allUserIssues
      };
    },
    enabled: !!user?.id,
  });
};
