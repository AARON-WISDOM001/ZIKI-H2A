import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/layout/Navbar';
import { ZikiDashboard } from './components/dashboard/ZikiDashboard';
import { SecurityLandingView } from './components/security/SecurityLandingView';
import { GoalFirstModal } from './components/onboarding/GoalFirstModal';
import { GoalId } from './types/onboarding';
import { Sparkles, Shield, Megaphone, Wrench, Layers, ExternalLink, Bot, CheckCircle } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('product'); // default to product dashboard as requested
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [initialGoal, setInitialGoal] = useState<GoalId>('security');
  const [userPoints, setUserPoints] = useState<number>(7871.42);
  const [completedInitiativesCount, setCompletedInitiativesCount] = useState<number>(0);
  const [pointsNotification, setPointsNotification] = useState<string | null>(null);

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
    <div className="min-h-screen flex flex-col bg-[#070c18] text-slate-100 cyber-grid relative selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar matching Ziki */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onLaunchOnboarding={() => handleLaunchWithGoal('security')}
        userPoints={userPoints}
      />

      {/* Floating Live Points Award Toast */}
      {pointsNotification && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 border border-emerald-400/60 shadow-[0_0_35px_rgba(16,185,129,0.35)] animate-fade-in-up flex items-center gap-3 text-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
          </div>
          <div>
            <span className="font-bold text-white block">Ziki Points Credited</span>
            <span className="text-emerald-300 font-mono">{pointsNotification}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-24 transition-opacity duration-300">
        {activeTab === 'product' && (
          <ZikiDashboard
            onLaunchOnboarding={(goalId) => handleLaunchWithGoal((goalId as GoalId) || 'security')}
            activeInitiativesCount={completedInitiativesCount}
          />
        )}

        {activeTab === 'security' && (
          <SecurityLandingView
            onBackToProduct={() => setActiveTab('product')}
            onLaunchSecurityGoal={() => handleLaunchWithGoal('security')}
            onLaunchGeneralOnboarding={() => handleLaunchWithGoal('security')}
          />
        )}

        {activeTab === 'marketing' && (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in-up">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/15 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.3)]">
              <Megaphone className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Marketing & Growth Hub</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Scale high-intent organic traffic, technical SEO audits, and content strategy with autonomous agent squad assistance under human oversight.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleLaunchWithGoal('marketing')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              Start Marketing & SEO Onboarding
            </button>
          </div>
        )}
      </main>

      {/* Core Onboarding Multi-Step Flow Modal */}
      <GoalFirstModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        initialGoal={initialGoal}
        onInitiativeCompleted={handleInitiativeCompleted}
      />

      {/* Persistent Bottom Demo Bar for Reviewers */}
      <aside aria-label="Reviewer quick controls" className="fixed bottom-0 inset-x-0 z-30 bg-[#0b1329]/95 border-t border-slate-800/90 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono font-bold text-white">Goal-First Onboarding Demo:</span>
            <span className="text-slate-300 hidden md:inline">
              Living Agent Mascot & Human-in-the-Loop Workflow
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-slate-400 text-[11px] hidden lg:inline">Test Goal Flows:</span>
            <button
              type="button"
              onClick={() => handleLaunchWithGoal('security')}
              className="px-2.5 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/30 border border-blue-400/40 text-cyan-300 text-[11px] font-mono transition-all hover:scale-105"
            >
              🛡️ Security
            </button>
            <button
              type="button"
              onClick={() => handleLaunchWithGoal('marketing')}
              className="px-2.5 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-500/30 border border-purple-400/40 text-purple-300 text-[11px] font-mono transition-all hover:scale-105"
            >
              📣 Marketing
            </button>
            <button
              type="button"
              onClick={() => handleLaunchWithGoal('build')}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-[11px] font-mono transition-all hover:scale-105"
            >
              ✨ Build Product
            </button>
            <button
              type="button"
              onClick={() => handleLaunchWithGoal('improve')}
              className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-[11px] font-mono transition-all hover:scale-105"
            >
              🔧 Improve Existing
            </button>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Points: <strong className="text-amber-400 font-mono">{userPoints.toFixed(2)}</strong></span>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'product' ? 'security' : 'product')}
              className="text-cyan-400 hover:text-cyan-300 underline font-mono transition-colors"
            >
              View {activeTab === 'product' ? 'Security Hub Reference' : 'Main Product View'}
            </button>
          </div>

        </div>
      </aside>

    </div>
  );
}

export default App;
