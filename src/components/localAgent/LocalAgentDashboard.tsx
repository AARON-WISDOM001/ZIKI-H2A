import React, { useState } from 'react';
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

export const LocalAgentDashboard: React.FC = () => {
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
          description: 'Agent stream paused.',
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
            description: 'Reconnected on localhost:4242.',
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

    setTimelineEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        timestamp: time,
        title: 'Human Directive Delivered',
        description: `"${text.slice(0, 40)}${text.length > 40 ? '…' : ''}"`,
        category: 'human_input',
        badge: 'Directive Received',
        status: 'completed'
      },
      ...prev
    ]);

    setIsAgentTyping(true);
    setTimeout(() => {
      let replyText = `Locked: "${text.slice(0, 60)}${text.length > 60 ? '…' : ''}"`;
      
      if (text.toLowerCase().includes('mobile') || text.toLowerCase().includes('layout')) {
        replyText = `Understood. Changes stay within layout boundaries.`;
      } else if (text.toLowerCase().includes('test')) {
        replyText = `Added layout test cases to the queue.`;
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
      ? 'Option A' 
      : optionId === 'option-b' 
      ? 'Option B' 
      : `Custom: "${customText}"`;

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-clar-${Date.now()}`,
        sender: 'human',
        timestamp: time,
        text: `Proceeding with ${choiceLabel}.`,
        badge: 'Human Decision'
      },
      {
        id: `msg-agent-clar-${Date.now()}`,
        sender: 'agent',
        timestamp: time,
        text: `Confirmed. Applying ${choiceLabel}.`,
        badge: 'Strategy Configured'
      }
    ]);

    setTimelineEvents((prev) => [
      {
        id: `evt-clar-${Date.now()}`,
        timestamp: time,
        title: 'Clarification Decision Recorded',
        description: `Human selected ${choiceLabel}.`,
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
        description: `Merged to feat/mobile-cart-redesign.`,
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
        text: `Approved. Patch applied cleanly (48+, 8−).`,
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
        description: 'Rolling back.',
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
        text: `Rejected. Staged changes rolled back.`,
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-800 animate-fade-in-up font-sans">
      
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">
              HAI Concept Demo
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            Ziki Local Agent Control
          </h1>
        </div>
      </div>

      {/* SECTION A: Agent Connection Banner */}
      <section aria-labelledby="section-agent-connection">
        <AgentConnectionBanner
          session={session}
          onToggleConnection={handleToggleConnection}
          isSimulatingReconnect={isSimulatingReconnect}
        />
      </section>

      {/* Two Column Grid: Conversation (Section B) + Decisions & Approvals (Section C & D) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Section B - Human-to-Agent Live Chat */}
        <div className="lg:col-span-5 space-y-5">
          <HumanAgentChat
            messages={messages}
            onSendMessage={handleSendMessage}
            isAgentTyping={isAgentTyping}
          />
        </div>

        {/* Right Column: Section C & D - Clarification Card & Proposed Action Approval */}
        <div className="lg:col-span-7 space-y-5">
          
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
      <section aria-labelledby="section-timeline" className="pt-1">
        <AgentActivityTimeline events={timelineEvents} />
      </section>

    </div>
  );
};
