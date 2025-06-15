
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TeamMembersList } from '@/components/teams/TeamMembersList';
import { Users, Calendar, User, FolderOpen, Bug, CheckCircle, AlertTriangle } from 'lucide-react';
import { useTeams } from '@/hooks/useTeams';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import { useProjects } from '@/hooks/useProjects';
import { useIssues } from '@/hooks/useIssues';
import { Skeleton } from '@/components/ui/skeleton';

const TeamMembers = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { data: teams = [] } = useTeams();
  const { data: teamMembers = [] } = useTeamMembers(teamId);
  const { data: projects = [] } = useProjects();
  const { data: allIssues = [] } = useIssues(null);

  if (!teamId) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Team not found</h1>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const team = teams.find(t => t.id === teamId);
  
  // Calculate real analytics
  const activeMembersCount = teamMembers.filter(member => member.status === 'active').length;
  const totalProjects = projects.length;
  const totalIssues = allIssues.length;
  const resolvedIssues = allIssues.filter(issue => issue.status === 'done').length;
  const highPriorityIssues = allIssues.filter(issue => issue.priority === 'high').length;
  const completionRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Team Info */}
        {team ? (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    {team.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {team.description || 'No description provided'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {activeMembersCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Members</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {resolvedIssues}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Issues Resolved</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {totalProjects}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Projects</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {completionRate}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
                </div>
              </div>
              
              {/* Additional Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Bug className="h-5 w-5 text-blue-600" />
                    <span className="text-lg font-semibold text-blue-600">{totalIssues}</span>
                  </div>
                  <div className="text-sm text-blue-600">Total Issues</div>
                </div>
                
                <div className="text-center p-4 bg-red-50 dark:bg-red-900 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span className="text-lg font-semibold text-red-600">{highPriorityIssues}</span>
                  </div>
                  <div className="text-sm text-red-600">High Priority</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-lg font-semibold text-green-600">{resolvedIssues}</span>
                  </div>
                  <div className="text-sm text-green-600">Completed</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Created {new Date(team.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Team ID: {teamId}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Skeleton className="h-64" />
        )}

        {/* Team Members */}
        <TeamMembersList teamId={teamId} />
      </div>
    </div>
  );
};

export default TeamMembers;
