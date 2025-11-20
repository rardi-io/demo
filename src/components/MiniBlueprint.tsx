import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function MiniBlueprint() {
  const [scanPosition, setScanPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPosition((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 bg-gradient-to-br from-[#f0f9ff] to-[#f9fafb] rounded-lg border border-[#e5e7eb] overflow-hidden">
      {/* Network Topology */}
      <svg className="w-full h-full" viewBox="0 0 800 256">
        {/* Connections */}
        <line x1="100" y1="128" x2="250" y2="80" stroke="#38bdf8" strokeWidth="2" opacity="0.3" />
        <line x1="100" y1="128" x2="250" y2="128" stroke="#38bdf8" strokeWidth="2" opacity="0.3" />
        <line x1="100" y1="128" x2="250" y2="176" stroke="#38bdf8" strokeWidth="2" opacity="0.3" />
        
        <line x1="250" y1="80" x2="400" y2="64" stroke="#38bdf8" strokeWidth="2" opacity="0.3" />
        <line x1="250" y1="80" x2="400" y2="128" stroke="#38bdf8" strokeWidth="2" opacity="0.3" />
        <line x1="250" y1="128" x2="400" y2="128" stroke="#38bdf8" strokeWidth="2" opacity="0.3" />
        <line x1="250" y1="176" x2="400" y2="192" stroke="#38bdf8" strokeWidth="2" opacity="0.3" />
        
        <line x1="400" y1="128" x2="550" y2="80" stroke="#38bdf8" strokeWidth="2" opacity="0.3" />
        <line x1="400" y1="128" x2="550" y2="128" stroke="#38bdf8" strokeWidth="2" opacity="0.3" />
        <line x1="400" y1="128" x2="550" y2="176" stroke="#38bdf8" strokeWidth="2" opacity="0.3" />
        
        <line x1="550" y1="128" x2="700" y2="128" stroke="#38bdf8" strokeWidth="2" opacity="0.3" />

        {/* Nodes */}
        {/* Core */}
        <circle cx="100" cy="128" r="12" fill="#38bdf8" />
        <motion.circle
          cx="100"
          cy="128"
          r="20"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          opacity="0.5"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Distribution */}
        <circle cx="250" cy="80" r="10" fill="#22c55e" />
        <circle cx="250" cy="128" r="10" fill="#22c55e" />
        <circle cx="250" cy="176" r="10" fill="#22c55e" />
        
        {/* Access */}
        <circle cx="400" cy="64" r="8" fill="#38bdf8" />
        <circle cx="400" cy="128" r="8" fill="#38bdf8" />
        <circle cx="400" cy="192" r="8" fill="#38bdf8" />
        
        {/* Edge */}
        <circle cx="550" cy="80" r="8" fill="#6b7280" />
        <circle cx="550" cy="128" r="8" fill="#6b7280" />
        <circle cx="550" cy="176" r="8" fill="#6b7280" />
        
        {/* Internet */}
        <circle cx="700" cy="128" r="10" fill="#f97316" />
        <motion.circle
          cx="700"
          cy="128"
          r="18"
          fill="none"
          stroke="#f97316"
          strokeWidth="2"
          opacity="0.5"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />

        {/* Scanning bar */}
        <motion.line
          x1={scanPosition * 8}
          y1="0"
          x2={scanPosition * 8}
          y2="256"
          stroke="#38bdf8"
          strokeWidth="2"
          opacity="0.4"
        />
        
        {/* Labels */}
        <text x="100" y="160" textAnchor="middle" fontSize="10" fill="#111827">Core</text>
        <text x="250" y="60" textAnchor="middle" fontSize="10" fill="#111827">Dist</text>
        <text x="400" y="50" textAnchor="middle" fontSize="10" fill="#111827">Access</text>
        <text x="550" y="60" textAnchor="middle" fontSize="10" fill="#111827">Edge</text>
        <text x="700" y="160" textAnchor="middle" fontSize="10" fill="#111827">Internet</text>
      </svg>

      {/* Activity indicator */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-[#e5e7eb]">
        <motion.div
          className="w-2 h-2 rounded-full bg-[#22c55e]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs text-[#6b7280]">Live Monitoring</span>
      </div>
    </div>
  );
}
