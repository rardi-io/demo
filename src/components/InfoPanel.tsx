import { Activity, Shield, Clock } from 'lucide-react';

export function InfoPanel() {
  return (
    <aside className="w-[30%] bg-[#f2f2f2] border-l border-[#e5e7eb] p-6 overflow-y-auto">
      {/* System Health */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-[#333333]" />
          <h3 className="text-[#333333]">System Health</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#333333]">Network</span>
            <span className="text-[#22c55e]">98%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#333333]">Security</span>
            <span className="text-[#22c55e]">96%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#333333]">Devices</span>
            <span className="text-[#333333]">1,244</span>
          </div>
        </div>
      </div>

      {/* Network Stability */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-[#333333]" />
          <h3 className="text-[#333333]">Network Stability</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#333333]">Uptime</span>
            <span className="text-[#333333]">99.7%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#333333]">Latency</span>
            <span className="text-[#333333]">12ms</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#333333]">Bandwidth</span>
            <span className="text-[#333333]">64%</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-[#333333]" />
          <h3 className="text-[#333333]">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          <div className="text-sm">
            <p className="text-[#333333]">DHCP lease renewed</p>
            <p className="text-[#999999] text-xs mt-1">2 min ago</p>
          </div>
          <div className="text-sm">
            <p className="text-[#333333]">Security scan complete</p>
            <p className="text-[#999999] text-xs mt-1">15 min ago</p>
          </div>
          <div className="text-sm">
            <p className="text-[#333333]">Firmware updated</p>
            <p className="text-[#999999] text-xs mt-1">1 hour ago</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
