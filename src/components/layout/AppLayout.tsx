
import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useLocation } from 'react-router-dom';
import { useFilters } from '@/hooks/useFilters';
import { projectFilterGroups } from '@/components/projects/ProjectList';
import { issueFilterGroups } from '@/components/issues/IssueBoard';
import { teamMemberFilterGroups } from '@/components/teams/TeamMembersList';
import { CreateIssueModal } from '@/components/issues/CreateIssueModal';

interface FilterProps {
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearFilters: () => void;
}

interface AppLayoutProps {
  children: ReactNode | ((props: FilterProps) => ReactNode);
  selectedProject?: {id: string; name: string} | null;
  onCreateProject?: () => void;
  onCreateIssue?: () => void;
}

export const AppLayout = ({ 
  children, 
  selectedProject, 
  onCreateProject = () => {}, 
  onCreateIssue = () => {} 
}: AppLayoutProps) => {
  const location = useLocation();
  const [isCreateIssueModalOpen, setIsCreateIssueModalOpen] = useState(false);
  
  // Determine which filter groups to use based on current route
  const getFilterGroups = () => {
    if (location.pathname === '/projects') {
      return projectFilterGroups;
    } else if (location.pathname === '/' && selectedProject) {
      return issueFilterGroups;
    } else if (location.pathname.includes('/teams/')) {
      return teamMemberFilterGroups;
    }
    return [];
  };

  const filterGroups = getFilterGroups();
  const { selectedFilters, handleFilterChange, clearFilters } = useFilters(filterGroups);

  const handleCreateIssue = () => {
    if (selectedProject) {
      setIsCreateIssueModalOpen(true);
    } else {
      onCreateIssue();
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav 
          selectedProject={selectedProject || null}
          onCreateProject={onCreateProject}
          onCreateIssue={handleCreateIssue}
          filterGroups={filterGroups}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
        <main className="flex-1 overflow-auto">
          {/* Pass filter props to children if they need them */}
          {typeof children === 'function' 
            ? children({ selectedFilters, onFilterChange: handleFilterChange, onClearFilters: clearFilters })
            : children
          }
        </main>
      </div>

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
