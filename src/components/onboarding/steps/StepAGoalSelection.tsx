import React from 'react';
import { 
  ShieldAlert, 
  Megaphone, 
  Sparkles, 
  Wrench, 
  Check, 
  ArrowRight,
  Bot,
  Zap
} from 'lucide-react';
import { GoalId } from '../../../types/onboarding';
import { GOAL_OPTIONS } from '../../../data/mockData';

interface StepAGoalSelectionProps {
  selectedGoal: GoalId;
  onSelectGoal: (goalId: GoalId) => void;
  onNext: () => void;
}

export const StepAGoalSelection: React.FC<StepAGoalSelectionProps> = ({
  selectedGoal,
  onSelectGoal,
  onNext
}) => {
  const getIcon = (id: GoalId, isSelected: boolean) => {
    switch (id) {
      case 'security':
        return <ShieldAlert className={`w-6 h-6 transition-transform duration-300 ${isSelected ? 'scale-110 text-cyan-300' : 'text-blue-400'}`} />;
      case 'marketing':
        return <Megaphone className={`w-6 h-6 transition-transform duration-300 ${isSelected ? 'scale-110 text-pink-300' : 'text-purple-400'}`} />;
      case 'build':
        return <Sparkles className={`w-6 h-6 transition-transform duration-300 ${isSelected ? 'scale-110 text-emerald-300' : 'text-emerald-400'}`} />;
      case 'improve':
        return <Wrench className={`w-6 h-6 transition-transform duration-300 ${isSelected ? 'scale-110 text-amber-300' : 'text-amber-400'}`} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Step Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium animate-pulse">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Step 1 of 5</span>
          <span>·</span>
          <span>Goal Definition</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          What would you like your agents to accomplish?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Select an outcome. Ziki curates relevant questions, matches specialist agent capabilities, and structures a project brief for your review.
        </p>
      </div>

      {/* 4 Goal Cards Grid with High-End Hover & Selection Motion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {GOAL_OPTIONS.map((goal, idx) => {
          const isSelected = selectedGoal === goal.id;
          return (
            <div
              key={goal.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectGoal(goal.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectGoal(goal.id);
                }
              }}
              style={{ animationDelay: `${idx * 70}ms` }}
              className={`group relative p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-400 animate-fade-in-up hover:-translate-y-1.5 ${
                isSelected
                  ? 'bg-gradient-to-b from-blue-950/80 via-slate-900/95 to-slate-900 border-blue-400 shadow-[0_0_35px_rgba(37,99,235,0.35)] ring-2 ring-blue-400/60'
                  : 'bg-[#0b1329]/80 border-slate-800/80 hover:border-slate-600 hover:bg-slate-900/80 hover:shadow-xl'
              }`}
            >
              {/* Top ambient glow for selected card */}
              {isSelected && (
                <div className="absolute top-0 right-10 w-32 h-16 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />
              )}

              {/* Radio checkmark indicator */}
              <div className="absolute top-4 right-4">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.6)] scale-110'
                      : 'border border-slate-700 bg-slate-800/60 text-transparent group-hover:border-slate-500'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3] transition-transform duration-200" />
                </div>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-2.5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    isSelected
                      ? 'bg-blue-500/25 border-blue-400/60 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-105'
                      : 'bg-slate-800/80 border-slate-700 group-hover:border-slate-600 group-hover:scale-102'
                  }`}
                >
                  {getIcon(goal.id, isSelected)}
                </div>
                <div>
                  <h3 className={`text-base font-bold transition-colors ${isSelected ? 'text-cyan-200' : 'text-white group-hover:text-blue-300'}`}>
                    {goal.title}
                  </h3>
                  <p className="text-xs text-blue-400/90 font-medium">
                    {goal.tagline}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {goal.description}
              </p>

              {/* Recommended agent squad badge preview */}
              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Bot className="w-3.5 h-3.5 text-blue-400" />
                  <span>Agent squad:</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {goal.recommendedAgents.slice(0, 2).map((agent, agentIdx) => (
                    <span
                      key={agentIdx}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                        isSelected 
                          ? 'bg-blue-900/40 text-blue-200 border border-blue-500/40' 
                          : 'bg-slate-800 text-slate-300 border border-slate-700/80 group-hover:border-slate-600'
                      }`}
                    >
                      {agent.split('-')[0]}
                    </span>
                  ))}
                  <span className="text-[10px] font-mono text-slate-500 px-1">+2 agents</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex items-center justify-end">
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-[0_0_25px_rgba(37,99,235,0.45)] transition-all duration-200 hover:scale-102 active:scale-98"
        >
          <span>Continue to Context Questions</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
