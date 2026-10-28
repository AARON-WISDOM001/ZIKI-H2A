import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Terminal, 
  CornerDownLeft, 
  CheckCheck, 
  HelpCircle,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';
import { ChatMessage } from '../../types/localAgent';

interface HumanAgentChatProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isAgentTyping: boolean;
}

export const HumanAgentChat: React.FC<HumanAgentChatProps> = ({
  messages,
  onSendMessage,
  isAgentTyping
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickDirectives = [
    "Only change the mobile layout. Do not modify cart logic or authentication.",
    "Ensure touch target dimensions are at least 44x44px for accessibility.",
    "Add automated regression test cases for drawer open/close transitions."
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isAgentTyping) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleSelectQuickPrompt = (prompt: string) => {
    setInputText(prompt);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAgentTyping]);

  return (
    <div className="flex flex-col h-[520px] rounded-3xl bg-[#0b1329] border border-slate-800/90 shadow-xl overflow-hidden animate-fade-in-up">
      
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-300">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span>Human-to-Agent Live Control</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Bidirectional
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Guide terminal agent execution without context switching
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Sync Mode: Online</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isHuman = msg.sender === 'human';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 animate-fade-in-up ${
                isHuman ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                  isHuman
                    ? 'bg-blue-600 text-white border-blue-400/50 shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                    : 'bg-cyan-950/80 text-cyan-300 border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                }`}
              >
                {isHuman ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Content */}
              <div
                className={`max-w-[82%] sm:max-w-[75%] rounded-2xl p-3.5 space-y-1.5 shadow-md ${
                  isHuman
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none border border-blue-400/30'
                    : 'bg-slate-900/90 text-slate-200 rounded-tl-none border border-slate-800/90'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                      isHuman ? 'text-blue-200' : 'text-cyan-400'
                    }`}
                  >
                    {isHuman ? 'wisdom Aaron (Human Dev)' : 'Ziki Terminal Agent'}
                  </span>
                  <span className={`text-[10px] font-mono ${isHuman ? 'text-blue-200/80' : 'text-slate-500'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>

                {msg.badge && (
                  <div className="pt-1">
                    <span
                      className={`inline-block text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                        isHuman
                          ? 'bg-blue-500/20 border-blue-300/40 text-blue-100'
                          : 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300'
                      }`}
                    >
                      {msg.badge}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Agent Typing / Thinking Indicator */}
        {isAgentTyping && (
          <div className="flex items-center gap-3 animate-fade-in-up">
            <div className="w-8 h-8 rounded-xl bg-cyan-950/80 text-cyan-300 border border-cyan-400/40 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="px-4 py-2.5 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Agent analyzing AST & formulating reply...</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Directive Suggestions */}
      <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/30 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-slate-500 font-mono shrink-0">Sample Directives:</span>
        {quickDirectives.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelectQuickPrompt(prompt)}
            className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors truncate max-w-xs"
          >
            "{prompt.slice(0, 42)}..."
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-3.5 border-t border-slate-800 bg-slate-950/70">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Type directive to local agent (e.g., 'Only change mobile layout. Do not touch auth')..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isAgentTyping}
            className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all font-sans"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isAgentTyping}
            className="absolute right-2 p-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white transition-all hover:scale-105 active:scale-95"
            title="Send directive to terminal agent"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

    </div>
  );
};
