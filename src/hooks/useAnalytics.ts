
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useAnalytics = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['analytics', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      // Get total projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('id, status')
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      // Get total issues
      const { data: issues, error: issuesError } = await supabase
        .from('issues')
        .select('id, status, priority, type, created_at')
        .order('created_at', { ascending: false });

      if (issuesError) throw issuesError;

      // Get total teams where user is a member or owner
      const { data: userTeams, error: userTeamsError } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', user.id);

      if (userTeamsError) throw userTeamsError;

      const { data: ownedTeams, error: ownedTeamsError } = await supabase
        .from('teams')
        .select('id')
        .eq('created_by', user.id);

      if (ownedTeamsError) throw ownedTeamsError;

      // Calculate analytics
      const totalProjects = projects?.length || 0;
      const activeProjects = projects?.filter(p => p.status === 'active').length || 0;
      
      const totalIssues = issues?.length || 0;
      const resolvedIssues = issues?.filter(i => i.status === 'done').length || 0;
      const openIssues = issues?.filter(i => i.status !== 'done').length || 0;
      
      const totalTeams = (userTeams?.length || 0) + (ownedTeams?.length || 0);
      
      // Issues by status
      const issuesByStatus = {
        todo: issues?.filter(i => i.status === 'todo').length || 0,
        in_progress: issues?.filter(i => i.status === 'in_progress').length || 0,
        review: issues?.filter(i => i.status === 'review').length || 0,
        done: issues?.filter(i => i.status === 'done').length || 0,
      };

      // Issues by priority
      const issuesByPriority = {
        low: issues?.filter(i => i.priority === 'low').length || 0,
        medium: issues?.filter(i => i.priority === 'medium').length || 0,
        high: issues?.filter(i => i.priority === 'high').length || 0,
        urgent: issues?.filter(i => i.priority === 'urgent').length || 0,
      };

      // Issues by type
      const issuesByType = {
        bug: issues?.filter(i => i.type === 'bug').length || 0,
        feature: issues?.filter(i => i.type === 'feature').length || 0,
        task: issues?.filter(i => i.type === 'task').length || 0,
        story: issues?.filter(i => i.type === 'story').length || 0,
      };

      // Recent activity (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentIssues = issues?.filter(i => 
        new Date(i.created_at) >= sevenDaysAgo
      ).length || 0;

      return {
        totalProjects,
        activeProjects,
        totalIssues,
        resolvedIssues,
        openIssues,
        totalTeams,
        issuesByStatus,
        issuesByPriority,
        issuesByType,
        recentIssues,
        completionRate: totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0,
      };
    },
    enabled: !!user?.id,
  });
};
