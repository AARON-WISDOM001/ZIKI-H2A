import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Terminal, 
  HelpCircle, 
  MessageSquare, 
  ShieldCheck, 
  Activity,
  GitCommit,
  Radio
} from 'lucide-react';
import { TimelineEvent } from '../../types/localAgent';

interface AgentActivityTimelineProps {
  events: TimelineEvent[];
}

export const AgentActivityTimeline: React.FC<AgentActivityTimelineProps> = ({
  events
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'connection':
        return <Terminal className="w-3.5 h-3.5 text-blue-400" />;
      case 'task':
        return <Activity className="w-3.5 h-3.5 text-emerald-400" />;
      case 'clarification':
        return <HelpCircle className="w-3.5 h-3.5 text-amber-400" />;
      case 'human_input':
        return <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />;
      case 'approval':
        return <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <GitCommit className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="rounded-3xl bg-[#0b1329] border border-slate-800/90 p-5 sm:p-6 shadow-xl space-y-5 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
              Agent Activity Timeline
            </h3>
            <p className="text-[11px] text-slate-400">
              Synchronized log of local terminal actions and human directives
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-400">
          Live Stream
        </span>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-cyan-400 before:via-blue-500 before:to-slate-800">
        {events.map((evt) => (
          <div key={evt.id} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#070c18] border border-slate-700 flex items-center justify-center group-hover:border-cyan-400 group-hover:scale-110 transition-all shadow-md">
              {getCategoryIcon(evt.category)}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {evt.title}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                    {evt.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {evt.timestamp}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {evt.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Prototype Footer Note */}
      <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
        <Clock className="w-3.5 h-3.5 text-slate-500" />
        <span>Design simulation only. Terminal commands and events are mocked locally.</span>
      </div>

    </div>
  );
};
