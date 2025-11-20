import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type IdentityState = 'default' | 'tracing' | 'diagnosis' | 'resolving' | 'resolved';

export function IdentityHelpDesk() {
  const [state, setState] = useState<IdentityState>('default');
  const [scanProgress, setScanProgress] = useState(0);

  const handleTrace = () => {
    setState('tracing');
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
              <IdentityTopology highlighted={null} />
              <div className="mt-12 text-center">
                <p className="text-[#111827] mb-2">User: john.doe@company.com</p>
                <p className="text-[#6b7280] text-sm mb-6">Issue: Cannot access company resources</p>
                <button
                  onClick={handleTrace}
                  className="px-8 py-3 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
                >
                  TRACE ISSUE
                </button>
              </div>
            </motion.div>
          )}

          {state === 'tracing' && (
            <motion.div
              key="tracing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-12"
            >
              <IdentityTopology highlighted="password" />
              <motion.div
                className="absolute top-0 left-0 h-1 bg-[#f97316]"
                initial={{ width: '0%' }}
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.1 }}
              />
              {scanProgress === 100 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setState('diagnosis')}
                  className="mt-12 px-8 py-3 bg-[#f97316] text-white rounded-lg hover:bg-[#ea580c] transition-colors"
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
                <h3 className="text-[#111827] mb-2">Issue Identified</h3>
                <p className="text-sm text-[#6b7280]">Password expiration detected</p>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">USER STATUS</p>
                  <p className="text-[#111827]">Active</p>
                </div>
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">PASSWORD STATUS</p>
                  <p className="text-[#111827]">Expired 2 days ago</p>
                </div>
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">MFA STATUS</p>
                  <p className="text-[#111827]">Enabled</p>
                </div>
                <div className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-6">
                  <p className="text-sm text-[#6b7280] mb-2">DIRECTORY</p>
                  <p className="text-[#111827]">Healthy</p>
                </div>
              </div>
              <div className="bg-[#fff7ed] rounded-lg border border-[#f97316] p-6 mb-8">
                <p className="text-sm text-[#6b7280] mb-2">ROOT CAUSE</p>
                <p className="text-[#111827]">Password expired — automatic reset required</p>
              </div>
              <button
                onClick={() => setState('resolving')}
                className="px-8 py-3 bg-[#f97316] text-white rounded-lg hover:bg-[#ea580c] transition-colors"
              >
                AUTO-RESOLVE
              </button>
            </motion.div>
          )}

          {state === 'resolving' && (
            <motion.div
              key="resolving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-12"
            >
              <h3 className="text-[#111827] mb-12">Resolution In Progress</h3>
              <ProgressSteps
                steps={[
                  'Validating user identity...',
                  'Generating temporary password...',
                  'Updating directory...',
                  'Sending reset email...',
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
              <h3 className="text-[#111827] mb-4">Password Reset Successful</h3>
              <p className="text-[#6b7280] mb-2">Temporary password sent to: john.doe@company.com</p>
              <p className="text-[#6b7280] mb-12">User prompted to change on next login</p>
              <button
                onClick={() => setState('default')}
                className="px-8 py-3 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
              >
                BACK TO IDENTITY
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function IdentityTopology({ highlighted }: { highlighted: string | null }) {
  return (
    <div className="relative w-full max-w-4xl flex items-center justify-center gap-8">
      <div className="border-2 border-[#6b7280] px-8 py-4 rounded-lg bg-[#f9fafb]">
        <p className="text-[#111827] text-sm">USER</p>
      </div>
      
      <motion.div
        className="w-12 h-0.5 bg-[#38bdf8]"
        animate={highlighted === 'password' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
      
      <div className="border-2 border-[#38bdf8] px-8 py-4 rounded-lg bg-[#f0f9ff]">
        <p className="text-[#111827] text-sm">IdP</p>
      </div>
      
      <motion.div
        className="w-12 h-0.5 bg-[#38bdf8]"
        animate={highlighted === 'password' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />
      
      <div
        className={`border-2 px-6 py-4 rounded-lg ${
          highlighted === 'password' ? 'border-[#f97316] bg-[#fff7ed] shadow-lg' : 'border-[#38bdf8] bg-[#f0f9ff]'
        }`}
      >
        <p className={`text-sm ${highlighted === 'password' ? 'text-[#f97316]' : 'text-[#111827]'}`}>PASSWORD</p>
        <p className={`text-sm ${highlighted === 'password' ? 'text-[#f97316]' : 'text-[#111827]'}`}>POLICY</p>
      </div>
      
      <motion.div
        className="w-12 h-0.5 bg-[#38bdf8]"
        animate={highlighted === 'password' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      />
      
      <div className="border-2 border-[#22c55e] px-8 py-4 rounded-lg bg-[#f0fdf4]">
        <p className="text-[#111827] text-sm">MFA</p>
      </div>
      
      <motion.div
        className="w-12 h-0.5 bg-[#38bdf8]"
        animate={highlighted === 'password' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
      />
      
      <div className="border-2 border-[#6b7280] px-8 py-4 rounded-lg bg-[#f9fafb]">
        <p className="text-[#111827] text-sm">EMAIL</p>
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
              index <= currentStep ? 'border-[#f97316] bg-[#f97316]' : 'border-[#e5e7eb] bg-white'
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