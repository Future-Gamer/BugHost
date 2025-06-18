
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle, ArrowLeft } from "lucide-react";
import { IssueCard } from "./IssueCard";
import { useIssues, useUpdateIssue } from "@/hooks/useIssues";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

interface DraggableIssueBoardProps {
  projectId: string | null;
  projectName?: string;
  onCreateIssue: () => void;
  onBackToProjects?: () => void;
  selectedFilters?: Record<string, string[]>;
}

const columns = [
  { id: 'todo', title: 'To Do', status: 'todo' as const },
  { id: 'inprogress', title: 'In Progress', status: 'inprogress' as const },
  { id: 'done', title: 'Done', status: 'done' as const }
];

export const DraggableIssueBoard = ({ 
  projectId, 
  projectName, 
  onCreateIssue, 
  onBackToProjects,
  selectedFilters = {}
}: DraggableIssueBoardProps) => {
  const { data: allIssues, isLoading, error } = useIssues(projectId);
  const { mutate: updateIssue } = useUpdateIssue();

  const filteredIssues = useMemo(() => {
    if (!allIssues) return [];
    
    return allIssues.filter(issue => {
      // Status filter
      const statusFilters = selectedFilters.status || [];
      if (statusFilters.length > 0 && !statusFilters.includes(issue.status)) {
        return false;
      }

      // Priority filter
      const priorityFilters = selectedFilters.priority || [];
      if (priorityFilters.length > 0 && !priorityFilters.includes(issue.priority)) {
        return false;
      }

      // Type filter
      const typeFilters = selectedFilters.type || [];
      if (typeFilters.length > 0 && !typeFilters.includes(issue.type)) {
        return false;
      }

      return true;
    });
  }, [allIssues, selectedFilters]);

  const getIssuesByStatus = (status: string) => {
    return filteredIssues?.filter(issue => issue.status === status) || [];
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    const newStatus = destination.droppableId as 'todo' | 'inprogress' | 'done';
    
    updateIssue({
      id: draggableId,
      updates: { status: newStatus }
    });
  };

  if (!projectId) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Project Selected</h3>
          <p className="text-gray-600 mb-4">Please select a project to view the issue board</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBackToProjects && (
              <Button variant="outline" size="sm" onClick={onBackToProjects}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
              <p className="text-gray-600 mt-1">{projectName && `Project: ${projectName}`}</p>
            </div>
          </div>
          <Button onClick={onCreateIssue}>
            <Plus className="h-4 w-4 mr-2" />
            New Issue
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600">Error loading issues. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBackToProjects && (
            <Button variant="outline" size="sm" onClick={onBackToProjects}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
            <p className="text-gray-600 mt-1">
              {projectName ? `Project: ${projectName}` : 'Track and manage your issues'}
            </p>
          </div>
        </div>
        <Button onClick={onCreateIssue}>
          <Plus className="h-4 w-4 mr-2" />
          New Issue
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map((column) => {
            const columnIssues = getIssuesByStatus(column.status);
            
            return (
              <Card key={column.id} className="h-fit">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{column.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {isLoading ? '...' : columnIssues.length}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Droppable droppableId={column.status}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-3 min-h-[200px] ${
                          snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg' : ''
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <Skeleton className="h-32" />
                            <Skeleton className="h-24" />
                          </>
                        ) : (
                          <>
                            {columnIssues.map((issue, index) => (
                              <Draggable 
                                key={issue.id} 
                                draggableId={issue.id} 
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`${
                                      snapshot.isDragging ? 'opacity-50 rotate-3' : ''
                                    }`}
                                  >
                                    <IssueCard issue={issue} />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            
                            {columnIssues.length === 0 && (
                              <div className="text-center py-8 text-gray-500">
                                <p className="text-sm">No issues in this column</p>
                              </div>
                            )}
                          </>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};
