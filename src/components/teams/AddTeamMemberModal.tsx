
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddTeamMember } from '@/hooks/useTeamMembers';
import { UserPlus } from 'lucide-react';

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
}

export const AddTeamMemberModal = ({ isOpen, onClose, teamId }: AddTeamMemberModalProps) => {
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState('');

  const { mutate: addTeamMember, isPending } = useAddTeamMember();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !memberEmail.trim() || !memberRole.trim()) return;

    // For now, we'll create a team member record with the provided information
    // In a real application, you might want to create a user account first or handle existing users
    addTeamMember({
      team_id: teamId,
      user_id: null, // We'll handle this differently since we're not selecting from existing users
      role: memberRole as 'admin' | 'manager' | 'developer' | 'tester',
      status: 'pending', // Set as pending since this is a new invitation
      member_name: memberName,
      member_email: memberEmail,
    }, {
      onSuccess: () => {
        onClose();
        setMemberName('');
        setMemberEmail('');
        setMemberRole('');
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add Team Member
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter full name"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              type="text"
              placeholder="Enter role (e.g., developer, manager, admin, tester)"
              value={memberRole}
              onChange={(e) => setMemberRole(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!memberName.trim() || !memberEmail.trim() || !memberRole.trim() || isPending}
            >
              {isPending ? 'Adding...' : 'Add Member'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
