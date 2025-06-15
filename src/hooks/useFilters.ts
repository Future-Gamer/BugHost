
import { useState, useCallback, useMemo } from 'react';
import type { FilterGroup } from '@/components/ui/filter';

export const useFilters = (filterGroups: FilterGroup[]) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = useCallback((groupId: string, optionId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const groupFilters = prev[groupId] || [];
      
      if (checked) {
        return {
          ...prev,
          [groupId]: [...groupFilters, optionId]
        };
      } else {
        return {
          ...prev,
          [groupId]: groupFilters.filter(id => id !== optionId)
        };
      }
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedFilters({});
  }, []);

  const hasActiveFilters = useMemo(() => {
    return Object.values(selectedFilters).some(filters => filters.length > 0);
  }, [selectedFilters]);

  const getFilteredData = useCallback(<T extends Record<string, any>>(
    data: T[],
    filterFn: (item: T, filters: Record<string, string[]>) => boolean
  ): T[] => {
    if (!hasActiveFilters) return data;
    return data.filter(item => filterFn(item, selectedFilters));
  }, [selectedFilters, hasActiveFilters]);

  return {
    selectedFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    getFilteredData
  };
};
