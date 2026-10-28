import React, { useState } from 'react';
import { 
  HelpCircle, 
  GitFork, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Edit3, 
  Check, 
  AlertCircle,
  Lightbulb,
  Compass
} from 'lucide-react';
import { ClarificationProposal } from '../../types/localAgent';

interface ClarificationCardProps {
  proposal: ClarificationProposal;
  onSelectOption: (optionId: 'option-a' | 'option-b' | 'custom', customText?: string) => void;
  onResetClarification: () => void;
}

export const ClarificationCard: React.FC<ClarificationCardProps> = ({
  proposal,
  onSelectOption,
  onResetClarification
}) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customText, setCustomText] = useState('');

  const isResolved = proposal.status === 'resolved';

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;
    onSelectOption('custom', customText.trim());
  };

  return (
    <div className="relative rounded-3xl bg-[#0b1329] border border-cyan-500/30 p-5 sm:p-6 shadow-xl space-y-5 animate-fade-in-up">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 right-10 w-48 h-20 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <Compass className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold">
                HUMAN GUIDANCE REQUIRED
              </span>
              <span className="text-xs text-slate-400 font-mono">· Architectural Fork</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mt-0.5">
              Agent Clarification Request
            </h3>
          </div>
        </div>

        {isResolved ? (
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Resolved by Human</span>
            </span>
            <button
              type="button"
              onClick={onResetClarification}
              className="text-xs text-slate-400 hover:text-white underline font-mono ml-1"
            >
              Reset
            </button>
          </div>
        ) : (
          <span className="text-xs font-mono text-amber-300 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>Agent Paused Pending Decision</span>
          </span>
        )}
      </div>

      {/* Agent Question & Context Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
        <p className="text-sm font-semibold text-white leading-relaxed">
          "{proposal.question}"
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Context:</strong> {proposal.context}
        </p>
      </div>

      {/* Alternative Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        
        {/* Option A */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => !isResolved && onSelectOption('option-a')}
          className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
            proposal.chosenOption === 'option-a'
              ? 'bg-blue-950/70 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)] ring-2 ring-cyan-400/50'
              : 'bg-slate-900/50 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/80'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                {proposal.optionA.badge}
              </span>
              {proposal.chosenOption === 'option-a' && (
                <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white">
              {proposal.optionA.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {proposal.optionA.description}
            </p>
          </div>

          <div className="mt-4 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400">
            <span className="text-slate-500 font-mono">Trade-off:</span> {proposal.optionA.tradeoff}
          </div>
        </div>

        {/* Option B */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => !isResolved && onSelectOption('option-b')}
          className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
            proposal.chosenOption === 'option-b'
              ? 'bg-blue-950/70 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)] ring-2 ring-cyan-400/50'
              : 'bg-slate-900/50 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/80'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold">
                {proposal.optionB.badge}
              </span>
              {proposal.chosenOption === 'option-b' && (
                <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white">
              {proposal.optionB.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {proposal.optionB.description}
            </p>
          </div>

          <div className="mt-4 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400">
            <span className="text-slate-500 font-mono">Trade-off:</span> {proposal.optionB.tradeoff}
          </div>
        </div>

      </div>

      {/* Option C: Custom Instruction Drawer */}
      <div className="pt-2 border-t border-slate-800/80">
        {!isCustomMode && proposal.chosenOption !== 'custom' ? (
          <button
            type="button"
            onClick={() => setIsCustomMode(true)}
            className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Neither approach? Provide a custom instruction instead →</span>
          </button>
        ) : proposal.chosenOption === 'custom' ? (
          <div className="p-3.5 rounded-xl bg-blue-950/60 border border-cyan-400/50 text-xs text-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-cyan-300 font-bold block uppercase">Custom Human Instruction Applied</span>
              <p className="text-slate-100 font-medium">"{proposal.customInstruction}"</p>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <label className="block text-xs font-semibold text-slate-300">
              Provide specific custom guidance to the agent:
            </label>
            <input
              type="text"
              placeholder="e.g., Use an accessible slide-over sheet with Tailwind classes only, no external drawer library..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCustomMode(false)}
                className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!customText.trim()}
                className="px-3.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-bold text-xs"
              >
                Submit Custom Instruction
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};

