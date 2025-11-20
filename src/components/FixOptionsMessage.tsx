import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Zap, FileText } from 'lucide-react';

interface FixOptionsMessageProps {
  onAutoFix: () => void;
  onManualSteps: () => void;
}

export function FixOptionsMessage({ onAutoFix, onManualSteps }: FixOptionsMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-1">How would you like to proceed?</h3>
          <p className="text-sm text-muted-foreground">
            I can automatically reset your password or provide manual recovery steps.
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={onAutoFix}
            className="w-full justify-start gap-3 h-auto py-4 bg-[#f97316] hover:bg-[#ea580c] text-white"
          >
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            <div className="text-left flex-1">
              <div className="font-semibold">Automatic Password Reset</div>
              <div className="text-xs opacity-90">
                I'll reset your password and sync it across all services
              </div>
            </div>
          </Button>

          <Button 
            onClick={onManualSteps}
            variant="outline"
            className="w-full justify-start gap-3 h-auto py-4"
          >
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="text-left flex-1">
              <div className="font-semibold">Manual Recovery Steps</div>
              <div className="text-xs text-muted-foreground">
                I'll guide you through the password reset process
              </div>
            </div>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}