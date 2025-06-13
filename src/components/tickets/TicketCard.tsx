
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bug, Zap, CheckSquare, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'inprogress' | 'done';
  assignee?: string;
  reporter: string;
  createdAt: string;
  type: 'bug' | 'feature' | 'task';
}

interface TicketCardProps {
  ticket: Ticket;
}

export const TicketCard = ({ ticket }: TicketCardProps) => {
  const getTypeIcon = () => {
    switch (ticket.type) {
      case 'bug':
        return <Bug className="h-4 w-4 text-red-500" />;
      case 'feature':
        return <Zap className="h-4 w-4 text-blue-500" />;
      case 'task':
        return <CheckSquare className="h-4 w-4 text-green-500" />;
    }
  };

  const getPriorityColor = () => {
    switch (ticket.priority) {
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
                {ticket.priority}
              </Badge>
            </div>
            <span className="text-xs text-gray-500 font-mono">
              #{ticket.id.split('-')[1]}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {ticket.title}
          </h4>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {ticket.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
            
            {ticket.assignee && (
              <div className="flex items-center space-x-1">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {ticket.assignee.split(' ').map(n => n[0]).join('')}
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
