import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Shield, Globe, Lock, Activity, HardDrive, Network } from 'lucide-react';
import { Badge } from './ui/badge';

export function ThreatAnalysisMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-[#f97316]/10 flex items-center justify-center flex-shrink-0">
            <Shield className="h-4 w-4 text-[#f97316]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Threat Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive analysis of detected intrusion attempt
            </p>
          </div>
          <Badge variant="outline" className="border-[#f97316]/50 text-[#f97316]">
            Medium Severity
          </Badge>
        </div>

        <div className="space-y-3 pl-11">
          {/* Attack Vector */}
          <div className="rounded-lg border p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">Attack Vector</h4>
            </div>
            <div className="pl-6 space-y-1 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Source IP:</span>
                <span className="font-mono">203.0.113.45</span>
              </div>
              <div className="flex justify-between">
                <span>Origin:</span>
                <span>Eastern Europe (Flagged)</span>
              </div>
              <div className="flex justify-between">
                <span>Entry Point:</span>
                <span>VPN Gateway - Port 443</span>
              </div>
            </div>
          </div>

          {/* Behavior Detected */}
          <div className="rounded-lg border p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">Suspicious Behavior Detected</h4>
            </div>
            <div className="pl-6 space-y-1 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>147 failed authentication attempts in 23 seconds</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Rapid port scanning on internal network (ports 22, 3389, 445)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Unusual DNS queries to suspicious external domains</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Attempted access to /admin and /config endpoints</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Lateral movement attempt to Finance server detected</span>
              </div>
            </div>
          </div>

          {/* Targeted Resources */}
          <div className="rounded-lg border p-3 space-y-2">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">Targeted Resources</h4>
            </div>
            <div className="pl-6 space-y-1 text-sm text-muted-foreground">
              <div>• VPN Authentication Server</div>
              <div>• Active Directory Domain Controller</div>
              <div>• Finance Department File Server</div>
              <div>• Database Server (blocked before access)</div>
            </div>
          </div>

          {/* Credentials Attempted */}
          <div className="rounded-lg border p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">Authentication Attempts</h4>
            </div>
            <div className="pl-6 space-y-1 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Usernames tried:</span>
                <span className="font-mono">admin, root, administrator, user</span>
              </div>
              <div className="flex justify-between">
                <span>Attack type:</span>
                <span>Brute force + credential stuffing</span>
              </div>
              <div className="flex justify-between">
                <span>Success rate:</span>
                <span className="text-green-500 font-medium">0% (All blocked)</span>
              </div>
            </div>
          </div>

          {/* Baseline Comparison */}
          <div className="rounded-lg border p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">Behavioral Baseline Deviation</h4>
            </div>
            <div className="pl-6 space-y-1 text-sm text-muted-foreground">
              <div>• 4,720% above normal authentication failure rate</div>
              <div>• Unknown IP with no historical connection data</div>
              <div>• Access patterns inconsistent with legitimate users</div>
              <div>• Traffic signature matches known attack patterns</div>
            </div>
          </div>

          <div className="rounded-lg bg-destructive/10 p-3">
            <p className="text-sm font-medium text-destructive">
              ⚠️ Classification: Unauthorized malicious actor confirmed
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
