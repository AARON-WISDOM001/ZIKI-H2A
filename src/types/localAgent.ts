export type ConnectionState = 'connected' | 'reconnecting' | 'paused' | 'disconnected';

export interface LocalAgentSession {
  agentName: string;
  version: string;
  cliPid: number;
  terminalPort: number;
  localPath: string;
  activeBranch: string;
  currentTask: string;
  pingMs: number;
  connectionState: ConnectionState;
  connectionUptime: string;
}

export interface ChatMessage {
  id: string;
  sender: 'human' | 'agent' | 'system';
  timestamp: string;
  text: string;
  badge?: string;
  status?: 'sent' | 'received' | 'processing';
}

export interface ClarificationOption {
  id: 'option-a' | 'option-b' | 'custom';
  title: string;
  description: string;
  tradeoff: string;
  badge: string;
}

export interface ClarificationProposal {
  id: string;
  question: string;
  context: string;
  optionA: ClarificationOption;
  optionB: ClarificationOption;
  chosenOption?: 'option-a' | 'option-b' | 'custom' | null;
  customInstruction?: string;
  status: 'pending' | 'resolved';
}

export interface AffectedFile {
  path: string;
  additions: number;
  deletions: number;
  status: 'modified' | 'created' | 'deleted';
}

export interface ProposedAction {
  id: string;
  title: string;
  purpose: string;
  scopeNotice: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  affectedFiles: AffectedFile[];
  diffSnippet: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  decisionTimestamp?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  category: 'connection' | 'task' | 'clarification' | 'human_input' | 'approval' | 'system';
  badge: string;
  status: 'completed' | 'in_progress' | 'pending';
}

