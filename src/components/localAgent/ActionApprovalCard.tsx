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
  Lock,
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

  const isPending = action.status === 'pending';
  const isApproved = action.status === 'approved';
  const isRejected = action.status === 'rejected';

  return (
    <div className={`relative rounded-2xl border transition-all duration-300 p-5 sm:p-6 shadow-sm animate-fade-in-up ${
      isApproved 
        ? 'bg-emerald-50/50 border-emerald-300'
        : isRejected
        ? 'bg-rose-50/50 border-rose-300'
        : 'bg-white border-slate-200'
    }`}>
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3.5">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
            isApproved 
              ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
              : isRejected
              ? 'bg-rose-100 border-rose-300 text-rose-700'
              : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border font-bold ${
                isApproved 
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                  : isRejected
                  ? 'bg-rose-100 border-rose-300 text-rose-800'
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                {isApproved ? 'ACTION AUTHORIZED' : isRejected ? 'ACTION REJECTED' : 'HUMAN APPROVAL REQUIRED'}
              </span>
              <span className="text-xs font-mono text-slate-400">· Staged Local Change</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight mt-0.5">
              {action.title}
            </h3>
          </div>
        </div>

        {/* Status Pill & Reset */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className={`text-xs font-mono px-3 py-1 rounded-full border font-medium ${
            isApproved
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : isRejected
              ? 'bg-rose-100 text-rose-800 border-rose-300'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            {isApproved ? 'Approved by wisdom Aaron' : isRejected ? 'Rejected by Human' : 'Awaiting Review'}
          </span>
          {!isPending && (
            <button
              type="button"
              onClick={onResetDecision}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-mono ml-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Purpose & Human-in-the-Loop Scope Notice */}
      <div className="space-y-2.5 pt-2">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900 block font-semibold mb-0.5">Proposed Modification Purpose:</strong>
          {action.purpose}
        </div>

        {/* Clear Visual Distinction Notice */}
        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-800">
          <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold text-blue-900">Reviewing Proposal vs Real Execution:</strong> {action.scopeNotice}
          </p>
        </div>
      </div>

      {/* Affected Files List */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Affected Files ({action.affectedFiles.length}):</span>
          <span className="text-blue-700 font-semibold">Risk Level: {action.riskLevel}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {action.affectedFiles.map((file, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2 truncate">
                <FileCode className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-mono text-slate-800 truncate" title={file.path}>
                  {file.path}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] shrink-0 ml-2">
                <span className="text-emerald-700 font-bold">+{file.additions}</span>
                <span className="text-rose-600 font-bold">-{file.deletions}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Diff Preview Inspector */}
      <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950 shadow-xs">
        <div 
          onClick={() => setIsDiffExpanded(!isDiffExpanded)}
          className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between cursor-pointer text-xs font-mono text-slate-300 hover:text-white"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Staged Git Diff Preview</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>{isDiffExpanded ? 'Collapse' : 'Expand'}</span>
            {isDiffExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </div>

        {isDiffExpanded && (
          <div className="p-3.5 max-h-56 overflow-y-auto">
            <pre className="text-xs font-mono leading-relaxed text-slate-200 whitespace-pre">
              {action.diffSnippet}
            </pre>
          </div>
        )}
      </div>

      {/* Decision Controls Bar (Approve / Reject) */}
      {isPending ? (
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Terminal will NOT apply git patch until you authorize here.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => onReject("Requires refinement for mobile accessibility.")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reject Proposal</span>
            </button>

            <button
              type="button"
              onClick={onApprove}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm shadow-emerald-500/20 transition-all hover:scale-102 active:scale-98"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Approve & Instruct Terminal to Apply</span>
            </button>
          </div>
        </div>
      ) : isApproved ? (
        <div className="p-3.5 rounded-xl bg-emerald-100/70 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-emerald-900">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">Action Staged and Applied Locally</span>
              <p className="text-emerald-800 font-mono text-[11px]">
                Cryptographic approval token logged: #ZIKI-AUTH-{(Math.random() * 8000 + 1000).toFixed(0)}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-emerald-600 text-white font-bold shrink-0 shadow-2xs">
            MERGE COMPLETE
          </span>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-rose-100/70 border border-rose-300 flex items-center justify-between text-xs text-rose-900">
          <div className="flex items-center gap-2.5">
            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">Proposal Rejected by Developer</span>
              <p className="text-rose-800">Terminal agent notified to rollback and await updated directives.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-rose-600 text-white font-bold shadow-2xs">
            ROLLED BACK
          </span>
        </div>
      )}

    </div>
  );
};
