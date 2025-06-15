
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectList, projectFilterGroups } from '@/components/projects/ProjectList';
import { useFilters } from '@/hooks/useFilters';
import { useProjects } from '@/hooks/useProjects';

const Projects = () => {
  const navigate = useNavigate();
  const { selectedFilters, handleFilterChange, clearFilters } = useFilters(projectFilterGroups);
  const { data: projects, isLoading } = useProjects();

  const handleSelectProject = (projectId: string, projectName: string) => {
    // Navigate to the dashboard with project selected
    navigate('/', { state: { selectedProject: { id: projectId, name: projectName } } });
  };

  // Filter projects based on selected filters
  const filteredProjects = React.useMemo(() => {
    if (!projects) return [];
    
    return projects.filter(project => {
      // Check status filter
      if (selectedFilters.status?.length > 0) {
        if (!selectedFilters.status.includes(project.status || 'active')) {
          return false;
        }
      }
      
      // Check priority filter (if exists in project data)
      if (selectedFilters.priority?.length > 0) {
        if (!selectedFilters.priority.includes(project.priority || 'medium')) {
          return false;
        }
      }
      
      return true;
    });
  }, [projects, selectedFilters]);

  if (isLoading) {
    return (
      <div className="p-3 md:p-6 h-full">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6 h-full">
      <ProjectList 
        onSelectProject={handleSelectProject}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        projects={filteredProjects}
      />
    </div>
  );
};

export default Projects;
