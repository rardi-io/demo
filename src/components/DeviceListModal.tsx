import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Search, Laptop, MapPin, User, Hash, Cpu, Shield, HardDrive } from 'lucide-react';

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

interface DeviceListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  devices: Device[];
  title: string;
  type: 'compatible' | 'incompatible';
}

export function DeviceListModal({ open, onOpenChange, devices, title, type }: DeviceListModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDevices = devices.filter((device) => {
    const query = searchQuery.toLowerCase();
    return (
      device.name.toLowerCase().includes(query) ||
      device.location.toLowerCase().includes(query) ||
      device.owner.toLowerCase().includes(query) ||
      device.deviceCode.toLowerCase().includes(query)
    );
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {title}
            <Badge variant={type === 'compatible' ? 'outline' : 'destructive'} className={type === 'compatible' ? 'border-green-500/50 text-green-500' : ''}>
              {devices.length} {devices.length === 1 ? 'Device' : 'Devices'}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {type === 'compatible' 
              ? 'Devices that meet all Windows 12 requirements and are ready for upgrade'
              : 'Devices that require hardware upgrades or replacement before upgrading to Windows 12'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by device name, location, owner, or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Device List */}
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {filteredDevices.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No devices found matching your search.
                </div>
              ) : (
                filteredDevices.map((device) => (
                  <div
                    key={device.deviceCode}
                    className={`rounded-lg border p-4 space-y-3 ${
                      type === 'incompatible' 
                        ? 'border-destructive/20 bg-destructive/5' 
                        : 'bg-background'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Laptop className="h-5 w-5 text-muted-foreground" />
                        <h4 className="font-semibold">{device.name}</h4>
                      </div>
                      {type === 'compatible' ? (
                        <Badge variant="outline" className="border-green-500/50 text-green-500">
                          Ready
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          Incompatible
                        </Badge>
                      )}
                    </div>

                    {/* Device Info */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Hash className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div>
                          <span className="text-muted-foreground">Device Code: </span>
                          <span className="font-medium">{device.deviceCode}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div>
                          <span className="text-muted-foreground">Owner: </span>
                          <span className="font-medium">{device.owner}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm col-span-2">
                        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div>
                          <span className="text-muted-foreground">Location: </span>
                          <span className="font-medium">{device.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Technical Specs */}
                    {type === 'compatible' ? (
                      <div className="pt-2 border-t grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Cpu className="h-3 w-3" />
                          {device.cpu}
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          TPM 2.0
                        </div>
                        <div className="flex items-center gap-1">
                          <HardDrive className="h-3 w-3" />
                          {device.storage}
                        </div>
                        <div>RAM: {device.ram}</div>
                      </div>
                    ) : (
                      <div className="pt-2 border-t">
                        <p className="text-sm text-destructive font-medium">
                          {device.reason}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}