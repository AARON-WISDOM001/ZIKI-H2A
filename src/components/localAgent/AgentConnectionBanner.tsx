import React from 'react';
import { 
  Terminal, 
  GitBranch, 
  FolderGit2, 
  Activity, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Power
} from 'lucide-react';
import { LocalAgentSession, ConnectionState } from '../../types/localAgent';

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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-950/70 via-slate-900/95 to-[#0b1329] border border-blue-500/40 p-5 sm:p-7 shadow-[0_0_40px_rgba(37,99,235,0.2)] animate-fade-in-up">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-80 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Bar: Connection Status & Controls */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        
        {/* Left: Agent Identity & Status */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="relative">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
              isConnected
                ? 'bg-blue-600/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.35)]'
                : 'bg-slate-800/80 border-slate-700 text-slate-400'
            }`}>
              <Terminal className="w-6 h-6 stroke-[2.2]" />
            </div>
            {isConnected && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-slate-900 animate-ping" />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5 font-mono">
                {session.agentName}
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                {session.version}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-300">
                PID: {session.cliPid}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1.5 font-mono">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className={isConnected ? 'text-emerald-300 font-semibold' : 'text-amber-300'}>
                  {isSimulatingReconnect ? 'Reconnecting to local daemon...' : isConnected ? 'Connected via Terminal Socket' : 'Session Paused'}
                </span>
              </span>
              <span>·</span>
              <span className="font-mono text-slate-400">Port :{session.terminalPort}</span>
              <span>·</span>
              <span className="font-mono text-cyan-400/90">{session.pingMs}ms latency</span>
              <span>·</span>
              <span className="text-slate-400">Uptime: {session.connectionUptime}</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Connection Toggle & Prototype Badge */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 hidden sm:inline-block">
            Design Demonstration
          </div>

          <button
            type="button"
            onClick={onToggleConnection}
            disabled={isSimulatingReconnect}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-md ${
              isConnected
                ? 'bg-slate-800/90 hover:bg-rose-950/60 hover:text-rose-300 border border-slate-700 text-slate-200'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            }`}
          >
            {isSimulatingReconnect ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-300" />
                <span>Syncing daemon...</span>
              </>
            ) : isConnected ? (
              <>
                <Power className="w-3.5 h-3.5 text-slate-400" />
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
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
          <FolderGit2 className="w-4 h-4 text-blue-400 shrink-0" />
          <div className="truncate">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Local Workspace</span>
            <span className="font-mono text-slate-200 text-xs font-medium truncate block" title={session.localPath}>
              {session.localPath}
            </span>
          </div>
        </div>

        {/* Active Git Branch */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
          <GitBranch className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="truncate">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Target Branch</span>
            <span className="font-mono text-cyan-300 text-xs font-semibold truncate block">
              {session.activeBranch}
            </span>
          </div>
        </div>

        {/* Current Active Task */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
          <Activity className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
          <div className="truncate">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Active Task in Terminal</span>
            <span className="text-slate-200 text-xs truncate block" title={session.currentTask}>
              {session.currentTask}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
