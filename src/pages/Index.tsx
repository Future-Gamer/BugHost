
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowRight, Bug, Users, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIssues } from '@/hooks/useIssues';
import { useTeams } from '@/hooks/useTeams';
import { useProjects } from '@/hooks/useProjects';

const Index = () => {
  const { data: issues = [] } = useIssues();
  const { data: teams = [] } = useTeams();
  const { data: projects = [] } = useProjects();

  const recentIssues = issues.slice(0, 5);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/projects">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Projects</p>
                  <p className="text-2xl font-bold">{projects.length}</p>
                </div>
                <FolderOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Issues</p>
                  <p className="text-2xl font-bold">{issues.length}</p>
                </div>
                <Bug className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Teams</p>
                  <p className="text-2xl font-bold">{teams.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/projects" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FolderOpen className="h-4 w-4" />
                  View All Projects
                </Button>
              </Link>
              <Link to="/teams" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Manage Teams
                </Button>
              </Link>
              <Link to="/profile" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Bug className="h-4 w-4" />
                  View Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Issues */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Issues</CardTitle>
                  <CardDescription>
                    Latest issues across all projects
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/projects" className="gap-2">
                    View all
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentIssues.length === 0 ? (
                <div className="text-center py-8">
                  <Bug className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No issues found</p>
                  <p className="text-sm text-muted-foreground">
                    Create a project to start tracking issues
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentIssues.map((issue) => (
                    <div key={issue.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{issue.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={
                            issue.priority === 'urgent' ? 'destructive' :
                            issue.priority === 'high' ? 'destructive' :
                            issue.priority === 'medium' ? 'default' : 'secondary'
                          }>
                            {issue.priority}
                          </Badge>
                          <Badge variant="outline">
                            {issue.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {issue.reporter}
                          </span>
                        </div>
                      </div>
                      <Badge variant={
                        issue.status === 'done' ? 'default' :
                        issue.status === 'inprogress' ? 'secondary' : 'outline'
                      }>
                        {issue.status === 'inprogress' ? 'in progress' : issue.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
