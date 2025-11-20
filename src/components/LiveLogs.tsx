import { useEffect, useState } from 'react';

interface LogEntry {
  id: number;
  type: 'NETWORK' | 'SECURITY' | 'IDENTITY' | 'SYSTEM';
  message: string;
  timestamp: string;
}

export function LiveLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const logMessages = [
      { type: 'NETWORK' as const, message: 'AP scan started...' },
      { type: 'SECURITY' as const, message: 'DNS anomaly detected...' },
      { type: 'IDENTITY' as const, message: 'Credential validation...' },
      { type: 'SYSTEM' as const, message: 'Health check complete' },
      { type: 'NETWORK' as const, message: 'DHCP scope analysis...' },
      { type: 'SECURITY' as const, message: 'Firewall rules updated' },
      { type: 'IDENTITY' as const, message: 'MFA policy enforced' },
      { type: 'NETWORK' as const, message: 'Bandwidth optimization...' },
    ];

    let logId = 0;
    const interval = setInterval(() => {
      const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
      const now = new Date();
      const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      
      setLogs((prev) => [
        {
          id: logId++,
          type: randomLog.type,
          message: randomLog.message,
          timestamp,
        },
        ...prev.slice(0, 9), // Keep last 10 logs
      ]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'NETWORK':
        return 'text-[#38bdf8]';
      case 'SECURITY':
        return 'text-[#ef4444]';
      case 'IDENTITY':
        return 'text-[#f97316]';
      case 'SYSTEM':
        return 'text-[#22c55e]';
      default:
        return 'text-[#6b7280]';
    }
  };

  return (
    <div className="h-64 overflow-y-auto bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-4 space-y-2">
      {logs.map((log) => (
        <div key={log.id} className="text-xs">
          <span className="text-[#6b7280]">{log.timestamp}</span>
          {' '}
          <span className={getTypeColor(log.type)}>[{log.type}]</span>
          {' '}
          <span className="text-[#111827]">{log.message}</span>
        </div>
      ))}
    </div>
  );
}
