import { motion } from 'motion/react';
import { Card } from './ui/card';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CompatibilityScanMessageProps {
  onComplete: () => void;
}

interface ScanStep {
  id: string;
  label: string;
  status: 'pending' | 'scanning' | 'complete';
}

export function CompatibilityScanMessage({ onComplete }: CompatibilityScanMessageProps) {
  const [steps, setSteps] = useState<ScanStep[]>([
    { id: '1', label: 'Scanning CPU compatibility', status: 'pending' },
    { id: '2', label: 'Checking TPM 2.0 status', status: 'pending' },
    { id: '3', label: 'Analyzing available disk space', status: 'pending' },
    { id: '4', label: 'Verifying memory requirements', status: 'pending' },
    { id: '5', label: 'Checking current OS versions', status: 'pending' },
    { id: '6', label: 'Assessing device performance', status: 'pending' },
    { id: '7', label: 'Analyzing workload impact windows', status: 'pending' },
  ]);

  useEffect(() => {
    let currentIndex = 0;

    const runScan = () => {
      if (currentIndex >= steps.length) {
        setTimeout(onComplete, 500);
        return;
      }

      // Set current step to scanning
      setSteps(prev => prev.map((step, idx) => 
        idx === currentIndex ? { ...step, status: 'scanning' } : step
      ));

      // Complete current step after delay
      setTimeout(() => {
        setSteps(prev => prev.map((step, idx) => 
          idx === currentIndex ? { ...step, status: 'complete' } : step
        ));
        currentIndex++;
        setTimeout(runScan, 300);
      }, 600);
    };

    runScan();
  }, [onComplete, steps.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Running Compatibility Scan</h3>
          <p className="text-sm text-muted-foreground">
            Evaluating all devices on the network for Windows 12 upgrade...
          </p>
        </div>

        <div className="space-y-2">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-3 py-1">
              {step.status === 'pending' && (
                <div className="h-4 w-4 rounded-full border-2 border-muted" />
              )}
              {step.status === 'scanning' && (
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
