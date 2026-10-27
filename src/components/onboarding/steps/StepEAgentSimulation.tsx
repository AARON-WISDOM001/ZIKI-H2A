import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  Bot, 
  ShieldCheck, 
  FileCode, 
  Terminal, 
  AlertTriangle, 
  Sparkles,
  Trophy,
  Check,
  ChevronRight
} from 'lucide-react';
import { ProjectBrief, CollaborationStage, SimulationStepLog } from '../../../types/onboarding';

interface StepEAgentSimulationProps {
  brief: ProjectBrief;
  onCompleteSimulation: () => void;
  onRestartOnboarding: () => void;
}

const STAGES: { id: CollaborationStage; name: string; title: string; agent: string; description: string }[] = [
  {
    id: 'triager',
    name: '1. Triager',
    title: 'Organizes Tasks & Priorities',
    agent: 'Triager-01 (Orion)',
    description: 'Ingests approved brief, structures atomic task graph, and checks dependency order.'
  },
  {
    id: 'dispatcher',
    name: '2. Dispatcher',
    title: 'Assigns Specialized Work',
    agent: 'Dispatcher-X (Nova)',
    description: 'Matches tasks to specialized agent skills and schedules parallel execution pipelines.'
  },
  {
    id: 'contributor',
    name: '3. Contributor',
    title: 'Prepares Proposed Change',
    agent: 'Contributor-Pro (Vanguard)',
    description: 'Synthesizes code patches, configuration schemas, or marketing asset payloads.'
  },
  {
    id: 'reviewer',
    name: '4. Reviewer',
    title: 'Inspects & Validates Output',
    agent: 'Reviewer-99 (Cipher)',
    description: 'Evaluates output against security policies, test suites, and client constraints.'
  },
  {
    id: 'merger',
    name: '5. Merger',
    title: 'Handles Final Approved Merge',
    agent: 'Merger-Gate (Atlas)',
    description: 'Executes human-authorized merge, updates project issues, and awards Ziki points.'
  }
];

export const StepEAgentSimulation: React.FC<StepEAgentSimulationProps> = ({
  brief,
  onCompleteSimulation,
  onRestartOnboarding
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [logs, setLogs] = useState<SimulationStepLog[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<'workflow' | 'artifact'>('workflow');

  // Generate stage-specific logs based on current stage and goal
  const generateLogsForStage = (index: number): SimulationStepLog[] => {
    const stage = STAGES[index];
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    switch (stage.id) {
      case 'triager':
        return [
          {
            id: `log-t1-${Date.now()}`,
            timestamp: time,
            stage: 'triager',
            agentName: stage.agent,
            action: 'Brief Ingestion',
            detail: `Parsed ${brief.proposedTasks.length} tasks for goal: "${brief.goalTitle}". No circular dependencies detected.`
          },
          {
            id: `log-t2-${Date.now()}`,
            timestamp: time,
            stage: 'triager',
            agentName: stage.agent,
            action: 'Priority Assignment',
            detail: `Categorized ${brief.proposedTasks.filter((t) => t.requiresHumanApproval).length} human-gated checkpoints with high-governance tags.`
          }
        ];
      case 'dispatcher':
        return [
          {
            id: `log-d1-${Date.now()}`,
            timestamp: time,
            stage: 'dispatcher',
            agentName: stage.agent,
            action: 'Capability Match',
            detail: `Allocated tasks to specialized agents (Contributor-Pro & Reviewer-99). Initialized isolated sandbox environment.`
          },
          {
            id: `log-d2-${Date.now()}`,
            timestamp: time,
            stage: 'dispatcher',
            agentName: stage.agent,
            action: 'Queue Dispatch',
            detail: `Work package #WP-104 dispatched to worker pool with resource limit: 2 vCPU, read-only repository scope.`
          }
        ];
      case 'contributor':
        return [
          {
            id: `log-c1-${Date.now()}`,
            timestamp: time,
            stage: 'contributor',
            agentName: stage.agent,
            action: 'Drafting Solution',
            detail: `Synthesized draft artifact: "${brief.proposedTasks[2]?.outputArtifact || 'Patch Solution Payload'}".`
          },
          {
            id: `log-c2-${Date.now()}`,
            timestamp: time,
            stage: 'contributor',
            agentName: stage.agent,
            action: 'Local Self-Test',
            detail: `Ran pre-flight unit test verification: 14/14 tests passing. Package ready for peer inspection.`
          }
        ];
      case 'reviewer':
        return [
          {
            id: `log-r1-${Date.now()}`,
            timestamp: time,
            stage: 'reviewer',
            agentName: stage.agent,
            action: 'Integrity Inspection',
            detail: `Scrutinized proposed changes against safety rules. Verified zero breaking regressions.`
          },
          {
            id: `log-r2-${Date.now()}`,
            timestamp: time,
            stage: 'reviewer',
            agentName: stage.agent,
            action: 'Human Gate Verification',
            detail: `Validated prior client approval token #ZIKI-APPR. Compliance status: Green (Pass).`
          }
        ];
      case 'merger':
        return [
          {
            id: `log-m1-${Date.now()}`,
            timestamp: time,
            stage: 'merger',
            agentName: stage.agent,
            action: 'Release Finalization',
            detail: `Synchronized verified artifact into simulated project state. Closed onboarding sprint issue #222.`
          },
          {
            id: `log-m2-${Date.now()}`,
            timestamp: time,
            stage: 'merger',
            agentName: stage.agent,
            action: 'Reward Calculation',
            detail: `Awarded +500 Ziki client contribution points to wisdom Aaron!`
          }
        ];
    }
  };

  // Timer-driven state transition
  useEffect(() => {
    if (!isPlaying || isCompleted) return;

    const timer = setTimeout(() => {
      if (currentStageIndex < STAGES.length - 1) {
        const nextIndex = currentStageIndex + 1;
        setCurrentStageIndex(nextIndex);
        setLogs((prev) => [...prev, ...generateLogsForStage(nextIndex)]);
      } else {
        setIsCompleted(true);
        setIsPlaying(false);
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStageIndex, isCompleted]);

  // Initial log on mount
  useEffect(() => {
    setLogs(generateLogsForStage(0));
  }, []);

  const handleNextStage = () => {
    if (currentStageIndex < STAGES.length - 1) {
      const nextIndex = currentStageIndex + 1;
      setCurrentStageIndex(nextIndex);
      setLogs((prev) => [...prev, ...generateLogsForStage(nextIndex)]);
      if (nextIndex === STAGES.length - 1) {
        setIsCompleted(true);
        setIsPlaying(false);
      }
    } else {
      setIsCompleted(true);
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setCurrentStageIndex(0);
    setIsCompleted(false);
    setIsPlaying(true);
    setLogs(generateLogsForStage(0));
  };

  // Mock deliverable content for preview
  const getDeliverableContent = () => {
    if (brief.goalId === 'security') {
      return `--- ZIKI VULNERABILITY REMEDIATION PATCH ---
Target: ${brief.clientContextSummary['Target Asset'] || 'https://app.example.com'}
Authorization: Confirmed by wisdom Aaron
Date: ${new Date().toISOString().split('T')[0]}

diff --git a/src/server/middleware/securityHeaders.ts b/src/server/middleware/securityHeaders.ts
new file mode 100644
index 0000000..f82e1a9
@@ -0,0 +1,18 @@
+import { Request, Response, NextFunction } from 'express';
+
+export function applyDefensiveHeaders(req: Request, res: Response, next: NextFunction) {
+  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
+  res.setHeader('X-Content-Type-Options', 'nosniff');
+  res.setHeader('X-Frame-Options', 'DENY');
+  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'nonce-secure';");
+  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
+  next();
+}
+
+Status: Verified by Reviewer-99 | Approved for deployment.`;
    }
    return `--- ZIKI INITIATIVE ARTIFACT PACKAGE ---
Goal: ${brief.goalTitle}
Client: wisdom Aaron
Tasks Completed: ${brief.proposedTasks.length} / ${brief.proposedTasks.length}

Deliverables Generated:
${brief.deliverables.map((d, i) => `[${i + 1}] ${d} -> Status: READY_FOR_HANDOVER`).join('\n')}

Simulated Agent Squad Sign-off:
- Triager-01 (Orion): Priority criteria satisfied
- Dispatcher-X (Nova): Task allocation synchronized
- Contributor-Pro (Vanguard): Core payloads synthesized
- Reviewer-99 (Cipher): 100% Quality checks passed
- Merger-Gate (Atlas): Sprint successfully merged`;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Strict Prototype Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>PROTOTYPE DEMONSTRATION:</strong> This simulated agent workflow uses mock transitions to demonstrate human-in-the-loop collaboration. No real repository code was altered, and no live infrastructure was modified.
          </span>
        </div>
        <span className="shrink-0 text-[10px] font-mono uppercase bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
          Simulation Mode
        </span>
      </div>

      {/* Header & Step progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-1.5">
            <span>Step 5 of 5</span>
            <span>·</span>
            <span>Simulated Multi-Agent Collaboration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Autonomous Collaboration in Action
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Watch the 5-stage collaboration workflow execute based on your approved brief.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={isCompleted}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors disabled:opacity-50"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auto-Play</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNextStage}
            disabled={isCompleted}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs font-medium transition-colors disabled:opacity-50"
          >
            <span>Next Stage</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5-Stage Visual Workflow Pipeline */}
      <div className="p-4 rounded-2xl bg-[#0b1329] border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {STAGES.map((stage, idx) => {
            const isCurrent = currentStageIndex === idx;
            const isDone = currentStageIndex > idx || isCompleted;

            return (
              <div
                key={stage.id}
                className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-blue-950/60 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] ring-1 ring-blue-400/40'
                    : isDone
                    ? 'bg-slate-900/70 border-emerald-500/30 text-slate-300'
                    : 'bg-slate-900/30 border-slate-800/80 text-slate-500'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                      {stage.name}
                    </span>
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                    ) : (
                      <Clock className="w-3 h-3 text-slate-600" />
                    )}
                  </div>
                  <h4 className={`text-xs font-bold leading-tight ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                    {stage.title}
                  </h4>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] font-mono text-cyan-400 block truncate">
                    {stage.agent.split(' ')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Logs & Deliverable Artifact Inspector */}
      <div className="rounded-2xl bg-[#0b1329] border border-slate-800 overflow-hidden">
        
        {/* Tab Headers */}
        <div className="px-4 py-2.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('workflow')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'workflow'
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Agent Collaboration Log ({logs.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('artifact')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'artifact'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>Simulated Deliverable Payload</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-500">
            Stage {currentStageIndex + 1} of 5
          </span>
        </div>

        {/* Tab Content */}
        {activeTab === 'workflow' ? (
          <div className="p-4 max-h-72 overflow-y-auto space-y-2.5 font-mono text-xs">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-start gap-3 hover:border-slate-700 transition-colors"
              >
                <span className="text-slate-500 text-[11px] shrink-0 pt-0.5">
                  [{log.timestamp}]
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                  {log.agentName.split(' ')[0]}
                </span>
                <div className="space-y-0.5">
                  <span className="text-slate-200 font-bold mr-2">
                    {log.action}:
                  </span>
                  <span className="text-slate-300 leading-relaxed font-sans text-xs">
                    {log.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-slate-950/90 max-h-72 overflow-y-auto">
            <pre className="text-xs font-mono text-emerald-300 whitespace-pre leading-relaxed">
              {getDeliverableContent()}
            </pre>
          </div>
        )}

      </div>

      {/* Completion Banner (when simulation finishes) */}
      {isCompleted && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-emerald-950/80 border border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.2)] animate-fadeIn space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  COLLABORATION CYCLE COMPLETED
                </span>
                <span className="text-xs text-slate-400">· Prototype Demonstration</span>
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Simulated Merge Approved & Closed</span>
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                All 5 agent roles successfully collaborated within your approved boundaries. Your Ziki account was awarded <strong className="text-amber-400 font-mono">+500 points</strong> for completing this initiative!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onRestartOnboarding}
                className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                Start Another Goal
              </button>

              <button
                type="button"
                onClick={onCompleteSimulation}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-lg transition-all"
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>Return to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

