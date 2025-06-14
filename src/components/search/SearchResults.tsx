
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Users, Folder, Bug } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'issue' | 'project' | 'team' | 'profile';
  priority?: string;
  status?: string;
  projectName?: string;
}

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
  onClose: () => void;
}

export const SearchResults = ({ query, results, onClose }: SearchResultsProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'issue':
        return <Bug className="h-4 w-4 text-red-500" />;
      case 'project':
        return <Folder className="h-4 w-4 text-blue-500" />;
      case 'team':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'profile':
        return <FileText className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">
            Search results for "{query}"
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="p-2">
        {results.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>No results found for "{query}"</p>
            <p className="text-xs mt-1">Try searching for issues, projects, or teams</p>
          </div>
        ) : (
          <div className="space-y-1">
            {results.map((result) => (
              <div
                key={result.id}
                className="p-3 rounded-md hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200"
              >
                <div className="flex items-start space-x-3">
                  {getIcon(result.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {result.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(result.type)}
                      </Badge>
                      {result.priority && (
                        <Badge
                          variant={result.priority === 'high' || result.priority === 'urgent' ? 'destructive' : 'secondary'}
                          className="text-xs capitalize"
                        >
                          {result.priority}
                        </Badge>
                      )}
                      {result.status && (
                        <Badge variant="outline" className="text-xs capitalize">
                          {result.status.replace('inprogress', 'in progress')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {result.description}
                    </p>
                    {result.projectName && (
                      <p className="text-xs text-gray-500 mt-1">
                        Project: {result.projectName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
