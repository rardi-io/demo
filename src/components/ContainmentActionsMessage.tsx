import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Shield, CheckCircle2 } from 'lucide-react';

export function ContainmentActionsMessage() {
  const actions = [
    { action: 'Blocked attacker IP 203.0.113.45 at firewall level', timestamp: '2:47:01 AM' },
    { action: 'Terminated 3 active suspicious sessions', timestamp: '2:47:02 AM' },
    { action: 'Revoked temporary access tokens generated in last 5 minutes', timestamp: '2:47:03 AM' },
    { action: 'Isolated affected network segment to prevent lateral movement', timestamp: '2:47:04 AM' },
    { action: 'Reset VPN gateway authentication state', timestamp: '2:47:05 AM' },
    { action: 'Quarantined VPN endpoint for forensic analysis', timestamp: '2:47:06 AM' },
    { action: 'Sanitized authentication logs to remove persistence artifacts', timestamp: '2:47:08 AM' },
    { action: 'Restored firewall rules to pre-incident baseline', timestamp: '2:47:09 AM' },
    { action: 'Updated intrusion prevention signatures', timestamp: '2:47:11 AM' },
    { action: 'Verified all domain credentials remain secure', timestamp: '2:47:13 AM' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
            <Shield className="h-4 w-4 text-green-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Autonomous Containment Actions</h3>
            <p className="text-sm text-muted-foreground">
              Executed without human intervention in stealth mode
            </p>
          </div>
        </div>

        <div className="pl-11 space-y-2">
          {actions.map((item, index) => (
            <div key={index} className="flex items-start gap-3 py-2 border-l-2 border-green-500/20 pl-4">
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">{item.action}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pl-11">
          <div className="rounded-lg bg-green-500/10 p-3">
            <p className="text-sm font-medium text-green-500">
              ✓ Complete containment achieved in 12 seconds
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Attack stopped completely with zero data loss and zero downtime
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
