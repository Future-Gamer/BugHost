
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Menu } from "lucide-react";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { SearchResults } from "@/components/search/SearchResults";
import { FilterComponent, FilterGroup } from "@/components/ui/filter";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface TopNavProps {
  selectedProject: {id: string; name: string} | null;
  onCreateProject: () => void;
  onCreateIssue: () => void;
  filterGroups?: FilterGroup[];
  selectedFilters?: Record<string, string[]>;
  onFilterChange?: (groupId: string, optionId: string, checked: boolean) => void;
  onClearFilters?: () => void;
}

export const TopNav = ({ 
  selectedProject, 
  onCreateProject, 
  onCreateIssue,
  filterGroups = [],
  selectedFilters = {},
  onFilterChange,
  onClearFilters
}: TopNavProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search function - in real app, this would call your API
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock search results
    const mockResults = [
      {
        id: '1',
        title: 'Login page not responsive',
        description: 'The login page layout breaks on mobile devices',
        type: 'issue',
        priority: 'high',
        status: 'todo',
        projectName: 'Frontend Project'
      },
      {
        id: '2',
        title: 'Frontend Project',
        description: 'Main frontend development project',
        type: 'project'
      },
      {
        id: '3',
        title: 'Development Team',
        description: 'Core development team responsible for feature implementation',
        type: 'team'
      },
      {
        id: '4',
        title: 'API integration issue',
        description: 'Backend API returns incorrect data format',
        type: 'issue',
        priority: 'medium',
        status: 'inprogress',
        projectName: 'Backend Project'
      }
    ].filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(mockResults);
    setIsSearching(false);
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
        setShowResults(true);
      } else {
        setShowResults(false);
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCloseSearch = () => {
    setShowResults(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          {/* Mobile sidebar trigger */}
          <div className="md:hidden">
            <SidebarTrigger />
          </div>

          {/* Search - responsive width */}
          <div className="relative flex-1 max-w-sm md:max-w-md lg:max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 text-sm"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            {showResults && (
              <SearchResults
                query={searchQuery}
                results={searchResults}
                onClose={handleCloseSearch}
              />
            )}
          </div>

          {/* Filters - hidden on mobile */}
          {filterGroups.length > 0 && onFilterChange && onClearFilters && (
            <div className="hidden lg:block">
              <FilterComponent
                filterGroups={filterGroups}
                selectedFilters={selectedFilters}
                onFilterChange={onFilterChange}
                onClearFilters={onClearFilters}
              />
            </div>
          )}
          
          {/* Project badge - responsive */}
          {selectedProject && (
            <Badge variant="secondary" className="hidden sm:inline-flex px-2 py-1 text-xs truncate max-w-32 md:max-w-none">
              {selectedProject.name}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* Action buttons - responsive */}
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onCreateProject} className="text-xs md:text-sm">
              <Plus className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
              <span className="hidden md:inline">Project</span>
            </Button>
            
            {selectedProject && (
              <Button size="sm" onClick={onCreateIssue} className="text-xs md:text-sm">
                <Plus className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
                <span className="hidden md:inline">Issue</span>
              </Button>
            )}
          </div>

          {/* Mobile action buttons */}
          <div className="sm:hidden flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={onCreateProject}>
              <Plus className="h-4 w-4" />
            </Button>
            {selectedProject && (
              <Button size="sm" onClick={onCreateIssue}>
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>

          <NotificationDropdown />
          <ProfileDropdown />
        </div>
      </div>

      {/* Mobile filters - show below main nav */}
      {filterGroups.length > 0 && onFilterChange && onClearFilters && (
        <div className="lg:hidden mt-3 pt-3 border-t border-gray-100">
          <FilterComponent
            filterGroups={filterGroups}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
          />
        </div>
      )}

      {/* Mobile project badge */}
      {selectedProject && (
        <div className="sm:hidden mt-2 pt-2 border-t border-gray-100">
          <Badge variant="secondary" className="text-xs">
            Project: {selectedProject.name}
          </Badge>
        </div>
      )}
    </header>
  );
};
