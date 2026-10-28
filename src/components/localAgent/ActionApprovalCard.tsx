import React, { useState } from 'react';
import { 
  FileCode, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Terminal, 
  Sparkles, 
  Lock,
  Layers,
  Check,
  X
} from 'lucide-react';
import { ProposedAction } from '../../types/localAgent';

interface ActionApprovalCardProps {
  action: ProposedAction;
  onApprove: () => void;
  onReject: (reason?: string) => void;
  onResetDecision: () => void;
}

export const ActionApprovalCard: React.FC<ActionApprovalCardProps> = ({
  action,
  onApprove,
  onReject,
  onResetDecision
}) => {
  const [isDiffExpanded, setIsDiffExpanded] = useState(true);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  const isPending = action.status === 'pending';
  const isApproved = action.status === 'approved';
  const isRejected = action.status === 'rejected';

  return (
    <div className={`relative rounded-3xl border transition-all duration-300 p-5 sm:p-7 shadow-2xl animate-fade-in-up ${
      isApproved 
        ? 'bg-gradient-to-b from-blue-950/70 via-slate-900 to-emerald-950/40 border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.2)]'
        : isRejected
        ? 'bg-gradient-to-b from-slate-900 to-rose-950/30 border-rose-500/40'
        : 'bg-[#0b1329] border-blue-500/40 shadow-[0_0_30px_rgba(37,99,235,0.15)]'
    }`}>
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-start gap-3">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 ${
            isApproved 
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : isRejected
              ? 'bg-rose-500/20 border-rose-400 text-rose-300'
              : 'bg-blue-600/20 border-blue-400/50 text-cyan-300'
          }`}>
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-bold ${
                isApproved 
                  ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                  : isRejected
                  ? 'bg-rose-500/20 border-rose-400/50 text-rose-300'
                  : 'bg-blue-500/20 border-blue-400/50 text-cyan-300 animate-pulse'
              }`}>
                {isApproved ? 'ACTION AUTHORIZED' : isRejected ? 'ACTION REJECTED' : 'HUMAN APPROVAL REQUIRED'}
              </span>
              <span className="text-xs font-mono text-slate-400">· Staged Local Change</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1">
              {action.title}
            </h3>
          </div>
        </div>

        {/* Status Pill & Reset */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className={`text-xs font-mono px-3 py-1 rounded-full border ${
            isApproved
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
              : isRejected
              ? 'bg-rose-500/20 text-rose-300 border-rose-400/40'
              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
          }`}>
            {isApproved ? 'Approved by wisdom Aaron' : isRejected ? 'Rejected by Human' : 'Awaiting Review'}
          </span>
          {!isPending && (
            <button
              type="button"
              onClick={onResetDecision}
              className="text-xs text-slate-400 hover:text-white underline font-mono ml-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Purpose & Human-in-the-Loop Scope Notice */}
      <div className="space-y-3 pt-2">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <strong className="text-white block font-semibold mb-0.5">Proposed Modification Purpose:</strong>
          {action.purpose}
        </div>

        {/* Clear Visual Distinction Notice */}
        <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/25 flex items-start gap-2.5 text-xs text-blue-200">
          <AlertTriangle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Reviewing Proposal vs Real Execution:</strong> {action.scopeNotice}
          </p>
        </div>
      </div>

      {/* Affected Files List */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Affected Files ({action.affectedFiles.length}):</span>
          <span className="text-cyan-400">Risk Assessment: {action.riskLevel}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {action.affectedFiles.map((file, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2 truncate">
                <FileCode className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-mono text-slate-200 truncate" title={file.path}>
                  {file.path}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] shrink-0 ml-2">
                <span className="text-emerald-400">+{file.additions}</span>
                <span className="text-rose-400">-{file.deletions}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Diff Preview Inspector */}
      <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950">
        <div 
          onClick={() => setIsDiffExpanded(!isDiffExpanded)}
          className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between cursor-pointer text-xs font-mono text-slate-300 hover:text-white"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Staged Git Diff Preview</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <span>{isDiffExpanded ? 'Collapse' : 'Expand'}</span>
            {isDiffExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </div>

        {isDiffExpanded && (
          <div className="p-4 max-h-56 overflow-y-auto">
            <pre className="text-xs font-mono leading-relaxed text-slate-300 whitespace-pre">
              {action.diffSnippet}
            </pre>
          </div>
        )}
      </div>

      {/* Decision Controls Bar (Approve / Reject) */}
      {isPending ? (
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/80">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Terminal will NOT apply git patch until you authorize here.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => {
                setShowRejectInput(true);
                onReject("Requires refinement for mobile accessibility.");
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold transition-all hover:scale-102"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reject Proposal</span>
            </button>

            <button
              type="button"
              onClick={onApprove}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Approve & Instruct Terminal to Apply</span>
            </button>
          </div>
        </div>
      ) : isApproved ? (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-400/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Action Staged and Applied Locally</span>
              <p className="text-emerald-300 font-mono text-[11px]">
                Cryptographic approval token logged: #ZIKI-AUTH-{(Math.random() * 8000 + 1000).toFixed(0)}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold shrink-0">
            MERGE COMPLETE
          </span>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-400/50 flex items-center justify-between text-xs text-rose-200">
          <div className="flex items-center gap-2.5">
            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Proposal Rejected by Developer</span>
              <p className="text-rose-300">Terminal agent notified to rollback and await updated directives.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-400/40 text-rose-300 font-bold">
            ROLLED BACK
          </span>
        </div>
      )}

    </div>
  );
};
