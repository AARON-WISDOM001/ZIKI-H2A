import React, { useState } from 'react';
import { 
  Terminal, 
  Bot, 
  MessageSquare, 
  ShieldCheck, 
  HelpCircle, 
  Activity, 
  Sparkles, 
  Radio, 
  ArrowRight,
  RefreshCw,
  Compass,
  FileCode,
  CheckCircle2
} from 'lucide-react';
import { 
  LocalAgentSession, 
  ChatMessage, 
  ClarificationProposal, 
  ProposedAction, 
  TimelineEvent 
} from '../../types/localAgent';
import { 
  INITIAL_LOCAL_AGENT_SESSION, 
  INITIAL_CONVERSATION, 
  INITIAL_CLARIFICATION_PROPOSAL, 
  INITIAL_PROPOSED_ACTION, 
  INITIAL_TIMELINE_EVENTS 
} from '../../data/mockLocalAgentData';
import { AgentConnectionBanner } from './AgentConnectionBanner';
import { HumanAgentChat } from './HumanAgentChat';
import { ClarificationCard } from './ClarificationCard';
import { ActionApprovalCard } from './ActionApprovalCard';
import { AgentActivityTimeline } from './AgentActivityTimeline';
import { WhimsicalAgentGraphic } from '../whimsical/WhimsicalAgentGraphic';

interface LocalAgentDashboardProps {
  onBackToOverview?: () => void;
  onLaunchGoalOnboarding?: () => void;
}

export const LocalAgentDashboard: React.FC<LocalAgentDashboardProps> = ({
  onBackToOverview,
  onLaunchGoalOnboarding
}) => {
  const [session, setSession] = useState<LocalAgentSession>(INITIAL_LOCAL_AGENT_SESSION);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CONVERSATION);
  const [clarification, setClarification] = useState<ClarificationProposal>(INITIAL_CLARIFICATION_PROPOSAL);
  const [action, setAction] = useState<ProposedAction>(INITIAL_PROPOSED_ACTION);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(INITIAL_TIMELINE_EVENTS);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [isSimulatingReconnect, setIsSimulatingReconnect] = useState(false);

  // Toggle connection state (Section A)
  const handleToggleConnection = () => {
    if (session.connectionState === 'connected') {
      setSession((prev) => ({
        ...prev,
        connectionState: 'paused'
      }));
      setTimelineEvents((prev) => [
        {
          id: `evt-pause-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: 'Terminal Socket Paused by Human',
          description: 'Developer paused background agent stream via Ziki web control.',
          category: 'connection',
          badge: 'Paused',
          status: 'completed'
        },
        ...prev
      ]);
    } else {
      setIsSimulatingReconnect(true);
      setTimeout(() => {
        setSession((prev) => ({
          ...prev,
          connectionState: 'connected'
        }));
        setIsSimulatingReconnect(false);
        setTimelineEvents((prev) => [
          {
            id: `evt-resume-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            title: 'Terminal Socket Resumed',
            description: 'Daemon re-established TLS handshake on localhost:4242 with 14ms latency.',
            category: 'connection',
            badge: 'Reconnected',
            status: 'completed'
          },
          ...prev
        ]);
      }, 700);
    }
  };

  // Handle Human-to-Agent chat message (Section B)
  const handleSendMessage = (text: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'human',
      timestamp: time,
      text: text,
      badge: 'Human Directive'
    };

    setMessages((prev) => [...prev, userMsg]);

    // Add to timeline
    setTimelineEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        timestamp: time,
        title: 'Human Directive Delivered',
        description: `Developer sent instruction to terminal agent: "${text.slice(0, 50)}${text.length > 50 ? '...' : ''}"`,
        category: 'human_input',
        badge: 'Directive Received',
        status: 'completed'
      },
      ...prev
    ]);

    // Simulate agent formulation and response
    setIsAgentTyping(true);
    setTimeout(() => {
      let replyText = `Understood. I have constrained my execution parameters to: "${text}". The local terminal task is updating accordingly without touching external files.`;
      
      if (text.toLowerCase().includes('mobile') || text.toLowerCase().includes('layout')) {
        replyText = `Understood. The proposed changes will strictly stay within the responsive layout boundaries. No state stores, checkout APIs, or auth tokens will be touched.`;
      } else if (text.toLowerCase().includes('test')) {
        replyText = `Added automated layout test cases for mobile touch viewports to the verification queue.`;
      }

      const agentMsg: ChatMessage = {
        id: `msg-agent-${Date.now()}`,
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: replyText,
        badge: 'Boundary Locked'
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsAgentTyping(false);
    }, 1100);
  };

  // Handle clarification selection (Section C)
  const handleSelectClarificationOption = (optionId: 'option-a' | 'option-b' | 'custom', customText?: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setClarification((prev) => ({
      ...prev,
      chosenOption: optionId,
      customInstruction: customText,
      status: 'resolved'
    }));

    const choiceLabel = optionId === 'option-a' 
      ? 'Option A (CSS Container Queries)' 
      : optionId === 'option-b' 
      ? 'Option B (Media Query Breakpoints)' 
      : `Custom: "${customText}"`;

    // Add notification into chat
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-clar-${Date.now()}`,
        sender: 'human',
        timestamp: time,
        text: `Architecture decision resolved: Proceeding with ${choiceLabel}.`,
        badge: 'Human Decision'
      },
      {
        id: `msg-agent-clar-${Date.now()}`,
        sender: 'agent',
        timestamp: time,
        text: `Confirmed. Applying ${choiceLabel} strategy into the local staged branch.`,
        badge: 'Strategy Configured'
      }
    ]);

    // Add to timeline
    setTimelineEvents((prev) => [
      {
        id: `evt-clar-${Date.now()}`,
        timestamp: time,
        title: 'Clarification Decision Recorded',
        description: `Human selected ${choiceLabel}. Staged code generation aligned with human guidance.`,
        category: 'clarification',
        badge: 'Choice Logged',
        status: 'completed'
      },
      ...prev
    ]);
  };

  const handleResetClarification = () => {
    setClarification({
      ...INITIAL_CLARIFICATION_PROPOSAL,
      status: 'pending',
      chosenOption: null
    });
  };

  // Handle proposed action approve/reject (Section D)
  const handleApproveAction = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAction((prev) => ({
      ...prev,
      status: 'approved',
      decisionTimestamp: time
    }));

    setTimelineEvents((prev) => [
      {
        id: `evt-appr-${Date.now()}`,
        timestamp: time,
        title: 'Action Approved & Applied in Local Terminal',
        description: `Developer approved staged diff. Local daemon executed merge to feat/mobile-cart-redesign.`,
        category: 'approval',
        badge: 'Merge Approved',
        status: 'completed'
      },
      ...prev
    ]);

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-appr-${Date.now()}`,
        sender: 'agent',
        timestamp: time,
        text: `Human approval received! Local git patch applied cleanly (48 additions, 8 deletions). Repository is clean and passing tests.`,
        badge: 'Applied Locally'
      }
    ]);
  };

  const handleRejectAction = (reason?: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAction((prev) => ({
      ...prev,
      status: 'rejected',
      rejectionReason: reason || 'Rejected by developer.',
      decisionTimestamp: time
    }));

    setTimelineEvents((prev) => [
      {
        id: `evt-rej-${Date.now()}`,
        timestamp: time,
        title: 'Action Rejected by Developer',
        description: `Human rejected staged changes: "${reason || 'Modification disapproved'}". Terminal rolling back.`,
        category: 'approval',
        badge: 'Rejected',
        status: 'completed'
      },
      ...prev
    ]);

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-rej-${Date.now()}`,
        sender: 'agent',
        timestamp: time,
        text: `Proposal rejected by developer. Staged changes have been rolled back in ~/projects/acme-shop. Awaiting updated directives.`,
        badge: 'Rolled Back'
      }
    ]);
  };

  const handleResetActionDecision = () => {
    setAction({
      ...INITIAL_PROPOSED_ACTION,
      status: 'pending'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-fade-in-up">
      
      {/* Top Header Banner with Living Agent Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm animate-pulse">
              PROPOSED HAI DESIGN CONCEPT
            </span>
            <span className="text-xs text-slate-400 font-mono">· Web-to-Terminal Coordination</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Ziki Local Agent Control
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Guide AI coding agents running in your local terminal from anywhere on the web. Give directives, resolve architectural forks, review staged diffs, and approve changes without terminal context switching.
          </p>
        </div>

        {onLaunchGoalOnboarding && (
          <button
            type="button"
            onClick={onLaunchGoalOnboarding}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-cyan-300 text-xs font-semibold transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Goal-First Planner</span>
          </button>
        )}
      </div>

      {/* SECTION A: Agent Connection Banner */}
      <section aria-labelledby="section-agent-connection">
        <AgentConnectionBanner
          session={session}
          onToggleConnection={handleToggleConnection}
          isSimulatingReconnect={isSimulatingReconnect}
        />
      </section>

      {/* Living Whimsical Mascot Atmosphere Card */}
      <div className="p-4 rounded-3xl bg-slate-900/40 border border-blue-500/20 shadow-xl overflow-hidden">
        <WhimsicalAgentGraphic
          statusText={
            action.status === 'approved'
              ? "All staged local changes authorized! Terminal merge completed with zero regressions."
              : clarification.status === 'resolved'
              ? "Architectural strategy locked by developer. Terminal agent synthesizing changes within layout boundaries."
              : "Standing by on local port 4242. Review the clarification and staged diff below to guide execution."
          }
        />
      </div>

      {/* Two Column Grid: Conversation (Section B) + Decisions & Approvals (Section C & D) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 Cols on LG): Section B - Human-to-Agent Live Chat */}
        <div className="lg:col-span-5 space-y-6">
          <HumanAgentChat
            messages={messages}
            onSendMessage={handleSendMessage}
            isAgentTyping={isAgentTyping}
          />
        </div>

        {/* Right Column (7 Cols on LG): Section C & D - Clarification Card & Proposed Action Approval */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* SECTION C: Agent Clarification Card */}
          <section aria-labelledby="section-clarification">
            <ClarificationCard
              proposal={clarification}
              onSelectOption={handleSelectClarificationOption}
              onResetClarification={handleResetClarification}
            />
          </section>

          {/* SECTION D: Proposed Action Approval */}
          <section aria-labelledby="section-approval">
            <ActionApprovalCard
              action={action}
              onApprove={handleApproveAction}
              onReject={handleRejectAction}
              onResetDecision={handleResetActionDecision}
            />
          </section>

        </div>

      </div>

      {/* SECTION E: Agent Activity Timeline (Full Width) */}
      <section aria-labelledby="section-timeline" className="pt-2">
        <AgentActivityTimeline events={timelineEvents} />
      </section>

    </div>
  );
};

