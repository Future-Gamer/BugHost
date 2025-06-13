
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Users, Bug, Calendar, MoreHorizontal } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived';
  memberCount: number;
  ticketCount: number;
  createdAt: string;
}

interface ProjectListProps {
  onSelectProject: (projectId: string) => void;
}

export const ProjectList = ({ onSelectProject }: ProjectListProps) => {
  // Mock data - this will be replaced with Supabase data
  const [projects] = useState<Project[]>([
    {
      id: 'proj-1',
      name: 'Bug Tracker App',
      description: 'Main application for tracking bugs and issues across our platform',
      status: 'active',
      memberCount: 5,
      ticketCount: 23,
      createdAt: '2024-01-15'
    },
    {
      id: 'proj-2',
      name: 'Mobile App v2.0',
      description: 'Next generation mobile application with enhanced features',
      status: 'active',
      memberCount: 8,
      ticketCount: 41,
      createdAt: '2024-02-01'
    },
    {
      id: 'proj-3',
      name: 'Legacy System Migration',
      description: 'Migration project for moving from old infrastructure',
      status: 'archived',
      memberCount: 3,
      ticketCount: 156,
      createdAt: '2023-11-20'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your projects and track issues</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {projects.length} Projects
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card 
            key={project.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => onSelectProject(project.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FolderOpen className="h-5 w-5 text-blue-600" />
                  <Badge 
                    variant={project.status === 'active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {project.status}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription className="text-sm">
                {project.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{project.memberCount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bug className="h-4 w-4" />
                    <span>{project.ticketCount}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
