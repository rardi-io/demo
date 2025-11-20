import { motion } from 'motion/react';
import { Card } from './ui/card';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DeviceListModal } from './DeviceListModal';
import { useState } from 'react';

interface Device {
  name: string;
  location: string;
  owner: string;
  deviceCode: string;
  cpu?: string;
  tpm?: string;
  storage?: string;
  ram?: string;
  reason?: string;
}

export function CompatibilityReportMessage() {
  const [showCompatibleModal, setShowCompatibleModal] = useState(false);
  const [showIncompatibleModal, setShowIncompatibleModal] = useState(false);

  const compatibleDevices: Device[] = [
    { name: 'DESK-HR-001', cpu: 'Intel i7-12700', tpm: 'Yes', storage: '512 GB', ram: '16 GB', location: 'Human Resources - Floor 2', owner: 'Sarah Johnson', deviceCode: 'HR-DK-2023-001' },
    { name: 'DESK-HR-002', cpu: 'Intel i7-12700', tpm: 'Yes', storage: '512 GB', ram: '16 GB', location: 'Human Resources - Floor 2', owner: 'Michael Chen', deviceCode: 'HR-DK-2023-002' },
    { name: 'DESK-IT-001', cpu: 'AMD Ryzen 7 5800X', tpm: 'Yes', storage: '1 TB', ram: '32 GB', location: 'IT Department - Floor 3', owner: 'James Wilson', deviceCode: 'IT-DK-2023-001' },
    { name: 'LAPTOP-SALES-003', cpu: 'Intel i5-1240P', tpm: 'Yes', storage: '256 GB', ram: '16 GB', location: 'Sales - Mobile', owner: 'Emily Davis', deviceCode: 'SL-LP-2024-003' },
    { name: 'DESK-FIN-002', cpu: 'Intel i9-12900K', tpm: 'Yes', storage: '1 TB', ram: '64 GB', location: 'Finance - Floor 4', owner: 'Robert Martinez', deviceCode: 'FN-DK-2023-002' },
  ];

  const incompatibleDevices: Device[] = [
    { name: 'DESK-LEGACY-001', reason: 'Missing TPM 2.0', location: 'Archive Room - Floor 1', owner: 'Unassigned', deviceCode: 'AR-DK-2018-001' },
    { name: 'LAPTOP-OLD-005', reason: 'Unsupported CPU (Intel i5-7200U)', location: 'Marketing - Mobile', owner: 'Lisa Anderson', deviceCode: 'MK-LP-2019-005' },
    { name: 'DESK-ARCHIVE-003', reason: 'Insufficient storage (128 GB)', location: 'Archive Room - Floor 1', owner: 'Unassigned', deviceCode: 'AR-DK-2017-003' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Compatibility Report Generated</h3>
          <p className="text-sm text-muted-foreground">
            Analyzed all staff devices for Windows 12 upgrade eligibility
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-green-500/10 p-4 text-center">
            <div className="text-3xl font-semibold text-green-500">{compatibleDevices.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Compatible Devices</div>
          </div>
          <div className="rounded-lg bg-destructive/10 p-4 text-center">
            <div className="text-3xl font-semibold text-destructive">{incompatibleDevices.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Incompatible Devices</div>
          </div>
        </div>

        {/* Compatible Devices */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <h4 className="font-medium">Compatible Devices</h4>
              <Badge variant="outline" className="border-green-500/50 text-green-500">
                Ready for Deployment
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCompatibleModal(true)}
              className="gap-1 text-xs"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            {compatibleDevices.length} devices meet all Windows 12 requirements and are ready for upgrade
          </div>
        </div>

        {/* Incompatible Devices */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <h4 className="font-medium">Incompatible Devices</h4>
              <Badge variant="outline" className="border-destructive/50 text-destructive">
                Requires Manual Intervention
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowIncompatibleModal(true)}
              className="gap-1 text-xs"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            {incompatibleDevices.length} devices require hardware upgrades or replacement
          </div>
        </div>
      </Card>

      {/* Modals */}
      <DeviceListModal
        open={showCompatibleModal}
        onOpenChange={setShowCompatibleModal}
        devices={compatibleDevices}
        title="Compatible Devices"
        type="compatible"
      />

      <DeviceListModal
        open={showIncompatibleModal}
        onOpenChange={setShowIncompatibleModal}
        devices={incompatibleDevices}
        title="Incompatible Devices"
        type="incompatible"
      />
    </motion.div>
  );
}