
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      console.log('Fetching analytics data...');
      
      // Fetch total projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('id, status');
      
      if (projectsError) {
        console.error('Error fetching projects:', projectsError);
        throw projectsError;
      }

      // Fetch total issues
      const { data: issues, error: issuesError } = await supabase
        .from('issues')
        .select('id, status, priority, created_at');
      
      if (issuesError) {
        console.error('Error fetching issues:', issuesError);
        throw issuesError;
      }

      // Fetch total teams
      const { data: teams, error: teamsError } = await supabase
        .from('teams')
        .select('id');
      
      if (teamsError) {
        console.error('Error fetching teams:', teamsError);
        throw teamsError;
      }

      // Fetch total users/profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id');
      
      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }

      // Calculate analytics
      const totalProjects = projects?.length || 0;
      const activeProjects = projects?.filter(p => p.status === 'active').length || 0;
      
      const totalIssues = issues?.length || 0;
      const openIssues = issues?.filter(i => i.status !== 'done').length || 0;
      const closedIssues = issues?.filter(i => i.status === 'done').length || 0;
      const highPriorityIssues = issues?.filter(i => i.priority === 'high').length || 0;
      
      // Issues created this month
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const issuesThisMonth = issues?.filter(i => new Date(i.created_at) >= thisMonth).length || 0;
      
      const totalTeams = teams?.length || 0;
      const totalUsers = profiles?.length || 0;
      
      // Calculate completion rate
      const completionRate = totalIssues > 0 ? Math.round((closedIssues / totalIssues) * 100) : 0;

      console.log('Analytics calculated:', {
        totalProjects,
        activeProjects,
        totalIssues,
        openIssues,
        closedIssues,
        completionRate,
        totalTeams,
        totalUsers
      });

      return {
        totalProjects,
        activeProjects,
        totalIssues,
        openIssues,
        closedIssues,
        highPriorityIssues,
        issuesThisMonth,
        totalTeams,
        totalUsers,
        completionRate,
      };
    },
  });
};
