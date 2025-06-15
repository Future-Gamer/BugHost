
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Palette } from "lucide-react";
import { ThemeToggle } from "@/components/settings/ThemeToggle";

interface AppearanceSettingsProps {
  theme: string;
  onThemeChange: (theme: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

export function AppearanceSettings({ theme, onThemeChange, language, onLanguageChange }: AppearanceSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Appearance
        </CardTitle>
        <CardDescription>
          Customize how the application looks and feels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Theme</Label>
            <div className="text-sm text-muted-foreground">
              Choose between light, dark, or system theme
            </div>
          </div>
          <ThemeToggle
            theme={theme}
            onThemeChange={onThemeChange}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Language</Label>
            <div className="text-sm text-muted-foreground">
              Select your preferred language
            </div>
          </div>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
              <SelectItem value="hi">हिन्दी</SelectItem>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="ar">عربي</SelectItem>
              <SelectItem value="ru">Русский</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
