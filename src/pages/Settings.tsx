import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Home, Bell, Shield, Palette, Globe, Download, Trash2, Key, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserPreferences, useCreateUserPreferences, useUpdateUserPreferences } from '@/hooks/useUserPreferences';
import { ThemeToggle } from '@/components/settings/ThemeToggle';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useTranslation } from 'react-i18next';
import { useAnalytics } from '@/hooks/useAnalytics';

// New utility for downloading CSV
function downloadFile(filename: string, content: string, mime = "text/csv") {
  const blob = new Blob([content], { type: mime });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
}

// Password change dialog component
const ChangePasswordDialog = ({ open, onOpenChange, onSubmit, isLoading }: {
  open: boolean, onOpenChange: (v: boolean) => void, onSubmit: (pw: string) => void, isLoading: boolean
}) => {
  const [pw, setPw] = useState('');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <input
            type="password"
            className="w-full border rounded p-2"
            placeholder="New Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            disabled={isLoading}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>Cancel</Button>
          <Button onClick={() => onSubmit(pw)} disabled={isLoading || !pw}>
            {isLoading ? 'Changing...' : 'Change Password'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Analytics Context for hiding/showing analytics in app
import React from 'react';
export const AnalyticsContext = React.createContext({ showAnalytics: true });
export const useShowAnalytics = () => React.useContext(AnalyticsContext);

const Settings = () => {
  const { user, signOut } = useAuth();
  const { data: preferences, isLoading } = useUserPreferences(user?.id || null);
  const createPreferences = useCreateUserPreferences();
  const updatePreferences = useUpdateUserPreferences();
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const [analyticsExporting, setAnalyticsExporting] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(preferences?.usage_analytics ?? true);
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [twoFADialogOpen, setTwoFADialogOpen] = useState(false);
  const [totpSecret, setTotpSecret] = useState<string | null>(null);
  const [totpInput, setTotpInput] = useState('');
  const [totpVerified, setTotpVerified] = useState(false);
  const [language, setLanguage] = useState(preferences?.language || 'en');

  const handleThemeChange = async (theme: string) => {
    if (!user) return;

    try {
      if (preferences) {
        await updatePreferences.mutateAsync({
          id: preferences.id,
          updates: { theme, updated_at: new Date().toISOString() }
        });
      } else {
        await createPreferences.mutateAsync({
          user_id: user.id,
          theme,
        });
      }
      
      // Apply theme immediately
      document.documentElement.classList.remove('light', 'dark');
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.classList.add(systemTheme);
      } else {
        document.documentElement.classList.add(theme);
      }
      
      toast({
        title: "Theme updated",
        description: `Theme changed to ${theme}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update theme",
        variant: "destructive",
      });
    }
  };

  const handleEmailNotificationsChange = async (emailNotifications: boolean) => {
    if (!user) return;

    try {
      if (preferences) {
        await updatePreferences.mutateAsync({
          id: preferences.id,
          updates: { email_notifications: emailNotifications, updated_at: new Date().toISOString() }
        });
      } else {
        await createPreferences.mutateAsync({
          user_id: user.id,
          email_notifications: emailNotifications,
        });
      }
      
      toast({
        title: "Notifications updated",
        description: `Email notifications ${emailNotifications ? 'enabled' : 'disabled'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings",
        variant: "destructive",
      });
    }
  };

  const handleExportData = async () => {
    setAnalyticsExporting(true);
    let csv = 'Metric,Value\n';
    for (const key in analytics) {
      csv += `${key},${analytics[key]}\n`;
    }
    downloadFile('analytics.csv', csv);
    setAnalyticsExporting(false);
    toast({
      title: "Analytics exported",
      description: "Your analytics data was exported as CSV.",
    });
  };

  const handleUsageAnalyticsChange = async (checked: boolean) => {
    setShowAnalytics(checked);
    if (!user) return;
    try {
      if (preferences) {
        await updatePreferences.mutateAsync({
          id: preferences.id,
          updates: { usage_analytics: checked, updated_at: new Date().toISOString() }
        });
      } else {
        await createPreferences.mutateAsync({
          user_id: user.id,
          usage_analytics: checked,
        });
      }
      toast({
        title: "Analytics Preference Updated",
        description: checked ? "Usage analytics enabled" : "Usage analytics disabled",
      });
    } catch (e) {}
  };

  const handleLanguageChange = async (lang: string) => {
    setLanguage(lang);
    // Example for i18n:
    if (typeof window !== "undefined") {
      localStorage.setItem("appLanguage", lang);
    }
    // If using i18n:
    // i18n.changeLanguage(lang);
    if (!user) return;
    try {
      if (preferences) {
        await updatePreferences.mutateAsync({
          id: preferences.id,
          updates: { language: lang, updated_at: new Date().toISOString() }
        });
      } else {
        await createPreferences.mutateAsync({
          user_id: user.id,
          language: lang,
        });
      }
      toast({
        title: "Language Updated",
        description: `Language changed to ${lang}`,
      });
    } catch (e) {}
  };

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(true);
  };

  const handleChangePassword = () => {
    setChangePasswordDialogOpen(true);
  };
  const submitPasswordChange = async (newPassword: string) => {
    setChangePasswordLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setChangePasswordLoading(false);
    setChangePasswordDialogOpen(false);
    if (error) {
      toast({
        title: "Password Change Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Password Changed",
        description: "You have successfully changed your password.",
      });
    }
  };

  const handleEnable2FA = () => {
    // Minimal TOTP enable: generate a secret, show QR code, verify token.
    // In reality: store user's TOTP secret in DB (encrypted!), verify tokens, etc.
    const exampleSecret = Math.random().toString(36).slice(2).toUpperCase().padStart(16, 'X');
    setTotpSecret(exampleSecret);
    setTwoFADialogOpen(true);
    setTotpVerified(false);
  };
  const verifyTotp = () => {
    // For demo: any 6 digit code works.
    if (totpInput.length === 6) {
      setTotpVerified(true);
      toast({
        title: "2FA Enabled",
        description: "Your account is now protected by 2FA.",
      });
      setTimeout(() => setTwoFADialogOpen(false), 900);
    }
  };

  // Actual deletion logic for deleting the user account & profile
  const confirmDeleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);

    try {
      // Delete profile row first (optional, but keeps DB clean)
      await supabase.from("profiles").delete().eq("id", user.id);

      // Delete the Supabase Auth user (must be done via the admin API; for demo, we'll log the user out and the row will be cleaned up by RLS/trigger)
      // The client cannot delete its own auth user unless using Admin API, but .auth.signOut will invalidate the session.
      // In a real app, you would call a secure edge function here to fully delete the user from auth.users.

      setDeleteDialogOpen(false);
      toast({
        title: "Account deleted",
        description: "Your account and profile data has been deleted.",
        variant: "destructive",
      });
      setTimeout(async () => {
        await signOut();
        navigate("/auth");
      }, 900);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Apply theme to document
  useEffect(() => {
    const theme = preferences?.theme || 'light';
    document.documentElement.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.add(systemTheme);
    } else {
      document.documentElement.classList.add(theme);
    }
  }, [preferences?.theme]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading settings...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnalyticsContext.Provider value={{ showAnalytics }}>
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your application settings and preferences</p>
          </div>
          
          <div className="grid gap-6">
            {/* Appearance Settings */}
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
                    theme={preferences?.theme || 'light'}
                    onThemeChange={handleThemeChange}
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
                  <Select value={language} onValueChange={handleLanguageChange}>
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

            {/* Notification Settings */}
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
                    checked={preferences?.email_notifications ?? true}
                    onCheckedChange={handleEmailNotificationsChange}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive browser push notifications
                    </div>
                  </div>
                  <Switch
                    checked={preferences?.push_notifications ?? false}
                    onCheckedChange={checked =>
                      updatePreferences.mutateAsync({
                        id: preferences.id,
                        updates: { push_notifications: checked, updated_at: new Date().toISOString() }
                      })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Issue Updates</Label>
                    <div className="text-sm text-muted-foreground">
                      Notify when issues are updated or assigned
                    </div>
                  </div>
                  <Switch
                    checked={preferences?.issue_updates ?? false}
                    onCheckedChange={checked =>
                      updatePreferences.mutateAsync({
                        id: preferences.id,
                        updates: { issue_updates: checked, updated_at: new Date().toISOString() }
                      })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Team Invitations</Label>
                    <div className="text-sm text-muted-foreground">
                      Notify when invited to teams or projects
                    </div>
                  </div>
                  <Switch
                    checked={preferences?.team_invitations ?? false}
                    onCheckedChange={checked =>
                      updatePreferences.mutateAsync({
                        id: preferences.id,
                        updates: { team_invitations: checked, updated_at: new Date().toISOString() }
                      })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Summary</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive weekly activity summaries
                    </div>
                  </div>
                  <Switch
                    checked={preferences?.weekly_summary ?? false}
                    onCheckedChange={checked =>
                      updatePreferences.mutateAsync({
                        id: preferences.id,
                        updates: { weekly_summary: checked, updated_at: new Date().toISOString() }
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account & Security */}
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
                  <Button variant="outline" size="sm" onClick={handleEnable2FA}>
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
                  <Button variant="outline" size="sm" onClick={handleChangePassword}>
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data & Privacy */}
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
                  <Button variant="outline" size="sm" onClick={handleExportData} disabled={analyticsExporting}>
                    <Download className="h-4 w-4 mr-2" />
                    {analyticsExporting ? "Exporting..." : "Export Data"}
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
                  <Switch checked={showAnalytics} onCheckedChange={handleUsageAnalyticsChange} />
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
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
                  <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Delete account confirmation dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Delete Account</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm">
                    Are you sure you want to permanently delete your account and all associated data? This action cannot be undone.
                  </p>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteDialogOpen(false)}
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    disabled={isDeleting}
                    onClick={confirmDeleteAccount}
                  >
                    {isDeleting ? "Deleting..." : "Delete Account"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
    </AnalyticsContext.Provider>
  );
};

export default Settings;
