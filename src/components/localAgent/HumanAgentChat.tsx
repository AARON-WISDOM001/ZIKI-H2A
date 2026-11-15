import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  MessageSquare
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
    "Mobile layout only — don't touch cart logic",
    "Keep touch targets ≥ 44px"
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
    <div className="flex flex-col h-[520px] rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
      
      {/* Chat Header */}
      <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Chat with agent
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Online</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/40">
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
                    ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                    : 'bg-white text-blue-600 border-slate-200 shadow-xs'
                }`}
              >
                {isHuman ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Content */}
              <div
                className={`max-w-[82%] sm:max-w-[75%] rounded-2xl p-3.5 space-y-1.5 shadow-xs ${
                  isHuman
                    ? 'bg-blue-600 text-white rounded-tr-none border border-blue-500'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                      isHuman ? 'text-blue-100' : 'text-blue-600'
                    }`}
                  >
                    {isHuman ? 'You' : 'Agent'}
                  </span>
                  <span className={`text-[10px] font-mono ${isHuman ? 'text-blue-200' : 'text-slate-400'}`}>
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
                          ? 'bg-blue-700/60 border-blue-400 text-blue-50'
                          : 'bg-slate-100 border-slate-200 text-slate-600'
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
            <div className="w-8 h-8 rounded-xl bg-white text-blue-600 border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="px-4 py-2.5 rounded-2xl rounded-tl-none bg-white border border-slate-200 shadow-xs flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono">Thinking…</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Directive Suggestions */}
      <div className="px-4 py-2 border-t border-slate-200 bg-slate-50 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-slate-500 font-mono shrink-0">Quick:</span>
        {quickDirectives.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelectQuickPrompt(prompt)}
            className="shrink-0 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors truncate max-w-xs shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-3.5 border-t border-slate-200 bg-white">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Direct your agent…"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isAgentTyping}
            className="w-full pl-4 pr-12 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isAgentTyping}
            className="absolute right-2 p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white transition-all hover:scale-105 active:scale-95"
            title="Send"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

    </div>
  );
};
