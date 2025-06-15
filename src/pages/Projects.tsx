
import React from 'react';
import { ProjectList } from '@/components/projects/ProjectList';

const Projects = () => {
  const handleSelectProject = (projectId: string, projectName: string) => {
    // For now, just log the selection. This could navigate to a project detail page
    console.log('Selected project:', { projectId, projectName });
  };

  return (
    <div className="p-6">
      <ProjectList onSelectProject={handleSelectProject} />
    </div>
  );
};

export default Projects;
