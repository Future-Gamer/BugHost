
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
      />
    </div>
  );
};

export default Projects;
