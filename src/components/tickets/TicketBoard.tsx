
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from "lucide-react";
import { TicketCard } from "./TicketCard";
import { useTickets } from "@/hooks/useTickets";
import { Skeleton } from "@/components/ui/skeleton";

interface TicketBoardProps {
  projectId: string | null;
  projectName?: string;
  onCreateTicket: () => void;
}

export const TicketBoard = ({ projectId, projectName, onCreateTicket }: TicketBoardProps) => {
  const { data: tickets, isLoading, error } = useTickets(projectId);

  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as const },
    { id: 'inprogress', title: 'In Progress', status: 'inprogress' as const },
    { id: 'done', title: 'Done', status: 'done' as const }
  ];

  const getTicketsByStatus = (status: string) => {
    return tickets?.filter(ticket => ticket.status === status) || [];
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

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
            <p className="text-gray-600 mt-1">{projectName && `Project: ${projectName}`}</p>
          </div>
          <Button onClick={onCreateTicket}>
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600">Error loading tickets. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
          <p className="text-gray-600 mt-1">
            {projectName ? `Project: ${projectName}` : 'Track and manage your tickets'}
          </p>
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
                    {isLoading ? '...' : columnTickets.length}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {isLoading ? (
                  <>
                    <Skeleton className="h-32" />
                    <Skeleton className="h-24" />
                  </>
                ) : (
                  <>
                    {columnTickets.map((ticket) => (
                      <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                    
                    {columnTickets.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p className="text-sm">No tickets in this column</p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
