import { 
  LocalAgentSession, 
  ChatMessage, 
  ClarificationProposal, 
  ProposedAction, 
  TimelineEvent 
} from '../types/localAgent';

export const INITIAL_LOCAL_AGENT_SESSION: LocalAgentSession = {
  agentName: 'Ziki-Daemon (Aegis-CLI)',
  version: 'v2.4.8-local',
  cliPid: 48291,
  terminalPort: 4242,
  localPath: '~/projects/acme-shop',
  activeBranch: 'feat/mobile-cart-redesign',
  currentTask: 'Mobile cart drawer refactor (layout only)',
  pingMs: 14,
  connectionState: 'connected',
  connectionUptime: '34m 12s'
};

export const INITIAL_CONVERSATION: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'agent',
    timestamp: '10:42 AM',
    text: "Connected to ~/projects/acme-shop. Ready for the mobile cart refactor.",
    badge: 'Daemon Handshake'
  },
  {
    id: 'msg-2',
    sender: 'human',
    timestamp: '10:46 AM',
    text: "Only change the mobile layout. Do not modify cart logic or authentication.",
    badge: 'Human Directive'
  },
  {
    id: 'msg-3',
    sender: 'agent',
    timestamp: '10:46 AM',
    text: "Understood. Changes stay within layout boundaries — no cart state or auth touched.",
    badge: 'Scope Locked'
  }
];

export const INITIAL_CLARIFICATION_PROPOSAL: ClarificationProposal = {
  id: 'clar-101',
  question: 'Which responsive layout architecture do you want me to adopt for the mobile drawer?',
  context: 'Below 768px: isolate layout with Container Queries, or use classic media-query breakpoints.',
  optionA: {
    id: 'option-a',
    title: 'Option A: CSS Container Queries (@container)',
    description: 'Self-contained responsive logic per widget.',
    tradeoff: 'Modern browsers only.',
    badge: 'Recommended'
  },
  optionB: {
    id: 'option-b',
    title: 'Option B: Viewport Media Queries & Flex Drawer',
    description: 'Classic breakpoints with a slide-up drawer.',
    tradeoff: 'Wider compatibility.',
    badge: 'Compatible'
  },
  status: 'pending'
};

export const INITIAL_PROPOSED_ACTION: ProposedAction = {
  id: 'act-204',
  title: 'Draft Mobile Cart Drawer Bottom Sheet & Touch Sheet Overlay',
  purpose: 'Native-feeling mobile drawer for screens under 768px. Cart state and auth untouched.',
  scopeNotice: 'Approving tells your local daemon to apply the staged changes.',
  riskLevel: 'Low',
  affectedFiles: [
    {
      path: 'src/components/cart/MobileCartDrawer.tsx',
      additions: 48,
      deletions: 8,
      status: 'created'
    },
    {
      path: 'src/styles/cart-responsive.css',
      additions: 32,
      deletions: 4,
      status: 'modified'
    }
  ],
  diffSnippet: `diff --git a/src/components/cart/MobileCartDrawer.tsx
new file mode 100644
@@ -0,0 +1,24 @@
+import { useCartState } from '../../hooks/useCartState';
+
+export const MobileCartDrawer = ({ isOpen, onClose }) => {
+  const { items } = useCartState();
+  if (!isOpen) return null;
+  return (
+    <div className="fixed inset-x-0 bottom-0 md:hidden">
+      {/* Responsive item list */}
+    </div>
+  );
+};`,
  status: 'pending'
};

export const INITIAL_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'evt-1',
    timestamp: '10:42 AM',
    title: 'Local Agent Daemon Connected',
    description: 'Socket active on localhost:4242.',
    category: 'connection',
    badge: 'Socket Active',
    status: 'completed'
  },
  {
    id: 'evt-2',
    timestamp: '10:43 AM',
    title: 'Task Analysis Started',
    description: 'Scanned repo, scoped mobile layout.',
    category: 'task',
    badge: 'Scanned',
    status: 'completed'
  },
  {
    id: 'evt-3',
    timestamp: '10:45 AM',
    title: 'Clarification Dispatched to Human',
    description: 'Paused before choosing layout architecture.',
    category: 'clarification',
    badge: 'Human in Loop',
    status: 'completed'
  },
  {
    id: 'evt-4',
    timestamp: '10:46 AM',
    title: 'Human Directive Received',
    description: '"Only change the mobile layout."',
    category: 'human_input',
    badge: 'Boundary Locked',
    status: 'completed'
  },
  {
    id: 'evt-5',
    timestamp: '10:48 AM',
    title: 'Proposed Action Prepared',
    description: 'Staged diff ready for approval.',
    category: 'approval',
    badge: 'Awaiting Sign-off',
    status: 'in_progress'
  }
];
