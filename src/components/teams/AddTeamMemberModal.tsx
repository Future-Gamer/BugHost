
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useProfiles } from '@/hooks/useProfiles';
import { useAddTeamMember } from '@/hooks/useTeamMembers';
import { UserPlus } from 'lucide-react';

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
}

export const AddTeamMemberModal = ({ isOpen, onClose, teamId }: AddTeamMemberModalProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'manager' | 'developer' | 'tester'>('developer');

  const { data: profiles = [], isLoading: profilesLoading } = useProfiles();
  const { mutate: addTeamMember, isPending } = useAddTeamMember();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) return;

    addTeamMember({
      team_id: teamId,
      user_id: selectedUserId,
      role: selectedRole,
      status: 'active',
    }, {
      onSuccess: () => {
        onClose();
        setSelectedUserId('');
        setSelectedRole('developer');
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user">Select User</Label>
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a user to add" />
              </SelectTrigger>
              <SelectContent>
                {profilesLoading ? (
                  <SelectItem value="" disabled>Loading users...</SelectItem>
                ) : (
                  profiles.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>
                      {profile.first_name && profile.last_name 
                        ? `${profile.first_name} ${profile.last_name}` 
                        : profile.email}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={selectedRole} onValueChange={(value: 'admin' | 'manager' | 'developer' | 'tester') => setSelectedRole(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="tester">Tester</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedUserId || isPending}>
              {isPending ? 'Adding...' : 'Add Member'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
