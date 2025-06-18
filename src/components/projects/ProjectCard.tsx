
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useDeleteProject } from '@/hooks/useDeleteProject';
import { useToast } from '@/hooks/use-toast';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string | null;
    created_at: string;
    status?: string;
  };
  onSelectProject: (projectId: string, projectName: string) => void;
  onDeleteProject?: (project: { id: string; name: string }) => void;
}

export const ProjectCard = ({ project, onSelectProject, onDeleteProject }: ProjectCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteProject = useDeleteProject();
  const { toast } = useToast();

  const handleCardClick = () => {
    onSelectProject(project.id, project.name);
  };

  const handleDeleteClick = () => {
    if (onDeleteProject) {
      onDeleteProject({ id: project.id, name: project.name });
    } else {
      setShowDeleteDialog(true);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProject.mutateAsync(project.id);
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      setShowDeleteDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleCardClick}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleMenuClick}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDeleteClick} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">
            {project.description || 'No description available'}
          </CardDescription>
          <div className="flex items-center justify-between">
            <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
              {project.status || 'Active'}
            </Badge>
            <span className="text-sm text-gray-500">
              {new Date(project.created_at).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{project.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              disabled={deleteProject.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteProject.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
