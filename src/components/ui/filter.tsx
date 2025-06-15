
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Filter, FilterX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  multiple?: boolean;
}

interface FilterComponentProps {
  filterGroups: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearFilters: () => void;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({
  filterGroups,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}) => {
  const totalActiveFilters = Object.values(selectedFilters).reduce(
    (sum, filters) => sum + filters.length,
    0
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filter
          {totalActiveFilters > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {totalActiveFilters}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="p-0">Filters</DropdownMenuLabel>
          {totalActiveFilters > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-auto p-1 text-xs"
            >
              <FilterX className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        
        {filterGroups.map((group, groupIndex) => (
          <div key={group.id}>
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1">
              {group.label}
            </DropdownMenuLabel>
            {group.options.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.id}
                checked={selectedFilters[group.id]?.includes(option.id) || false}
                onCheckedChange={(checked) =>
                  onFilterChange(group.id, option.id, checked)
                }
                className="px-2 py-1.5"
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
            {groupIndex < filterGroups.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
