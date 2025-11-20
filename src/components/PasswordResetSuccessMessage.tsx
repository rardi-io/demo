import { motion } from 'motion/react';
import { Card } from './ui/card';
import { CheckCircle2, Mail, Key } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface PasswordResetSuccessMessageProps {
  onResolveIssue: () => void;
}

export function PasswordResetSuccessMessage({ onResolveIssue }: PasswordResetSuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Password Reset Successful</h3>
            <p className="text-sm text-muted-foreground">
              Your email access has been fully restored.
            </p>
          </div>
        </div>

        <div className="space-y-3 pl-11">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <p className="text-sm">Password reset successfully</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <p className="text-sm">Email access restored</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <p className="text-sm">Directory sync completed</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <p className="text-sm">Temporary access code delivered</p>
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Check your backup email</p>
                <p className="text-xs text-muted-foreground mt-1">
                  A temporary login code has been sent to j.smith.backup@university.edu
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Key className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Next steps</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use the temporary code to sign in, then you'll be prompted to set a new permanent password
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pl-11">
          <Badge variant="outline" className="border-green-500/50 text-green-500">
            Issue Resolved
          </Badge>
        </div>

        <div className="pl-11 pt-2">
          <Button onClick={onResolveIssue} className="w-full">
            Mark Issue as Resolved
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}