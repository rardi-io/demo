import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type NetworkState = 'default' | 'scanning' | 'diagnosis' | 'fixing' | 'resolved';

export function NetworkOutage() {
  const [state, setState] = useState<NetworkState>('default');
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
              <NetworkTopology highlighted={null} />
              <button
                onClick={handleScan}
                className="mt-12 px-8 py-3 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
              >
                RUN SCAN
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
              <NetworkTopology highlighted="ap" />
              <motion.div
                className="absolute top-0 left-0 h-1 bg-[#38bdf8]"
                initial={{ width: '0%' }}
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.1 }}
              />
              {scanProgress === 100 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setState('diagnosis')}
                  className="mt-12 px-8 py-3 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
                >
                  VIEW DIAGNOSIS
                </motion.button>
              )}
            </motion.div>
          )}

          {state === 'diagnosis' && (
            <motion.div
              key="diagnosis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col p-12 overflow-auto"
            >
              <div className="mb-8">
                <h3 className="text-[#111827] mb-2">Anomaly Detected: AP SC-14</h3>
                <p className="text-sm text-[#6b7280]">Critical network infrastructure issue</p>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">LAST SEEN</p>
                  <p className="text-[#111827]">14 minutes ago</p>
                </div>
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">DHCP SCOPE</p>
                  <p className="text-[#111827]">98% utilized</p>
                </div>
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">AUTH FAILURES</p>
                  <p className="text-[#111827]">+87% increase</p>
                </div>
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">ROOT CAUSE</p>
                  <p className="text-[#111827]">IP exhaustion</p>
                </div>
              </div>
              <button
                onClick={() => setState('fixing')}
                className="px-8 py-3 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
              >
                INITIATE AUTO-FIX
              </button>
            </motion.div>
          )}

          {state === 'fixing' && (
            <motion.div
              key="fixing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-12"
            >
              <h3 className="text-[#111827] mb-12">Auto-Fix In Progress</h3>
              <ProgressSteps
                steps={[
                  'Diagnosing network state...',
                  'Extending DHCP scope...',
                  'Rebooting AP SC-14...',
                  'Verifying connectivity...',
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
              <h3 className="text-[#111827] mb-4">Issue Resolved</h3>
              <p className="text-[#6b7280] mb-12">AP SC-14 restored to operational state</p>
              <button
                onClick={() => setState('default')}
                className="px-8 py-3 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
              >
                RETURN TO DASHBOARD
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NetworkTopology({ highlighted }: { highlighted: string | null }) {
  return (
    <div className="relative w-full max-w-4xl">
      {/* Core */}
      <div className="flex justify-center mb-12">
        <div className="border-2 border-[#38bdf8] px-8 py-4 rounded-lg bg-[#f0f9ff]">
          <p className="text-[#111827] text-sm">CORE</p>
        </div>
      </div>

      {/* Distribution */}
      <div className="flex justify-center gap-24 mb-12">
        <div className="border-2 border-[#22c55e] px-6 py-3 rounded-lg bg-[#f0fdf4]">
          <p className="text-[#111827] text-sm">DIST-A</p>
        </div>
        <div className="border-2 border-[#22c55e] px-6 py-3 rounded-lg bg-[#f0fdf4]">
          <p className="text-[#111827] text-sm">DIST-B</p>
        </div>
      </div>

      {/* Access */}
      <div className="flex justify-center gap-12 mb-12">
        <div className="border-2 border-[#38bdf8] px-4 py-2 rounded-lg bg-[#f0f9ff]">
          <p className="text-[#111827] text-xs">ACCESS-1</p>
        </div>
        <div className="border-2 border-[#38bdf8] px-4 py-2 rounded-lg bg-[#f0f9ff]">
          <p className="text-[#111827] text-xs">ACCESS-2</p>
        </div>
        <div className="border-2 border-[#38bdf8] px-4 py-2 rounded-lg bg-[#f0f9ff]">
          <p className="text-[#111827] text-xs">ACCESS-3</p>
        </div>
        <div className="border-2 border-[#38bdf8] px-4 py-2 rounded-lg bg-[#f0f9ff]">
          <p className="text-[#111827] text-xs">ACCESS-4</p>
        </div>
      </div>

      {/* APs */}
      <div className="flex justify-center gap-8">
        <div className="border border-[#e5e7eb] px-3 py-2 rounded-lg bg-white">
          <p className="text-[#6b7280] text-xs">AP-11</p>
        </div>
        <div className="border border-[#e5e7eb] px-3 py-2 rounded-lg bg-white">
          <p className="text-[#6b7280] text-xs">AP-12</p>
        </div>
        <div
          className={`border-2 px-3 py-2 rounded-lg ${
            highlighted === 'ap' ? 'border-[#ef4444] bg-[#fef2f2] shadow-lg' : 'border-[#e5e7eb] bg-white'
          }`}
        >
          <p className={`text-xs ${highlighted === 'ap' ? 'text-[#ef4444]' : 'text-[#6b7280]'}`}>AP SC-14</p>
        </div>
        <div className="border border-[#e5e7eb] px-3 py-2 rounded-lg bg-white">
          <p className="text-[#6b7280] text-xs">AP-15</p>
        </div>
        <div className="border border-[#e5e7eb] px-3 py-2 rounded-lg bg-white">
          <p className="text-[#6b7280] text-xs">AP-16</p>
        </div>
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
              index <= currentStep ? 'border-[#38bdf8] bg-[#38bdf8]' : 'border-[#e5e7eb] bg-white'
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