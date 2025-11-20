import { ReactNode } from 'react';
import { Activity, Shield, User, HardDrive, FileText, Settings, ChevronDown } from 'lucide-react';

type Page = 'dashboard' | 'network' | 'security' | 'identity' | 'devices' | 'logs' | 'settings';

interface AppShellProps {
  children: ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function AppShell({ children, currentPage, onNavigate }: AppShellProps) {
  const navItems: { id: Page; label: string; icon: ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-5 h-5" /> },
    { id: 'network', label: 'Network', icon: <Activity className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'identity', label: 'Identity', icon: <User className="w-5 h-5" /> },
    { id: 'devices', label: 'Devices', icon: <HardDrive className="w-5 h-5" /> },
    { id: 'logs', label: 'Logs', icon: <FileText className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const getPageTitle = () => {
    const page = navItems.find(item => item.id === currentPage);
    return page?.label || 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-[#f5f7fa]">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e5e7eb] flex flex-col">
        <div className="p-6 border-b border-[#e5e7eb]">
          <h1 className="text-[#111827]">Rardi</h1>
        </div>
        <nav className="flex-1 p-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left px-4 py-3 mb-1 rounded-lg transition-all flex items-center gap-3 ${
                currentPage === item.id
                  ? 'bg-[#f0f9ff] text-[#0284c7] border-l-2 border-[#38bdf8]'
                  : 'text-[#6b7280] hover:bg-[#f9fafb]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-[#e5e7eb] space-y-2">
          <p className="text-xs text-[#6b7280]">System Status: <span className="text-[#22c55e]">Operational</span></p>
          <p className="text-xs text-[#6b7280]">Version: v0.1 Alpha</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-8">
          <div>
            <h2 className="text-[#111827]">{getPageTitle()}</h2>
            <p className="text-sm text-[#6b7280]">AI Network Technician</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#6b7280]">Enterprise Org</span>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#38bdf8] flex items-center justify-center text-white text-sm">
                A
              </div>
              <ChevronDown className="w-4 h-4 text-[#6b7280]" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
