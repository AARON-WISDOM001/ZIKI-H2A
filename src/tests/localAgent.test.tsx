import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AgentConnectionBanner } from '../components/localAgent/AgentConnectionBanner';
import { HumanAgentChat } from '../components/localAgent/HumanAgentChat';
import { ClarificationCard } from '../components/localAgent/ClarificationCard';
import { ActionApprovalCard } from '../components/localAgent/ActionApprovalCard';
import { AgentActivityTimeline } from '../components/localAgent/AgentActivityTimeline';
import { 
  INITIAL_LOCAL_AGENT_SESSION, 
  INITIAL_CONVERSATION, 
  INITIAL_CLARIFICATION_PROPOSAL, 
  INITIAL_PROPOSED_ACTION, 
  INITIAL_TIMELINE_EVENTS 
} from '../data/mockLocalAgentData';

describe('Local Agent Control - Section A: Agent Connection Banner', () => {
  it('renders agent session details and connection status', () => {
    const onToggle = vi.fn();
    render(
      <AgentConnectionBanner
        session={INITIAL_LOCAL_AGENT_SESSION}
        onToggleConnection={onToggle}
        isSimulatingReconnect={false}
      />
    );

    expect(screen.getByText('Ziki-Daemon (Aegis-CLI)')).toBeInTheDocument();
    expect(screen.getByText('PID: 48291')).toBeInTheDocument();
    expect(screen.getByText('Connected via Terminal Socket')).toBeInTheDocument();
    expect(screen.getByText('feat/mobile-cart-redesign')).toBeInTheDocument();

    const pauseBtn = screen.getByText('Pause Socket');
    fireEvent.click(pauseBtn);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});

describe('Local Agent Control - Section B: Human-to-Agent Chat', () => {
  it('renders conversation history and dispatches human directives', () => {
    const onSend = vi.fn();
    render(
      <HumanAgentChat
        messages={INITIAL_CONVERSATION}
        onSendMessage={onSend}
        isAgentTyping={false}
      />
    );

    expect(screen.getAllByText(/Only change the mobile layout/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Changes stay within layout boundaries/i)).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Direct your agent/i);
    fireEvent.change(input, { target: { value: 'Ensure no checkout logic is modified' } });

    const submitBtn = screen.getByTitle('Send');
    fireEvent.click(submitBtn);

    expect(onSend).toHaveBeenCalledWith('Ensure no checkout logic is modified');
  });
});

describe('Local Agent Control - Section C: Clarification Card', () => {
  it('renders Option A, Option B, and handles option selection', () => {
    const onSelect = vi.fn();
    const onReset = vi.fn();

    render(
      <ClarificationCard
        proposal={INITIAL_CLARIFICATION_PROPOSAL}
        onSelectOption={onSelect}
        onResetClarification={onReset}
      />
    );

    expect(screen.getByText(/Which responsive layout architecture do you want me to adopt/i)).toBeInTheDocument();
    expect(screen.getByText('Option A: CSS Container Queries (@container)')).toBeInTheDocument();
    expect(screen.getByText('Option B: Viewport Media Queries & Flex Drawer')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Option A: CSS Container Queries (@container)'));
    expect(onSelect).toHaveBeenCalledWith('option-a');
  });
});

describe('Local Agent Control - Section D: Action Approval Card', () => {
  it('renders proposed action, affected files, and responds to approval', () => {
    const onApprove = vi.fn();
    const onReject = vi.fn();
    const onReset = vi.fn();

    render(
      <ActionApprovalCard
        action={INITIAL_PROPOSED_ACTION}
        onApprove={onApprove}
        onReject={onReject}
        onResetDecision={onReset}
      />
    );

    expect(screen.getByText(/Draft Mobile Cart Drawer Bottom Sheet/i)).toBeInTheDocument();
    expect(screen.getByText('src/components/cart/MobileCartDrawer.tsx')).toBeInTheDocument();
    expect(screen.getByText('Approve')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Approve'));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });
});

describe('Local Agent Control - Section E: Activity Timeline', () => {
  it('renders chronological terminal events and badges', () => {
    render(<AgentActivityTimeline events={INITIAL_TIMELINE_EVENTS} />);

    expect(screen.getByText('Local Agent Daemon Connected')).toBeInTheDocument();
    expect(screen.getByText('Task Analysis Started')).toBeInTheDocument();
    expect(screen.getByText('Clarification Dispatched to Human')).toBeInTheDocument();
    expect(screen.getByText('Human Directive Received')).toBeInTheDocument();
    expect(screen.getByText('Proposed Action Prepared')).toBeInTheDocument();
  });
});
