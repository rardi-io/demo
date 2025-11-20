import { Activity, Shield, HardDrive, AlertTriangle, TrendingUp, Wifi, Lock, Key, Server } from 'lucide-react';
import { MiniBlueprint } from './MiniBlueprint';
import { LiveLogs } from './LiveLogs';

export function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* System Overview */}
      <div className="mb-8">
        <h3 className="text-[#111827] mb-4">System Overview</h3>
        <div className="grid grid-cols-4 gap-6">
          <StatCard
            icon={<Activity className="w-6 h-6 text-[#38bdf8]" />}
            label="Network Health"
            value="98%"
            trend="+2%"
            trendUp
          />
          <StatCard
            icon={<Shield className="w-6 h-6 text-[#22c55e]" />}
            label="Security Health"
            value="96%"
            trend="+1%"
            trendUp
          />
          <StatCard
            icon={<HardDrive className="w-6 h-6 text-[#38bdf8]" />}
            label="Devices Online"
            value="1,244"
            trend="+12"
            trendUp
          />
          <StatCard
            icon={<AlertTriangle className="w-6 h-6 text-[#f97316]" />}
            label="Active Incidents"
            value="2"
            trend="-3"
            trendUp={false}
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Live Blueprint Feed */}
        <div className="col-span-2 bg-white rounded-lg border border-[#e5e7eb] p-6">
          <h3 className="text-[#111827] mb-4">Live Blueprint Feed</h3>
          <MiniBlueprint />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
          <h3 className="text-[#111827] mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <ActionButton icon={<Activity className="w-4 h-4" />} label="Run Network Scan" color="cyan" />
            <ActionButton icon={<Shield className="w-4 h-4" />} label="Run Security Scan" color="cyan" />
            <ActionButton icon={<Key className="w-4 h-4" />} label="Reset Password" color="cyan" />
            <ActionButton icon={<Server className="w-4 h-4" />} label="Provision Device" color="cyan" />
          </div>
        </div>
      </div>

      {/* Active Incidents & Live Logs */}
      <div className="grid grid-cols-2 gap-6">
        {/* Active Incidents */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
          <h3 className="text-[#111827] mb-4">Active Incidents</h3>
          <div className="space-y-3">
            <IncidentCard
              title="Wi-Fi Access Point Offline"
              description="AP SC-14 lost connection 14 minutes ago"
              severity="warning"
              time="14m ago"
            />
            <IncidentCard
              title="Suspicious DNS Traffic Detected"
              description="Unusual query patterns from 10.0.45.12"
              severity="critical"
              time="2h ago"
            />
            <IncidentCard
              title="Password Reset Request"
              description="john.doe@company.com — expired credentials"
              severity="info"
              time="3h ago"
            />
          </div>
        </div>

        {/* Live Logs */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
          <h3 className="text-[#111827] mb-4">Live Logs</h3>
          <LiveLogs />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, trendUp }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
      <div className="flex items-center justify-between mb-3">
        {icon}
        <div className={`flex items-center gap-1 text-xs ${trendUp ? 'text-[#22c55e]' : 'text-[#6b7280]'}`}>
          <TrendingUp className={`w-3 h-3 ${trendUp ? '' : 'rotate-180'}`} />
          {trend}
        </div>
      </div>
      <p className="text-2xl text-[#111827] mb-1">{value}</p>
      <p className="text-sm text-[#6b7280]">{label}</p>
    </div>
  );
}

function ActionButton({ icon, label, color }: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0284c7] transition-colors">
      {icon}
      <span>{label}</span>
    </button>
  );
}

function IncidentCard({ title, description, severity, time }: {
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  time: string;
}) {
  const severityColors = {
    info: '#38bdf8',
    warning: '#f97316',
    critical: '#ef4444',
  };

  return (
    <div
      className="p-4 rounded-lg border border-[#e5e7eb] hover:shadow-sm transition-shadow"
      style={{ borderLeft: `3px solid ${severityColors[severity]}` }}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-[#111827]">{title}</h4>
        <span className="text-xs text-[#6b7280]">{time}</span>
      </div>
      <p className="text-sm text-[#6b7280]">{description}</p>
    </div>
  );
}
