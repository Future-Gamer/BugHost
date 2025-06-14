
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TeamMembersList } from '@/components/teams/TeamMembersList';
import { ArrowLeft } from 'lucide-react';

const TeamMembers = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();

  if (!teamId) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Team not found</h1>
            <Button onClick={() => navigate('/teams')} className="mt-4">
              Back to Teams
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/teams')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teams
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-600 mt-2">Manage your team members and their roles.</p>
        </div>

        <TeamMembersList teamId={teamId} />
      </div>
    </div>
  );
};

export default TeamMembers;
