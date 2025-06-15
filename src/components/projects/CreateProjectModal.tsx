
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProject } from "@/hooks/useProjects";
import { useProfile } from "@/hooks/useProfiles";
import { useToast } from "@/components/ui/use-toast";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal = ({ isOpen, onClose }: CreateProjectModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  
  const createProject = useCreateProject();
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { toast } = useToast();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!formData.name.trim()) {
      setErrorMsg("Project name is required.");
      return;
    }
    if (!profile?.id) {
      setErrorMsg("Your user profile is not loaded. Please refresh and try again.");
      return;
    }
    try {
      console.log("Creating project", {
        name: formData.name,
        description: formData.description,
        created_by: profile.id
      });
      await createProject.mutateAsync({
        name: formData.name,
        description: formData.description || null,
      });
      setFormData({ name: '', description: '' });
      onClose();
    } catch (error: any) {
      setErrorMsg(error?.message || 'Error creating project. Check console for details.');
      toast({
        title: "Project creation failed",
        description: error?.message ?? "Unknown error occurred",
        variant: "destructive"
      });
      console.error("Project creation failed:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="Enter project name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              disabled={createProject.isPending || isProfileLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter project description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              disabled={createProject.isPending || isProfileLoading}
            />
          </div>

          {errorMsg && (
            <div className="text-sm text-red-600 font-semibold">{errorMsg}</div>
          )}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={createProject.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                createProject.isPending ||
                !formData.name.trim() ||
                !profile?.id ||
                isProfileLoading
              }
            >
              {createProject.isPending ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
