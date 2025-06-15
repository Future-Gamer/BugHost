
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TeamMembersList } from '@/components/teams/TeamMembersList';
import { Users, Calendar, User, BarChart3 } from 'lucide-react';
import { useTeams } from '@/hooks/useTeams';
import { Button } from '@/components/ui/button';

const TeamMembers = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { data: teams = [] } = useTeams();

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

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Team Info */}
        {team && (
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
                <Button variant="outline" size="sm" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Members</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">24</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Issues Resolved</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Projects</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">92%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
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
        )}

        {/* Team Members */}
        <TeamMembersList teamId={teamId} />
      </div>
    </div>
  );
};

export default TeamMembers;
