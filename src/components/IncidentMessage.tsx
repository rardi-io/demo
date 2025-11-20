import { motion } from 'motion/react';
import { AlertTriangle, Clock, Users, Wifi } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface IncidentMessageProps {
  onAutoFix: () => void;
}

export function IncidentMessage({ onAutoFix }: IncidentMessageProps) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <CardTitle>Wi-Fi Outage — Science Building</CardTitle>
          </div>
          <CardDescription>
            Critical network infrastructure issue detected
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last Seen</span>
              </div>
              <p className="text-sm font-medium">10:12 AM</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wifi className="h-4 w-4" />
                <span>Auth Failures</span>
              </div>
              <p className="text-sm font-medium text-destructive">+87%</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-xs">DHCP</span>
              </div>
              <p className="text-sm font-medium text-orange-500">98% utilized</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Affected Clients</span>
              </div>
              <p className="text-sm font-medium">43</p>
            </div>
          </div>

          <Separator />

          {/* Root Cause */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <h4 className="text-sm font-medium mb-2">Root Cause</h4>
            <p className="text-sm text-muted-foreground">
              IP exhaustion on VLAN 42 caused the AP heartbeat failure.
            </p>
          </div>

          {/* Suggested Fix */}
          <div className="rounded-lg border p-4">
            <h4 className="text-sm font-medium mb-3">Suggested Fix</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                <span>Extend DHCP pool</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                <span>Reboot AP SC-14</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                <span>Revalidate RADIUS</span>
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3">
          <Button onClick={onAutoFix} className="flex-1">
            Auto-Fix with Rardi
          </Button>
          <Button variant="outline" className="flex-1">
            Manual Instructions
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
