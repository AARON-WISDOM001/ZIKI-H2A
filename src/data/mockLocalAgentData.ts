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
  currentTask: 'Refactoring Mobile Cart Drawer & touch gestures without touching core checkout logic',
  pingMs: 14,
  connectionState: 'connected',
  connectionUptime: '34m 12s'
};

export const INITIAL_CONVERSATION: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'agent',
    timestamp: '10:42 AM',
    text: "Connected to local terminal session in ~/projects/acme-shop. I'm ready to begin work on the mobile cart drawer refactor.",
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
    text: "Understood. The proposed changes will strictly stay within the responsive layout boundaries. No cart state stores, checkout APIs, or auth tokens will be touched.",
    badge: 'Scope Locked'
  }
];

export const INITIAL_CLARIFICATION_PROPOSAL: ClarificationProposal = {
  id: 'clar-101',
  question: 'Which responsive layout architecture do you want me to adopt for the mobile drawer?',
  context: 'The current desktop implementation uses hover popovers. On viewports under 768px, we can either isolate layout with CSS Container Queries or use standard Media Query Breakpoints.',
  optionA: {
    id: 'option-a',
    title: 'Option A: CSS Container Queries (@container)',
    description: 'Enables self-contained responsive logic inside the cart widget, independent of outer viewport dimensions. Cleaner modularity.',
    tradeoff: 'Requires modern browsers (Chrome 105+, Safari 16+, Firefox 110+).',
    badge: 'Recommended · Modern'
  },
  optionB: {
    id: 'option-b',
    title: 'Option B: Viewport Media Queries & Flex Drawer',
    description: 'Uses conventional @media (max-width: 768px) with a slide-up flex drawer sheet.',
    tradeoff: 'Slightly more global CSS rules, but maximum backward compatibility.',
    badge: 'Broad Compatibility'
  },
  status: 'pending'
};

export const INITIAL_PROPOSED_ACTION: ProposedAction = {
  id: 'act-204',
  title: 'Draft Mobile Cart Drawer Bottom Sheet & Touch Sheet Overlay',
  purpose: 'Provide a native-feeling mobile experience for screens < 768px while strictly keeping cart state, validation hooks, and authentication tokens unchanged.',
  scopeNotice: 'Reviewing proposal in Ziki Web Dashboard. Approving will instruct your local daemon to apply the staged changes in ~/projects/acme-shop.',
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
  diffSnippet: `diff --git a/src/components/cart/MobileCartDrawer.tsx b/src/components/cart/MobileCartDrawer.tsx
new file mode 100644
index 0000000..7c938a1
--- /dev/null
+++ b/src/components/cart/MobileCartDrawer.tsx
@@ -0,0 +1,24 @@
+import React from 'react';
+import { useCartState } from '../../hooks/useCartState';
+
+// Human Directive: Scope limited strictly to layout presentation
+export const MobileCartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
+  isOpen,
+  onClose
+}) => {
+  const { items, total } = useCartState(); // Read-only consumer
+
+  if (!isOpen) return null;
+  return (
+    <div className="fixed inset-0 z-50 md:hidden bg-slate-950/80 backdrop-blur-sm animate-fade-in">
+      <div className="fixed inset-x-0 bottom-0 bg-slate-900 border-t border-cyan-500/30 rounded-t-2xl p-5 shadow-2xl">
+        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4" />
+        <h3 className="text-sm font-bold text-white">Your Cart ({items.length})</h3>
+        <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
+          {/* Responsive item list */}
+        </div>
+      </div>
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
    description: 'Handshake verified on localhost:4242. Session PID 48291 bound to repository acme-shop.',
    category: 'connection',
    badge: 'Socket Active',
    status: 'completed'
  },
  {
    id: 'evt-2',
    timestamp: '10:43 AM',
    title: 'Task Analysis Started',
    description: 'Agent parsed repository structure and identified mobile layout improvement scope.',
    category: 'task',
    badge: 'AST Parsed',
    status: 'completed'
  },
  {
    id: 'evt-3',
    timestamp: '10:45 AM',
    title: 'Clarification Dispatched to Human',
    description: 'Agent paused before selecting layout architecture, requesting human developer decision.',
    category: 'clarification',
    badge: 'Human in Loop',
    status: 'completed'
  },
  {
    id: 'evt-4',
    timestamp: '10:46 AM',
    title: 'Human Directive Received',
    description: 'Developer constrained changes: "Only change the mobile layout. Do not modify cart logic or authentication."',
    category: 'human_input',
    badge: 'Boundary Locked',
    status: 'completed'
  },
  {
    id: 'evt-5',
    timestamp: '10:48 AM',
    title: 'Proposed Action Prepared',
    description: 'Staged diff generated for MobileCartDrawer.tsx and cart-responsive.css. Ready for visual approval.',
    category: 'approval',
    badge: 'Awaiting Sign-off',
    status: 'in_progress'
  }
];

