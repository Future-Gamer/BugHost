
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/useProjects";
import { useDeleteProject } from "@/hooks/useDeleteProject";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useMemo } from "react";
import { useFilters } from "@/hooks/useFilters";
import type { FilterGroup } from "@/components/ui/filter";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  onSelectProject: (projectId: string, projectName: string) => void;
  selectedFilters?: Record<string, string[]>;
  onFilterChange?: (groupId: string, optionId: string, checked: boolean) => void;
  onClearFilters?: () => void;
}

const projectFilterGroups: FilterGroup[] = [
  {
    id: 'status',
    label: 'Status',
    options: [
      { id: 'active', label: 'Active', value: 'active' },
      { id: 'inactive', label: 'Inactive', value: 'inactive' },
      { id: 'completed', label: 'Completed', value: 'completed' },
    ]
  },
  {
    id: 'date',
    label: 'Created',
    options: [
      { id: 'today', label: 'Today', value: 'today' },
      { id: 'week', label: 'This Week', value: 'week' },
      { id: 'month', label: 'This Month', value: 'month' },
    ]
  }
];

export const ProjectList = ({ 
  onSelectProject, 
  selectedFilters = {},
  onFilterChange,
  onClearFilters 
}: ProjectListProps) => {
  const { data: allProjects, isLoading, error } = useProjects();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const [projectToDelete, setProjectToDelete] = useState<{id: string; name: string} | null>(null);

  const filteredProjects = useMemo(() => {
    if (!allProjects) return [];
    
    return allProjects.filter(project => {
      // Status filter
      const statusFilters = selectedFilters.status || [];
      if (statusFilters.length > 0 && !statusFilters.includes(project.status)) {
        return false;
      }

      // Date filter
      const dateFilters = selectedFilters.date || [];
      if (dateFilters.length > 0) {
        const createdAt = new Date(project.created_at);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        const matchesDate = dateFilters.some(filter => {
          switch (filter) {
            case 'today':
              return createdAt >= today;
            case 'week':
              return createdAt >= weekAgo;
            case 'month':
              return createdAt >= monthAgo;
            default:
              return true;
          }
        });

        if (!matchesDate) return false;
      }

      return true;
    });
  }, [allProjects, selectedFilters]);

  const handleDeleteProject = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      setProjectToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage your projects and track issues</p>
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage your projects and track issues</p>
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600">Error loading projects. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage your projects and track issues</p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            {filteredProjects?.length || 0} Projects
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects?.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={onSelectProject}
              onDeleteProject={setProjectToDelete}
            />
          ))}
        </div>
      </div>

      <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{projectToDelete?.name}"? This action cannot be undone.
              All issues associated with this project will also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteProject}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete Project'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { projectFilterGroups };
