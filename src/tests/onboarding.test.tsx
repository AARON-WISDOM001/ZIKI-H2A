import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { generateInitialBrief, GOAL_OPTIONS } from '../data/mockData';
import { StepAGoalSelection } from '../components/onboarding/steps/StepAGoalSelection';
import { StepBContextForm } from '../components/onboarding/steps/StepBContextForm';
import { StepCProjectBrief } from '../components/onboarding/steps/StepCProjectBrief';
import { StepDApprovalConfirmation } from '../components/onboarding/steps/StepDApprovalConfirmation';
import { StepEAgentSimulation } from '../components/onboarding/steps/StepEAgentSimulation';

describe('Goal-First Agent Onboarding - Mock Data & Brief Generator', () => {
  it('defines the 4 required goals', () => {
    expect(GOAL_OPTIONS).toHaveLength(4);
    const ids = GOAL_OPTIONS.map((g) => g.id);
    expect(ids).toContain('security');
    expect(ids).toContain('marketing');
    expect(ids).toContain('build');
    expect(ids).toContain('improve');
  });

  it('generates a detailed brief for Website Security with human checkpoints', () => {
    const brief = generateInitialBrief('security', {
      assetUrl: 'https://staging.acmecorp.com',
      authorizationConfirmed: true,
      assessmentScope: 'Full Surface & OWASP Top 10'
    });
    expect(brief.goalId).toBe('security');
    expect(brief.proposedTasks.length).toBeGreaterThanOrEqual(4);
    expect(brief.suggestedAgents.length).toBe(5);
    expect(brief.deliverables.length).toBeGreaterThanOrEqual(3);
    expect(brief.approvalCheckpoints.length).toBeGreaterThanOrEqual(2);
    // At least one task requires human approval
    expect(brief.proposedTasks.some((t) => t.requiresHumanApproval)).toBe(true);
  });

  it('generates a detailed brief for Marketing & SEO', () => {
    const brief = generateInitialBrief('marketing', {
      websiteUrl: 'https://pulse.io',
      targetAudience: 'Engineering managers',
      primaryGoal: '500+ signups'
    });
    expect(brief.goalId).toBe('marketing');
    expect(brief.proposedTasks.length).toBeGreaterThanOrEqual(4);
    expect(brief.clientContextSummary['Website Domain']).toBe('https://pulse.io');
  });

  it('generates a detailed brief for Build a Product', () => {
    const brief = generateInitialBrief('build', {
      productIdea: 'AI Agent Workflows',
      targetUsers: 'Developers'
    });
    expect(brief.goalId).toBe('build');
    expect(brief.proposedTasks.length).toBeGreaterThanOrEqual(4);
  });

  it('generates a detailed brief for Improve Existing Product', () => {
    const brief = generateInitialBrief('improve', {
      repoOrSiteUrl: 'https://github.com/test/repo',
      issueDescription: 'High memory usage'
    });
    expect(brief.goalId).toBe('improve');
    expect(brief.proposedTasks.length).toBeGreaterThanOrEqual(4);
  });
});

describe('Step A — Goal Selection Component', () => {
  it('renders all 4 choices and triggers goal selection', () => {
    const onSelect = vi.fn();
    const onNext = vi.fn();

    render(
      <StepAGoalSelection
        selectedGoal="security"
        onSelectGoal={onSelect}
        onNext={onNext}
      />
    );

    expect(screen.getByText('Website Security')).toBeInTheDocument();
    expect(screen.getByText('Marketing & SEO')).toBeInTheDocument();
    expect(screen.getByText('Build a Product')).toBeInTheDocument();
    expect(screen.getByText('Improve an Existing Product')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Marketing & SEO'));
    expect(onSelect).toHaveBeenCalledWith('marketing');

    fireEvent.click(screen.getByText('Continue to Context Questions'));
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});

describe('Step B — Context Collection Form', () => {
  it('validates required fields on submission', () => {
    const onUpdate = vi.fn();
    const onBack = vi.fn();
    const onSubmit = vi.fn();

    render(
      <StepBContextForm
        selectedGoal="security"
        formData={{}}
        onUpdateFormData={onUpdate}
        onBack={onBack}
        onSubmit={onSubmit}
        isGenerating={false}
      />
    );

    fireEvent.submit(screen.getByTestId('context-form'));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Target URL or asset hostname is required.')).toBeInTheDocument();
  });

  it('pre-fills example data when clicked', () => {
    const onUpdate = vi.fn();
    const onBack = vi.fn();
    const onSubmit = vi.fn();

    render(
      <StepBContextForm
        selectedGoal="security"
        formData={{}}
        onUpdateFormData={onUpdate}
        onBack={onBack}
        onSubmit={onSubmit}
        isGenerating={false}
      />
    );

    fireEvent.click(screen.getByText('Pre-fill Example Data'));
    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        assetUrl: 'https://staging.acmecorp-saas.com',
        authorizationConfirmed: true
      })
    );
  });
});

describe('Step C & D — Project Brief and Human Approval', () => {
  it('renders the brief with tasks, agent squad, and approval button', () => {
    const brief = generateInitialBrief('security', {
      assetUrl: 'https://test.com',
      authorizationConfirmed: true
    });
    const onUpdate = vi.fn();
    const onBack = vi.fn();
    const onApprove = vi.fn();

    render(
      <StepCProjectBrief
        brief={brief}
        onUpdateBrief={onUpdate}
        onBackToContext={onBack}
        onApprovePlan={onApprove}
        isApproved={false}
      />
    );

    expect(screen.getByText(/Project Brief:/i)).toBeInTheDocument();
    expect(screen.getByText('Awaiting Human Approval')).toBeInTheDocument();

    // Click Approve Plan
    fireEvent.click(screen.getByText('Approve Plan'));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it('renders approval confirmation state with authorized scope summary', () => {
    const brief = generateInitialBrief('security', {
      assetUrl: 'https://test.com',
      authorizationConfirmed: true
    });
    const onProceed = vi.fn();
    const onBack = vi.fn();

    render(
      <StepDApprovalConfirmation
        brief={brief}
        onProceedToCollaboration={onProceed}
        onBackToBrief={onBack}
      />
    );

    expect(screen.getByText('Plan Approved & Authorized')).toBeInTheDocument();
    expect(screen.getByText('Launch Simulated Agent Collaboration')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Launch Simulated Agent Collaboration'));
    expect(onProceed).toHaveBeenCalledTimes(1);
  });
});

describe('Step E — Simulated Agent Collaboration', () => {
  it('displays the 5 required collaboration stages', () => {
    const brief = generateInitialBrief('security', {
      assetUrl: 'https://test.com',
      authorizationConfirmed: true
    });
    const onComplete = vi.fn();
    const onRestart = vi.fn();

    render(
      <StepEAgentSimulation
        brief={brief}
        onCompleteSimulation={onComplete}
        onRestartOnboarding={onRestart}
      />
    );

    expect(screen.getByText('1. Triager')).toBeInTheDocument();
    expect(screen.getByText('2. Dispatcher')).toBeInTheDocument();
    expect(screen.getByText('3. Contributor')).toBeInTheDocument();
    expect(screen.getByText('4. Reviewer')).toBeInTheDocument();
    expect(screen.getByText('5. Merger')).toBeInTheDocument();

    // Check prototype disclaimer is displayed clearly
    expect(screen.getByText(/PROTOTYPE DEMONSTRATION/i)).toBeInTheDocument();
  });
});
