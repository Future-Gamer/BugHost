
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectList, projectFilterGroups } from '@/components/projects/ProjectList';
import { useFilters } from '@/hooks/useFilters';
import { useProjects } from '@/hooks/useProjects';
import { AppLayout } from "@/components/layout/AppLayout";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";

const Projects = () => {
  const navigate = useNavigate();
  const { selectedFilters, handleFilterChange, clearFilters } = useFilters(projectFilterGroups);
  const { data: projects, isLoading } = useProjects();

  // Modal open state for CreateProject
  const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState(false);

  const handleSelectProject = (projectId: string, projectName: string) => {
    // Navigate to the dashboard with project selected
    navigate('/', { state: { selectedProject: { id: projectId, name: projectName } } });
  };

  // Handler for opening Create Project modal from TopNav or elsewhere
  const handleOpenCreateProject = () => setCreateProjectModalOpen(true);
  const handleCloseCreateProject = () => setCreateProjectModalOpen(false);

  // Use AppLayout so TopNav gets the handler to open modal
  return (
    <AppLayout onCreateProject={handleOpenCreateProject}>
      <div className="p-3 md:p-6 h-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading projects...</div>
          </div>
        ) : (
          <ProjectList 
            onSelectProject={handleSelectProject}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        )}

        {/* Create Project Modal */}
        <CreateProjectModal
          isOpen={isCreateProjectModalOpen}
          onClose={handleCloseCreateProject}
        />
      </div>
    </AppLayout>
  );
};

export default Projects;

