
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { ProjectList } from "@/components/projects/ProjectList";
import { IssueBoard } from "@/components/issues/IssueBoard";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { CreateIssueModal } from "@/components/issues/CreateIssueModal";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<{id: string; name: string} | null>(null);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateIssue, setShowCreateIssue] = useState(false);
  const [currentView, setCurrentView] = useState<'projects' | 'board'>('projects');

  const handleSelectProject = (projectId: string, projectName: string) => {
    setSelectedProject({ id: projectId, name: projectName });
    setCurrentView('board');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
        selectedProject={selectedProject?.id || null}
        onCreateProject={() => setShowCreateProject(true)}
        onCreateIssue={() => setShowCreateIssue(true)}
      />
      
      <div className="flex-1 flex flex-col">
        <TopNav 
          selectedProject={selectedProject}
          onCreateProject={() => setShowCreateProject(true)}
          onCreateIssue={() => setShowCreateIssue(true)}
        />
        
        <main className="flex-1 p-6">
          {currentView === 'projects' ? (
            <ProjectList onSelectProject={handleSelectProject} />
          ) : (
            <IssueBoard 
              projectId={selectedProject?.id || null}
              projectName={selectedProject?.name}
              onCreateIssue={() => setShowCreateIssue(true)}
            />
          )}
        </main>
      </div>

      <CreateProjectModal 
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
      />

      <CreateIssueModal 
        isOpen={showCreateIssue}
        onClose={() => setShowCreateIssue(false)}
        projectId={selectedProject?.id || null}
      />
    </div>
  );
};

export default Index;
