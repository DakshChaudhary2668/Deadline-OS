import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  BookOpen, 
  Award, 
  User, 
  Compass, 
  CalendarDays, 
  ShieldAlert, 
  ListTodo, 
  Layers, 
  CheckCircle2, 
  CloudLightning,
  ChevronRight,
  UserCircle2,
  AlertCircle,
  Gauge,
  Sparkles,
  Brain,
  FileDown,
  Loader2
} from 'lucide-react';
import { Task, DayPlan, WeekPlan, DashboardBriefing, MomentumIntelligence } from './types';
import LandingPage from './components/LandingPage';
import DailyBriefing from './components/DailyBriefing';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import PlanningAgent from './components/PlanningAgent';
import RecoveryHub from './components/RecoveryHub';
import WhatIfSimulator from './components/WhatIfSimulator';
import { StrategicDecisions } from './components/StrategicDecisions';
import AIChat from './components/AIChat';
import { MODE_LANGUAGES } from './utils/modeLanguage';

type RoleType = 'student' | 'developer' | 'job_seeker' | 'professional';

const BrandLogo = ({ className = "h-7 w-7" }: { className?: string }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer squircle with deep background and neon purple border */}
        <rect width="512" height="512" rx="128" fill="#0A0616" stroke="#5F34D6" strokeWidth="12" />
        <rect x="6" y="6" width="500" height="500" rx="122" fill="none" stroke="#2D126B" strokeWidth="6" opacity="0.6" />
        
        {/* Glowing aura */}
        <circle cx="256" cy="256" r="200" fill="#5F34D6" opacity="0.05" filter="blur(40px)" />
        
        {/* Left Side: Brain Circuitry (Vibrant Violet/Magenta Gradient) */}
        <path d="M224 136C180 136 150 166 150 200C150 212 154 224 162 232C140 244 128 268 128 296C128 328 152 352 184 352C192 352 200 350 208 346C218 376 244 392 272 392" stroke="url(#brainGrad)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M224 168C200 168 184 184 184 208" stroke="url(#brainGrad)" strokeWidth="10" strokeLinecap="round" />
        
        {/* Brain Circuitry Tracks */}
        <path d="M184 208H224" stroke="url(#brainGrad)" strokeWidth="10" strokeLinecap="round" />
        <path d="M208 264H224" stroke="url(#brainGrad)" strokeWidth="10" strokeLinecap="round" />
        <path d="M192 320H224" stroke="url(#brainGrad)" strokeWidth="10" strokeLinecap="round" />
        
        {/* Circuit Nodes */}
        <circle cx="184" cy="208" r="12" fill="#9D4EDD" stroke="#E0AAFF" strokeWidth="4" />
        <circle cx="208" cy="264" r="12" fill="#9D4EDD" stroke="#E0AAFF" strokeWidth="4" />
        <circle cx="192" cy="320" r="12" fill="#9D4EDD" stroke="#E0AAFF" strokeWidth="4" />
        
        {/* Right Side: Speedometer Gauge (Clean White/Violet) */}
        <path d="M256 144C322.2 144 376 197.8 376 264C376 295.5 363.8 324.2 344 345.5" stroke="#E2E8F0" strokeWidth="14" strokeLinecap="round" />
        
        {/* Gauge ticks */}
        <line x1="284" y1="172" x2="294" y2="182" stroke="#E2E8F0" strokeWidth="10" strokeLinecap="round" />
        <line x1="324" y1="202" x2="334" y2="212" stroke="#E2E8F0" strokeWidth="10" strokeLinecap="round" />
        <line x1="344" y1="244" x2="356" y2="244" stroke="#E2E8F0" strokeWidth="10" strokeLinecap="round" />
        
        {/* Speedometer needle (pointing to 2 o'clock, bright neon violet) */}
        <path d="M256 264L330 190" stroke="#7B2CBF" strokeWidth="14" strokeLinecap="round" />
        <circle cx="256" cy="264" r="22" fill="#7B2CBF" stroke="#E2E8F0" strokeWidth="6" />
        
        {/* Checkmark Accent */}
        <path d="M256 328L284 356L348 292" stroke="#A855F7" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />

        {/* Gradients */}
        <defs>
          <linearGradient id="brainGrad" x1="128" y1="136" x2="272" y2="392" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9D4EDD" />
            <stop offset="50%" stopColor="#7B2CBF" />
            <stop offset="100%" stopColor="#5F34D6" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <img 
      src="/image.png" 
      alt="DeadlineOS Logo" 
      className={className} 
      onError={() => setImgFailed(true)} 
      referrerPolicy="no-referrer"
    />
  );
};

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [briefing, setBriefing] = useState<DashboardBriefing | null>(null);
  const [momentum, setMomentum] = useState<MomentumIntelligence | null>(null);
  const [dayPlan, setDayPlan] = useState<DayPlan | null>(null);
  const [weekPlan, setWeekPlan] = useState<WeekPlan | null>(null);
  
  // Navigation
  const [activeView, setActiveView] = useState<'briefing' | 'tasks' | 'strategic' | 'plans' | 'recovery' | 'simulator' | 'chat'>('briefing');
  
  // Mock Role Context (Academic, Dev, Job, etc.)
  const [mockRole, setMockRole] = useState<RoleType>('developer');
  
  // Toast Notifications
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' | 'error' }[]>([]);
  const [exporting, setExporting] = useState(false);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const handleExportReport = async () => {
    setExporting(true);
    try {
      const { generatePDFReport } = await import('./utils/pdfExport');
      await generatePDFReport({
        mockRole,
        tasks,
        briefing,
        momentum,
        dayPlan,
        weekPlan
      });
      showToast('Executive report exported successfully', 'success');
    } catch (err: any) {
      showToast('Export failed: ' + err.message, 'error');
    } finally {
      setExporting(false);
    }
  };

  const handleRoleSwitch = (roleKey: RoleType) => {
    setMockRole(roleKey);
    const displayLabel = MODE_LANGUAGES[roleKey]?.title || roleKey;
    showToast(`Workspace re-profiled: ${displayLabel}`, 'info');
  };

  // Loading Metrics
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingBriefing, setLoadingBriefing] = useState(false);
  const [loadingMomentum, setLoadingMomentum] = useState(false);
  const [loadingDayPlan, setLoadingDayPlan] = useState(false);
  const [loadingWeekPlan, setLoadingWeekPlan] = useState(false);
  const [analyzingTaskId, setAnalyzingTaskId] = useState<string | null>(null);
  const [recoveringTaskId, setRecoveringTaskId] = useState<string | null>(null);

  // Form Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Error logging
  const [backendError, setBackendError] = useState<string | null>(null);

  // Fetch all tasks from backend database
  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const res = await fetch(`/api/tasks?role=${mockRole}`);
      if (!res.ok) throw new Error('Could not pull database index');
      const data = await res.json();
      const sortedData = data.sort((a: any, b: any) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });
      setTasks(sortedData);
    } catch (err: any) {
      console.error(err);
      setBackendError('Error communicating with DeadlineOS server core.');
    } finally {
      setLoadingTasks(false);
    }
  };

  // Fetch system briefing
  const fetchBriefing = async () => {
    setLoadingBriefing(true);
    try {
      const res = await fetch(`/api/ai/briefing?role=${mockRole}`);
      if (!res.ok) throw new Error('Briefing consolidation failed');
      const data = await res.json();
      setBriefing(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoadingBriefing(false);
    }
  };

  // Fetch momentum intelligence
  const fetchMomentum = async () => {
    setLoadingMomentum(true);
    try {
      const res = await fetch(`/api/ai/momentum?role=${mockRole}`);
      if (!res.ok) throw new Error('Momentum consolidation failed');
      const data = await res.json();
      setMomentum(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoadingMomentum(false);
    }
  };

  // Fetch cached daily / weekly schedules
  const fetchPlans = async () => {
    try {
      const res = await fetch(`/api/ai/plans?role=${mockRole}`);
      if (res.ok) {
        const { dayPlan: dp, weekPlan: wp } = await res.json();
        setDayPlan(dp);
        setWeekPlan(wp);
      }
    } catch (err) {
      console.error('Cached plan fetch failed:', err);
    }
  };

  // Initial Boot
  useEffect(() => {
    fetchTasks();
    fetchPlans();
  }, [mockRole]);

  // Sync Briefing when task count or completion shifts
  useEffect(() => {
    fetchBriefing();
    fetchMomentum();
  }, [tasks.length, tasks.filter(t => t.status === 'completed').length, mockRole]);

  // Recalibrate briefing explicitly
  const handleRecalibrateBriefing = async () => {
    try {
      await Promise.all([fetchBriefing(), fetchMomentum()]);
      showToast('Executive briefing refreshed', 'success');
    } catch (err: any) {
      showToast('Recalibration failed: ' + err.message, 'error');
    }
  };

  // Toggle Completed milestone status
  const handleToggleComplete = async (task: Task) => {
    const updatedStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const res = await fetch(`/api/tasks/${task.id}?role=${mockRole}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: updatedStatus }),
      });
      if (!res.ok) throw new Error('Status rewrite rejected');
      const updated = await res.json();
      setTasks(prev => {
        const next = prev.map(t => t.id === task.id ? updated : t);
        return [...next].sort((a, b) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        });
      });
      fetchPlans();
      fetchBriefing();
      fetchMomentum();
      showToast(updatedStatus === 'completed' ? 'Task completed successfully' : 'Task marked as pending', 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // Create or Update task in list
  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (editingTask) {
        // Edit Mode
        const res = await fetch(`/api/tasks/${editingTask.id}?role=${mockRole}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...taskData, profile: mockRole }),
        });
        if (!res.ok) throw new Error('Task update rejected');
        const updated = await res.json();
        setTasks(prev => {
          const next = prev.map(t => t.id === editingTask.id ? updated : t);
          return [...next].sort((a, b) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return timeB - timeA;
          });
        });
        showToast('Task updated successfully', 'success');
      } else {
        // Create Mode
        const res = await fetch(`/api/tasks?role=${mockRole}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...taskData, profile: mockRole }),
        });
        if (!res.ok) throw new Error('Milestone registration rejected');
        const added = await res.json();
        setTasks(prev => {
          const next = [added, ...prev];
          return [...next].sort((a, b) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return timeB - timeA;
          });
        });
        showToast('Task created successfully', 'success');
      }
      setIsFormOpen(false);
      setEditingTask(null);
      fetchPlans();
      fetchBriefing();
      fetchMomentum();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // Delete task completely
  const handleDeleteTask = async (id: string) => {
    const url = `/api/tasks/${id}?role=${mockRole}`;
    try {
      const res = await fetch(url, { method: 'DELETE' });
      if (!res.ok) throw new Error('De-registration rejected');
      setTasks(prev => prev.filter(t => t.id !== id));
      fetchPlans();
      fetchBriefing();
      fetchMomentum();
      showToast('Task deleted successfully', 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // Run AI Urgency & Risk prioritization analyzer
  const handleAnalyzeTaskPriority = async (id: string) => {
    setAnalyzingTaskId(id);
    try {
      const res = await fetch(`/api/tasks/${id}/analyze?role=${mockRole}`, { method: 'POST' });
      if (!res.ok) throw new Error('AI Priority computation rejected');
      const updated = await res.json();
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      fetchPlans();
      fetchBriefing();
      fetchMomentum();
      showToast('Priority analysis finished', 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setAnalyzingTaskId(null);
    }
  };

  // Run Emergency Recovery Agent for breached task
  const handleGenerateRecoveryPlan = async (id: string, strategy?: string) => {
    setRecoveringTaskId(id);
    try {
      const url = `/api/tasks/${id}/recovery?role=${mockRole}${strategy ? `&strategy=${encodeURIComponent(strategy)}` : ''}`;
      const res = await fetch(url, { method: 'POST' });
      if (!res.ok) throw new Error('AI recovery calculations failed');
      const updated = await res.json();
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      fetchPlans();
      fetchBriefing();
      fetchMomentum();
      showToast('Recovery strategy executed', 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setRecoveringTaskId(null);
    }
  };

  // Run AI Planning: Daily Timelines
  const handleGenerateDayPlan = async () => {
    setLoadingDayPlan(true);
    try {
      const res = await fetch(`/api/ai/plan/day?role=${mockRole}`, { method: 'POST' });
      if (!res.ok) throw new Error('Daily planning sequence timed out');
      const data = await res.json();
      setDayPlan(data);
      showToast('Day plan generated successfully', 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setLoadingDayPlan(false);
    }
  };

  // Run AI Planning: Weekly roadmaps
  const handleGenerateWeekPlan = async () => {
    setLoadingWeekPlan(true);
    try {
      const res = await fetch(`/api/ai/plan/week?role=${mockRole}`, { method: 'POST' });
      if (!res.ok) throw new Error('Weekly planning sequence timed out');
      const data = await res.json();
      setWeekPlan(data);
      showToast('Week plan generated successfully', 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setLoadingWeekPlan(false);
    }
  };

  // Clear cached schedules
  const handleResetPlans = async () => {
    try {
      const res = await fetch(`/api/ai/plans/reset?role=${mockRole}`, { method: 'POST' });
      if (res.ok) {
        setDayPlan(null);
        setWeekPlan(null);
        showToast('Temporal plans reset successfully', 'success');
      }
    } catch (err: any) {
      showToast('Reset failed: ' + err.message, 'error');
    }
  };

  const getRoleNameAndSymbol = (role: RoleType) => {
    const label = MODE_LANGUAGES[role]?.title || 'Mode';
    switch (role) {
      case 'student': return { label, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' };
      case 'developer': return { label, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' };
      case 'job_seeker': return { label, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      case 'professional': return { label, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' };
    }
  };

  return (
    <AnimatePresence mode="wait">
      {showLanding ? (
        <motion.div
          key="landing"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="w-full"
        >
          <LandingPage 
            onLaunch={() => setShowLanding(false)} 
            brandLogo={<BrandLogo className="h-6 w-6 rounded overflow-hidden" />} 
          />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="h-screen overflow-hidden bg-[#080808] text-[#E0E0E0] flex flex-col lg:flex-row font-sans antialiased selection:bg-white selection:text-black w-full"
        >
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="hidden lg:flex flex-col w-64 h-full shrink-0 bg-[#0E0E0E] border-r border-[#1A1A1A] relative z-10">
        
        {/* LOGO AREA */}
        <div className="p-6 border-b border-[#1A1A1A] flex items-center gap-2.5 shrink-0">
          <BrandLogo className="h-7 w-7 rounded overflow-hidden shadow shrink-0" />
          <div>
            <h1 className="text-sm font-bold text-white font-mono uppercase tracking-[0.15em] flex items-center">
              DEADLINE<span className="text-zinc-400 pl-1.5 font-bold">OS</span>
            </h1>
            <span className="text-[9px] text-gray-500 font-mono tracking-wider">CHIEF OF STAFF // AI</span>
          </div>
        </div>

        {/* SCROLLABLE MAIN CONTENT AREA */}
        <div className="flex-grow overflow-y-auto min-h-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* ROLE SWITCHER */}
          <div className="p-4 border-b border-[#1A1A1A]">
            <span className="text-[9px] font-mono text-gray-500 uppercase block tracking-widest mb-2.5">Context Profile</span>
            <div className="space-y-1">
              {([
                { key: 'developer', icon: Briefcase, label: 'Developer Mode' },
                { key: 'student', icon: BookOpen, label: 'Student Mode' },
                { key: 'job_seeker', icon: Award, label: 'Career Mode' },
                { key: 'professional', icon: User, label: 'Professional Mode' }
              ] as const).map(role => {
                const Icon = role.icon;
                const active = mockRole === role.key;
                const displayLabel = MODE_LANGUAGES[role.key]?.title || role.label;
                return (
                  <button
                    key={role.key}
                    onClick={() => handleRoleSwitch(role.key)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-mono tracking-wide cursor-pointer transition ${
                      active 
                        ? 'bg-[#131313] text-white border border-[#1A1A1A]' 
                        : 'text-gray-500 hover:text-slate-300'
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${active ? 'text-white' : ''}`} />
                    <span>{displayLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* NAVIGATION BUTTON INDEX */}
          <nav className="p-4 space-y-1">
            <span className="text-[9px] font-mono text-gray-555 uppercase block tracking-widest mb-2.5">Control Bay</span>
            
            <button
              onClick={() => setActiveView('briefing')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono font-medium cursor-pointer transition ${
                activeView === 'briefing' 
                  ? 'bg-[#131313] text-white border border-[#1A1A1A]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className={`h-3.5 w-3.5 ${activeView === 'briefing' ? 'text-white' : 'text-gray-500'}`} />
                <span>{MODE_LANGUAGES[mockRole]?.sidebarLabels.briefing}</span>
              </div>
              <ChevronRight className="h-3 w-3 opacity-50" />
            </button>

            <button
              onClick={() => setActiveView('tasks')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono font-medium cursor-pointer transition ${
                activeView === 'tasks' 
                  ? 'bg-[#131313] text-white border border-[#1A1A1A]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className={`h-3.5 w-3.5 ${activeView === 'tasks' ? 'text-white' : 'text-gray-500'}`} />
                <span>{MODE_LANGUAGES[mockRole]?.sidebarLabels.tasks}</span>
              </div>
              <div className="bg-[#1C1C1C] px-1.5 py-0.5 rounded text-[9px] text-gray-400 font-mono">
                {tasks.filter(t => t.status !== 'completed').length}
              </div>
            </button>

            <button
              onClick={() => setActiveView('strategic')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono font-medium cursor-pointer transition ${
                activeView === 'strategic' 
                  ? 'bg-[#131313] text-white border border-[#1A1A1A]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Brain className={`h-3.5 w-3.5 ${activeView === 'strategic' ? 'text-emerald-400' : 'text-gray-500'}`} />
                <span>{MODE_LANGUAGES[mockRole]?.sidebarLabels.strategic}</span>
              </div>
              <ChevronRight className="h-3 w-3 opacity-50" />
            </button>

            <button
              onClick={() => setActiveView('plans')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono font-medium cursor-pointer transition ${
                activeView === 'plans' 
                  ? 'bg-[#131313] text-white border border-[#1A1A1A]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CalendarDays className={`h-3.5 w-3.5 ${activeView === 'plans' ? 'text-white' : 'text-gray-500'}`} />
                <span>{MODE_LANGUAGES[mockRole]?.sidebarLabels.plans}</span>
              </div>
              <ChevronRight className="h-3 w-3 opacity-50" />
            </button>

            <button
              onClick={() => setActiveView('recovery')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono font-medium cursor-pointer transition ${
                activeView === 'recovery' 
                  ? 'bg-[#131313] text-white border border-[#1A1A1A]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert className={`h-3.5 w-3.5 ${activeView === 'recovery' ? 'text-rose-500' : 'text-gray-500'}`} />
                <span>{MODE_LANGUAGES[mockRole]?.sidebarLabels.recovery}</span>
              </div>
              {tasks.filter(t => t.status === 'overdue').length > 0 && (
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              )}
            </button>

            <button
              onClick={() => setActiveView('simulator')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono font-medium cursor-pointer transition ${
                activeView === 'simulator' 
                  ? 'bg-[#131313] text-white border border-[#1A1A1A]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Gauge className={`h-3.5 w-3.5 ${activeView === 'simulator' ? 'text-indigo-400' : 'text-gray-500'}`} />
                <span>{MODE_LANGUAGES[mockRole]?.sidebarLabels.simulator}</span>
              </div>
              <ChevronRight className="h-3 w-3 opacity-50" />
            </button>

            <button
              onClick={() => setActiveView('chat')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono font-medium cursor-pointer transition ${
                activeView === 'chat' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'text-gray-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className={`h-3.5 w-3.5 ${activeView === 'chat' ? 'text-emerald-400 font-bold' : 'text-gray-500'}`} />
                <span>{MODE_LANGUAGES[mockRole]?.sidebarLabels.chat || MODE_LANGUAGES[mockRole]?.systemRole || 'AI Agent'}</span>
              </div>
              <ChevronRight className="h-3 w-3 opacity-50" />
            </button>

          </nav>
        </div>

        {/* PREMIUM EXECUTIVE REPORT EXPORT BUTTON */}
        <div className="px-4 pb-4 shrink-0">
          <button
            onClick={handleExportReport}
            disabled={exporting}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition border border-dashed text-slate-300 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {exporting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                <span>Generating Report...</span>
              </>
            ) : (
              <>
                <FileDown className="h-3.5 w-3.5 text-white animate-pulse" />
                <span>Export Executive Report</span>
              </>
            )}
          </button>
        </div>

        {/* BOTTOM USER UTILITY */}
        <div className="p-4 border-t border-[#1A1A1A] shrink-0">
          <div className="p-3 bg-[#131313] rounded border border-[#1A1A1A] flex items-center gap-2.5">
            <UserCircle2 className="h-7 w-7 text-gray-555" />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">dakshchaudhary</p>
              <span className="text-[9px] text-gray-555 font-mono block truncate">dakshchaudhary2668...</span>
            </div>
          </div>
        </div>

      </aside>

      {/* CORE DISPLAY WINDOW */}
      <main className="flex-grow flex flex-col min-w-0 min-h-0 h-full relative z-0 overflow-y-auto">
        
        {/* TOP COMPACT NAV BAR FOR MOBILE */}
        <header className="flex lg:hidden flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#0E0E0E] border-b border-[#1A1A1A] shrink-0">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <BrandLogo className="h-6 w-6 rounded overflow-hidden shadow shrink-0" />
              <h1 className="text-xs font-bold font-mono text-white uppercase tracking-[0.15em] flex items-center">
                DEADLINE<span className="text-zinc-400 pl-1 font-bold">OS</span>
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
            <select
              value={activeView}
              onChange={(e) => setActiveView(e.target.value as any)}
              className="flex-grow sm:flex-grow-0 max-w-[130px] px-2 py-1 bg-[#131313] border border-[#1A1A1A] rounded text-[10px] font-mono text-gray-300 focus:outline-none truncate"
            >
              <option value="briefing">{MODE_LANGUAGES[mockRole]?.sidebarLabels.briefing}</option>
              <option value="tasks">{MODE_LANGUAGES[mockRole]?.sidebarLabels.tasks}</option>
              <option value="strategic">{MODE_LANGUAGES[mockRole]?.sidebarLabels.strategic}</option>
              <option value="plans">{MODE_LANGUAGES[mockRole]?.sidebarLabels.plans}</option>
              <option value="recovery">{MODE_LANGUAGES[mockRole]?.sidebarLabels.recovery}</option>
              <option value="simulator">{MODE_LANGUAGES[mockRole]?.sidebarLabels.simulator}</option>
              <option value="chat">{MODE_LANGUAGES[mockRole]?.sidebarLabels.chat || MODE_LANGUAGES[mockRole]?.systemRole || 'AI Agent'}</option>
            </select>

            <select
              value={mockRole}
              onChange={(e) => handleRoleSwitch(e.target.value as any)}
              className="flex-grow sm:flex-grow-0 max-w-[130px] px-2 py-1 bg-[#131313] border border-[#1A1A1A] rounded text-[10px] font-mono text-gray-555 focus:outline-none truncate"
            >
              <option value="developer">{MODE_LANGUAGES.developer?.title || "Developer Mode"}</option>
              <option value="student">{MODE_LANGUAGES.student?.title || "Student Mode"}</option>
              <option value="job_seeker">{MODE_LANGUAGES.job_seeker?.title || "Career Mode"}</option>
              <option value="professional">{MODE_LANGUAGES.professional?.title || "Professional Mode"}</option>
            </select>

            <button
              onClick={handleExportReport}
              disabled={exporting}
              title="Export Executive Report"
              className="px-3 py-1 bg-[#131313] border border-[#1A1A1A] rounded text-gray-400 hover:text-white transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1 text-[10px] font-mono"
            >
              {exporting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
              ) : (
                <>
                  <FileDown className="h-3.5 w-3.5 text-white" />
                  <span className="sm:hidden">Report</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* SERVER API ERROR NOTIFICATION BANNER */}
        {backendError && (
          <div className="m-6 p-4 bg-rose-950/20 border border-rose-500/20 rounded-2xl flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-rose-550 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-semibold text-rose-400">Offline fallback system activated</h5>
              <p className="text-xs text-slate-450 leading-relaxed mt-0.5">
                The AI prioritizer and agents are executing via mock local strategies. Provide a valid <strong className="text-slate-300 font-semibold font-mono">GEMINI_API_KEY</strong> secret value to unlock server-authenticated strategic actions.
              </p>
            </div>
          </div>
        )}

        {/* COMPONENT SPACE */}
        <section className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6 min-w-0 min-h-0">
          <AnimatePresence mode="wait">
            {activeView === 'briefing' && (
              <motion.div
                key="briefing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <DailyBriefing 
                  key={mockRole}
                  briefing={briefing}
                  momentum={momentum}
                  tasks={tasks}
                  loading={loadingBriefing || loadingMomentum}
                  onRefresh={handleRecalibrateBriefing}
                  mockRole={mockRole}
                />
              </motion.div>
            )}

            {activeView === 'tasks' && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TaskList 
                  key={mockRole}
                  tasks={tasks}
                  onToggleComplete={handleToggleComplete}
                  onEdit={(task) => {
                    setEditingTask(task);
                    setIsFormOpen(true);
                  }}
                  onDelete={handleDeleteTask}
                  onAnalyzePriority={handleAnalyzeTaskPriority}
                  analyzingId={analyzingTaskId}
                  onOpenForm={() => {
                    setEditingTask(null);
                    setIsFormOpen(true);
                  }}
                  mockRole={mockRole}
                />
              </motion.div>
            )}

            {activeView === 'strategic' && (
              <motion.div
                key="strategic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <StrategicDecisions 
                  key={mockRole}
                  tasks={tasks}
                  briefing={briefing}
                  onToggleComplete={handleToggleComplete}
                  onEdit={(task) => {
                    setEditingTask(task);
                    setIsFormOpen(true);
                  }}
                  onDelete={handleDeleteTask}
                  onAnalyzePriority={handleAnalyzeTaskPriority}
                  analyzingId={analyzingTaskId}
                  onOpenForm={() => {
                    setEditingTask(null);
                    setIsFormOpen(true);
                  }}
                  mockRole={mockRole}
                />
              </motion.div>
            )}

            {activeView === 'plans' && (
              <motion.div
                key="plans"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <PlanningAgent 
                  key={mockRole}
                  dayPlan={dayPlan}
                  weekPlan={weekPlan}
                  tasks={tasks}
                  loadingDay={loadingDayPlan}
                  loadingWeek={loadingWeekPlan}
                  onGenerateDay={handleGenerateDayPlan}
                  onGenerateWeek={handleGenerateWeekPlan}
                  onResetPlans={handleResetPlans}
                  mockRole={mockRole}
                  briefing={briefing}
                />
              </motion.div>
            )}

            {activeView === 'recovery' && (
              <motion.div
                key="recovery"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <RecoveryHub 
                  key={mockRole}
                  tasks={tasks}
                  onGenerateRecovery={handleGenerateRecoveryPlan}
                  generatingId={recoveringTaskId}
                  mockRole={mockRole}
                />
              </motion.div>
            )}

            {activeView === 'simulator' && (
              <motion.div
                key="simulator"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <WhatIfSimulator key={mockRole} tasks={tasks} mockRole={mockRole} />
              </motion.div>
            )}

            {activeView === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AIChat key={mockRole} tasks={tasks} mockRole={mockRole} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>

      {/* FLOATING ACTION FORM MODAL */}
      {isFormOpen && (
        <TaskForm 
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
          mockRole={mockRole}
        />
      )}

      {/* TOAST NOTIFICATION STACK */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-auto w-full bg-[#0E0E0E]/95 border border-[#1A1A1A]/80 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md rounded-lg p-3.5 flex items-start gap-3 select-none"
            >
              {toast.type === 'success' && (
                <div className="h-5 w-5 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="h-5 w-5 rounded-full bg-[#131313] border border-[#1A1A1A] flex items-center justify-center shrink-0 mt-0.5">
                  <CloudLightning className="h-3 w-3 text-white" />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="h-5 w-5 rounded-full bg-rose-950/40 border border-rose-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="h-3 w-3 text-rose-400" />
                </div>
              )}
              <div className="flex-grow">
                <p className="text-xs font-mono font-medium text-slate-100 leading-normal">{toast.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
