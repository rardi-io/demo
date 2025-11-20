import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { CheckCircle2, Loader2, Download, Shield, HardDrive, RotateCw } from 'lucide-react';
import { useState, useEffect } from 'react';

interface OSDeploymentMessageProps {
  onComplete: () => void;
}

interface DeploymentStep {
  id: string;
  label: string;
  icon: 'download' | 'shield' | 'harddrive' | 'rotate';
  status: 'pending' | 'processing' | 'complete';
}

export function OSDeploymentMessage({ onComplete }: OSDeploymentMessageProps) {
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<DeploymentStep[]>([
    { id: '1', label: 'Downloading Windows 12 installation package', icon: 'download', status: 'pending' },
    { id: '2', label: 'Verifying package integrity', icon: 'shield', status: 'pending' },
    { id: '3', label: 'Preparing devices for upgrade', icon: 'harddrive', status: 'pending' },
    { id: '4', label: 'Running pre-installation checks', icon: 'shield', status: 'pending' },
    { id: '5', label: 'Performing OS upgrade on all devices', icon: 'harddrive', status: 'pending' },
    { id: '6', label: 'Rebooting devices', icon: 'rotate', status: 'pending' },
    { id: '7', label: 'Monitoring upgrade completion', icon: 'shield', status: 'pending' },
  ]);

  const getIcon = (iconType: DeploymentStep['icon'], status: DeploymentStep['status']) => {
    if (status === 'complete') {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
    if (status === 'processing') {
      return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
    }
    
    const iconMap = {
      download: <Download className="h-4 w-4 text-muted-foreground" />,
      shield: <Shield className="h-4 w-4 text-muted-foreground" />,
      harddrive: <HardDrive className="h-4 w-4 text-muted-foreground" />,
      rotate: <RotateCw className="h-4 w-4 text-muted-foreground" />,
    };
    
    return iconMap[iconType];
  };

  useEffect(() => {
    let currentIndex = 0;

    const runDeployment = () => {
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
        setTimeout(runDeployment, 400);
      }, 1000);
    };

    runDeployment();
  }, [onComplete, steps.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Deploying Windows 12</h3>
          <p className="text-sm text-muted-foreground">
            Automated rollout in progress across 5 compatible devices...
          </p>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="space-y-2">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-3 py-1">
              {getIcon(step.icon, step.status)}
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
