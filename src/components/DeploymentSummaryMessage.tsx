import { motion } from 'motion/react';
import { Card } from './ui/card';
import { CheckCircle2, AlertTriangle, XCircle, Laptop } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface DeploymentSummaryMessageProps {
  onComplete: () => void;
}

export function DeploymentSummaryMessage({ onComplete }: DeploymentSummaryMessageProps) {
  const successfulDevices = [
    'DESK-HR-001',
    'DESK-HR-002',
    'DESK-IT-001',
    'LAPTOP-SALES-003',
    'DESK-FIN-002',
  ];

  const incompatibleDevices = [
    'DESK-LEGACY-001',
    'LAPTOP-OLD-005',
    'DESK-ARCHIVE-003',
  ];

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
            <h3 className="font-semibold mb-1">Deployment Complete</h3>
            <p className="text-sm text-muted-foreground">
              Windows 12 upgrade has been successfully deployed across all compatible devices.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pl-11">
          <div className="rounded-lg bg-green-500/10 p-3 text-center">
            <div className="text-2xl font-semibold text-green-500">{successfulDevices.length}</div>
            <div className="text-xs text-muted-foreground mt-1">Successful</div>
          </div>
          <div className="rounded-lg bg-muted p-3 text-center">
            <div className="text-2xl font-semibold">0</div>
            <div className="text-xs text-muted-foreground mt-1">Failed</div>
          </div>
          <div className="rounded-lg bg-destructive/10 p-3 text-center">
            <div className="text-2xl font-semibold text-destructive">{incompatibleDevices.length}</div>
            <div className="text-xs text-muted-foreground mt-1">Incompatible</div>
          </div>
        </div>

        <div className="space-y-3 pl-11">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <h4 className="text-sm font-medium">Successfully Upgraded</h4>
            </div>
            <div className="space-y-1">
              {successfulDevices.map((device) => (
                <div key={device} className="flex items-center gap-2 text-sm text-muted-foreground pl-6">
                  <Laptop className="h-3 w-3" />
                  {device} — Windows 12 installed, drivers verified
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <h4 className="text-sm font-medium">Still Incompatible</h4>
            </div>
            <div className="space-y-1">
              {incompatibleDevices.map((device) => (
                <div key={device} className="flex items-center gap-2 text-sm text-muted-foreground pl-6">
                  <Laptop className="h-3 w-3" />
                  {device} — Requires hardware upgrade
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Recommended Next Steps</p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Schedule hardware upgrades for incompatible devices</li>
                  <li>Monitor all upgraded devices for 24 hours</li>
                  <li>Provide user training for Windows 12 features</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pl-11">
          <Badge variant="outline" className="border-green-500/50 text-green-500 mb-3">
            Deployment Successful
          </Badge>
        </div>

        <div className="pl-11">
          <Button onClick={onComplete} className="w-full">
            Mark Task as Completed
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
