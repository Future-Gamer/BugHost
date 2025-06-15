
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (pw: string) => void;
  isLoading: boolean;
}

export function ChangePasswordDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: ChangePasswordDialogProps) {
  const [pw, setPw] = useState("");
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
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit(pw)} disabled={isLoading || !pw}>
            {isLoading ? "Changing..." : "Change Password"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
