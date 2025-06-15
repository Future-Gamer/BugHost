
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { CreateIssueModal } from "@/components/issues/CreateIssueModal";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [selectedProject, setSelectedProject] = useState<{id: string; name: string} | null>(null);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateIssue, setShowCreateIssue] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <TopNav 
            selectedProject={selectedProject}
            onCreateProject={() => setShowCreateProject(true)}
            onCreateIssue={() => setShowCreateIssue(true)}
          />
          
          <main className="flex-1">
            {children}
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
    </SidebarProvider>
  );
};
