import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/layout/Navbar';
import { ZikiDashboard } from './components/dashboard/ZikiDashboard';
import { SecurityLandingView } from './components/security/SecurityLandingView';
import { GoalFirstModal } from './components/onboarding/GoalFirstModal';
import { GoalId } from './types/onboarding';
import { Sparkles, Shield, Megaphone, Wrench, Layers, ExternalLink } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('security'); // default to security to highlight the requested page
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [initialGoal, setInitialGoal] = useState<GoalId>('security');
  const [userPoints, setUserPoints] = useState<number>(7871.42);
  const [completedInitiativesCount, setCompletedInitiativesCount] = useState<number>(0);

  const handleLaunchWithGoal = (goal: GoalId) => {
    setInitialGoal(goal);
    setIsOnboardingOpen(true);
  };

  const handleInitiativeCompleted = (pointsAwarded: number) => {
    setUserPoints((prev) => prev + pointsAwarded);
    setCompletedInitiativesCount((prev) => prev + 1);
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

      {/* Main Content Area */}
      <main className="flex-1 pb-24">
        {activeTab === 'security' && (
          <SecurityLandingView
            onBackToProduct={() => setActiveTab('product')}
            onLaunchSecurityGoal={() => handleLaunchWithGoal('security')}
            onLaunchGeneralOnboarding={() => handleLaunchWithGoal('security')}
          />
        )}

        {activeTab === 'product' && (
          <ZikiDashboard
            onLaunchOnboarding={() => handleLaunchWithGoal('improve')}
            activeInitiativesCount={completedInitiativesCount}
          />
        )}

        {activeTab === 'marketing' && (
          <div className="max-w-5xl mx-auto px-4 py-12 text-center space-y-6 animate-fadeIn">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Megaphone className="w-7 h-7" />
            </div>
            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-3xl font-bold text-white">Marketing & Growth Hub</h2>
              <p className="text-slate-300 text-sm">
                Scale high-intent organic traffic, technical SEO audits, and content strategy with autonomous agent assistance.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleLaunchWithGoal('marketing')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg transition-all"
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

      {/* Persistent Bottom Demo Bar for Internship Reviewers */}
      <aside aria-label="Reviewer quick controls" className="fixed bottom-0 inset-x-0 z-30 bg-[#0b1329]/95 border-t border-slate-800/90 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono font-bold text-white">Ziki HAI Demo:</span>
            <span className="text-slate-300 hidden md:inline">
              Goal-First Agent Onboarding Prototype
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-slate-400 text-[11px] hidden lg:inline">Quick Test Goals:</span>
            <button
              type="button"
              onClick={() => handleLaunchWithGoal('security')}
              className="px-2.5 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-400/30 text-blue-300 text-[11px] font-mono transition-colors"
            >
              🛡️ Security
            </button>
            <button
              type="button"
              onClick={() => handleLaunchWithGoal('marketing')}
              className="px-2.5 py-1 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/30 text-purple-300 text-[11px] font-mono transition-colors"
            >
              📣 Marketing
            </button>
            <button
              type="button"
              onClick={() => handleLaunchWithGoal('build')}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 text-emerald-300 text-[11px] font-mono transition-colors"
            >
              ✨ Build Product
            </button>
            <button
              type="button"
              onClick={() => handleLaunchWithGoal('improve')}
              className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 text-[11px] font-mono transition-colors"
            >
              🔧 Improve Existing
            </button>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Points: <strong className="text-amber-400 font-mono">{userPoints.toFixed(2)}</strong></span>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'security' ? 'product' : 'security')}
              className="text-cyan-400 hover:text-cyan-300 underline font-mono"
            >
              Switch to {activeTab === 'security' ? 'Product View' : 'Security View'}
            </button>
          </div>

        </div>
      </aside>

    </div>
  );
}

export default App;

