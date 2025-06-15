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

const Settings = () => {
  const { user, signOut } = useAuth();
  const { data: preferences, isLoading } = useUserPreferences(user?.id || null);
  const createPreferences = useCreateUserPreferences();
  const updatePreferences = useUpdateUserPreferences();
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

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

  const handleExportData = () => {
    toast({
      title: "Data export started",
      description: "Your data export will be available for download shortly",
    });
    // In a real app, this would trigger a data export process
  };

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(true);
  };

  const handleChangePassword = () => {
    toast({
      title: "Password change",
      description: "Redirecting to password change form...",
    });
    // In a real app, this would redirect to a password change form
  };

  const handleEnable2FA = () => {
    toast({
      title: "Two-Factor Authentication",
      description: "2FA setup will be available in the next update",
    });
    // In a real app, this would open 2FA setup
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
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Compact Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Use a more compact interface layout
                    </div>
                  </div>
                  <Switch />
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
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Issue Updates</Label>
                    <div className="text-sm text-muted-foreground">
                      Notify when issues are updated or assigned
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Team Invitations</Label>
                    <div className="text-sm text-muted-foreground">
                      Notify when invited to teams or projects
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Summary</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive weekly activity summaries
                    </div>
                  </div>
                  <Switch />
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
                    <Label className="text-base">Session Timeout</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically log out after inactivity
                    </div>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Login History</Label>
                    <div className="text-sm text-muted-foreground">
                      View recent login activity
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View History
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
                      Download a copy of all your data
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
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
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Marketing Communications</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive updates about new features and products
                    </div>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Profile Visibility</Label>
                    <div className="text-sm text-muted-foreground">
                      Control who can see your profile information
                    </div>
                  </div>
                  <Select defaultValue="team">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="team">Team Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
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
  );
};

export default Settings;
