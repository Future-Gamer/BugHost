
import { useState } from "react";
import { ProjectList } from "@/components/projects/ProjectList";
import { IssueBoard } from "@/components/issues/IssueBoard";
import { AnalyticsOverview } from "@/components/analytics/AnalyticsOverview";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<{id: string; name: string} | null>(null);
  const [currentView, setCurrentView] = useState<'projects' | 'board'>('projects');

  const handleSelectProject = (projectId: string, projectName: string) => {
    setSelectedProject({ id: projectId, name: projectName });
    setCurrentView('board');
  };

  return (
    <div className="p-6">
      {currentView === 'projects' && <AnalyticsOverview />}
      
      {currentView === 'projects' ? (
        <ProjectList onSelectProject={handleSelectProject} />
      ) : (
        <IssueBoard 
          projectId={selectedProject?.id || null}
          projectName={selectedProject?.name}
          onCreateIssue={() => {}}
        />
      )}
    </div>
  );
};

export default Index;
