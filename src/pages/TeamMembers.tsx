
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TeamMembersList } from '@/components/teams/TeamMembersList';
import { ArrowLeft, Users, Calendar, User } from 'lucide-react';
import { useTeams } from '@/hooks/useTeams';

const TeamMembers = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { data: teams = [] } = useTeams();

  if (!teamId) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Team not found</h1>
                <Button onClick={() => navigate('/teams')} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Teams
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const team = teams.find(t => t.id === teamId);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/teams')} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Teams
            </Button>
          </div>
        </div>

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
              </div>
            </CardHeader>
            <CardContent>
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
