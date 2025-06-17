
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Users, Bug, Calendar, MoreHorizontal, Trash } from "lucide-react";
import { useIssues } from "@/hooks/useIssues";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectCardProps {
  project: any;
  onSelectProject: (projectId: string, projectName: string) => void;
  onDeleteProject: (project: { id: string; name: string }) => void;
}

export const ProjectCard = ({ project, onSelectProject, onDeleteProject }: ProjectCardProps) => {
  const { data: issues = [] } = useIssues(project.id);
  const issueCount = issues.length;

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => onSelectProject(project.id, project.name)}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteProject({ id: project.id, name: project.name });
                }}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
              <span>5</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bug className="h-4 w-4" />
              <span>{issueCount}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(project.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
