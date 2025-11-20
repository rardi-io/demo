import { motion } from 'motion/react';
import { Card } from './ui/card';
import { FileText, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface IncidentReviewMessageProps {
  onMarkReviewed: () => void;
}

export function IncidentReviewMessage({ onMarkReviewed }: IncidentReviewMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Incident Summary</h3>
            <p className="text-sm text-muted-foreground">
              Complete overview of overnight security incident
            </p>
          </div>
        </div>

        <div className="pl-11 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">Timeline</h4>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>Detected: 2:47:00 AM</div>
                <div>Contained: 2:47:12 AM</div>
                <div>Validated: 2:48:30 AM</div>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">Impact Assessment</h4>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>Data Loss: None</div>
                <div>Downtime: 0 seconds</div>
                <div>Systems Affected: 0</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <h4 className="text-sm font-medium">Key Findings</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Threat detected early through behavioral baseline monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Autonomous containment prevented any system compromise</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                <span>No credentials were stolen or data exfiltrated</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Network restored to secure baseline state</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                <span>All validation checks passed successfully</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border p-3">
            <h4 className="text-sm font-medium mb-2">Recommendations</h4>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Monitor VPN gateway logs for 48 hours</li>
              <li>Consider implementing geo-blocking for Eastern Europe region</li>
              <li>Review and strengthen VPN authentication requirements</li>
              <li>Schedule security awareness training for all staff</li>
            </ul>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted p-3 text-center">
              <div className="text-sm font-medium text-[#f97316]">Medium</div>
              <div className="text-xs text-muted-foreground mt-1">Severity</div>
            </div>
            <div className="rounded-lg bg-green-500/10 p-3 text-center">
              <div className="text-sm font-medium text-green-500">Resolved</div>
              <div className="text-xs text-muted-foreground mt-1">Status</div>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <div className="text-sm font-medium">Overnight</div>
              <div className="text-xs text-muted-foreground mt-1">Response</div>
            </div>
          </div>
        </div>

        <div className="pl-11 pt-2">
          <Button onClick={onMarkReviewed} className="w-full">
            Mark Incident as Reviewed
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
