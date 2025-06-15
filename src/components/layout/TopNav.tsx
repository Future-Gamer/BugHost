
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { SearchResults } from "@/components/search/SearchResults";
import { FilterComponent, FilterGroup } from "@/components/ui/filter";

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
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search issues, projects..."
              className="pl-10 w-96"
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

          {filterGroups.length > 0 && onFilterChange && onClearFilters && (
            <FilterComponent
              filterGroups={filterGroups}
              selectedFilters={selectedFilters}
              onFilterChange={onFilterChange}
              onClearFilters={onClearFilters}
            />
          )}
          
          {selectedProject && (
            <Badge variant="secondary" className="px-3 py-1">
              Project: {selectedProject.name}
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={onCreateProject}>
            <Plus className="h-4 w-4 mr-1" />
            Project
          </Button>
          
          {selectedProject && (
            <Button size="sm" onClick={onCreateIssue}>
              <Plus className="h-4 w-4 mr-1" />
              Issue
            </Button>
          )}

          <NotificationDropdown />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};
