
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DangerZoneSettingsProps {
  onDeleteAccount: () => void;
}

export function DangerZoneSettings({ onDeleteAccount }: DangerZoneSettingsProps) {
  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <Trash2 className="h-5 w-5" />
          Danger Zone
        </CardTitle>
        <CardDescription>
          Irreversible and destructive actions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/5">
          <div className="space-y-0.5">
            <Label className="text-base">Delete Account</Label>
            <div className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data
            </div>
          </div>
          <Button variant="destructive" size="sm" onClick={onDeleteAccount}>
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
