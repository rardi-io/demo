import { motion } from 'motion/react';
import { Card } from './ui/card';
import { CheckCircle2, Lock, FileCheck } from 'lucide-react';
import { Badge } from './ui/badge';

export function IncidentReviewConfirmationMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4 border-green-500/50">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Incident Marked as Reviewed</h3>
            <p className="text-sm text-muted-foreground">
              The overnight security incident has been acknowledged and stored in Security History.
            </p>
          </div>
        </div>

        <div className="pl-11 space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span>Incident record has been locked and marked as <Badge variant="outline" className="ml-1">Reviewed</Badge></span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <FileCheck className="h-4 w-4 text-muted-foreground" />
            <span>Permanently stored in Security History Log for compliance and audit purposes</span>
          </div>

          <div className="rounded-lg bg-green-500/10 p-4 mt-4">
            <p className="text-sm font-medium text-green-500 mb-1">
              ✓ Security incident documentation complete
            </p>
            <p className="text-xs text-muted-foreground">
              Your network remains secure. All systems operating normally. Rardi continues monitoring 24/7.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
