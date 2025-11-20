import { motion } from 'motion/react';
import { Card } from './ui/card';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface InvestigationMessageProps {
  onComplete: () => void;
}

interface DiagnosticStep {
  id: string;
  label: string;
  status: 'pending' | 'checking' | 'complete';
}

export function InvestigationMessage({ onComplete }: InvestigationMessageProps) {
  const [steps, setSteps] = useState<DiagnosticStep[]>([
    { id: '1', label: 'Checking identity provider', status: 'pending' },
    { id: '2', label: 'Checking password module', status: 'pending' },
    { id: '3', label: 'Checking MFA module', status: 'pending' },
    { id: '4', label: 'Checking directory service', status: 'pending' },
    { id: '5', label: 'Checking email authentication service', status: 'pending' },
    { id: '6', label: 'Tracing login request flow', status: 'pending' },
  ]);

  useEffect(() => {
    let currentIndex = 0;

    const runDiagnostic = () => {
      if (currentIndex >= steps.length) {
        setTimeout(onComplete, 500);
        return;
      }

      // Set current step to checking
      setSteps(prev => prev.map((step, idx) => 
        idx === currentIndex ? { ...step, status: 'checking' } : step
      ));

      // Complete current step after delay
      setTimeout(() => {
        setSteps(prev => prev.map((step, idx) => 
          idx === currentIndex ? { ...step, status: 'complete' } : step
        ));
        currentIndex++;
        setTimeout(runDiagnostic, 300);
      }, 600);
    };

    runDiagnostic();
  }, [onComplete, steps.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Running Authentication Diagnostics</h3>
          <p className="text-sm text-muted-foreground">
            Performing comprehensive system checks...
          </p>
        </div>

        <div className="space-y-2">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-3 py-1">
              {step.status === 'pending' && (
                <div className="h-4 w-4 rounded-full border-2 border-muted" />
              )}
              {step.status === 'checking' && (
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
