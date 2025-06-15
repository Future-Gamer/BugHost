
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Key } from "lucide-react";

interface AccountSecuritySettingsProps {
  onEnable2FA: () => void;
  onChangePassword: () => void;
}

export function AccountSecuritySettings({
  onEnable2FA,
  onChangePassword,
}: AccountSecuritySettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Account & Security
        </CardTitle>
        <CardDescription>
          Manage your account security and privacy settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Two-Factor Authentication</Label>
            <div className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onEnable2FA}>
            <Key className="h-4 w-4 mr-2" />
            Enable 2FA
          </Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Password</Label>
            <div className="text-sm text-muted-foreground">
              Change your account password
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onChangePassword}>
            Change Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
