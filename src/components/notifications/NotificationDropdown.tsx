
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
import { Bell } from 'lucide-react';
import { useNotifications, useMarkNotificationAsRead } from '@/hooks/useNotifications';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export const NotificationDropdown = () => {
  const { user } = useAuth();
  const { data: notifications = [] } = useNotifications(user?.id || null);
  const markAsRead = useMarkNotificationAsRead();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead.mutate(notificationId);
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
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <DropdownMenuItem disabled>
            No notifications
          </DropdownMenuItem>
        ) : (
          notifications.slice(0, 5).map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={cn(
                "flex flex-col items-start p-3 cursor-pointer",
                !notification.read && "bg-blue-50"
              )}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-medium text-sm">{notification.title}</span>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">
                {notification.message}
              </p>
              <span className="text-xs text-gray-400 mt-1">
                {new Date(notification.created_at).toLocaleDateString()}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
