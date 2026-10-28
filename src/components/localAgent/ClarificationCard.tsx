import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Check, 
  Edit3, 
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
    <div className="relative rounded-2xl bg-white border border-blue-200/90 p-5 sm:p-6 shadow-sm space-y-4 animate-fade-in-up">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
            <Compass className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                HUMAN GUIDANCE REQUIRED
              </span>
              <span className="text-xs text-slate-500 font-mono">· Architectural Fork</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mt-0.5">
              Agent Clarification Request
            </h3>
          </div>
        </div>

        {isResolved ? (
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Resolved by Human</span>
            </span>
            <button
              type="button"
              onClick={onResetClarification}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-mono ml-1"
            >
              Reset
            </button>
          </div>
        ) : (
          <span className="text-xs font-mono text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            <span>Agent Paused Pending Decision</span>
          </span>
        )}
      </div>

      {/* Agent Question & Context Banner */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
        <p className="text-sm font-semibold text-slate-900 leading-relaxed">
          "{proposal.question}"
        </p>
        <p className="text-xs text-slate-500 leading-relaxed">
          <strong className="text-slate-700">Context:</strong> {proposal.context}
        </p>
      </div>

      {/* Alternative Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        
        {/* Option A */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => !isResolved && onSelectOption('option-a')}
          className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
            proposal.chosenOption === 'option-a'
              ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-2 ring-blue-400/40'
              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
          }`}
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 font-semibold">
                {proposal.optionA.badge}
              </span>
              {proposal.chosenOption === 'option-a' && (
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              {proposal.optionA.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {proposal.optionA.description}
            </p>
          </div>

          <div className="mt-3.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <span className="text-slate-400 font-mono">Trade-off:</span> {proposal.optionA.tradeoff}
          </div>
        </div>

        {/* Option B */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => !isResolved && onSelectOption('option-b')}
          className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
            proposal.chosenOption === 'option-b'
              ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-2 ring-blue-400/40'
              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
          }`}
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                {proposal.optionB.badge}
              </span>
              {proposal.chosenOption === 'option-b' && (
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              {proposal.optionB.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {proposal.optionB.description}
            </p>
          </div>

          <div className="mt-3.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <span className="text-slate-400 font-mono">Trade-off:</span> {proposal.optionB.tradeoff}
          </div>
        </div>

      </div>

      {/* Option C: Custom Instruction Drawer */}
      <div className="pt-2 border-t border-slate-100">
        {!isCustomMode && proposal.chosenOption !== 'custom' ? (
          <button
            type="button"
            onClick={() => setIsCustomMode(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-600" />
            <span>Neither approach? Provide a custom instruction instead →</span>
          </button>
        ) : proposal.chosenOption === 'custom' ? (
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-blue-700 font-bold block uppercase">Custom Human Instruction Applied</span>
              <p className="text-slate-900 font-medium">"{proposal.customInstruction}"</p>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <label className="block text-xs font-semibold text-slate-800">
              Provide specific custom guidance to the agent:
            </label>
            <input
              type="text"
              placeholder="e.g., Use an accessible slide-over sheet with Tailwind classes only, no external drawer library..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCustomMode(false)}
                className="px-3 py-1 rounded-lg text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!customText.trim()}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs shadow-xs"
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
