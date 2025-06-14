
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTeamMembers, useRemoveTeamMember, useUpdateTeamMember } from '@/hooks/useTeamMembers';
import { AddTeamMemberModal } from './AddTeamMemberModal';
import { Users, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TeamMembersListProps {
  teamId: string;
}

export const TeamMembersList = ({ teamId }: TeamMembersListProps) => {
  const { data: teamMembers = [], isLoading } = useTeamMembers(teamId);
  const { mutate: removeMember } = useRemoveTeamMember();
  const { mutate: updateMember } = useUpdateTeamMember();

  const handleRemoveMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      removeMember(memberId);
    }
  };

  const handleRoleChange = (memberId: string, newRole: 'admin' | 'manager' | 'developer' | 'tester') => {
    updateMember({
      id: memberId,
      updates: { role: newRole },
    });
  };

  const getInitials = (firstName?: string | null, lastName?: string | null, email?: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">Loading team members...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Team Members ({teamMembers.length})</span>
          </CardTitle>
          <AddTeamMemberModal teamId={teamId} />
        </div>
      </CardHeader>
      <CardContent>
        {teamMembers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p>No team members yet</p>
            <p className="text-sm">Add your first team member to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {getInitials(member.profile?.first_name, member.profile?.last_name, member.profile?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {member.profile?.first_name && member.profile?.last_name
                        ? `${member.profile.first_name} ${member.profile.last_name}`
                        : member.profile?.email || 'Unknown User'}
                    </div>
                    <div className="text-sm text-gray-500">{member.profile?.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Badge variant="outline" className="cursor-pointer capitalize">
                        {member.role}
                      </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleRoleChange(member.id, 'admin')}>
                        Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRoleChange(member.id, 'manager')}>
                        Manager
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRoleChange(member.id, 'developer')}>
                        Developer
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRoleChange(member.id, 'tester')}>
                        Tester
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Badge variant={member.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                    {member.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
