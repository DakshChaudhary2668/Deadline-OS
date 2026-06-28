import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Trash2, 
  Brain, 
  AlertTriangle, 
  Terminal, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { Task } from '../types';
import { MODE_LANGUAGES } from '../utils/modeLanguage';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface AIChatProps {
  tasks: Task[];
  mockRole: 'student' | 'developer' | 'job_seeker' | 'professional';
}

export default function AIChat({ tasks, mockRole }: AIChatProps) {
  const config = MODE_LANGUAGES[mockRole] || MODE_LANGUAGES.professional;
  const secondaryLabels = config.dailySecondary as any;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: secondaryLabels.chatWelcome || `Greetings. I am your Gemini Chief of Staff. I have consolidated your current workspace metadata, active deadline constraints, and historical velocity records.\n\nHow should we align your strategic capacity today? I can help you deconstruct monolithic deliverables, calculate high-value trade-offs, draft emergency recovery timelines, or simulate scope-reduction options.`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const pendingTasks = tasks.filter(t => t.status !== 'completed');

  // Suggested Prompts based on Active Persona
  const getSuggestions = () => {
    switch (mockRole) {
      case 'student':
        return [
          { text: 'Analyze study stress level and recommend recovery actions', label: 'Stress Evaluation' },
          { text: 'Draft a critical study timeline for Systems Architecture Final Prep', label: 'Timeline Optimization' },
          { text: 'Evaluate homework tradeoffs to maximize Exam Readiness', label: 'Tradeoff Advisor' }
        ];
      case 'developer':
        return [
          { text: 'Optimize active sprint commitments to secure release deadlines', label: 'Sprint Optimizer' },
          { text: 'Formulate fallback strategy for the highest risk ticket', label: 'Risk Mitigation' },
          { text: 'Help me prioritize engineering backlog to secure Sprint Velocity', label: 'Prioritization Matrix' }
        ];
      case 'job_seeker':
        return [
          { text: 'Draft a structured portfolio and networking checklist', label: 'Action Checklist' },
          { text: 'Identify search bottlenecks and optimize application cadence', label: 'Bottleneck Sweep' },
          { text: 'Tailor resume tasks trade-offs to protect Career Runway', label: 'Runway Protection' }
        ];
      case 'professional':
      default:
        return [
          { text: 'Synthesize quarterly business deliverables and critical risks', label: 'Risk Synthesis' },
          { text: 'Draft delegation and scope-reduction options for active tasks', label: 'Leverage Finder' },
          { text: 'Optimize capacity schedule to prevent client delivery breaches', label: 'SLA Protection' }
        ];
    }
  };

  const suggestions = getSuggestions();

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    setMessages(prev => {
      const msgs = [...prev];
      if (msgs.length > 0 && msgs[0].id === 'welcome') {
        msgs[0].text = secondaryLabels.chatWelcome || `Greetings. I am your Gemini Chief of Staff. I have consolidated your current workspace metadata, active deadline constraints, and historical velocity records.\n\nHow should we align your strategic capacity today? I can help you deconstruct monolithic deliverables, calculate high-value trade-offs, draft emergency recovery timelines, or simulate scope-reduction options.`;
      }
      return msgs;
    });
  }, [mockRole, secondaryLabels.chatWelcome]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ sender: m.sender, text: m.text })),
          role: mockRole
        })
      });

      if (!res.ok) throw new Error('Chief of Staff interface connection failure');
      const data = await res.json();

      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: 'assistant',
        text: data.text || "I apologize. An error occurred in my reasoning engine.",
        timestamp: new Date()
      }]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: 'assistant',
        text: `⚠️ **Operational Sync Error**: Unable to establish secure communication with DeadlineOS server core. Falling back to local heuristics.\n\nMake sure to supply a valid **GEMINI_API_KEY** in the Settings tab to initialize full-scale AI Chief of Staff dialog.`,
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear conversational logs?')) {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: `Conversational buffers flushed. Gemini Chief of Staff initialized. I have fully indexed your current tasks database (${pendingTasks.length} pending items).\n\nWhat high-level trade-offs are we evaluating?`,
          timestamp: new Date()
        }
      ]);
    }
  };

  // Render markdown text beautifully
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const content = line.trim().substring(2);
        return (
          <li key={i} className="ml-4 list-disc text-xs text-gray-300 leading-relaxed font-sans mb-1 uppercase tracking-wide">
            {parseInlineMarkdown(content)}
          </li>
        );
      }
      // Numbered lists
      const numberedRegex = /^\d+\.\s(.*)/;
      if (numberedRegex.test(line.trim())) {
        const match = line.trim().match(numberedRegex);
        return (
          <li key={i} className="ml-4 list-decimal text-xs text-gray-300 leading-relaxed font-sans mb-1 uppercase tracking-wide">
            {parseInlineMarkdown(match ? match[1] : line)}
          </li>
        );
      }
      // Subheadings (###)
      if (line.trim().startsWith('###')) {
        return (
          <h4 key={i} className="text-xs font-mono font-bold text-emerald-400 mt-4 mb-2 tracking-wider uppercase border-b border-[#1C1C1C] pb-1">
            {line.trim().substring(3).replace(/#/g, '').trim()}
          </h4>
        );
      }
      if (line.trim().startsWith('##') || line.trim().startsWith('#')) {
        return (
          <h3 key={i} className="text-xs font-mono font-bold text-white mt-5 mb-2.5 tracking-wider uppercase border-b border-[#222222] pb-1">
            {line.trim().replace(/#/g, '').trim()}
          </h3>
        );
      }
      // Blank lines
      if (!line.trim()) {
        return <div key={i} className="h-2" />;
      }
      // Default paragraphs
      return (
        <p key={i} className="text-xs text-gray-300 leading-relaxed font-sans mb-2 uppercase tracking-wide">
          {parseInlineMarkdown(line)}
        </p>
      );
    });
  };

  // Helper to parse standard **bold**, `code`, etc. inline
  const parseInlineMarkdown = (str: string) => {
    // Escape standard code and bold tokens to React Elements
    const parts: React.ReactNode[] = [];
    let currentText = str;
    let idx = 0;

    while (currentText.length > 0) {
      const boldStart = currentText.indexOf('**');
      const codeStart = currentText.indexOf('`');

      if (boldStart === -1 && codeStart === -1) {
        parts.push(<span key={idx++}>{currentText}</span>);
        break;
      }

      // Process whoever comes first
      if (boldStart !== -1 && (codeStart === -1 || boldStart < codeStart)) {
        // Text before bold
        if (boldStart > 0) {
          parts.push(<span key={idx++}>{currentText.substring(0, boldStart)}</span>);
        }
        const boldEnd = currentText.indexOf('**', boldStart + 2);
        if (boldEnd !== -1) {
          const boldContent = currentText.substring(boldStart + 2, boldEnd);
          parts.push(<strong key={idx++} className="font-mono font-bold text-white bg-white/5 px-1 rounded">{boldContent}</strong>);
          currentText = currentText.substring(boldEnd + 2);
        } else {
          parts.push(<span key={idx++}>{currentText.substring(boldStart)}</span>);
          break;
        }
      } else {
        // Text before code
        if (codeStart > 0) {
          parts.push(<span key={idx++}>{currentText.substring(0, codeStart)}</span>);
        }
        const codeEnd = currentText.indexOf('`', codeStart + 1);
        if (codeEnd !== -1) {
          const codeContent = currentText.substring(codeStart + 1, codeEnd);
          parts.push(<code key={idx++} className="font-mono text-[10px] bg-[#111111] text-emerald-400 px-1 py-0.5 rounded border border-[#222222]">{codeContent}</code>);
          currentText = currentText.substring(codeEnd + 1);
        } else {
          parts.push(<span key={idx++}>{currentText.substring(codeStart)}</span>);
          break;
        }
      }
    }

    return parts;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-[#080808] border border-[#1A1A1A] rounded-2xl overflow-hidden relative" id="gemini-chat-container">
      
      {/* CHAT INTEL BAR HEADER */}
      <div className="p-4 bg-[#0C0C0C] border-b border-[#1A1A1A] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Bot className="h-4.5 w-4.5 text-emerald-500 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-semibold font-mono text-white uppercase tracking-wider">AI CHIEF OF STAFF</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)] animate-pulse"></span>
              <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest">
                GEMINI ACTIVE // @{mockRole}
              </span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleClearHistory}
          className="p-1.5 hover:bg-[#1A1A1A] rounded text-gray-500 hover:text-rose-400 transition cursor-pointer"
          title={secondaryLabels.flushTooltip || "Flush conversational buffers"}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* CHAT MESSAGES DISPLAY */}
      <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        
        {/* Workspace Alert readout */}
        <div className="bg-[#0C0C0C]/50 border border-[#161616] p-3 rounded-xl flex items-start gap-2.5 max-w-xl">
          <Brain className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest leading-none">Workspace Index Sync</p>
            <p className="text-[9px] font-mono text-gray-500 mt-1 uppercase tracking-wider">
              {pendingTasks.length} unresolved constraints found | ACTIVE PERSONA PROFILE: {mockRole}
            </p>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className={`flex gap-3.5 max-w-3xl ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 border ${
                m.sender === 'user' 
                  ? 'bg-white/5 border-white/10 text-white' 
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}>
                {m.sender === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
              </div>

              <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#121212] border-[#222222] text-white rounded-tr-none'
                  : 'bg-[#0B0B0B] border-[#161616] text-gray-300 rounded-tl-none'
              }`}>
                {renderMessageContent(m.text)}
                <span className="text-[8px] font-mono text-gray-600 block mt-2 text-right tracking-widest">
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3.5"
            >
              <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Sparkles className="h-3.5 w-3.5 animate-spin" />
              </div>
              <div className="bg-[#0B0B0B] border border-[#161616] p-4 rounded-2xl rounded-tl-none flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse [animation-delay:0.4s]"></span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">COGNITIVE COMPILING...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* SUGGESTED ACTION QUICK BUTTONS */}
      <div className="px-4 py-2 border-t border-[#131313] shrink-0 overflow-x-auto flex gap-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#0A0A0A]/50">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            disabled={loading}
            onClick={() => handleSend(s.text)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#101010] border border-[#1A1A1A] hover:bg-[#151515] text-[10px] font-mono text-gray-400 hover:text-white transition whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Terminal className="h-3 w-3 text-emerald-500" />
            <span className="text-gray-500 mr-0.5">{s.label}:</span>
            <span>{s.text}</span>
            <ArrowRight className="h-2.5 w-2.5 opacity-40 ml-0.5" />
          </button>
        ))}
      </div>

      {/* INPUT CONTROLS ROW */}
      <div className="p-4 border-t border-[#1A1A1A] shrink-0 bg-[#0C0C0C]">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask Gemini Chief of Staff...`}
            disabled={loading}
            className="flex-grow px-4 py-2.5 bg-[#080808] border border-[#1C1C1C] rounded-xl text-xs font-sans text-white focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/40 placeholder-gray-600 uppercase tracking-wider"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 bg-white text-black hover:bg-gray-200 disabled:bg-[#111111] disabled:text-gray-600 disabled:border-[#1A1A1A] rounded-xl border border-[#222222] font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer disabled:cursor-not-allowed"
          >
            <Send className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Dispatch</span>
          </button>
        </form>
        <p className="text-[8px] font-mono text-gray-600 uppercase mt-2 tracking-widest text-center">
          Grounding parameters: {pendingTasks.length} active constraints. Do not supply secure credentials.
        </p>
      </div>

    </div>
  );
}
