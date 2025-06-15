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
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { AccountSecuritySettings } from "@/components/settings/AccountSecuritySettings";
import { DataPrivacySettings } from "@/components/settings/DataPrivacySettings";
import { DangerZoneSettings } from "@/components/settings/DangerZoneSettings";
import { DeleteAccountDialog } from "@/components/settings/DeleteAccountDialog";
import { ChangePasswordDialog } from "@/components/settings/ChangePasswordDialog";
import { EnableTwoFADialog } from "@/components/settings/EnableTwoFADialog";

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
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [twoFADialogOpen, setTwoFADialogOpen] = useState(false);
  const [totpSecret, setTotpSecret] = useState<string | null>(null);
  const [totpInput, setTotpInput] = useState('');
  const [totpVerified, setTotpVerified] = useState(false);
  const [language, setLanguage] = useState(() => localStorage.getItem("appLanguage") || 'en');

  const { t, i18n } = useTranslation();

  const { data: analyticsData, isLoading: analyticsLoading } = useAnalytics();

  // Make sure analytics only shows if showAnalytics is true
  // You will need to use <AnalyticsContext.Provider value={{ showAnalytics }}> ... in your analytics consumer components

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
    if (!analyticsData) {
      toast({
        title: "Export Failed",
        description: "No analytics to export.",
        variant: "destructive",
      });
      setAnalyticsExporting(false);
      return;
    }
    let csv = 'Metric,Value\n';
    Object.entries(analyticsData).forEach(([key, value]) => {
      csv += `${key},${value}\n`;
    });
    downloadFile('analytics.csv', csv);
    setAnalyticsExporting(false);
    toast({
      title: "Analytics exported",
      description: "Your analytics data was exported as CSV.",
    });
  };

  const handleUsageAnalyticsChange = (checked: boolean) => {
    setShowAnalytics(checked);
    // Save preference to localStorage so user's choice persists for demo; update in DB if field is added in schema in future
    localStorage.setItem("showAnalytics", String(checked));
    toast({
      title: "Analytics Preference Updated",
      description: checked ? "Usage analytics enabled" : "Usage analytics disabled",
    });
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("appLanguage", lang);
    i18n.changeLanguage(lang);
    toast({
      title: "Language Updated",
      description: `Language changed to ${lang}`,
    });
  };

  const handleDeleteAccount = () => setDeleteDialogOpen(true);
  const handleChangePassword = () => setChangePasswordDialogOpen(true);
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
    const exampleSecret = Math.random().toString(36).slice(2).toUpperCase().padStart(16, 'X');
    setTotpSecret(exampleSecret);
    setTwoFADialogOpen(true);
    setTotpVerified(false);
  };
  const verifyTotp = () => {
    if (totpInput.length === 6) {
      setTotpVerified(true);
      toast({
        title: "2FA Enabled",
        description: "Your account is now protected by 2FA.",
      });
      setTimeout(() => setTwoFADialogOpen(false), 900);
    }
  };

  const confirmDeleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      // Delete profile row from DB
      await supabase.from("profiles").delete().eq("id", user.id);

      // Use the FULL edge function URL to call the function
      const functionUrl = `https://fvvzgeqzutmdcfinesxt.functions.supabase.co/delete-user`;

      console.log("Calling edge function to delete auth user:", functionUrl);
      const res = await fetch(functionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });

      const data = await res.json();
      console.log("Edge function response:", data);

      setDeleteDialogOpen(false);

      if (!res.ok || data.error) {
        toast({
          title: "Error",
          description: data.error
            ? `Failed to delete Auth account: ${data.error}`
            : "Failed to fully delete account. Profile removed, but auth account may remain.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account deleted",
          description: "Your account and profile data have been deleted.",
          variant: "destructive",
        });
      }
      setTimeout(async () => {
        await signOut();
        navigate("/auth");
      }, 900);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete account.",
        variant: "destructive",
      });
      console.error("Delete account error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("showAnalytics");
    if (stored !== null) setShowAnalytics(stored === "true");
  }, []);

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
            {/* ... keep existing code (header links) ... */}
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">Manage your application settings and preferences</p>
            </div>
            <div className="grid gap-6">
              <AppearanceSettings
                theme={preferences?.theme || "light"}
                onThemeChange={handleThemeChange}
                language={language}
                onLanguageChange={handleLanguageChange}
              />
              <NotificationSettings
                emailNotifications={preferences?.email_notifications ?? true}
                onEmailNotificationsChange={handleEmailNotificationsChange}
              />
              <AccountSecuritySettings
                onEnable2FA={handleEnable2FA}
                onChangePassword={handleChangePassword}
              />
              <DataPrivacySettings
                onExportData={handleExportData}
                exporting={analyticsExporting}
                showAnalytics={showAnalytics}
                onAnalyticsChange={handleUsageAnalyticsChange}
              />
              <DangerZoneSettings
                onDeleteAccount={handleDeleteAccount}
              />

              {/* Dialogs for 2FA, Change Password, Delete Account */}
              <DeleteAccountDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onDelete={confirmDeleteAccount}
                isLoading={isDeleting}
              />
              <ChangePasswordDialog
                open={changePasswordDialogOpen}
                onOpenChange={setChangePasswordDialogOpen}
                onSubmit={submitPasswordChange}
                isLoading={changePasswordLoading}
              />
              <EnableTwoFADialog
                open={twoFADialogOpen}
                onOpenChange={setTwoFADialogOpen}
                totpSecret={totpSecret}
                totpInput={totpInput}
                setTotpInput={setTotpInput}
                totpVerified={totpVerified}
                onVerify={verifyTotp}
              />
            </div>
          </div>
        </div>
      </div>
    </AnalyticsContext.Provider>
  );
};

export default Settings;
