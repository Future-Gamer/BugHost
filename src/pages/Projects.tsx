
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectList } from '@/components/projects/ProjectList';

const Projects = () => {
  const navigate = useNavigate();

  const handleSelectProject = (projectId: string, projectName: string) => {
    // Navigate to the dashboard with project selected
    navigate('/', { state: { selectedProject: { id: projectId, name: projectName } } });
  };

  return (
    <div className="p-6">
      <ProjectList onSelectProject={handleSelectProject} />
    </div>
  );
};

export default Projects;
