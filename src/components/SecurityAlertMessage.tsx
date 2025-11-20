import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Shield, AlertTriangle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface SecurityAlertMessageProps {
  onViewDetails: () => void;
}

export function SecurityAlertMessage({ onViewDetails }: SecurityAlertMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4 border-[#f97316]">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-[#f97316]/10 flex items-center justify-center flex-shrink-0">
            <Shield className="h-5 w-5 text-[#f97316]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">Security Incident Detected & Resolved</h3>
              <Badge variant="outline" className="border-[#f97316]/50 text-[#f97316]">
                Overnight
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              While you were away, a malicious intrusion attempt occurred. The threat was detected, contained, and eliminated automatically. No systems were compromised.
            </p>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="rounded-lg bg-muted p-3">
                <div className="text-xs text-muted-foreground mb-1">Detection Time</div>
                <div className="text-sm font-medium">2:47 AM</div>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="text-xs text-muted-foreground mb-1">Response Time</div>
                <div className="text-sm font-medium">0.3 seconds</div>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="text-xs text-muted-foreground mb-1">Status</div>
                <div className="text-sm font-medium text-green-500">Contained</div>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-green-500/10 p-3 mb-4">
              <AlertTriangle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-green-500 mb-1">Autonomous Containment Successful</p>
                <p className="text-muted-foreground text-xs">
                  Threat neutralized with zero data loss, zero downtime, and no human intervention required.
                </p>
              </div>
            </div>

            <Button onClick={onViewDetails} className="w-full">
              View Detailed Incident Report
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
