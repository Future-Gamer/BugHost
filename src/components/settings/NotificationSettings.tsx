
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

interface NotificationSettingsProps {
  emailNotifications: boolean;
  onEmailNotificationsChange: (enabled: boolean) => void;
}

export function NotificationSettings({
  emailNotifications,
  onEmailNotificationsChange,
}: NotificationSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
        <CardDescription>
          Configure how you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Email Notifications</Label>
            <div className="text-sm text-muted-foreground">
              Receive notifications via email
            </div>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={onEmailNotificationsChange}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-muted-foreground">Push Notifications</Label>
            <div className="text-xs text-muted-foreground">Not enabled in this workspace</div>
          </div>
          <Switch checked={false} disabled />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-muted-foreground">Issue Updates</Label>
            <div className="text-xs text-muted-foreground">Not enabled in this workspace</div>
          </div>
          <Switch checked={false} disabled />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-muted-foreground">Team Invitations</Label>
            <div className="text-xs text-muted-foreground">Not enabled in this workspace</div>
          </div>
          <Switch checked={false} disabled />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-muted-foreground">Weekly Summary</Label>
            <div className="text-xs text-muted-foreground">Not enabled in this workspace</div>
          </div>
          <Switch checked={false} disabled />
        </div>
      </CardContent>
    </Card>
  );
}
