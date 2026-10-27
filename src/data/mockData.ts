import { GoalOption, AgentRole, ProposedTask, ProjectBrief, GoalId } from '../types/onboarding';

export const GOAL_OPTIONS: GoalOption[] = [
  {
    id: 'security',
    title: 'Website Security',
    tagline: 'Continuous vulnerability detection & automated remediation',
    description: 'Autonomous security triage, penetration vector mapping, and collaborative patch generation for your web endpoints.',
    iconName: 'ShieldAlert',
    accentColor: 'from-blue-500/20 to-cyan-500/10 border-blue-500/40 text-blue-400',
    recommendedAgents: ['Aegis-SecTriage', 'Sentry-VulnerabilityScanner', 'PatchWeaver-FixAgent', 'Guardrail-Reviewer']
  },
  {
    id: 'marketing',
    title: 'Marketing & SEO',
    tagline: 'High-intent organic traffic & conversion optimization',
    description: 'SERP keyword discovery, technical site auditing, competitive content gaps, and algorithmic backlink modeling.',
    iconName: 'Megaphone',
    accentColor: 'from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-400',
    recommendedAgents: ['IndexPulse-SEO', 'CopyCraft-Agent', 'Analytics-Triager', 'RankMaster-Dispatcher']
  },
  {
    id: 'build',
    title: 'Build a Product',
    tagline: 'From zero-to-one MVP architecture to shipped features',
    description: 'Transform user requirements and feature specifications into scalable system architecture, UI components, and tested endpoints.',
    iconName: 'Sparkles',
    accentColor: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400',
    recommendedAgents: ['Archon-SystemArchitect', 'Craftsman-Frontend', 'Nexus-APIEngineer', 'QualitySentinel']
  },
  {
    id: 'improve',
    title: 'Improve an Existing Product',
    tagline: 'Performance optimization, bug resolution & UX refinement',
    description: 'Analyze telemetry, resolve stubborn issues, optimize bundle sizes, and streamline workflows in existing codebases.',
    iconName: 'Wrench',
    accentColor: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-400',
    recommendedAgents: ['Profiler-Telemetry', 'BugHunter-Resolver', 'RefactorPilot', 'PR-Validator']
  }
];

export const AVAILABLE_AGENT_ROLES: Record<string, AgentRole> = {
  triager: {
    id: 'agent-triager',
    name: 'Triager-01 (Orion)',
    title: 'Task Classifier & Priority Engine',
    avatarSeed: 'orion',
    color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    specialty: 'Scope deduplication & constraint analysis',
    description: 'Parses human intent into atomic, actionable task units with bounded parameters and risk tagging.'
  },
  dispatcher: {
    id: 'agent-dispatcher',
    name: 'Dispatcher-X (Nova)',
    title: 'Multi-Agent Work Orchestrator',
    avatarSeed: 'nova',
    color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    specialty: 'Dynamic capability matching & scheduling',
    description: 'Distributes parallel subtasks to domain-specific agents, optimizing throughput while ensuring compliance.'
  },
  contributor: {
    id: 'agent-contributor',
    name: 'Contributor-Pro (Vanguard)',
    title: 'Synthesis & Generation Worker',
    avatarSeed: 'vanguard',
    color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    specialty: 'Code synthesis, patch drafting & asset generation',
    description: 'Drafts exact code modifications, security rule definitions, or marketing payloads based on task context.'
  },
  reviewer: {
    id: 'agent-reviewer',
    name: 'Reviewer-99 (Cipher)',
    title: 'Verification & Integrity Inspector',
    avatarSeed: 'cipher',
    color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    specialty: 'Regression checking & safety validation',
    description: 'Scrutinizes proposed diffs against security standards, performance thresholds, and user guidelines.'
  },
  merger: {
    id: 'agent-merger',
    name: 'Merger-Gate (Atlas)',
    title: 'Human-Gated Release Executive',
    avatarSeed: 'atlas',
    color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    specialty: 'Approved deployment & state synchronization',
    description: 'Finalizes verified artifacts upon human confirmation, updating system issues and tracking points.'
  }
};

export function generateInitialBrief(
  goalId: GoalId,
  contextData: Record<string, any>
): ProjectBrief {
  switch (goalId) {
    case 'security': {
      const target = contextData.assetUrl || 'https://app.example.com';
      const scope = contextData.assessmentScope || 'Full Surface & OWASP Top 10';
      return {
        goalId: 'security',
        goalTitle: 'Website Security Assessment & Remediation',
        clientContextSummary: {
          'Target Asset': target,
          'Authorization Status': contextData.authorizationConfirmed ? 'Confirmed Authorized Owner' : 'Pending Authorization Check',
          'Assessment Scope': scope,
          'Incident Notification': contextData.emergencyContact || 'security-alerts@example.com'
        },
        proposedTasks: [
          {
            id: 'sec-1',
            title: 'Subdomain & Exposed Endpoint Discovery',
            description: `Map out reachable HTTP endpoints, API gateways, and open ports on ${target}.`,
            assignedRole: 'Triager-01 (Orion)',
            status: 'pending',
            requiresHumanApproval: false,
            outputArtifact: 'Asset Attack Surface Catalog'
          },
          {
            id: 'sec-2',
            title: 'Automated Header & Auth Configuration Audit',
            description: 'Evaluate CSP, HSTS, CORS policies, and JWT token rotation mechanisms for leakage.',
            assignedRole: 'Dispatcher-X (Nova)',
            status: 'pending',
            requiresHumanApproval: false,
            outputArtifact: 'Headers & Authentication Scorecard'
          },
          {
            id: 'sec-3',
            title: 'Prepare Vulnerability Remediation Patch',
            description: 'Draft defensive code fixes for identified XSS injection points and permissive CORS headers.',
            assignedRole: 'Contributor-Pro (Vanguard)',
            status: 'pending',
            requiresHumanApproval: true,
            outputArtifact: 'Patch diff: secure-headers-and-sanitization.patch'
          },
          {
            id: 'sec-4',
            title: 'Security Regression & Fuzzing Verification',
            description: 'Validate that remediation patches do not break legitimate user authentication workflows.',
            assignedRole: 'Reviewer-99 (Cipher)',
            status: 'pending',
            requiresHumanApproval: true,
            outputArtifact: 'Fuzzing & Zero-Regression Attestation'
          }
        ],
        suggestedAgents: [
          AVAILABLE_AGENT_ROLES.triager,
          AVAILABLE_AGENT_ROLES.dispatcher,
          AVAILABLE_AGENT_ROLES.contributor,
          AVAILABLE_AGENT_ROLES.reviewer,
          AVAILABLE_AGENT_ROLES.merger
        ],
        deliverables: [
          'Interactive Vulnerability Matrix & Severity Ratings',
          'Automated Pull Request / Hotfix Patch with Inline Explanations',
          'Executive Security Posture Briefing (PDF & Markdown)'
        ],
        approvalCheckpoints: [
          'Authorization confirmation before initiating active probe scans',
          'Human code-review sign-off on patch diff prior to merger execution',
          'Production deploy approval with rollback snapshot'
        ],
        lastModifiedTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }

    case 'marketing': {
      const url = contextData.websiteUrl || 'https://mybrand.io';
      const audience = contextData.targetAudience || 'B2B SaaS Growth Marketers';
      const goal = contextData.primaryGoal || 'Increase high-intent organic signups by 40%';
      return {
        goalId: 'marketing',
        goalTitle: 'Organic Growth & Technical SEO Strategy',
        clientContextSummary: {
          'Website Domain': url,
          'Target Persona': audience,
          'Primary Metric': goal,
          'Tone / Brand Voice': contextData.brandVoice || 'Authoritative yet approachable tech expert'
        },
        proposedTasks: [
          {
            id: 'mkt-1',
            title: 'Search Intent & Competitor Keyword Gap Analysis',
            description: `Mine high-volume, low-competition search queries relevant to ${audience}.`,
            assignedRole: 'Triager-01 (Orion)',
            status: 'pending',
            requiresHumanApproval: false,
            outputArtifact: 'Keyword Opportunity Radar'
          },
          {
            id: 'mkt-2',
            title: 'Core Web Vitals & Crawl Budget Audit',
            description: `Analyze render delays, LCP image payloads, and metadata schemas on ${url}.`,
            assignedRole: 'Dispatcher-X (Nova)',
            status: 'pending',
            requiresHumanApproval: false,
            outputArtifact: 'Technical SEO Health Matrix'
          },
          {
            id: 'mkt-3',
            title: 'High-Impact Content Briefs & Meta Optimization',
            description: 'Generate 5 conversion-focused topic clusters and schema-markup snippets.',
            assignedRole: 'Contributor-Pro (Vanguard)',
            status: 'pending',
            requiresHumanApproval: true,
            outputArtifact: 'Topic Cluster Playbook & Schema.org JSON-LD'
          },
          {
            id: 'mkt-4',
            title: 'Copy & Regulatory Compliance Review',
            description: 'Verify all brand claims and disclaimers align with editorial guidelines.',
            assignedRole: 'Reviewer-99 (Cipher)',
            status: 'pending',
            requiresHumanApproval: true,
            outputArtifact: 'Editorial Quality Sign-off'
          }
        ],
        suggestedAgents: [
          AVAILABLE_AGENT_ROLES.triager,
          AVAILABLE_AGENT_ROLES.dispatcher,
          AVAILABLE_AGENT_ROLES.contributor,
          AVAILABLE_AGENT_ROLES.reviewer,
          AVAILABLE_AGENT_ROLES.merger
        ],
        deliverables: [
          'High-Intent Keyword Map with Difficulty & Search Volume Scores',
          'Structured Schema & Metadata Fixes (Ready to Deploy)',
          '90-Day Organic Acquisition Action Plan'
        ],
        approvalCheckpoints: [
          'Review of selected target keyword clusters before drafting content',
          'Sign-off on landing page metadata and schema changes',
          'Publishing schedule approval'
        ],
        lastModifiedTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }

    case 'build': {
      const idea = contextData.productIdea || 'Real-time collaborative analytics dashboard';
      const users = contextData.targetUsers || 'Data engineering teams and product managers';
      return {
        goalId: 'build',
        goalTitle: 'New Product Architecture & MVP Scaffolding',
        clientContextSummary: {
          'Product Concept': idea,
          'Target Users': users,
          'Core Features': contextData.essentialFeatures || 'Real-time telemetry, drag-and-drop widgets, team sharing',
          'Stack Preference': contextData.techStackPreference || 'TypeScript / React / Node.js'
        },
        proposedTasks: [
          {
            id: 'bld-1',
            title: 'Decompose Product Specs into User Stories',
            description: 'Break down overarching vision into sprint-sized technical milestones.',
            assignedRole: 'Triager-01 (Orion)',
            status: 'pending',
            requiresHumanApproval: false,
            outputArtifact: 'Milestone Dependency Graph'
          },
          {
            id: 'bld-2',
            title: 'Architecture & Data Schema Blueprinting',
            description: 'Design database entity relationships, API contracts, and state flow models.',
            assignedRole: 'Dispatcher-X (Nova)',
            status: 'pending',
            requiresHumanApproval: true,
            outputArtifact: 'OpenAPI Spec & Entity-Relationship Schema'
          },
          {
            id: 'bld-3',
            title: 'Scaffold Component Library & Core Views',
            description: 'Draft reusable UI primitives with responsive layouts and dark mode support.',
            assignedRole: 'Contributor-Pro (Vanguard)',
            status: 'pending',
            requiresHumanApproval: false,
            outputArtifact: 'Interactive UI Scaffolding PR'
          },
          {
            id: 'bld-4',
            title: 'Automated Test Suite & Edge Case Audit',
            description: 'Implement end-to-end user flows and verify zero regression coverage.',
            assignedRole: 'Reviewer-99 (Cipher)',
            status: 'pending',
            requiresHumanApproval: true,
            outputArtifact: 'Test Coverage Attestation (94%)'
          }
        ],
        suggestedAgents: [
          AVAILABLE_AGENT_ROLES.triager,
          AVAILABLE_AGENT_ROLES.dispatcher,
          AVAILABLE_AGENT_ROLES.contributor,
          AVAILABLE_AGENT_ROLES.reviewer,
          AVAILABLE_AGENT_ROLES.merger
        ],
        deliverables: [
          'Modular Frontend Scaffolding with Modern UI Components',
          'Validated API Contracts & Database Migration Scripts',
          'Deployable Preview Environment URL'
        ],
        approvalCheckpoints: [
          'Human review of API contract and database schemas before coding',
          'UI design sign-off before assembling backend integrations',
          'Staging deploy authorization'
        ],
        lastModifiedTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }

    case 'improve': {
      const repo = contextData.repoOrSiteUrl || 'https://github.com/org/core-web-app';
      const issue = contextData.issueDescription || 'Sub-optimal page load speed on mobile dashboard';
      return {
        goalId: 'improve',
        goalTitle: 'Targeted System Improvement & Bug Resolution',
        clientContextSummary: {
          'Repository / Target': repo,
          'Reported Problem': issue,
          'Desired Outcome': contextData.desiredOutcome || 'Sub-1.2s LCP on mobile and clean error telemetry',
          'Priority': contextData.priorityLevel || 'High'
        },
        proposedTasks: [
          {
            id: 'imp-1',
            title: 'Telemetry Profiling & Root-Cause Pinpointing',
            description: `Inspect bundle analyzer logs, waterfall traces, and flame graphs for ${repo}.`,
            assignedRole: 'Triager-01 (Orion)',
            status: 'pending',
            requiresHumanApproval: false,
            outputArtifact: 'Performance Bottleneck Profile'
          },
          {
            id: 'imp-2',
            title: 'Assign Fix Vectors & Isolation Benchmarks',
            description: 'Carve out isolated reproduction harness and benchmark memory pressure.',
            assignedRole: 'Dispatcher-X (Nova)',
            status: 'pending',
            requiresHumanApproval: false,
            outputArtifact: 'Reproduction Sandbox Spec'
          },
          {
            id: 'imp-3',
            title: 'Implement Optimized Tree-Shaking & Code Split',
            description: 'Refactor heavy dependencies to dynamic imports and memoize expensive state renders.',
            assignedRole: 'Contributor-Pro (Vanguard)',
            status: 'pending',
            requiresHumanApproval: true,
            outputArtifact: 'Git Patch: perf-optimization-bundle-split.patch'
          },
          {
            id: 'imp-4',
            title: 'Continuous Benchmarking & Visual Regression',
            description: 'Verify 0% visual delta and validate 48% bundle size reduction.',
            assignedRole: 'Reviewer-99 (Cipher)',
            status: 'pending',
            requiresHumanApproval: true,
            outputArtifact: 'Lighthouse Scorecard (Mobile 98/100)'
          }
        ],
        suggestedAgents: [
          AVAILABLE_AGENT_ROLES.triager,
          AVAILABLE_AGENT_ROLES.dispatcher,
          AVAILABLE_AGENT_ROLES.contributor,
          AVAILABLE_AGENT_ROLES.reviewer,
          AVAILABLE_AGENT_ROLES.merger
        ],
        deliverables: [
          'Root-Cause Diagnostic Report with Micro-Benchmarks',
          'Clean Git Pull Request with Code Splitting & Caching Optimizations',
          'Automated CI Performance Regression Guardrail'
        ],
        approvalCheckpoints: [
          'Human review of proposed architectural refactor strategy',
          'Pull request review and approval before merging into staging/production',
          'Telemetry release canary sign-off'
        ],
        lastModifiedTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
  }
}

