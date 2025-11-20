import { motion } from 'motion/react';
import { Card } from './ui/card';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from './ui/badge';

export function DiagnosisMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="h-4 w-4 text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Root Cause Identified</h3>
            <p className="text-sm text-muted-foreground">
              Password expired 4 days ago for john.smith@university.edu, preventing email authentication.
            </p>
          </div>
        </div>

        <div className="space-y-3 pl-11">
          <div>
            <h4 className="text-sm font-medium mb-2">Issue Details</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm">Password expired 4 days ago</p>
                  <p className="text-xs text-muted-foreground">Last successful login: 5 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm">Last login attempt failed</p>
                  <p className="text-xs text-muted-foreground">Invalid credentials due to expired password</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">System Status</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <p className="text-sm text-muted-foreground">Directory service is healthy</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <p className="text-sm text-muted-foreground">Email service is healthy</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <p className="text-sm text-muted-foreground">No broader system issues detected</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pl-11">
          <Badge variant="outline" className="border-destructive/50 text-destructive">
            Authentication Blocked
          </Badge>
        </div>
      </Card>
    </motion.div>
  );
}