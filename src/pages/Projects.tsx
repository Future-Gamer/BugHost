
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectList, projectFilterGroups } from '@/components/projects/ProjectList';
import { useFilters } from '@/hooks/useFilters';

const Projects = () => {
  const navigate = useNavigate();
  const { selectedFilters, handleFilterChange, clearFilters } = useFilters(projectFilterGroups);

  const handleSelectProject = (projectId: string, projectName: string) => {
    // Navigate to the dashboard with project selected
    navigate('/', { state: { selectedProject: { id: projectId, name: projectName } } });
  };

  return (
    <div className="p-6">
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
