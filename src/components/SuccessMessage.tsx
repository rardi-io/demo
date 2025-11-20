import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { CheckCircle2, Server, Wifi, Users, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

export function SuccessMessage() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Confetti */}
      {showConfetti && (
        <>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-sm bg-primary/40"
              initial={{
                x: 400,
                y: 50,
                opacity: 1,
              }}
              animate={{
                x: 400 + (Math.random() - 0.5) * 400,
                y: 50 + Math.random() * 200,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}

      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            Issue Resolved
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Summary Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-card p-3 space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Server className="h-4 w-4" />
                <span className="text-xs">AP Status</span>
              </div>
              <p className="text-sm font-medium text-green-600">Back online</p>
            </div>
            
            <div className="rounded-lg border bg-card p-3 space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Activity className="h-4 w-4" />
                <span className="text-xs">DHCP Pool</span>
              </div>
              <p className="text-sm font-medium">Extended by 50</p>
            </div>
            
            <div className="rounded-lg border bg-card p-3 space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wifi className="h-4 w-4" />
                <span className="text-xs">Auth Success</span>
              </div>
              <p className="text-sm font-medium text-green-600">98%</p>
            </div>
            
            <div className="rounded-lg border bg-card p-3 space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-xs">Reconnected</span>
              </div>
              <p className="text-sm font-medium text-green-600">43 / 43</p>
            </div>
          </div>

          <Separator />

          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Network Stabilized
            </Badge>
            <p className="text-xs text-muted-foreground">
              Completed at {new Date().toLocaleTimeString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
