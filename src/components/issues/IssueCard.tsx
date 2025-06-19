
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useUpdateIssue } from "@/hooks/useIssues";
import { MoreHorizontal, Trash2, Mail } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface Issue {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'inprogress' | 'done';
  assignee?: string;
  assignee_email?: string | null;
  assignee_profile?: { first_name: string | null; last_name: string | null; email?: string | null } | null;
  created_at: string;
}

interface IssueCardProps {
  issue: Issue;
}

export const IssueCard = ({ issue }: IssueCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDeleteIssue = async () => {
    try {
      const { error } = await supabase
        .from('issues')
        .delete()
        .eq('id', issue.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete issue",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Issue deleted successfully",
        });
        // Invalidate and refetch issues
        queryClient.invalidateQueries({ queryKey: ['issues'] });
        queryClient.invalidateQueries({ queryKey: ['issue-count'] });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setShowDeleteDialog(false);
    }
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

  const getAssigneeEmail = () => {
    // Priority: assignee_profile.email > assignee_email > null
    if (issue.assignee_profile?.email) {
      return issue.assignee_profile.email;
    }
    if (issue.assignee_email) {
      return issue.assignee_email;
    }
    return null;
  };

  const getInitials = (name: string) => {
    if (name === 'Unassigned') return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const assigneeEmail = getAssigneeEmail();

  return (
    <>
      <Card className="hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm leading-tight flex-1">{issue.title}</h4>
            <div className="flex items-center space-x-2">
              <Badge variant={getPriorityColor(issue.priority)} className="text-xs">
                {issue.priority}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Issue
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {issue.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{issue.description}</p>
          )}
          
          <div className="flex items-start space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {getInitials(getAssigneeName())}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <span className="text-xs text-gray-900 font-medium block">{getAssigneeName()}</span>
              {assigneeEmail && (
                <div className="flex items-center gap-1 mt-1">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500 truncate">{assigneeEmail}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Issue</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{issue.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteIssue}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
