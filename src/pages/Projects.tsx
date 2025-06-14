
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { ProjectList } from '@/components/projects/ProjectList';

const Projects = () => {
  const handleSelectProject = (projectId: string, projectName: string) => {
    // For now, just log the selection. This could navigate to a project detail page
    console.log('Selected project:', { projectId, projectName });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
        <ProjectList onSelectProject={handleSelectProject} />
      </div>
    </div>
  );
};

export default Projects;
