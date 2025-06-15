
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface DataPrivacySettingsProps {
  onExportData: () => void;
  exporting: boolean;
  showAnalytics: boolean;
  onAnalyticsChange: (enabled: boolean) => void;
}

export function DataPrivacySettings({
  onExportData,
  exporting,
  showAnalytics,
  onAnalyticsChange,
}: DataPrivacySettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Data & Privacy
        </CardTitle>
        <CardDescription>
          Control your data and privacy preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Data Export</Label>
            <div className="text-sm text-muted-foreground">
              Download a copy of analytical data
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onExportData} disabled={exporting}>
            <Download className="h-4 w-4 mr-2" />
            {exporting ? "Exporting..." : "Export Data"}
          </Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Usage Analytics</Label>
            <div className="text-sm text-muted-foreground">
              Help improve our service with anonymous usage data
            </div>
          </div>
          <Switch checked={showAnalytics} onCheckedChange={onAnalyticsChange} />
        </div>
      </CardContent>
    </Card>
  );
}
