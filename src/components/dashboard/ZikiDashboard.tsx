import React from 'react';
import { 
  ArrowUpRight, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MessageSquare, 
  Calendar,
  ChevronDown,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Bot,
  Layers
} from 'lucide-react';

interface ZikiDashboardProps {
  onLaunchOnboarding: () => void;
  activeInitiativesCount?: number;
}

export const ZikiDashboard: React.FC<ZikiDashboardProps> = ({
  onLaunchOnboarding,
  activeInitiativesCount = 0
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header section with Welcome & New Issue / Goal CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            Welcome back, wisdom
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Issues, votes, and your points for Ziki at a glance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLaunchOnboarding}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-102 active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>+ New Issue / Goal Initiative</span>
          </button>
        </div>
      </div>

      {/* Feature Spotlight Callout: Goal-First Onboarding */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-indigo-950/60 border border-blue-500/30 p-5 shadow-xl">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                PROPOSED IMPROVEMENT DEMO
              </span>
              <span className="text-xs text-slate-400">· Human-Agent Interaction</span>
            </div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Goal-First Agent Onboarding
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instead of guessing which agents you need, state your high-level goal (Security, Marketing, Product Building, or System Refinement). Review a structured AI project brief, customize tasks, approve deliverables, and inspect deterministic multi-agent collaboration in action.
            </p>
          </div>
          <button
            type="button"
            onClick={onLaunchOnboarding}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-slate-950 font-semibold text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-transform hover:scale-105 active:scale-95"
          >
            <Bot className="w-4 h-4 text-slate-950" />
            <span>Launch Goal Onboarding</span>
          </button>
        </div>
      </div>

      {/* 4 Overview Metric Cards (Exact match to Ziki screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Points Card */}
        <div className="p-5 rounded-2xl bg-[#0b1329] border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Points</span>
            <div className="w-6 h-6 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-extrabold text-white font-mono tracking-tight">
              7871.42
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <span className="px-2 py-0.5 rounded bg-blue-900/40 border border-blue-700/40 text-blue-300 font-mono text-[10px]">
                500 to go
              </span>
              <span>500 required this week</span>
            </div>
          </div>
        </div>

        {/* Created by me */}
        <div className="p-5 rounded-2xl bg-[#0b1329] border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Created by me</span>
            <div className="w-6 h-6 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-extrabold text-white font-mono tracking-tight">
              45
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <span className="px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-700/40 text-emerald-400 font-mono text-[10px] font-semibold">
                +45
              </span>
              <span>in the last 30 days</span>
            </div>
          </div>
        </div>

        {/* Assigned to me */}
        <div className="p-5 rounded-2xl bg-[#0b1329] border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Assigned to me</span>
            <div className="w-6 h-6 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-extrabold text-white font-mono tracking-tight">
              1
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono text-slate-300 font-bold">0</span>
              <span>high priority</span>
            </div>
          </div>
        </div>

        {/* Resolved issues */}
        <div className="p-5 rounded-2xl bg-[#0b1329] border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Resolved issues</span>
            <div className="w-6 h-6 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-extrabold text-white font-mono tracking-tight">
              0
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono text-slate-300 font-bold">0%</span>
              <span>of issues assigned to me</span>
            </div>
          </div>
        </div>

      </div>

      {/* Issues Assigned to Me Table (matching Ziki screenshot) */}
      <div className="rounded-2xl bg-[#0b1329] border border-slate-800/80 overflow-hidden shadow-lg">
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">
              Issues assigned to me
            </h3>
            <span className="text-xs text-slate-400">
              1 issue · sorted by top votes
            </span>
          </div>
          <button 
            type="button" 
            className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1 rounded-lg border border-slate-800 bg-slate-900/60 transition-colors"
          >
            View all issues
          </button>
        </div>

        {/* Table Header */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800/60 bg-slate-900/40 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-6">Votes</th>
                <th className="py-3 px-6">Issue</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-6">Reported</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-900/30 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 w-fit font-mono font-semibold">
                    <span className="text-[10px]">▲</span>
                    <span>11</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-slate-400">
                      <Layers className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-100 hover:text-blue-400 cursor-pointer">
                        [Desktop]: Channel create/edit dialogs close before re...
                      </p>
                      <div className="flex items-center gap-2 text-slate-500 text-[11px] mt-0.5">
                        <span>#221</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> 1 comment
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 font-medium text-slate-300">
                  Fix
                </td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-semibold">
                    Medium
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="flex items-center gap-1.5 text-blue-400 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    Open
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="flex items-center gap-1.5 text-emerald-400 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Ready
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-400 font-mono text-[11px]">
                  Oct 18
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Your Points Chart Section (matching Ziki screenshot) */}
      <div className="rounded-2xl bg-[#0b1329] border border-slate-800/80 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Your points</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Points earned each week, last 8 weeks · 500 pts required, more is welcome
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 text-xs">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>All dates</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
            <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/60 p-0.5 text-xs text-slate-400">
              <button type="button" className="px-2.5 py-1 rounded text-slate-300">Daily</button>
              <button type="button" className="px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 font-medium border border-blue-500/30">Weekly</button>
              <button type="button" className="px-2.5 py-1 rounded text-slate-300">Monthly</button>
              <button type="button" className="px-2.5 py-1 rounded text-slate-300">Yearly</button>
            </div>
          </div>
        </div>

        {/* Visualized points graph mock */}
        <div className="pt-2 flex items-end justify-between gap-2 h-28 border-b border-slate-800/80 pb-2">
          {[
            { week: 'W1', pts: 420, met: false },
            { week: 'W2', pts: 560, met: true },
            { week: 'W3', pts: 610, met: true },
            { week: 'W4', pts: 490, met: false },
            { week: 'W5', pts: 720, met: true },
            { week: 'W6', pts: 890, met: true },
            { week: 'W7', pts: 1100, met: true },
            { week: 'W8', pts: 1450, met: true },
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="relative w-full flex justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 text-[10px] font-mono text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
                  {bar.pts} pts
                </span>
                <div 
                  className={`w-full max-w-[28px] rounded-t-md transition-all ${
                    bar.met 
                      ? 'bg-gradient-to-t from-blue-700 to-blue-500 group-hover:from-blue-600 group-hover:to-cyan-400' 
                      : 'bg-slate-700 group-hover:bg-slate-600'
                  }`}
                  style={{ height: `${(bar.pts / 1500) * 80 + 15}px` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-500">{bar.week}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>500 reached</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span>Below 500</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="w-4 h-[1px] bg-slate-600 border-t border-dashed border-slate-400" />
            <span>Weekly requirement: 500 pts</span>
          </div>
        </div>
      </div>

    </div>
  );
};
