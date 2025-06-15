
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProjectList } from "@/components/projects/ProjectList";
import { IssueBoard } from "@/components/issues/IssueBoard";
import { AnalyticsOverview } from "@/components/analytics/AnalyticsOverview";
import { CreateIssueModal } from "@/components/issues/CreateIssueModal";
import { useProjects } from "@/hooks/useProjects";
import { useIssues } from "@/hooks/useIssues";

interface IndexProps {
  selectedFilters?: Record<string, string[]>;
  onFilterChange?: (groupId: string, optionId: string, checked: boolean) => void;
  onClearFilters?: () => void;
}

const Index = ({ selectedFilters = {}, onFilterChange, onClearFilters }: IndexProps) => {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState<{id: string; name: string} | null>(null);
  const [currentView, setCurrentView] = useState<'projects' | 'board'>('projects');
  const [isCreateIssueModalOpen, setIsCreateIssueModalOpen] = useState(false);
  
  const { data: projects } = useProjects();
  const { data: issues } = useIssues(selectedProject?.id || null);

  // Check if we have a selected project from navigation state
  useEffect(() => {
    if (location.state?.selectedProject) {
      setSelectedProject(location.state.selectedProject);
      setCurrentView('board');
    }
  }, [location.state]);

  const handleSelectProject = (projectId: string, projectName: string) => {
    setSelectedProject({ id: projectId, name: projectName });
    setCurrentView('board');
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setCurrentView('projects');
  };

  const handleCreateIssue = () => {
    setIsCreateIssueModalOpen(true);
  };

  return (
    <div className="p-3 md:p-6 h-full">
      {currentView === 'projects' && (
        <div className="mb-4 md:mb-6">
          <AnalyticsOverview />
        </div>
      )}
      
      {currentView === 'projects' ? (
        <ProjectList 
          onSelectProject={handleSelectProject}
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />
      ) : (
        <IssueBoard 
          projectId={selectedProject?.id || null}
          projectName={selectedProject?.name}
          onCreateIssue={handleCreateIssue}
          onBackToProjects={handleBackToProjects}
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />
      )}

      {/* Create Issue Modal */}
      {selectedProject && (
        <CreateIssueModal
          isOpen={isCreateIssueModalOpen}
          onClose={() => setIsCreateIssueModalOpen(false)}
          projectId={selectedProject.id}
        />
      )}
    </div>
  );
};

export default Index;
