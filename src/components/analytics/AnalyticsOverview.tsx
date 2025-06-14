
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Bug, 
  CheckCircle, 
  Clock, 
  FolderOpen, 
  Users, 
  TrendingUp,
  AlertTriangle 
} from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

export const AnalyticsOverview = () => {
  const { data: analytics, isLoading, error } = useAnalytics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-8 bg-muted rounded mb-2"></div>
              <div className="h-6 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Unable to load analytics data
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projects</p>
                <p className="text-2xl font-bold">{analytics.totalProjects}</p>
                <p className="text-xs text-muted-foreground">
                  {analytics.activeProjects} active
                </p>
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
                <p className="text-2xl font-bold">{analytics.totalIssues}</p>
                <p className="text-xs text-muted-foreground">
                  {analytics.openIssues} open
                </p>
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
                <p className="text-2xl font-bold">{analytics.totalTeams}</p>
                <p className="text-xs text-muted-foreground">
                  Active memberships
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion</p>
                <p className="text-2xl font-bold">{analytics.completionRate}%</p>
                <p className="text-xs text-muted-foreground">
                  {analytics.resolvedIssues} resolved
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issue Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Issues by Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Issues by Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">To Do</span>
              <Badge variant="outline">{analytics.issuesByStatus.todo}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">In Progress</span>
              <Badge variant="default">{analytics.issuesByStatus.in_progress}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Review</span>
              <Badge variant="secondary">{analytics.issuesByStatus.review}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Done</span>
              <Badge className="bg-green-500 hover:bg-green-600">{analytics.issuesByStatus.done}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Issues by Priority */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Issues by Priority
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Low</span>
              <Badge variant="outline">{analytics.issuesByPriority.low}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Medium</span>
              <Badge variant="secondary">{analytics.issuesByPriority.medium}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">High</span>
              <Badge variant="destructive">{analytics.issuesByPriority.high}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Urgent</span>
              <Badge className="bg-red-600 hover:bg-red-700">{analytics.issuesByPriority.urgent}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Issues by Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Issues by Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Bug</span>
              <Badge variant="destructive">{analytics.issuesByType.bug}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Feature</span>
              <Badge className="bg-blue-500 hover:bg-blue-600">{analytics.issuesByType.feature}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Task</span>
              <Badge variant="outline">{analytics.issuesByType.task}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Story</span>
              <Badge className="bg-green-500 hover:bg-green-600">{analytics.issuesByType.story}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Activity from the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{analytics.recentIssues}</div>
              <div className="text-sm text-muted-foreground">New Issues</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
