
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAnalytics } from '@/hooks/useAnalytics';
import { 
  FolderOpen, 
  Bug, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  Target
} from 'lucide-react';

export const AnalyticsOverview = () => {
  const { data: analytics, isLoading, error } = useAnalytics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Error loading analytics: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analytics) {
    return null;
  }

  const cards = [
    {
      title: "Total Projects",
      value: analytics.totalProjects,
      description: `${analytics.activeProjects} active`,
      icon: FolderOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      title: "Total Issues",
      value: analytics.totalIssues,
      description: `${analytics.openIssues} open, ${analytics.closedIssues} closed`,
      icon: Bug,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950"
    },
    {
      title: "Completion Rate",
      value: `${analytics.completionRate}%`,
      description: "Issues resolved",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      title: "Team Members",
      value: analytics.totalUsers,
      description: `Across ${analytics.totalTeams} teams`,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950"
    }
  ];

  return (
    <div className="space-y-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              High Priority Issues
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.highPriorityIssues}</div>
            <div className="flex items-center mt-2">
              <Badge variant="destructive" className="text-xs">
                Needs Attention
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Issues This Month
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.issuesThisMonth}</div>
            <p className="text-xs text-muted-foreground mt-1">
              New issues created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resolution Trend
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.completionRate >= 70 ? '📈' : analytics.completionRate >= 50 ? '📊' : '📉'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.completionRate >= 70 ? 'Great progress!' : analytics.completionRate >= 50 ? 'Steady progress' : 'Needs improvement'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
