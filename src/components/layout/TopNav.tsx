
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";

interface TopNavProps {
  selectedProject: {id: string; name: string} | null;
  onCreateProject: () => void;
  onCreateIssue: () => void;
}

export const TopNav = ({ selectedProject, onCreateProject, onCreateIssue }: TopNavProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search issues, projects..."
              className="pl-10 w-96"
            />
          </div>
          
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
