
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { ProjectList } from "@/components/projects/ProjectList";
import { TicketBoard } from "@/components/tickets/TicketBoard";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { CreateTicketModal } from "@/components/tickets/CreateTicketModal";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [currentView, setCurrentView] = useState<'projects' | 'board'>('projects');

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
        selectedProject={selectedProject}
        onCreateProject={() => setShowCreateProject(true)}
        onCreateTicket={() => setShowCreateTicket(true)}
      />
      
      <div className="flex-1 flex flex-col">
        <TopNav 
          selectedProject={selectedProject}
          onCreateProject={() => setShowCreateProject(true)}
          onCreateTicket={() => setShowCreateTicket(true)}
        />
        
        <main className="flex-1 p-6">
          {currentView === 'projects' ? (
            <ProjectList 
              onSelectProject={(projectId) => {
                setSelectedProject(projectId);
                setCurrentView('board');
              }}
            />
          ) : (
            <TicketBoard 
              projectId={selectedProject}
              onCreateTicket={() => setShowCreateTicket(true)}
            />
          )}
        </main>
      </div>

      <CreateProjectModal 
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
      />

      <CreateTicketModal 
        isOpen={showCreateTicket}
        onClose={() => setShowCreateTicket(false)}
        projectId={selectedProject}
      />
    </div>
  );
};

export default Index;
