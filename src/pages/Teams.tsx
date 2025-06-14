
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Users, Search, MoreHorizontal, UserPlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock data for teams
  const teams = [
    {
      id: '1',
      name: 'Frontend Development',
      description: 'Responsible for all frontend development tasks',
      memberCount: 5,
      role: 'admin',
      members: [
        { id: '1', name: 'John Doe', role: 'admin' },
        { id: '2', name: 'Jane Smith', role: 'developer' },
        { id: '3', name: 'Mike Johnson', role: 'developer' },
      ]
    },
    {
      id: '2',
      name: 'Backend Development',
      description: 'Backend API and database management',
      memberCount: 4,
      role: 'developer',
      members: [
        { id: '4', name: 'Sarah Wilson', role: 'manager' },
        { id: '5', name: 'Tom Brown', role: 'developer' },
      ]
    },
    {
      id: '3',
      name: 'QA Team',
      description: 'Quality assurance and testing',
      memberCount: 3,
      role: 'tester',
      members: [
        { id: '6', name: 'Lisa Davis', role: 'manager' },
        { id: '7', name: 'Chris Lee', role: 'tester' },
      ]
    }
  ];

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
            <p className="text-gray-600 mt-2">Manage your teams and collaborate with team members.</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Teams Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTeams.map((team) => (
            <Card key={team.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <CardDescription>{team.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit Team</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/teams/${team.id}/members`)}>
                        Manage Members
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete Team
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{team.memberCount} members</span>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {team.role}
                  </Badge>
                </div>

                {/* Team Members */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Members</div>
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 4).map((member) => (
                      <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {team.memberCount > 4 && (
                      <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{team.memberCount - 4}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    View Team
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/teams/${team.id}/members`)}>
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="space-y-2">
                <Users className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="text-lg font-medium text-gray-900">No teams found</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Create your first team to get started.'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Teams;
