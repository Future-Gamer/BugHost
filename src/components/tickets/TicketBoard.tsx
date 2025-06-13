
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, User, Calendar, AlertCircle } from "lucide-react";
import { TicketCard } from "./TicketCard";

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

interface TicketBoardProps {
  projectId: string | null;
  onCreateTicket: () => void;
}

export const TicketBoard = ({ projectId, onCreateTicket }: TicketBoardProps) => {
  // Mock data - this will be replaced with Supabase data
  const [tickets] = useState<Ticket[]>([
    {
      id: 'ticket-1',
      title: 'Login page not responsive on mobile',
      description: 'The login form elements are not properly aligned on mobile devices',
      priority: 'high',
      status: 'todo',
      assignee: 'John Doe',
      reporter: 'Jane Smith',
      createdAt: '2024-01-20',
      type: 'bug'
    },
    {
      id: 'ticket-2',
      title: 'Add dark mode toggle',
      description: 'Implement dark mode functionality with theme switching',
      priority: 'medium',
      status: 'inprogress',
      assignee: 'Alice Johnson',
      reporter: 'Bob Wilson',
      createdAt: '2024-01-18',
      type: 'feature'
    },
    {
      id: 'ticket-3',
      title: 'Update project documentation',
      description: 'Review and update the README file with latest changes',
      priority: 'low',
      status: 'done',
      assignee: 'Charlie Brown',
      reporter: 'David Lee',
      createdAt: '2024-01-15',
      type: 'task'
    }
  ]);

  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as const },
    { id: 'inprogress', title: 'In Progress', status: 'inprogress' as const },
    { id: 'done', title: 'Done', status: 'done' as const }
  ];

  const getTicketsByStatus = (status: string) => {
    return tickets.filter(ticket => ticket.status === status);
  };

  if (!projectId) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Project Selected</h3>
          <p className="text-gray-600 mb-4">Please select a project to view the ticket board</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
          <p className="text-gray-600 mt-1">Track and manage your tickets</p>
        </div>
        <Button onClick={onCreateTicket}>
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((column) => {
          const columnTickets = getTicketsByStatus(column.status);
          
          return (
            <Card key={column.id} className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{column.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {columnTickets.length}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {columnTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
                
                {columnTickets.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No tickets in this column</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
