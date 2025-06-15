import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import Introduction from "./pages/Introduction";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Teams from "./pages/Teams";
import TeamMembers from "./pages/TeamMembers";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Introduction />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <AppLayout>
                      <Index />
                    </AppLayout>
                  </SidebarProvider>
                </ProtectedRoute>
              } />
              <Route path="/projects" element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <AppLayout>
                      <Projects />
                    </AppLayout>
                  </SidebarProvider>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <AppLayout>
                      <Profile />
                    </AppLayout>
                  </SidebarProvider>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <AppLayout>
                      <Settings />
                    </AppLayout>
                  </SidebarProvider>
                </ProtectedRoute>
              } />
              <Route path="/teams" element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <AppLayout>
                      <Teams />
                    </AppLayout>
                  </SidebarProvider>
                </ProtectedRoute>
              } />
              <Route path="/teams/:teamId/members" element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <AppLayout>
                      <TeamMembers />
                    </AppLayout>
                  </SidebarProvider>
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
