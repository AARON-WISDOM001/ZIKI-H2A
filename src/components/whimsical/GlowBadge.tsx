import React from 'react';

interface GlowBadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'blue' | 'emerald' | 'amber' | 'purple';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export const GlowBadge: React.FC<GlowBadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  pulse = false
}) => {
  const variantStyles = {
    cyan: 'bg-cyan-950/70 border-cyan-400/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]',
    blue: 'bg-blue-950/70 border-blue-400/40 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.25)]',
    emerald: 'bg-emerald-950/70 border-emerald-400/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]',
    amber: 'bg-amber-950/70 border-amber-400/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]',
    purple: 'bg-purple-950/70 border-purple-400/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.25)]',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wide',
    md: 'text-xs px-3 py-1 tracking-wider',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full border backdrop-blur-md uppercase ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${pulse ? 'animate-pulse' : ''}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
};

