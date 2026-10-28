import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/layout/Navbar';
import { MyAgentsPage } from './components/agents/MyAgentsPage';
import { LocalAgentDashboard } from './components/localAgent/LocalAgentDashboard';
import { ZikiDashboard } from './components/dashboard/ZikiDashboard';
import { SecurityLandingView } from './components/security/SecurityLandingView';
import { GoalFirstModal } from './components/onboarding/GoalFirstModal';
import { GoalId } from './types/onboarding';
import { Sparkles, Terminal, Shield, Megaphone, Layers, Bot, X } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('my-agents'); // Default to My Agents page
  const [isAgentControlModalOpen, setIsAgentControlModalOpen] = useState(false);
  const [selectedAgentName, setSelectedAgentName] = useState('KDB (Reviewer)');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [initialGoal, setInitialGoal] = useState<GoalId>('security');
  const [userPoints, setUserPoints] = useState<number>(7871.42);
  const [completedInitiativesCount, setCompletedInitiativesCount] = useState<number>(1);
  const [pointsNotification, setPointsNotification] = useState<string | null>(null);

  const handleOpenAgentControl = (agentName: string) => {
    setSelectedAgentName(agentName);
    setIsAgentControlModalOpen(true);
  };

  const handleOpenApprovals = () => {
    setSelectedAgentName('KDB (Reviewer)');
    setIsAgentControlModalOpen(true);
  };

  const handleLaunchWithGoal = (goal: GoalId) => {
    setInitialGoal(goal);
    setIsOnboardingOpen(true);
  };

  const handleInitiativeCompleted = (pointsAwarded: number) => {
    setUserPoints((prev) => prev + pointsAwarded);
    setCompletedInitiativesCount((prev) => prev + 1);
    setPointsNotification(`+${pointsAwarded} pts awarded for approved initiative completion!`);
    setTimeout(() => {
      setPointsNotification(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 relative selection:bg-blue-600 selection:text-white font-sans">
      
      {/* Top Navbar matching Ziki */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'local-agent') {
            setIsAgentControlModalOpen(true);
          }
        }}
        onLaunchOnboarding={() => handleLaunchWithGoal('security')}
        userPoints={userPoints}
      />

      {/* Floating Live Points Award Toast */}
      {pointsNotification && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-white border border-emerald-300 shadow-lg animate-fade-in-up flex items-center gap-3 text-xs text-slate-800">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <span className="font-bold text-slate-900 block">Ziki Points Credited</span>
            <span className="text-emerald-700 font-mono font-medium">{pointsNotification}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-24 transition-opacity duration-300">
        
        {/* Primary View: My Agents Page (Faithful to Screenshot) */}
        {activeTab === 'my-agents' && (
          <MyAgentsPage
            onOpenAgentControl={handleOpenAgentControl}
            onOpenApprovals={handleOpenApprovals}
            onOpenCreateAgent={() => handleLaunchWithGoal('security')}
            onBackToSettings={() => setActiveTab('product')}
          />
        )}

        {/* Dedicated Local Agent Control View (Light Mode) */}
        {activeTab === 'local-agent' && (
          <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-4">
            <LocalAgentDashboard
              onBackToOverview={() => setActiveTab('my-agents')}
              onLaunchGoalOnboarding={() => handleLaunchWithGoal('security')}
            />
          </div>
        )}

        {/* Product Dashboard View */}
        {activeTab === 'product' && (
          <div className="bg-[#070c18] text-slate-100 min-h-screen py-4">
            <ZikiDashboard
              onLaunchOnboarding={(goalId) => handleLaunchWithGoal((goalId as GoalId) || 'improve')}
              activeInitiativesCount={completedInitiativesCount}
            />
          </div>
        )}

        {/* Security Hub View */}
        {activeTab === 'security' && (
          <div className="bg-[#070c18] text-slate-100 min-h-screen py-4">
            <SecurityLandingView
              onBackToProduct={() => setActiveTab('my-agents')}
              onLaunchSecurityGoal={() => handleLaunchWithGoal('security')}
              onLaunchGeneralOnboarding={() => handleLaunchWithGoal('security')}
            />
          </div>
        )}

        {/* Marketing Hub View */}
        {activeTab === 'marketing' && (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in-up">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-xs">
              <Megaphone className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Marketing & Growth Hub</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Scale high-intent organic traffic, technical SEO audits, and content strategy with autonomous agent squad assistance under human oversight.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleLaunchWithGoal('marketing')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
            >
              Start Marketing & SEO Onboarding
            </button>
          </div>
        )}

      </main>

      {/* Light Mode Local Agent Control Modal (Triggered by 'Messages and instructions' or 'Activity & Approvals') */}
      {isAgentControlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-900/50 backdrop-blur-sm overflow-y-auto animate-fade-in-up">
          <div className="relative w-full max-w-6xl my-auto rounded-3xl bg-[#f8fafc] text-slate-800 border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
            
            {/* Clean Light Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between gap-4 shrink-0 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
                  <Terminal className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase">
                      Ziki Local Agent Control
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold">
                      Target: {selectedAgentName}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Live Web-to-Terminal Coordination Demonstration
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAgentControlModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Close and return to My agents"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#f8fafc]">
              <LocalAgentDashboard
                onBackToOverview={() => setIsAgentControlModalOpen(false)}
                onLaunchGoalOnboarding={() => {
                  setIsAgentControlModalOpen(false);
                  handleLaunchWithGoal('security');
                }}
              />
            </div>

          </div>
        </div>
      )}

      {/* Core Onboarding Multi-Step Flow Modal */}
      <GoalFirstModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        initialGoal={initialGoal}
        onInitiativeCompleted={handleInitiativeCompleted}
      />

      {/* Persistent Bottom Demo Bar for Reviewers */}
      <aside aria-label="Reviewer quick controls" className="fixed bottom-0 inset-x-0 z-30 bg-white/95 border-t border-slate-200 backdrop-blur-md px-4 py-2.5 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
            <span className="font-mono font-bold text-slate-900">Ziki Proposed HAI Demo:</span>
            <span className="text-slate-600 hidden md:inline">
              "My agents" page with interactive Local Agent Control (Light Mode)
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-slate-500 text-[11px] hidden lg:inline">Quick Demo Actions:</span>
            <button
              type="button"
              onClick={() => handleOpenAgentControl('KDB (Reviewer)')}
              className="px-3 py-1 rounded-lg bg-blue-600 text-white font-semibold text-[11px] shadow-sm hover:bg-blue-500 transition-colors"
            >
              💬 Open "Messages & instructions" Demo
            </button>
            <button
              type="button"
              onClick={handleOpenApprovals}
              className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-[11px] font-semibold transition-colors"
            >
              🛡️ "Activity & Approvals"
            </button>
            <button
              type="button"
              onClick={() => handleLaunchWithGoal('security')}
              className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-[11px] font-semibold transition-colors"
            >
              ✨ "Create agent" (Goal Flow)
            </button>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span>Points: <strong className="text-amber-600 font-mono font-bold">{userPoints.toFixed(2)}</strong></span>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'my-agents' ? 'product' : 'my-agents')}
              className="text-blue-600 hover:text-blue-800 underline font-semibold"
            >
              {activeTab === 'my-agents' ? 'View Dark Product Dashboard' : 'View "My agents" Page'}
            </button>
          </div>

        </div>
      </aside>

    </div>
  );
}

export default App;
