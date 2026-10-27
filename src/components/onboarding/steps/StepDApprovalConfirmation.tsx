import React from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Bot, 
  ArrowRight, 
  ArrowLeft, 
  FileCheck,
  Sparkles,
  Lock
} from 'lucide-react';
import { ProjectBrief } from '../../../types/onboarding';

interface StepDApprovalConfirmationProps {
  brief: ProjectBrief;
  onProceedToCollaboration: () => void;
  onBackToBrief: () => void;
}

export const StepDApprovalConfirmation: React.FC<StepDApprovalConfirmationProps> = ({
  brief,
  onProceedToCollaboration,
  onBackToBrief
}) => {
  return (
    <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto py-4">
      
      {/* Central Success Stamp */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-950/60 to-slate-900 border border-emerald-500/40 text-center space-y-5 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Animated checkmark badge */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
          <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold">
            <span>HUMAN APPROVAL RECORDED</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Plan Approved & Authorized
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            You have successfully approved the project brief for <strong className="text-white">{brief.goalTitle}</strong>. 
            The multi-agent execution squad is ready to begin collaborative work under human guardrails.
          </p>
        </div>

        {/* Summary of Approved Scope */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 grid grid-cols-3 gap-3 text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Authorized Tasks</span>
            <p className="text-base font-bold text-white font-mono">{brief.proposedTasks.length} tasks</p>
          </div>
          <div className="space-y-1 border-x border-slate-800 px-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Assigned Squad</span>
            <p className="text-base font-bold text-cyan-300 font-mono">{brief.suggestedAgents.length} agents</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Human Gates</span>
            <p className="text-base font-bold text-amber-300 font-mono">
              {brief.proposedTasks.filter((t) => t.requiresHumanApproval).length} checkpoints
            </p>
          </div>
        </div>

        {/* Governance attestation */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Cryptographically logged approval token: #ZIKI-APPR-{(Math.random() * 10000).toFixed(0)}</span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onBackToBrief}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Review Plan Details</span>
          </button>

          <button
            type="button"
            onClick={onProceedToCollaboration}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2"
          >
            <Bot className="w-4 h-4" />
            <span>Launch Simulated Agent Collaboration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};

