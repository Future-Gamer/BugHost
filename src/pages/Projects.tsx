
import React from 'react';
import { ProjectList } from '@/components/projects/ProjectList';

const Projects = () => {
  const handleSelectProject = (projectId: string, projectName: string) => {
    // For now, just log the selection. This could navigate to a project detail page
    console.log('Selected project:', { projectId, projectName });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <ProjectList onSelectProject={handleSelectProject} />
      </div>
    </div>
  );
};

export default Projects;
