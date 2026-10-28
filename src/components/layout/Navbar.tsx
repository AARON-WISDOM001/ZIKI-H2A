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
  Plus,
  Terminal,
  Users
} from 'lucide-react';

export type ActiveTab = 'my-agents' | 'local-agent' | 'product' | 'marketing' | 'security';

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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 lg:px-8 py-3 text-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand, Workspace & Primary Nav */}
        <div className="flex items-center gap-3 lg:gap-6">
          {/* Logo */}
          <div 
            onClick={() => onSelectTab('my-agents')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-transform">
              <span className="font-mono text-xl tracking-tighter">z</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 font-sans">
              ziki
            </span>
          </div>

          {/* Workspace Switcher */}
          <button 
            type="button"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors"
            title="Switch Workspace"
          >
            <span className="text-slate-400">Workspace:</span>
            <span className="font-semibold text-slate-800">Zedu</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Divider */}
          <div className="hidden md:block h-5 w-[1px] bg-slate-200" />

          {/* Navigation Tabs (matching screenshot) */}
          <nav className="flex items-center gap-1 sm:gap-2">
            
            {/* Product Dashboard */}
            <button
              type="button"
              onClick={() => onSelectTab('product')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'product'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Product</span>
            </button>

            {/* Marketing Tab */}
            <button
              type="button"
              onClick={() => onSelectTab('marketing')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'marketing'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Marketing</span>
            </button>

            {/* Security Tab */}
            <button
              type="button"
              onClick={() => onSelectTab('security')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'security'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Security</span>
            </button>

          </nav>
        </div>

        {/* Right: Agents Pill, Points, Profile & Notifications (Exact match to screenshot) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Agents Pill (Active in screenshot) */}
          <button
            type="button"
            onClick={() => onSelectTab('my-agents')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'my-agents' || activeTab === 'local-agent'
                ? 'bg-blue-50 text-blue-700 border border-blue-300 shadow-sm'
                : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Bot className="w-4 h-4 text-blue-600" />
            <span>Agents</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* User Profile (wisdom Aaron) */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-300 bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
              <span className="text-[10px]">WA</span>
            </div>
            <span className="hidden xl:inline text-xs font-semibold text-slate-800">
              wisdom Aaron
            </span>
            <ChevronDown className="hidden xl:block w-3 h-3 text-slate-400" />
          </div>

          {/* Points Pill (7871.42 pts in gold pill) */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-300 bg-amber-50 text-amber-700 text-xs font-mono font-bold shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>{userPoints.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} pts</span>
          </div>

          {/* Notification Bell with 47 Badge (matching screenshot) */}
          <button 
            type="button" 
            aria-label="47 unread notifications"
            className="relative p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white shadow-sm">
              47
            </span>
          </button>

        </div>

      </div>
    </header>
  );
};
