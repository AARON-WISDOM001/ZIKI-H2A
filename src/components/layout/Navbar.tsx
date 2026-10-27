import React from 'react';
import { 
  Shield, 
  Bot, 
  Bell, 
  ChevronDown, 
  Trophy, 
  Sparkles, 
  Layers, 
  Radio, 
  Plus 
} from 'lucide-react';

export type ActiveTab = 'product' | 'marketing' | 'security';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onLaunchOnboarding: () => void;
  userPoints?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onLaunchOnboarding,
  userPoints = 7871.42
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070c18]/90 backdrop-blur-md px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand, Workspace & Primary Nav */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Logo */}
          <div 
            onClick={() => onSelectTab('product')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-transform">
              <span className="font-mono text-xl tracking-tighter">z</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white font-sans">
              ziki
            </span>
          </div>

          {/* Workspace Switcher */}
          <button 
            type="button"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-slate-300 text-xs font-medium transition-colors"
            title="Switch Workspace"
          >
            <span className="text-slate-400">Workspace:</span>
            <span className="font-semibold text-slate-100">Zedu</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Divider */}
          <div className="hidden md:block h-5 w-[1px] bg-slate-800" />

          {/* Navigation Tabs (Product / Marketing / Security) */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => onSelectTab('product')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'product'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Product</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('marketing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'marketing'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Marketing</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('security')}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'security'
                  ? 'bg-blue-600/25 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Security</span>
              <span className="hidden lg:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-0.5" />
            </button>
          </nav>
        </div>

        {/* Right: Actions, Points, Profile & Notifications */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Main Onboarding Trigger Button */}
          <button
            type="button"
            onClick={onLaunchOnboarding}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-102 active:scale-98"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Start</span> Goal-First Flow
          </button>

          {/* Agents Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 text-xs font-medium">
            <Bot className="w-3.5 h-3.5 text-blue-400" />
            <span>Agents</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Points Pill (matching screenshot) */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{userPoints.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} pts</span>
          </div>

          {/* User Profile (wisdom Aaron) */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-900/60 transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
              <span className="text-[10px]">WA</span>
            </div>
            <span className="hidden xl:inline text-xs font-medium text-slate-200">
              wisdom Aaron
            </span>
            <ChevronDown className="hidden xl:block w-3 h-3 text-slate-400" />
          </div>

          {/* Notification Bell with 41 Badge */}
          <button 
            type="button" 
            aria-label="41 unread notifications"
            className="relative p-2 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white shadow-sm">
              41
            </span>
          </button>

        </div>

      </div>
    </header>
  );
};

