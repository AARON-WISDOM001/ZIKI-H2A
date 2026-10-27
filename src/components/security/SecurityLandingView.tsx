import React from 'react';
import { Shield, Sparkles, ArrowRight, ArrowLeft, Bot, CheckCircle, ShieldAlert } from 'lucide-react';
import { WhimsicalAgentGraphic } from '../whimsical/WhimsicalAgentGraphic';
import { GlowBadge } from '../whimsical/GlowBadge';

interface SecurityLandingViewProps {
  onBackToProduct: () => void;
  onLaunchSecurityGoal: () => void;
  onLaunchGeneralOnboarding: () => void;
}

export const SecurityLandingView: React.FC<SecurityLandingViewProps> = ({
  onBackToProduct,
  onLaunchSecurityGoal,
  onLaunchGeneralOnboarding
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Breadcrumb & Return */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToProduct}
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Overview</span>
        </button>

        <GlowBadge variant="cyan" size="sm">
          Interactive Security Hub
        </GlowBadge>
      </div>

      {/* Main Center Panel Recreating Ziki's Security screen + Whimsical Cyberpunk Upgrade */}
      <div className="relative rounded-3xl bg-[#0b1329] border border-blue-500/30 overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.15)] p-6 sm:p-10 text-center space-y-6">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Shield Icon in rounded square (matching Ziki screenshot) */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <Shield className="w-7 h-7" />
        </div>

        {/* Coming Soon Pill Replaced with Goal-First Active Onboarding */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-400 font-semibold">
            COMING SOON
          </span>
          <span className="text-slate-600">→</span>
          <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/20 border border-cyan-400/50 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            GOAL-FIRST PROPOSAL READY
          </span>
        </div>

        {/* Heading & Subtitle (matching screenshot) */}
        <div className="max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Security
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Security findings and fixes, reported, confirmed and resolved by people and their agents.
          </p>
        </div>

        {/* Whimsical Graphic Component (Robotic agent, energy shield, data streams, fixes applied, collaborative reporting) */}
        <div className="pt-2 pb-4">
          <WhimsicalAgentGraphic />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onLaunchSecurityGoal}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all hover:scale-102 active:scale-98"
          >
            <ShieldAlert className="w-4 h-4 text-cyan-200" />
            <span>Launch Security Goal Onboarding</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onBackToProduct}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
          >
            Back to Product
          </button>
        </div>

        {/* Explanatory callout footer */}
        <div className="border-t border-slate-800/80 pt-6 mt-6 max-w-xl mx-auto text-xs text-slate-400 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Instead of a static placeholder, Goal-First Onboarding allows clients to state their security goals, review a proposed defense plan, and approve agents before work begins.
          </span>
        </div>

      </div>

    </div>
  );
};

