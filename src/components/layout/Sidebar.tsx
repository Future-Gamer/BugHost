
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Home, 
  FolderOpen, 
  Settings, 
  Plus, 
  ChevronLeft,
  ChevronRight,
  Bug,
  Users,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  currentView: 'projects' | 'board';
  onViewChange: (view: 'projects' | 'board') => void;
  selectedProject: string | null;
  onCreateProject: () => void;
  onCreateTicket: () => void;
}

export const Sidebar = ({ 
  currentView, 
  onViewChange, 
  selectedProject,
  onCreateProject,
  onCreateTicket
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderOpen,
      view: 'projects' as const,
    },
    {
      id: 'board',
      label: 'Kanban Board',
      icon: Bug,
      view: 'board' as const,
      disabled: !selectedProject,
    },
  ];

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Bug className="h-6 w-6 text-blue-600" />
            <h1 className="text-lg font-semibold text-gray-900">BugTracker</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={currentView === item.view ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              isCollapsed ? "px-2" : "px-3",
              item.disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !item.disabled && onViewChange(item.view)}
            disabled={item.disabled}
          >
            <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
            {!isCollapsed && item.label}
          </Button>
        ))}
      </nav>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 space-y-2">
          <Button
            onClick={onCreateProject}
            className="w-full justify-start"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
          
          {selectedProject && (
            <Button
              onClick={onCreateTicket}
              variant="outline"
              className="w-full justify-start"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
