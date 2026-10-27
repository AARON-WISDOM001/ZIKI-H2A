export type GoalId = 'marketing' | 'security' | 'build' | 'improve';

export interface GoalOption {
  id: GoalId;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  recommendedAgents: string[];
}

export interface MarketingContext {
  websiteUrl: string;
  targetAudience: string;
  primaryGoal: string;
  brandVoice?: string;
}

export interface SecurityContext {
  assetUrl: string;
  authorizationConfirmed: boolean;
  assessmentScope: 'Full Surface & OWASP Top 10' | 'API & Auth Flow Focus' | 'Compliance & Dependency Scan' | 'Cloud Infra & Network';
  emergencyContact: string;
}

export interface BuildContext {
  productIdea: string;
  targetUsers: string;
  essentialFeatures: string;
  techStackPreference: string;
}

export interface ImproveContext {
  repoOrSiteUrl: string;
  issueDescription: string;
  desiredOutcome: string;
  priorityLevel: 'High' | 'Medium' | 'Low';
}

export type GoalContext = {
  marketing?: MarketingContext;
  security?: SecurityContext;
  build?: BuildContext;
  improve?: ImproveContext;
};

export interface AgentRole {
  id: string;
  name: string;
  title: string;
  avatarSeed: string;
  color: string;
  specialty: string;
  description: string;
}

export interface ProposedTask {
  id: string;
  title: string;
  description: string;
  assignedRole: string;
  status: 'pending' | 'in_progress' | 'completed' | 'awaiting_approval';
  requiresHumanApproval: boolean;
  outputArtifact?: string;
}

export interface ProjectBrief {
  goalId: GoalId;
  goalTitle: string;
  clientContextSummary: Record<string, string>;
  proposedTasks: ProposedTask[];
  suggestedAgents: AgentRole[];
  deliverables: string[];
  approvalCheckpoints: string[];
  lastModifiedTimestamp?: string;
}

export type CollaborationStage = 'triager' | 'dispatcher' | 'contributor' | 'reviewer' | 'merger';

export interface SimulationStepLog {
  id: string;
  timestamp: string;
  stage: CollaborationStage;
  agentName: string;
  action: string;
  detail: string;
  badge?: string;
}

export type OnboardingStep = 
  | 'step-a-goals' 
  | 'step-b-context' 
  | 'step-c-brief' 
  | 'step-d-approval' 
  | 'step-e-collaboration';

