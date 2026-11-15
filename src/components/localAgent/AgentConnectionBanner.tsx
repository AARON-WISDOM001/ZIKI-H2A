import React from 'react';
import { 
  Terminal, 
  GitBranch, 
  FolderGit2, 
  Activity, 
  Wifi, 
  RefreshCw, 
  Power
} from 'lucide-react';
import { LocalAgentSession } from '../../types/localAgent';

interface AgentConnectionBannerProps {
  session: LocalAgentSession;
  onToggleConnection: () => void;
  isSimulatingReconnect: boolean;
}

export const AgentConnectionBanner: React.FC<AgentConnectionBannerProps> = ({
  session,
  onToggleConnection,
  isSimulatingReconnect
}) => {
  const isConnected = session.connectionState === 'connected';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-blue-200/90 p-5 sm:p-6 shadow-sm animate-fade-in-up">
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600" />

      {/* Top Bar: Connection Status & Controls */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        
        {/* Left: Agent Identity & Status */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="relative">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 ${
              isConnected
                ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm'
                : 'bg-slate-100 border-slate-200 text-slate-500'
            }`}>
              <Terminal className="w-5 h-5 stroke-[2.2]" />
            </div>
            {isConnected && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-mono">
                {session.agentName}
              </h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold">
                PID: {session.cliPid}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1.5 font-mono font-medium">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className={isConnected ? 'text-emerald-700 font-semibold' : 'text-amber-700'}>
                  {isSimulatingReconnect ? 'Reconnecting…' : isConnected ? 'Connected via Terminal Socket' : 'Session Paused'}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Connection Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleConnection}
            disabled={isSimulatingReconnect}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm ${
              isConnected
                ? 'bg-slate-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 border border-slate-200 text-slate-700'
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-md'
            }`}
          >
            {isSimulatingReconnect ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Syncing…</span>
              </>
            ) : isConnected ? (
              <>
                <Power className="w-3.5 h-3.5 text-slate-500" />
                <span>Pause Socket</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5" />
                <span>Resume Connection</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Bottom Bar: Active Working Directory, Branch & Current Objective */}
      <div className="relative z-10 pt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        
        {/* Repo & Working directory */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
          <FolderGit2 className="w-4 h-4 text-blue-600 shrink-0" />
          <div className="truncate">
            <span className="font-mono text-slate-800 text-xs font-semibold truncate block" title={session.localPath}>
              {session.localPath}
            </span>
          </div>
        </div>

        {/* Active Git Branch */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
          <GitBranch className="w-4 h-4 text-indigo-600 shrink-0" />
          <div className="truncate">
            <span className="font-mono text-indigo-700 text-xs font-semibold truncate block">
              {session.activeBranch}
            </span>
          </div>
        </div>

        {/* Current Active Task */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
          <Activity className="w-4 h-4 text-emerald-600 shrink-0 animate-pulse" />
          <div className="truncate">
            <span className="text-slate-800 text-xs font-medium truncate block" title={session.currentTask}>
              {session.currentTask}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
