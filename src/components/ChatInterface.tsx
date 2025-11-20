import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { IncidentMessage } from './IncidentMessage';
import { AutoFixMessage } from './AutoFixMessage';
import { SuccessMessage } from './SuccessMessage';
import { UserMessage } from './UserMessage';
import { InvestigationMessage } from './InvestigationMessage';
import { DiagnosisMessage } from './DiagnosisMessage';
import { FixOptionsMessage } from './FixOptionsMessage';
import { PasswordResetMessage } from './PasswordResetMessage';
import { PasswordResetSuccessMessage } from './PasswordResetSuccessMessage';
import { CompatibilityScanMessage } from './CompatibilityScanMessage';
import { CompatibilityReportMessage } from './CompatibilityReportMessage';
import { DeploymentConfirmationMessage } from './DeploymentConfirmationMessage';
import { OSDeploymentMessage } from './OSDeploymentMessage';
import { DeploymentSummaryMessage } from './DeploymentSummaryMessage';
import { SecurityAlertMessage } from './SecurityAlertMessage';
import { ThreatAnalysisMessage } from './ThreatAnalysisMessage';
import { ContainmentActionsMessage } from './ContainmentActionsMessage';
import { NetworkValidationMessage } from './NetworkValidationMessage';
import { IncidentReviewMessage } from './IncidentReviewMessage';
import { IncidentReviewConfirmationMessage } from './IncidentReviewConfirmationMessage';
import { ReportsSection } from './ReportsSection';
import { IssueHistory } from './IssueHistory';
import { toast } from 'sonner';
import { Home, Send } from 'lucide-react';

type ChatState = 'idle' | 'alert' | 'incident' | 'fixing' | 'success' | 'user_message' | 'investigating' | 'diagnosis' | 'fix_options' | 'password_reset' | 'password_success' | 'compatibility_scan' | 'compatibility_report' | 'deployment_confirmation' | 'os_deployment' | 'deployment_summary' | 'security_alert' | 'security_details' | 'security_review' | 'security_confirmed';

interface Issue {
  id: string;
  title: string;
  location: string;
  status: 'active' | 'resolving' | 'resolved' | 'ignored';
  timestamp: Date;
  severity: 'critical' | 'warning' | 'info';
  type: 'wifi-outage' | 'login-failure' | 'os-deployment' | 'security-breach';
}

export function ChatInterface() {
  const [state, setState] = useState<ChatState>('idle');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'reports'>('chat');
  const [hasUnreadReports, setHasUnreadReports] = useState(false);
  const [unreadReportsCount, setUnreadReportsCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Add the initial issues
      const wifiIssue: Issue = {
        id: '1',
        title: 'Wi-Fi Outage',
        location: 'Science Building — AP SC-14',
        status: 'active',
        timestamp: new Date(),
        severity: 'critical',
        type: 'wifi-outage',
      };

      const securityIssue: Issue = {
        id: '2',
        title: 'Security Breach',
        location: 'Malicious intrusion attempt — IP 203.0.113.45 blocked',
        status: 'active',
        timestamp: new Date(new Date().setHours(2, 47, 0, 0)), // Set to 2:47 AM
        severity: 'warning',
        type: 'security-breach',
      };

      setIssues([securityIssue, wifiIssue]);
      setSelectedIssue(wifiIssue);
      setState('alert');
      setShowHistory(true);
      setHasUnreadReports(true);
      setUnreadReportsCount(1);
      
      // Show toast notification for Wi-Fi outage
      toast.error('Wi-Fi Outage Detected', {
        description: 'Science Building — AP SC-14 offline. DHCP pool nearly exhausted.',
        duration: 10000,
        onClick: () => {
          handleViewIncident();
        },
        action: {
          label: 'View',
          onClick: () => {
            handleViewIncident();
          },
        },
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleViewIncident = () => {
    setState('incident');
    setShowHistory(true);
    if (selectedIssue) {
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === selectedIssue.id ? { ...issue, status: 'active' } : issue
        )
      );
    }
  };

  const handleAutoFix = () => {
    setState('fixing');
    if (selectedIssue) {
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === selectedIssue.id ? { ...issue, status: 'resolving' } : issue
        )
      );
    }
  };

  const handleComplete = () => {
    setState('success');
    if (selectedIssue) {
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === selectedIssue.id ? { ...issue, status: 'resolved' } : issue
        )
      );
    }
    
    // Return to home page after 3 seconds
    setTimeout(() => {
      setState('idle');
      setSelectedIssue(null);
    }, 3000);
  };

  const handleSelectIssue = (issue: Issue) => {
    setSelectedIssue(issue);
    
    // Determine which flow to show based on issue type
    if (issue.type === 'wifi-outage') {
      // Wi-Fi outage flow
      if (issue.status === 'resolved') {
        setState('success');
      } else if (issue.status === 'resolving') {
        setState('fixing');
      } else if (issue.status === 'ignored') {
        setState('idle');
      } else {
        setState('incident');
      }
    } else if (issue.type === 'login-failure') {
      // Login failure flow - recreate the conversation
      if (issue.status === 'resolved') {
        // Show the full resolved flow
        setUserMessage("Hi Rardi, I can't log in to my email. Can you check what's wrong?");
        setState('password_success');
      } else if (issue.status === 'ignored') {
        setState('idle');
      } else {
        // Show active login investigation
        setUserMessage("Hi Rardi, I can't log in to my email. Can you check what's wrong?");
        setState('fix_options');
      }
    } else if (issue.type === 'os-deployment') {
      // OS deployment flow
      if (issue.status === 'resolved') {
        setUserMessage("Rardi, I want to upgrade all staff devices from Windows 11 to Windows 12. Can you check which devices are compatible?");
        setState('deployment_summary');
      } else if (issue.status === 'ignored') {
        setState('idle');
      } else {
        setUserMessage("Rardi, I want to upgrade all staff devices from Windows 11 to Windows 12. Can you check which devices are compatible?");
        setState('deployment_confirmation');
      }
    } else if (issue.type === 'security-breach') {
      // Security breach flow
      if (issue.status === 'resolved') {
        setState('security_confirmed');
      } else if (issue.status === 'ignored') {
        setState('idle');
      } else {
        setState('security_details');
      }
    }
  };

  const handleIgnoreIssue = (issueId: string) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === issueId ? { ...issue, status: 'ignored' } : issue
      )
    );
    if (selectedIssue?.id === issueId) {
      setState('idle');
      setSelectedIssue(null);
    }
    toast.info('Issue Ignored', {
      description: 'The issue has been marked as ignored and removed from active monitoring.',
      duration: 3000,
    });
  };

  const handleReturnHome = () => {
    setState('idle');
    setSelectedIssue(null);
    setUserMessage('');
    setInputValue('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Store user message
    setUserMessage(inputValue);
    const message = inputValue.toLowerCase();
    setInputValue('');
    setState('user_message');

    // Determine which flow based on message content
    if (message.includes('login') || message.includes('email')) {
      // Login failure flow
      setTimeout(() => {
        setState('investigating');
      }, 800);
    } else if (message.includes('upgrade') || message.includes('windows') || message.includes('os')) {
      // OS deployment flow
      setTimeout(() => {
        setState('compatibility_scan');
      }, 800);
    } else {
      // Default to login flow
      setTimeout(() => {
        setState('investigating');
      }, 800);
    }
  };

  const handleInvestigationComplete = () => {
    setState('diagnosis');
    // Show fix options after diagnosis
    setTimeout(() => {
      setState('fix_options');
    }, 2000);
  };

  const handleAutoFixPassword = () => {
    setState('password_reset');
  };

  const handleManualSteps = () => {
    // For now, just show a simple implementation
    alert('Manual steps would be shown here');
  };

  const handlePasswordResetComplete = () => {
    setState('password_success');
  };

  const handleResolvePasswordIssue = () => {
    // Add to issue history
    const newIssue: Issue = {
      id: Date.now().toString(),
      title: 'Login Failure',
      location: 'john.smith@university.edu — Password Expired',
      status: 'resolved',
      timestamp: new Date(),
      severity: 'warning',
      type: 'login-failure',
    };
    
    setIssues((prev) => [newIssue, ...prev]);
    setShowHistory(true);
    
    // Return to home
    setState('idle');
    setUserMessage('');
    setInputValue('');
  };

  const handleCompatibilityScanComplete = () => {
    setState('compatibility_report');
    setTimeout(() => {
      setState('deployment_confirmation');
    }, 3000);
  };

  const handleDeploymentProceed = () => {
    setState('os_deployment');
  };

  const handleDeploymentSchedule = () => {
    alert('Scheduling feature would be shown here');
  };

  const handleDeploymentExport = () => {
    alert('Report export would be triggered here');
  };

  const handleDeploymentSelectDevices = () => {
    alert('Device selection interface would be shown here');
  };

  const handleOSDeploymentComplete = () => {
    setState('deployment_summary');
  };

  const handleDeploymentTaskComplete = () => {
    // Add to issue history
    const newIssue: Issue = {
      id: Date.now().toString(),
      title: 'OS Deployment',
      location: 'Windows 12 Upgrade — 5 devices upgraded successfully',
      status: 'resolved',
      timestamp: new Date(),
      severity: 'info',
      type: 'os-deployment',
    };
    
    setIssues((prev) => [newIssue, ...prev]);
    setShowHistory(true);
    
    // Return to home
    setState('idle');
    setUserMessage('');
    setInputValue('');
  };

  const handleSecurityAlert = () => {
    setState('security_details');
  };

  const handleThreatAnalysisComplete = () => {
    setState('containment_actions');
  };

  const handleContainmentActionsComplete = () => {
    setState('network_validation');
  };

  const handleNetworkValidationComplete = () => {
    setState('incident_review');
  };

  const handleIncidentReviewComplete = () => {
    setState('incident_review_confirmation');
  };

  const handleIncidentReviewConfirmation = () => {
    setState('security_confirmed');
  };

  const handleViewSecurityDetails = () => {
    setState('security_details');
    setActiveTab('chat');
  };

  const handleMarkSecurityReviewed = () => {
    setState('security_review');
    setHasUnreadReports(false);
    setUnreadReportsCount(0);
    
    // Update the security issue to resolved
    if (selectedIssue) {
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === selectedIssue.id ? { ...issue, status: 'resolved' } : issue
        )
      );
    }
    
    setTimeout(() => {
      setState('security_confirmed');
      // Return to home after confirmation
      setTimeout(() => {
        setState('idle');
        setSelectedIssue(null);
        setActiveTab('chat');
      }, 3000);
    }, 2000);
  };

  const handleSecurityIncidentComplete = () => {
    // Return to home
    setState('idle');
    setUserMessage('');
    setInputValue('');
    setSelectedIssue(null);
  };

  return (
    <div className="flex h-full">
      {/* Issue History Sidebar */}
      {showHistory && (
        <IssueHistory 
          issues={issues} 
          selectedIssue={selectedIssue}
          onSelectIssue={handleSelectIssue}
          onIgnoreIssue={handleIgnoreIssue}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">R</span>
              </div>
              <h1 className="font-semibold">Rardi</h1>
            </div>
            
            {/* Tabs */}
            <nav className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'chat'
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors relative ${
                  activeTab === 'reports'
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                Reports
                {unreadReportsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#f97316] text-white text-xs flex items-center justify-center">
                    {unreadReportsCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {state !== 'idle' && state !== 'alert' && activeTab === 'chat' && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleReturnHome}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
            )}
            <Badge variant="outline" className="gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Guardian Active
            </Badge>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative min-h-0">
          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <ReportsSection onViewSecurityDetails={handleViewSecurityDetails} />
          )}

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className={`max-w-3xl mx-auto space-y-4 ${(state === 'idle' || state === 'alert') ? 'h-full flex items-center justify-center' : ''}`}>
                  <AnimatePresence mode="wait">
                    {state === 'idle' && (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-2xl"
                      >
                        <div className="flex flex-col items-center justify-center space-y-6">
                          <h2 className="text-center">What can I help you with today?</h2>
                          <form onSubmit={handleSendMessage} className="w-full relative">
                            <input
                              type="text"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              placeholder="Message Rardi..."
                              className="w-full rounded-md border border-input bg-background px-4 py-3 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                            <button 
                              type="submit"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"/>
                                <path d="M12 5v14"/>
                              </svg>
                            </button>
                          </form>
                        </div>
                      </motion.div>
                    )}

                    {state === 'alert' && (
                      <motion.div
                        key="alert"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-2xl"
                      >
                        <div className="flex flex-col items-center justify-center space-y-6">
                          <h2 className="text-center">What can I help you with today?</h2>
                          <form onSubmit={handleSendMessage} className="w-full relative">
                            <input
                              type="text"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              placeholder="Message Rardi..."
                              className="w-full rounded-md border border-input bg-background px-4 py-3 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                            <button 
                              type="submit"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"/>
                                <path d="M12 5v14"/>
                              </svg>
                            </button>
                          </form>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Conversational Messages */}
                  {state !== 'idle' && state !== 'alert' && state !== 'incident' && state !== 'fixing' && state !== 'success' && (
                    <div className="space-y-4">
                      {userMessage && <UserMessage message={userMessage} />}
                      
                      {/* Login Failure Flow */}
                      {state === 'investigating' && (
                        <InvestigationMessage onComplete={handleInvestigationComplete} />
                      )}
                      
                      {(state === 'diagnosis' || state === 'fix_options' || state === 'password_reset' || state === 'password_success') && (
                        <DiagnosisMessage />
                      )}
                      
                      {state === 'fix_options' && (
                        <FixOptionsMessage 
                          onAutoFix={handleAutoFixPassword}
                          onManualSteps={handleManualSteps}
                        />
                      )}
                      
                      {(state === 'password_reset' || state === 'password_success') && selectedIssue?.type !== 'login-failure' && (
                        <PasswordResetMessage onComplete={handlePasswordResetComplete} />
                      )}
                      
                      {state === 'password_success' && (
                        <PasswordResetSuccessMessage onResolveIssue={handleResolvePasswordIssue} />
                      )}

                      {/* OS Deployment Flow */}
                      {state === 'compatibility_scan' && (
                        <CompatibilityScanMessage onComplete={handleCompatibilityScanComplete} />
                      )}
                      
                      {(state === 'compatibility_report' || state === 'deployment_confirmation' || state === 'os_deployment' || state === 'deployment_summary') && (
                        <CompatibilityReportMessage />
                      )}
                      
                      {state === 'deployment_confirmation' && (
                        <DeploymentConfirmationMessage
                          onProceed={handleDeploymentProceed}
                          onSchedule={handleDeploymentSchedule}
                          onExport={handleDeploymentExport}
                          onSelectDevices={handleDeploymentSelectDevices}
                        />
                      )}
                      
                      {(state === 'os_deployment' || state === 'deployment_summary') && selectedIssue?.type !== 'os-deployment' && (
                        <OSDeploymentMessage onComplete={handleOSDeploymentComplete} />
                      )}
                      
                      {state === 'deployment_summary' && (
                        <DeploymentSummaryMessage onComplete={handleDeploymentTaskComplete} />
                      )}

                      {/* Security Breach Flow - Detailed Report */}
                      {(state === 'security_details' || state === 'security_review' || state === 'security_confirmed') && (
                        <>
                          <ThreatAnalysisMessage />
                          <ContainmentActionsMessage />
                          <NetworkValidationMessage />
                        </>
                      )}

                      {state === 'security_details' && (
                        <IncidentReviewMessage onMarkReviewed={handleMarkSecurityReviewed} />
                      )}

                      {(state === 'security_review' || state === 'security_confirmed') && (
                        <IncidentReviewConfirmationMessage />
                      )}
                    </div>
                  )}

                  {/* Wi-Fi Incident Messages */}
                  <AnimatePresence mode="wait">
                    {state === 'incident' && (
                      <IncidentMessage key="incident" onAutoFix={handleAutoFix} />
                    )}

                    {state === 'fixing' && (
                      <AutoFixMessage key="fixing" onComplete={handleComplete} />
                    )}

                    {state === 'success' && (
                      <SuccessMessage key="success" />
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Input Bar - Only show when not idle or alert */}
              {state !== 'idle' && state !== 'alert' && (
                <div className="border-t p-4 bg-background">
                  <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSendMessage} className="relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Message Rardi..."
                        className="w-full rounded-md border border-input bg-background px-4 py-3 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                      <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                        disabled={!inputValue.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}