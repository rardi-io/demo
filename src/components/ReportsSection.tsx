import { motion } from 'motion/react';
import { SecurityAlertMessage } from './SecurityAlertMessage';
import { Clock, Shield } from 'lucide-react';

interface ReportsSectionProps {
  onViewSecurityDetails: () => void;
}

export function ReportsSection({ onViewSecurityDetails }: ReportsSectionProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Reports</h2>
          <p className="text-muted-foreground">
            Automated activities and overnight incident summaries
          </p>
        </div>
        
        {/* Reports List */}
        <div className="space-y-4">
          {/* Security Breach Report Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg overflow-hidden bg-background"
          >
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#f97316]/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-[#f97316]" />
                </div>
                <div>
                  <h3 className="font-semibold">Overnight Security Incident</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Occurred at 2:47 AM</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#f97316]/10 text-[#f97316]">Unreviewed</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <SecurityAlertMessage onViewDetails={onViewSecurityDetails} />
            </div>
          </motion.div>

          {/* Placeholder for future reports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border rounded-lg p-8 text-center text-muted-foreground border-dashed"
          >
            <p className="text-sm">No additional reports at this time</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}