import React from 'react';
import { 
  Terminal, 
  HelpCircle, 
  MessageSquare, 
  ShieldCheck, 
  Activity,
  GitCommit,
  Radio,
  Clock
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
        return <Terminal className="w-3.5 h-3.5 text-blue-600" />;
      case 'task':
        return <Activity className="w-3.5 h-3.5 text-emerald-600" />;
      case 'clarification':
        return <HelpCircle className="w-3.5 h-3.5 text-amber-600" />;
      case 'human_input':
        return <MessageSquare className="w-3.5 h-3.5 text-blue-600" />;
      case 'approval':
        return <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <GitCommit className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
            <Radio className="w-4 h-4" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Activity
          </h3>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
          Live
        </span>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200">
        {events.map((evt) => (
          <div key={evt.id} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center group-hover:border-blue-500 transition-all shadow-2xs">
              {getCategoryIcon(evt.category)}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {evt.title}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-medium">
                    {evt.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {evt.timestamp}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {evt.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Prototype Footer Note */}
      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <span>Demo — events are mocked.</span>
      </div>

    </div>
  );
};
