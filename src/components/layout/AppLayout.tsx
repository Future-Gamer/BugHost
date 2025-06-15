
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useLocation } from 'react-router-dom';
import { useFilters } from '@/hooks/useFilters';
import { projectFilterGroups } from '@/components/projects/ProjectList';
import { issueFilterGroups } from '@/components/issues/IssueBoard';
import { teamMemberFilterGroups } from '@/components/teams/TeamMembersList';

interface AppLayoutProps {
  children: ReactNode;
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

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav 
          selectedProject={selectedProject || null}
          onCreateProject={onCreateProject}
          onCreateIssue={onCreateIssue}
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
    </div>
  );
};
