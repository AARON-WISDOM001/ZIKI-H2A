import React, { useState } from 'react';
import { Shield, Sparkles, Lock, Users, Bot, MessageSquare, CheckCircle, Zap } from 'lucide-react';

interface WhimsicalAgentGraphicProps {
  interactive?: boolean;
  statusText?: string;
  isThinking?: boolean;
  onExploreGoal?: (goalId: string) => void;
}

export const WhimsicalAgentGraphic: React.FC<WhimsicalAgentGraphicProps> = ({
  interactive = true,
  statusText,
  isThinking = false,
  onExploreGoal
}) => {
  const [speechBubbleIndex, setSpeechBubbleIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const speechMessages = [
    "Hello wisdom! I'm your Ziki Agent Coordinator. State your goal, and I'll assemble the squad.",
    "No guesswork required. We generate the project brief; you maintain 100% human approval control.",
    "All tasks undergo triage, dispatch, contribution, review, and approved merge before execution."
  ];

  const handleMascotClick = () => {
    setSpeechBubbleIndex((prev) => (prev + 1) % speechMessages.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-2 px-2 select-none animate-fade-in-up">
      {/* Layered ambient backdrop glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none transition-all duration-700" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-60 h-60 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        
        {/* Left: Living Futuristic Agent Mascot & Energy Shield */}
        <div className="relative flex-1 flex flex-col items-center justify-center">
          
          {/* Interactive Speech / Status Bubble */}
          <div 
            onClick={handleMascotClick}
            className={`mb-3 max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl border backdrop-blur-md cursor-pointer transition-all duration-300 relative ${
              isThinking 
                ? 'bg-blue-950/80 border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse' 
                : 'bg-slate-900/80 border-blue-500/30 hover:border-blue-400/60 shadow-[0_0_15px_rgba(37,99,235,0.2)]'
            }`}
            title="Click to hear from your agent companion"
          >
            {/* Bubble arrow pointing down to agent */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit border-r border-b border-inherit rotate-45" />

            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                {isThinking ? <Zap className="w-3 h-3 animate-spin text-cyan-300" /> : <Bot className="w-3 h-3 text-cyan-300" />}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold block mb-0.5">
                  {isThinking ? 'AI SYNTHESIZER ACTIVE' : 'ZIKI SQUAD COMPANION'}
                </span>
                <p className="text-xs text-slate-200 leading-snug font-sans">
                  {statusText || speechMessages[speechBubbleIndex]}
                </p>
              </div>
            </div>
          </div>

          <div 
            className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center cursor-pointer group"
            onClick={handleMascotClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* Holographic orbital rings with smooth counter-rotation */}
            <div 
              className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin transition-opacity duration-500" 
              style={{ animationDuration: isHovered ? '12s' : '26s' }} 
            />
            <div 
              className="absolute inset-4 rounded-full border border-dashed border-blue-400/30 animate-spin" 
              style={{ animationDuration: isHovered ? '8s' : '18s', animationDirection: 'reverse' }} 
            />

            {/* Living Cyber Agent SVG with Floating & Visor Blinking Motion */}
            <div className="relative z-10 animate-soft-float transition-transform duration-300 group-hover:scale-105">
              <svg 
                width="220" 
                height="220" 
                viewBox="0 0 240 240" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]"
              >
                <defs>
                  <linearGradient id="armorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#1e3a8a" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.25" />
                  </linearGradient>
                  <linearGradient id="energyBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                  </linearGradient>
                  <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Torso & Shoulders */}
                <path d="M70 170 C70 130 90 120 120 120 C150 120 170 130 170 170 L155 210 L85 210 Z" fill="url(#armorGrad)" stroke="#60a5fa" strokeWidth="2" />
                <path d="M100 135 L120 155 L140 135" stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.8" />

                {/* Chest Core Badge with Pulsing Light */}
                <circle cx="120" cy="165" r="14" fill="#0c1427" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="120" cy="165" r="7" fill="#38bdf8" className="animate-pulse" opacity="0.9" />
                <path d="M116 165 L119 168 L125 162" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                {/* Neck & Head */}
                <rect x="112" y="105" width="16" height="18" rx="4" fill="#1e293b" />
                <ellipse cx="120" cy="85" rx="30" ry="34" fill="#0f172a" stroke="#60a5fa" strokeWidth="2" />
                
                {/* Sleek Visor with Blinking Animation */}
                <g className="animate-visor-blink">
                  <path d="M96 82 C96 74 144 74 144 82 C144 92 96 92 96 82 Z" fill="#38bdf8" filter="url(#neonGlow)" />
                  <line x1="99" y1="82" x2="141" y2="82" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* Agent Arm reaching forward holding shield */}
                <path d="M150 140 C170 145 185 130 195 125" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" />
                <circle cx="195" cy="125" r="5" fill="#38bdf8" />

                {/* Holographic Glowing Energy Shield */}
                <g className="animate-shield-pulse">
                  <polygon points="195,80 230,95 230,150 195,175 160,150 160,95" fill="url(#shieldGrad)" stroke="#38bdf8" strokeWidth="3" filter="url(#neonGlow)" />
                  <polygon points="195,92 218,105 218,142 195,160 172,142 172,105" fill="none" stroke="#67e8f9" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M188 128 L193 133 L203 121" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* Digital data rings curving around the agent */}
                <ellipse cx="120" cy="140" rx="90" ry="24" stroke="url(#energyBeam)" strokeWidth="3" transform="rotate(-15 120 140)" />
              </svg>
            </div>

            {/* Shield Label Badge */}
            <div className="absolute top-2 right-2 sm:right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/85 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-semibold tracking-wider glow-cyan transition-transform group-hover:scale-105">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>PROTECTION</span>
            </div>
          </div>
        </div>

        {/* Right: Feature Highlights matching whimsical security screenshot */}
        <div className="flex-1 space-y-4 w-full">
          
          {/* Findings Detected Stream */}
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-blue-500/20 backdrop-blur-sm hover:border-blue-500/50 hover:bg-slate-900/90 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between group cursor-default">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-blue-400 font-bold block">
                  FINDINGS DETECTED
                </span>
                <p className="text-xs text-slate-300">Continuous telemetry & vulnerability vector analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Live Stream
              </span>
            </div>
          </div>

          {/* Fixes Applied Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/50 hover:bg-slate-900/90 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between group cursor-default">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Lock className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold block">
                  FIXES APPLIED
                </span>
                <p className="text-xs text-slate-300">Defensive patches generated & validated before deploy</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Auto-Gated
            </span>
          </div>

          {/* Collaborative Reporting Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/50 hover:bg-slate-900/90 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between group cursor-default">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <div className="flex -space-x-1 items-center">
                  <Users className="w-4 h-4 text-purple-300" />
                  <Bot className="w-4 h-4 text-cyan-300" />
                </div>
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-purple-400 font-bold block">
                  COLLABORATIVE REPORTING
                </span>
                <p className="text-xs text-slate-300">People and specialized AI agents in full synchronization</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              Human-in-Loop
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
