import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type SecurityState = 'default' | 'scanning' | 'plan' | 'containing' | 'resolved';

export function SecurityIncident() {
  const [state, setState] = useState<SecurityState>('default');
  const [scanProgress, setScanProgress] = useState(0);

  const handleScan = () => {
    setState('scanning');
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
  };

  return (
    <div className="p-8 h-full">
      <div className="h-full bg-white rounded-lg border border-[#e5e7eb] relative overflow-hidden">
        <AnimatePresence mode="wait">
          {state === 'default' && (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-12"
            >
              <SecurityTopology highlighted={null} />
              <button
                onClick={handleScan}
                className="mt-12 px-8 py-3 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
              >
                BEGIN THREAT SCAN
              </button>
            </motion.div>
          )}

          {state === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-12"
            >
              <SecurityTopology highlighted="dns" />
              <motion.div
                className="absolute top-0 left-0 h-1 bg-[#ef4444]"
                initial={{ width: '0%' }}
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.1 }}
              />
              {scanProgress === 100 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setState('plan')}
                  className="mt-12 px-8 py-3 bg-[#ef4444] text-white rounded-lg hover:bg-[#dc2626] transition-colors"
                >
                  VIEW THREAT PLAN
                </motion.button>
              )}
            </motion.div>
          )}

          {state === 'plan' && (
            <motion.div
              key="plan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col p-12 overflow-auto"
            >
              <div className="mb-8">
                <h3 className="text-[#111827] mb-2">Threat Detected: DNS Exfiltration</h3>
                <p className="text-sm text-[#6b7280]">malicious-domain.xyz</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">ACTION 1</p>
                  <p className="text-[#111827]">Block domain at firewall level</p>
                </div>
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">ACTION 2</p>
                  <p className="text-[#111827]">Quarantine affected device (10.0.45.12)</p>
                </div>
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">ACTION 3</p>
                  <p className="text-[#111827]">Notify security administrator</p>
                </div>
              </div>
              <button
                onClick={() => setState('containing')}
                className="px-8 py-3 bg-[#ef4444] text-white rounded-lg hover:bg-[#dc2626] transition-colors"
              >
                BEGIN CONTAINMENT
              </button>
            </motion.div>
          )}

          {state === 'containing' && (
            <motion.div
              key="containing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-12"
            >
              <h3 className="text-[#111827] mb-12">Containment In Progress</h3>
              <ProgressSteps
                steps={[
                  'Analyzing traffic patterns...',
                  'Blocking malicious domain...',
                  'Revoking device access...',
                  'Sending administrator alert...',
                ]}
                onComplete={() => setState('resolved')}
              />
            </motion.div>
          )}

          {state === 'resolved' && (
            <motion.div
              key="resolved"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-12"
            >
              <div className="w-16 h-16 rounded-full bg-[#22c55e] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[#111827] mb-4">Threat Neutralized</h3>
              <p className="text-[#6b7280] mb-2">Domain blocked: malicious-domain.xyz</p>
              <p className="text-[#6b7280] mb-12">Device quarantined: 10.0.45.12</p>
              <button
                onClick={() => setState('default')}
                className="px-8 py-3 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
              >
                RETURN TO SECURITY
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SecurityTopology({ highlighted }: { highlighted: string | null }) {
  return (
    <div className="relative w-full max-w-4xl flex items-center justify-center gap-8">
      <div className="border-2 border-[#6b7280] px-6 py-4 rounded-lg bg-[#f9fafb]">
        <p className="text-[#111827] text-sm">DEVICE</p>
        <p className="text-[#6b7280] text-xs mt-1">10.0.45.12</p>
      </div>
      
      <motion.div
        className="w-12 h-0.5 bg-[#38bdf8]"
        animate={highlighted === 'dns' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
      
      <div className="border-2 border-[#38bdf8] px-6 py-4 rounded-lg bg-[#f0f9ff]">
        <p className="text-[#111827] text-sm">SWITCH</p>
      </div>
      
      <motion.div
        className="w-12 h-0.5 bg-[#38bdf8]"
        animate={highlighted === 'dns' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />
      
      <div
        className={`border-2 px-6 py-4 rounded-lg ${
          highlighted === 'dns' ? 'border-[#ef4444] bg-[#fef2f2] shadow-lg' : 'border-[#38bdf8] bg-[#f0f9ff]'
        }`}
      >
        <p className={`text-sm ${highlighted === 'dns' ? 'text-[#ef4444]' : 'text-[#111827]'}`}>DNS</p>
      </div>
      
      <motion.div
        className="w-12 h-0.5 bg-[#38bdf8]"
        animate={highlighted === 'dns' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      />
      
      <div className="border-2 border-[#22c55e] px-6 py-4 rounded-lg bg-[#f0fdf4]">
        <p className="text-[#111827] text-sm">GATEWAY</p>
      </div>
      
      <motion.div
        className="w-12 h-0.5 bg-[#38bdf8]"
        animate={highlighted === 'dns' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
      />
      
      <div className="border-2 border-[#f97316] px-6 py-4 rounded-lg bg-[#fff7ed]">
        <p className="text-[#111827] text-sm">EXTERNAL</p>
      </div>
    </div>
  );
}

function ProgressSteps({ steps, onComplete }: { steps: string[]; onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  });

  return (
    <div className="space-y-6 w-full max-w-2xl">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-6">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              index <= currentStep ? 'border-[#ef4444] bg-[#ef4444]' : 'border-[#e5e7eb] bg-white'
            }`}
          >
            {index <= currentStep && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <p className={`text-[#111827] ${index <= currentStep ? '' : 'text-[#6b7280]'}`}>{step}</p>
        </div>
      ))}
    </div>
  );
}