import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Zap, Calendar, FileDown, Settings } from 'lucide-react';

interface DeploymentConfirmationMessageProps {
  onProceed: () => void;
  onSchedule: () => void;
  onExport: () => void;
  onSelectDevices: () => void;
}

export function DeploymentConfirmationMessage({ 
  onProceed, 
  onSchedule, 
  onExport,
  onSelectDevices 
}: DeploymentConfirmationMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Ready to Deploy Windows 12</h3>
          <p className="text-sm text-muted-foreground">
            I've completed the compatibility scan. Would you like me to proceed with the Windows 12 upgrade for all compatible devices?
          </p>
        </div>

        <div className="space-y-2">
          <Button 
            onClick={onProceed}
            className="w-full justify-start gap-3 h-auto py-4 bg-[#f97316] hover:bg-[#ea580c] text-white"
          >
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            <div className="text-left flex-1">
              <div className="font-semibold">Upgrade All Compatible Devices</div>
              <div className="text-xs opacity-90">
                Deploy Windows 12 to 5 devices immediately
              </div>
            </div>
          </Button>

          <Button 
            onClick={onSelectDevices}
            variant="outline"
            className="w-full justify-start gap-3 h-auto py-3"
          >
            <Settings className="h-5 w-5" />
            <div className="text-left flex-1">
              <div className="font-semibold">Select Specific Devices</div>
            </div>
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={onSchedule}
              variant="outline"
              className="justify-start gap-2 h-auto py-3"
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Schedule Later</span>
            </Button>

            <Button 
              onClick={onExport}
              variant="outline"
              className="justify-start gap-2 h-auto py-3"
            >
              <FileDown className="h-4 w-4" />
              <span className="text-sm">Export Report</span>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
