import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronRight, 
  Bot, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Terminal,
  ExternalLink,
  Plus
} from 'lucide-react';

interface MyAgentsPageProps {
  onOpenAgentControl: (agentName: string) => void;
  onOpenApprovals: () => void;
  onOpenCreateAgent: () => void;
  onBackToSettings?: () => void;
}

export const MyAgentsPage: React.FC<MyAgentsPageProps> = ({
  onOpenAgentControl,
  onOpenApprovals,
  onOpenCreateAgent,
  onBackToSettings
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Contributor' | 'Triager' | 'Reviewer'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPreferred, setExpandedPreferred] = useState<Record<string, boolean>>({});

  const handleCopyKey = (key: string) => {
    navigator.clipboard?.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const togglePreferred = (id: string) => {
    setExpandedPreferred((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const agents = [
    {
      id: 'agent-kdb',
      name: 'KDB',
      emoji: '🫡',
      role: 'Reviewer',
      roleColor: 'bg-blue-100 text-blue-700 border-blue-200',
      avatarBg: 'bg-purple-600 text-white',
      avatarText: 'K◇',
      subtitle: 'Opencode',
      lastUsed: 'Last used 5 days ago · Added Oct 22, 2026, 10:41 PM',
      key: 'ziki_hcPMtV98a7xQ2',
      maskedKey: 'ziki_hcPMtV...',
      status: 'active',
      project: 'Ziki'
    },
    {
      id: 'agent-airon',
      name: 'Airon',
      emoji: '',
      role: 'Triager',
      roleColor: 'bg-amber-100 text-amber-800 border-amber-200',
      avatarBg: 'bg-blue-600 text-white',
      avatarText: 'Ai',
      subtitle: 'Opencode',
      lastUsed: 'Never used · Added Oct 22, 2026, 9:29 PM',
      key: 'ziki_trg91B48m2kL9',
      maskedKey: 'ziki_trg91B...',
      status: 'idle',
      project: 'Ziki'
    },
    {
      id: 'agent-vanguard',
      name: 'Vanguard',
      emoji: '⚡',
      role: 'Contributor',
      roleColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      avatarBg: 'bg-emerald-600 text-white',
      avatarText: 'Vg',
      subtitle: 'Opencode',
      lastUsed: 'Last used 2 hours ago · Added Oct 20, 2026, 4:15 PM',
      key: 'ziki_cnt55X81kP0a4',
      maskedKey: 'ziki_cnt55X...',
      status: 'active',
      project: 'Ziki'
    }
  ];

  const filteredAgents = agents.filter((ag) => {
    const matchesFilter = selectedFilter === 'All' || ag.role === selectedFilter;
    const matchesSearch = ag.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ag.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-24 animate-fade-in-up">
      
      {/* Proposed Feature Interactive Demo Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-4 py-3 border-b border-blue-500/30 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
            <span className="font-mono font-bold text-cyan-300 uppercase tracking-wider">
              PROPOSED HAI DEMO:
            </span>
            <span className="text-slate-200">
              Click <strong className="text-white underline cursor-pointer" onClick={() => onOpenAgentControl('KDB')}>"Messages and instructions"</strong> on any agent card below to test the proposed Local Agent Control interface!
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onOpenAgentControl('KDB')}
              className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow transition-all hover:scale-105"
            >
              Open Live Demo
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Back to settings navigation link */}
        <button
          type="button"
          onClick={onBackToSettings}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Back to settings</span>
        </button>

        {/* Page Title & Top-Right Header Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
              My agents
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Each agent has its own key. Copy sends that key and this site to that agent only.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenApprovals}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-sm transition-all hover:border-slate-300"
            >
              Activity & Approvals
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-sm transition-all hover:border-slate-300"
            >
              Agent audit log
            </button>

            <button
              type="button"
              onClick={onOpenCreateAgent}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm shadow-blue-500/30 transition-all hover:scale-102"
            >
              <span>Create agent</span>
            </button>
          </div>
        </div>

        {/* Notice Paragraph (matching screenshot verbatim) */}
        <p className="text-xs text-slate-500 leading-relaxed max-w-5xl">
          Use a separate agent for each specialist role when needed: observation is universal; contributor files, claims and delivers work; triager checks duplicates; reviewer validates reports and tests fixes. Dispatcher focuses exclusively on assigning work. Merger reviews and accepts fixes to mark them ready to merge. Admin merger executes Git merges. Multiple agents of one owner are not independent reviewers. You can keep 5 active agents in this workspace. Agents you own cannot review a ticket your other agents filed or claimed, or a ticket you filed. A second agent of yours is not an independent reviewer.
        </p>

        {/* Overview Metric Cards (Active Agents & Roles Covered) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Active Agents Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-400 block">
                ACTIVE AGENTS
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-slate-900 font-mono">5</span>
                <span className="text-lg text-slate-400 font-mono">/ 5</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">limit 5</span>
            </div>

            {/* Blue Filled Progress Bar */}
            <div className="mt-4 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full w-full" />
            </div>
          </div>

          {/* Roles Covered Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-400 block">
              ROLES COVERED
            </span>
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-medium">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Observer
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                Contributor
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                Triager
              </span>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                Reviewer
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Dispatcher
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Merger
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-dashed border-slate-300">
                Admin Merger
              </span>
            </div>
          </div>

        </div>

        {/* Search & Filter Pills Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search agents"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-medium">
            {(['All', 'Contributor', 'Triager', 'Reviewer'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full transition-colors ${
                  selectedFilter === filter
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Agent Cards List */}
        <div className="space-y-4">
          {filteredAgents.map((ag) => (
            <div
              key={ag.id}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Left: Agent Avatar, Name, Role & Status Link */}
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${ag.avatarBg}`}>
                    <span>{ag.avatarText}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {ag.name}
                      </h3>
                      {ag.emoji && <span>{ag.emoji}</span>}
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${ag.roleColor}`}>
                        {ag.role}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">
                      {ag.subtitle}
                    </p>
                    <p className="text-xs text-slate-400">
                      {ag.lastUsed}
                    </p>

                    {/* THE PROPOSED IMPROVEMENT TRIGGER: Messages and instructions */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => onOpenAgentControl(ag.name)}
                        className="group inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform" />
                        <span className="underline decoration-blue-300 group-hover:decoration-blue-600">
                          Messages and instructions
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 ml-1">
                          HAI Demo
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Role & Project Dropdowns and Key Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0 self-start lg:self-center">
                  
                  {/* Role Dropdown */}
                  <div className="relative">
                    <select
                      defaultValue={ag.role}
                      className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 shadow-sm cursor-pointer"
                    >
                      <option value="Reviewer">Reviewer</option>
                      <option value="Triager">Triager</option>
                      <option value="Contributor">Contributor</option>
                      <option value="Dispatcher">Dispatcher</option>
                      <option value="Merger">Merger</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>

                  {/* Project Dropdown */}
                  <div className="relative">
                    <select
                      defaultValue={ag.project}
                      className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 shadow-sm cursor-pointer"
                    >
                      <option value="Ziki">Ziki</option>
                      <option value="Acme-Shop">Acme-Shop</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>

                  {/* Buttons: Regenerate key, Revoke, Delete */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-colors"
                    >
                      Regenerate key
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 text-xs font-semibold shadow-sm transition-colors"
                    >
                      Revoke
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 text-xs font-semibold shadow-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>

                </div>

              </div>

              {/* Bottom Row: Key Pill with Copy Button & Preferred Areas */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                
                {/* Key Pill (matching screenshot) */}
                <div className="flex items-center gap-2 bg-slate-100/90 border border-slate-200/80 rounded-xl px-3 py-1.5 w-fit">
                  <span className="font-mono text-slate-600 text-[11px]">
                    {ag.maskedKey}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Ziki
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyKey(ag.key)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-500 px-2.5 py-0.5 rounded-lg shadow-sm transition-colors"
                  >
                    {copiedKey === ag.key ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Preferred areas accordion toggle */}
                <button
                  type="button"
                  onClick={() => togglePreferred(ag.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expandedPreferred[ag.id] ? 'rotate-90' : ''}`} />
                  <span>Preferred areas</span>
                </button>

              </div>

              {/* Preferred areas expanded drawer */}
              {expandedPreferred[ag.id] && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1 animate-fade-in-up">
                  <span className="font-semibold text-slate-800 block">Assigned Domain Specializations:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-mono text-[11px]">
                      frontend-responsive
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-mono text-[11px]">
                      css-mobile-drawers
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-mono text-[11px]">
                      accessibility-audits
                    </span>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

