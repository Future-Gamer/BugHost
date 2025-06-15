
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProjectList } from "@/components/projects/ProjectList";
import { IssueBoard } from "@/components/issues/IssueBoard";
import { AnalyticsOverview } from "@/components/analytics/AnalyticsOverview";

interface IndexProps {
  selectedFilters?: Record<string, string[]>;
  onFilterChange?: (groupId: string, optionId: string, checked: boolean) => void;
  onClearFilters?: () => void;
}

const Index = ({ selectedFilters = {}, onFilterChange, onClearFilters }: IndexProps) => {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState<{id: string; name: string} | null>(null);
  const [currentView, setCurrentView] = useState<'projects' | 'board'>('projects');

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

  return (
    <div className="p-6">
      {currentView === 'projects' && <AnalyticsOverview />}
      
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
          onCreateIssue={() => {}}
          onBackToProjects={handleBackToProjects}
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />
      )}
    </div>
  );
};

export default Index;
