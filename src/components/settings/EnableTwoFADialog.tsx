
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EnableTwoFADialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totpSecret: string | null;
  totpInput: string;
  setTotpInput: (input: string) => void;
  totpVerified: boolean;
  onVerify: () => void;
}

export function EnableTwoFADialog({
  open,
  onOpenChange,
  totpSecret,
  totpInput,
  setTotpInput,
  totpVerified,
  onVerify,
}: EnableTwoFADialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enable 2FA</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          {totpSecret && (
            <>
              <div className="font-mono text-xs mb-2">
                <span>Secret: </span>
                <span className="bg-gray-100 px-2 py-1 rounded">{totpSecret}</span>
              </div>
              <div>
                Enter 6 digit code from your authenticator:
                <input
                  maxLength={6}
                  type="text"
                  className="w-[120px] border rounded p-2 ml-2"
                  value={totpInput}
                  onChange={e => setTotpInput(e.target.value)}
                  disabled={totpVerified}
                />
              </div>
              <Button className="mt-2" onClick={onVerify} disabled={totpInput.length !== 6 || totpVerified}>
                {totpVerified ? "Verified" : "Verify"}
              </Button>
            </>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
