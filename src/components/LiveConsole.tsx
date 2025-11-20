import { useEffect, useState } from 'react';

interface LogEntry {
  id: number;
  type: 'Network' | 'Security' | 'Identity' | 'System';
  message: string;
  timestamp: string;
}

export function LiveConsole() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const logMessages = [
      { type: 'Network' as const, message: 'AP scan started...' },
      { type: 'Security' as const, message: 'DNS anomaly detected...' },
      { type: 'Identity' as const, message: 'Credential validation...' },
      { type: 'System' as const, message: 'Health check complete' },
      { type: 'Network' as const, message: 'Monitoring DHCP scope...' },
      { type: 'Security' as const, message: 'Threat intelligence updated' },
      { type: 'Identity' as const, message: 'MFA policy enforced' },
      { type: 'Network' as const, message: 'Bandwidth analysis running...' },
      { type: 'System' as const, message: 'Backup completed' },
      { type: 'Security' as const, message: 'Firewall rules synchronized' },
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
        ...prev.slice(0, 19), // Keep last 20 logs
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-96 bg-[#f2f2f2] border-l border-[#333333] flex flex-col">
      <div className="p-6 border-b border-[#333333]">
        <p className="text-[#333333] tracking-wider">LIVE SIMULATION CONSOLE</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="border border-[#333333] p-3 bg-[#f2f2f2]">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[#333333] text-xs tracking-wider">[{log.type.toUpperCase()}]</span>
              <span className="text-[#333333] text-xs">{log.timestamp}</span>
            </div>
            <p className="text-[#333333] text-sm">{log.message}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
