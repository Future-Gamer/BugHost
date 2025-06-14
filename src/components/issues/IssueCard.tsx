
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bug, Zap, CheckSquare, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tables } from '@/integrations/supabase/types';

type Issue = Tables<'issues'> & {
  assignee_profile?: { first_name: string | null; last_name: string | null };
  reporter_profile?: { first_name: string | null; last_name: string | null };
};

interface IssueCardProps {
  issue: Issue;
}

export const IssueCard = ({ issue }: IssueCardProps) => {
  const getTypeIcon = () => {
    switch (issue.type) {
      case 'bug':
        return <Bug className="h-4 w-4 text-red-500" />;
      case 'feature':
        return <Zap className="h-4 w-4 text-blue-500" />;
      case 'task':
        return <CheckSquare className="h-4 w-4 text-green-500" />;
    }
  };

  const getPriorityColor = () => {
    switch (issue.priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getAssigneeName = () => {
    if (issue.assignee_profile?.first_name && issue.assignee_profile?.last_name) {
      return `${issue.assignee_profile.first_name} ${issue.assignee_profile.last_name}`;
    }
    return issue.assignee || 'Unassigned';
  };

  const getAssigneeInitials = () => {
    if (issue.assignee_profile?.first_name && issue.assignee_profile?.last_name) {
      return `${issue.assignee_profile.first_name[0]}${issue.assignee_profile.last_name[0]}`;
    }
    return issue.assignee?.split(' ').map(n => n[0]).join('') || 'U';
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow group">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              {getTypeIcon()}
              <Badge 
                variant="outline" 
                className={cn("text-xs", getPriorityColor())}
              >
                {issue.priority}
              </Badge>
            </div>
            <span className="text-xs text-gray-500 font-mono">
              #{issue.id.slice(-6)}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {issue.title}
          </h4>

          {/* Description */}
          {issue.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {issue.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{new Date(issue.created_at).toLocaleDateString()}</span>
            </div>
            
            {(issue.assignee || issue.assignee_profile) && (
              <div className="flex items-center space-x-1">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {getAssigneeInitials()}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
