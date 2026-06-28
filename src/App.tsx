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
  Brain
} from 'lucide-react';
import { Task, DayPlan, WeekPlan, DashboardBriefing, MomentumIntelligence } from './types';
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

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [briefing, setBriefing] = useState<DashboardBriefing | null>(null);
  const [momentum, setMomentum] = useState<MomentumIntelligence | null>(null);
  const [dayPlan, setDayPlan] = useState<DayPlan | null>(null);
  const [weekPlan, setWeekPlan] = useState<WeekPlan | null>(null);
  
  // Navigation
  const [activeView, setActiveView] = useState<'briefing' | 'tasks' | 'strategic' | 'plans' | 'recovery' | 'simulator' | 'chat'>('briefing');
  
  // Mock Role Context (Academic, Dev, Job, etc.)
  const [mockRole, setMockRole] = useState<RoleType>('developer');
  
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
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Could not pull database index');
      const data = await res.json();
      setTasks(data);
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
      const res = await fetch('/api/ai/plans');
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
  }, []);

  // Sync Briefing when task count or completion shifts
  useEffect(() => {
    if (tasks.length > 0) {
      fetchBriefing();
      fetchMomentum();
    }
  }, [tasks.length, tasks.filter(t => t.status === 'completed').length]);

  // Recalibrate briefing explicitly
  const handleRecalibrateBriefing = async () => {
    await Promise.all([fetchBriefing(), fetchMomentum()]);
  };

  // Toggle Completed milestone status
  const handleToggleComplete = async (task: Task) => {
    const updatedStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: updatedStatus }),
      });
      if (!res.ok) throw new Error('Status rewrite rejected');
      const updated = await res.json();
      setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Create or Update task in list
  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (editingTask) {
        // Edit Mode
        const res = await fetch(`/api/tasks/${editingTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });
        if (!res.ok) throw new Error('Task update rejected');
        const updated = await res.json();
        setTasks(prev => prev.map(t => t.id === editingTask.id ? updated : t));
      } else {
        // Create Mode
        const res = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });
        if (!res.ok) throw new Error('Milestone registration rejected');
        const added = await res.json();
        setTasks(prev => [...prev, added]);
      }
      setIsFormOpen(false);
      setEditingTask(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Delete task completely
  const handleDeleteTask = async (id: string) => {
    if (!confirm('Are you certain you want to erase this deadline constraint?')) return;
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('De-registration rejected');
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      alert(err.message);
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
    } catch (err: any) {
      console.error(err);
    } finally {
      setAnalyzingTaskId(null);
    }
  };

  // Run Emergency Recovery Agent for breached task
  const handleGenerateRecoveryPlan = async (id: string) => {
    setRecoveringTaskId(id);
    try {
      const res = await fetch(`/api/tasks/${id}/recovery?role=${mockRole}`, { method: 'POST' });
      if (!res.ok) throw new Error('AI recovery calculations failed');
      const updated = await res.json();
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } catch (err: any) {
      console.error(err);
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
    } catch (err: any) {
      console.error(err);
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
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoadingWeekPlan(false);
    }
  };

  // Clear cached schedules
  const handleResetPlans = async () => {
    if (!confirm('Recalibrate schedules? Stored daily/weekly plans will be wiped.')) return;
    try {
      const res = await fetch('/api/ai/plans/reset', { method: 'POST' });
      if (res.ok) {
        setDayPlan(null);
        setWeekPlan(null);
      }
    } catch (err) {
      console.error(err);
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
    <div className="min-h-screen bg-[#080808] text-[#E0E0E0] flex font-sans antialiased overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 shrink-0 bg-[#0E0E0E] border-r border-[#1A1A1A] relative z-10">
        
        {/* LOGO AREA */}
        <div className="p-6 border-b border-[#1A1A1A] flex items-center gap-2.5 shrink-0">
          <div className="h-7 w-7 rounded bg-white flex items-center justify-center shadow">
            <CloudLightning className="h-4 w-4 text-black shrink-0" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-widest font-mono uppercase">DeadlineOS</h1>
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
                { key: 'developer', icon: Briefcase, label: 'Engineering Mode' },
                { key: 'student', icon: BookOpen, label: 'Academic Mode' },
                { key: 'job_seeker', icon: Award, label: 'Careers Mode' },
                { key: 'professional', icon: User, label: 'Corporate Mode' }
              ] as const).map(role => {
                const Icon = role.icon;
                const active = mockRole === role.key;
                const displayLabel = MODE_LANGUAGES[role.key]?.title || role.label;
                return (
                  <button
                    key={role.key}
                    onClick={() => setMockRole(role.key)}
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
                <span>AI Chief of Staff</span>
              </div>
              <ChevronRight className="h-3 w-3 opacity-50" />
            </button>

          </nav>
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
      <main className="flex-grow flex flex-col min-w-0 min-h-screen relative z-0">
        
        {/* TOP COMPACT NAV BAR FOR MOBILE */}
        <header className="flex lg:hidden items-center justify-between p-4 bg-[#0E0E0E] border-b border-[#1A1A1A]">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-white flex items-center justify-center">
              <CloudLightning className="h-3.5 w-3.5 text-black" />
            </div>
            <h1 className="text-xs font-bold font-mono tracking-widest text-white uppercase">DeadlineOS</h1>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={activeView}
              onChange={(e) => setActiveView(e.target.value as any)}
              className="px-2 py-1 bg-[#131313] border border-[#1A1A1A] rounded text-[10px] font-mono text-gray-300 focus:outline-none"
            >
              <option value="briefing">{MODE_LANGUAGES[mockRole]?.sidebarLabels.briefing}</option>
              <option value="tasks">{MODE_LANGUAGES[mockRole]?.sidebarLabels.tasks}</option>
              <option value="strategic">{MODE_LANGUAGES[mockRole]?.sidebarLabels.strategic}</option>
              <option value="plans">{MODE_LANGUAGES[mockRole]?.sidebarLabels.plans}</option>
              <option value="recovery">{MODE_LANGUAGES[mockRole]?.sidebarLabels.recovery}</option>
              <option value="simulator">{MODE_LANGUAGES[mockRole]?.sidebarLabels.simulator}</option>
              <option value="chat">AI Chief of Staff</option>
            </select>

            <select
              value={mockRole}
              onChange={(e) => setMockRole(e.target.value as any)}
              className="px-2 py-1 bg-[#131313] border border-[#1A1A1A] rounded text-[10px] font-mono text-gray-500 focus:outline-none"
            >
              <option value="developer">{MODE_LANGUAGES.developer?.title || "Engineering Mode"}</option>
              <option value="student">{MODE_LANGUAGES.student?.title || "Academic Mode"}</option>
              <option value="job_seeker">{MODE_LANGUAGES.job_seeker?.title || "Careers Mode"}</option>
              <option value="professional">{MODE_LANGUAGES.professional?.title || "Corporate Mode"}</option>
            </select>
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
        <section className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
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

            {activeView === 'plans' && (
              <motion.div
                key="plans"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <PlanningAgent 
                  dayPlan={dayPlan}
                  weekPlan={weekPlan}
                  tasks={tasks}
                  loadingDay={loadingDayPlan}
                  loadingWeek={loadingWeekPlan}
                  onGenerateDay={handleGenerateDayPlan}
                  onGenerateWeek={handleGenerateWeekPlan}
                  onResetPlans={handleResetPlans}
                  mockRole={mockRole}
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
                <WhatIfSimulator tasks={tasks} mockRole={mockRole} />
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
                <AIChat tasks={tasks} mockRole={mockRole} />
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

    </div>
  );
}
