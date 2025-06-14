
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Status = 'todo' | 'inprogress' | 'done';

interface StatusDropdownProps {
  status: Status;
  onStatusChange: (status: Status) => void;
}

const statusLabels = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done'
};

const statusColors = {
  todo: 'secondary',
  inprogress: 'default',
  done: 'outline'
} as const;

export const StatusDropdown = ({ status, onStatusChange }: StatusDropdownProps) => {
  return (
    <Select value={status} onValueChange={onStatusChange}>
      <SelectTrigger className="w-auto">
        <SelectValue>
          <Badge variant={statusColors[status]} className="text-xs">
            {statusLabels[status]}
          </Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todo">
          <Badge variant={statusColors.todo} className="text-xs">
            To Do
          </Badge>
        </SelectItem>
        <SelectItem value="inprogress">
          <Badge variant={statusColors.inprogress} className="text-xs">
            In Progress
          </Badge>
        </SelectItem>
        <SelectItem value="done">
          <Badge variant={statusColors.done} className="text-xs">
            Done
          </Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
