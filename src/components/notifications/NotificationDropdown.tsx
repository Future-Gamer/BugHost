
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from '@/hooks/useNotifications';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export const NotificationDropdown = () => {
  const { user } = useAuth();
  const { data: notifications = [] } = useNotifications(user?.id || null);
  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead.mutate(notificationId);
  };

  const handleMarkAllAsRead = () => {
    if (user?.id) {
      markAllAsRead.mutate(user.id);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'project':
        return '📁';
      case 'issue':
        return '🐛';
      case 'team':
        return '👥';
      case 'team_member':
        return '👤';
      default:
        return '📋';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="flex items-center justify-between px-3 py-2">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-auto p-1 text-xs"
            >
              <CheckCheck className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <DropdownMenuItem disabled className="text-center py-4">
              No notifications yet
            </DropdownMenuItem>
          ) : (
            notifications.slice(0, 10).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex flex-col items-start p-3 cursor-pointer hover:bg-gray-50",
                  !notification.read && "bg-blue-50 border-l-2 border-l-blue-500"
                )}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                    <span className="font-medium text-sm">{notification.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(notification.id);
                      }}
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                  {notification.message}
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(notification.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>

        {notifications.length > 10 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-blue-600 cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
