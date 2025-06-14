
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onThemeChange }) => {
  const isDark = theme === 'dark';

  const handleToggle = (checked: boolean) => {
    onThemeChange(checked ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4" />
        <Label htmlFor="theme-toggle" className="text-sm font-medium">
          Light
        </Label>
      </div>
      <Switch
        id="theme-toggle"
        checked={isDark}
        onCheckedChange={handleToggle}
      />
      <div className="flex items-center space-x-2">
        <Moon className="h-4 w-4" />
        <Label htmlFor="theme-toggle" className="text-sm font-medium">
          Dark
        </Label>
      </div>
    </div>
  );
};
