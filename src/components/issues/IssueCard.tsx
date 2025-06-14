import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusDropdown } from "./StatusDropdown";
import { useUpdateIssue } from "@/hooks/useIssues";

interface Issue {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'inprogress' | 'done';
  assignee?: string;
  assignee_profile?: { first_name: string | null; last_name: string | null } | null;
  created_at: string;
}

interface IssueCardProps {
  issue: Issue;
}

export const IssueCard = ({ issue }: IssueCardProps) => {
  const { mutate: updateIssue } = useUpdateIssue();

  const handleStatusChange = (newStatus: 'todo' | 'inprogress' | 'done') => {
    updateIssue({
      id: issue.id,
      updates: { status: newStatus }
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getAssigneeName = () => {
    if (issue.assignee_profile) {
      const { first_name, last_name } = issue.assignee_profile;
      if (first_name || last_name) {
        return `${first_name || ''} ${last_name || ''}`.trim();
      }
    }
    return issue.assignee || 'Unassigned';
  };

  const getInitials = (name: string) => {
    if (name === 'Unassigned') return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm leading-tight">{issue.title}</h4>
          <Badge variant={getPriorityColor(issue.priority)} className="text-xs">
            {issue.priority}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {issue.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{issue.description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {getInitials(getAssigneeName())}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600">{getAssigneeName()}</span>
          </div>
          
          <StatusDropdown 
            status={issue.status}
            onStatusChange={handleStatusChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};
