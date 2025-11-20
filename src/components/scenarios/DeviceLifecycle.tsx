import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type DeviceState = 'default' | 'scanning' | 'plan' | 'deploying' | 'resolved';

export function DeviceLifecycle() {
  const [state, setState] = useState<DeviceState>('default');
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
              <DeviceTopology highlighted={null} />
              <button
                onClick={handleScan}
                className="mt-12 px-8 py-3 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
              >
                SCAN FLEET
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
              <DeviceTopology highlighted="policy" />
              <motion.div
                className="absolute left-1/2 top-0 w-1 h-full bg-[#38bdf8] origin-top"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: scanProgress / 100 }}
                transition={{ duration: 0.1 }}
              />
              {scanProgress === 100 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setState('plan')}
                  className="mt-12 px-8 py-3 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
                >
                  VIEW UPDATE PLAN
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
                <h3 className="text-[#111827] mb-2">Compliance Scan Complete</h3>
                <p className="text-sm text-[#6b7280]">Fleet update required</p>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">TOTAL DEVICES</p>
                  <p className="text-[#111827]">247</p>
                </div>
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">OUTDATED</p>
                  <p className="text-[#111827]">32 devices</p>
                </div>
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">COMPLIANCE</p>
                  <p className="text-[#111827]">87%</p>
                </div>
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">RECOMMENDATION</p>
                  <p className="text-[#111827]">Rolling deployment</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setState('deploying')}
                  className="flex-1 px-8 py-3 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
                >
                  DEPLOY NOW
                </button>
                <button
                  className="flex-1 px-8 py-3 bg-white text-[#111827] border border-[#e5e7eb] rounded-lg hover:bg-[#f9fafb] transition-colors"
                >
                  SCHEDULE UPDATE
                </button>
              </div>
            </motion.div>
          )}

          {state === 'deploying' && (
            <motion.div
              key="deploying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-12"
            >
              <h3 className="text-[#111827] mb-12">Deployment In Progress</h3>
              <ProgressSteps
                steps={[
                  'Preparing update packages...',
                  'Sending to device fleet...',
                  'Installing updates...',
                  'Verifying compliance...',
                ]}
                onComplete={() => setState('resolved')}
              />
              <div className="mt-12 w-full max-w-2xl">
                <div className="flex justify-between text-[#6b7280] text-sm mb-2">
                  <span>Progress</span>
                  <span>32 / 32 devices</span>
                </div>
                <div className="bg-[#e5e7eb] rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-[#38bdf8] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 6 }}
                  />
                </div>
              </div>
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
              <h3 className="text-[#111827] mb-4">Compliance Restored</h3>
              <p className="text-[#6b7280] mb-2">All 32 devices successfully updated</p>
              <p className="text-[#6b7280] mb-12">Fleet compliance: 100%</p>
              <button
                onClick={() => setState('default')}
                className="px-8 py-3 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
              >
                BACK TO DEVICES
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DeviceTopology({ highlighted }: { highlighted: string | null }) {
  return (
    <div className="relative flex flex-col items-center gap-8 w-full max-w-xl">
      <div className="border-2 border-[#38bdf8] px-12 py-4 rounded-lg bg-[#f0f9ff]">
        <p className="text-[#111827] text-sm">DEVICE INVENTORY</p>
      </div>
      
      <motion.div
        className="w-0.5 h-12 bg-[#38bdf8]"
        animate={highlighted === 'policy' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
      
      <div
        className={`border-2 px-12 py-4 rounded-lg ${
          highlighted === 'policy' ? 'border-[#f97316] bg-[#fff7ed] shadow-lg' : 'border-[#38bdf8] bg-[#f0f9ff]'
        }`}
      >
        <p className={`text-sm ${highlighted === 'policy' ? 'text-[#f97316]' : 'text-[#111827]'}`}>POLICY ENGINE</p>
      </div>
      
      <motion.div
        className="w-0.5 h-12 bg-[#38bdf8]"
        animate={highlighted === 'policy' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />
      
      <div className="border-2 border-[#22c55e] px-12 py-4 rounded-lg bg-[#f0fdf4]">
        <p className="text-[#111827] text-sm">UPDATE SERVER</p>
      </div>
      
      <motion.div
        className="w-0.5 h-12 bg-[#38bdf8]"
        animate={highlighted === 'policy' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      />
      
      <div className="border-2 border-[#6b7280] px-12 py-4 rounded-lg bg-[#f9fafb]">
        <p className="text-[#111827] text-sm">SCHEDULER</p>
      </div>
      
      <motion.div
        className="w-0.5 h-12 bg-[#38bdf8]"
        animate={highlighted === 'policy' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
      />
      
      <div className="border-2 border-[#22c55e] px-12 py-4 rounded-lg bg-[#f0fdf4]">
        <p className="text-[#111827] text-sm">COMPLIANCE</p>
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