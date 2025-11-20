import { motion } from 'motion/react';
import { Card } from './ui/card';
import { CheckCircle2, Shield } from 'lucide-react';
import { Badge } from './ui/badge';

export function NetworkValidationMessage() {
  const validations = [
    { check: 'Network scan for remaining threat traces', result: 'Clean', status: 'pass' },
    { check: 'System integrity verification', result: 'Passed', status: 'pass' },
    { check: 'Data exfiltration check', result: 'None detected', status: 'pass' },
    { check: 'System compromise analysis', result: 'No systems compromised', status: 'pass' },
    { check: 'Firewall and routing rules validation', result: 'All rules secure', status: 'pass' },
    { check: 'Active Directory integrity check', result: 'Intact', status: 'pass' },
    { check: 'Authentication system health', result: 'Healthy', status: 'pass' },
    { check: 'Pre/Post behavioral comparison', result: 'Baseline restored', status: 'pass' },
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
            <h3 className="font-semibold mb-1">Network Validation Complete</h3>
            <p className="text-sm text-muted-foreground">
              Post-containment security verification passed all checks
            </p>
          </div>
          <Badge variant="outline" className="border-green-500/50 text-green-500">
            All Clear
          </Badge>
        </div>

        <div className="pl-11 space-y-2">
          {validations.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{item.check}</span>
              </div>
              <span className="text-sm font-medium text-green-500">{item.result}</span>
            </div>
          ))}
        </div>

        <div className="pl-11">
          <div className="rounded-lg bg-green-500/10 p-4 flex items-start gap-3">
            <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-500 mb-1">Network Security Confirmed</p>
              <p className="text-xs text-muted-foreground">
                All systems verified secure. No traces of intrusion remain. Network operating at baseline performance.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
