import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PasswordResetMessageProps {
  onComplete: () => void;
}

interface ResetStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'complete';
}

export function PasswordResetMessage({ onComplete }: PasswordResetMessageProps) {
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<ResetStep[]>([
    { id: '1', label: 'Confirming staff identity', status: 'pending' },
    { id: '2', label: 'Resetting password', status: 'pending' },
    { id: '3', label: 'Syncing credentials with email system', status: 'pending' },
    { id: '4', label: 'Updating directory records', status: 'pending' },
    { id: '5', label: 'Sending temporary access code', status: 'pending' },
  ]);

  useEffect(() => {
    let currentIndex = 0;

    const runReset = () => {
      if (currentIndex >= steps.length) {
        setProgress(100);
        setTimeout(onComplete, 800);
        return;
      }

      // Set current step to processing
      setSteps(prev => prev.map((step, idx) => 
        idx === currentIndex ? { ...step, status: 'processing' } : step
      ));

      // Update progress
      const newProgress = ((currentIndex + 1) / steps.length) * 100;
      setProgress(newProgress);

      // Complete current step after delay
      setTimeout(() => {
        setSteps(prev => prev.map((step, idx) => 
          idx === currentIndex ? { ...step, status: 'complete' } : step
        ));
        currentIndex++;
        setTimeout(runReset, 400);
      }, 800);
    };

    runReset();
  }, [onComplete, steps.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Executing Password Reset</h3>
          <p className="text-sm text-muted-foreground">
            Performing automated recovery process...
          </p>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="space-y-2">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-3 py-1">
              {step.status === 'pending' && (
                <div className="h-4 w-4 rounded-full border-2 border-muted" />
              )}
              {step.status === 'processing' && (
                <Loader2 className="h-4 w-4 text-primary animate-spin" />
              )}
              {step.status === 'complete' && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
              <span className={`text-sm ${step.status === 'complete' ? 'text-muted-foreground' : ''}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
