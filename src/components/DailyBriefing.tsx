import React from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  ShieldCheck, 
  Flame, 
  Brain, 
  Sparkles, 
  TrendingUp, 
  TrendingDown,
  Activity, 
  AlertTriangle,
  Lightbulb,
  Clock,
  UserCheck,
  Award
} from 'lucide-react';
import { Task, DashboardBriefing, MomentumIntelligence } from '../types';

interface DailyBriefingProps {
  briefing: DashboardBriefing | null;
  momentum: MomentumIntelligence | null;
  tasks: Task[];
  loading: boolean;
  onRefresh: () => void;
  mockRole: string;
}

export default function DailyBriefing({ briefing, momentum, tasks, loading, onRefresh, mockRole }: DailyBriefingProps) {
  const [chartTab, setChartTab] = React.useState<'velocity' | 'cadence'>('velocity');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACCELERATING':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider bg-emerald-950/40 text-emerald-400 border border-emerald-900/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            ACCELERATING CADENCE
          </div>
        );
      case 'STABLE':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider bg-blue-950/30 text-blue-400 border border-blue-900/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            STABLE OPERATIONS
          </div>
        );
      case 'DECLINING':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider bg-amber-950/40 text-amber-400 border border-amber-900/40">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            VELOCITY COMPRESSION
          </div>
        );
      case 'OVERLOADED':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider bg-rose-950/50 text-rose-400 border border-rose-900/40 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
            CRITICAL CONGESTION
          </div>
        );
      default:
        return null;
    }
  };

  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  const totalEffort = pendingTasks.reduce((sum, t) => sum + t.estimatedEffort, 0);
  
  // Calculate category distribution for the mini analytics chart
  const categories = ['Work', 'Study', 'Career', 'Personal'] as const;
  const chartData = categories.map(cat => {
    const catTasks = pendingTasks.filter(t => t.category === cat);
    const effort = catTasks.reduce((sum, t) => sum + t.estimatedEffort, 0);
    const avgRisk = catTasks.length > 0
      ? Math.round(catTasks.reduce((sum, t) => sum + (t.riskScore || 0), 0) / catTasks.length)
      : 0;
    return {
      name: cat,
      'Focus Hours': effort,
      'Risk %': avgRisk || 15,
    };
  });

  const getStressColor = (level?: string) => {
    switch(level) {
      case 'Low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Moderate': return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      case 'Optimal': return 'text-teal-400 bg-teal-500/10 border-teal-500/20';
      case 'High': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Meltdown Risk': return 'text-rose-500 bg-rose-500/15 border-rose-500/30 animate-pulse';
      default: return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  const getProbabilityColor = (prob: number) => {
    if (prob >= 75) return 'text-emerald-400';
    if (prob >= 50) return 'text-amber-400';
    return 'text-rose-500';
  };

  // Find the highest risk task (excluding completed tasks)
  const tasksWithForecast = pendingTasks
    .filter(t => t.failureForecast)
    .sort((a, b) => (b.failureForecast?.failureProbability ?? 0) - (a.failureForecast?.failureProbability ?? 0));

  const highestRiskTask = tasksWithForecast[0];
  const maxProbability = highestRiskTask?.failureForecast?.failureProbability ?? 0;
  const hasHighRisk = highestRiskTask && maxProbability > 70;

  // Adaptive style options based on warning color constraints (> 70% probability)
  const cardBg = hasHighRisk 
    ? 'bg-[#150a0c] border-[#3F1115] shadow-[0_4px_24px_rgba(239,68,68,0.03)]' 
    : 'bg-[#0E0E0E] border-[#1A1A1A]';
  const headingColor = hasHighRisk ? 'text-rose-500' : 'text-white';
  const probabilityColor = hasHighRisk ? 'text-rose-500' : 'text-white';
  const badgeStyle = hasHighRisk 
    ? 'bg-rose-950/50 text-rose-400 border border-rose-900/40 font-mono text-[9px]' 
    : 'bg-gray-905 text-gray-400 border border-gray-800 font-mono text-[9px]';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#080808] p-6 rounded-xl border border-[#1A1A1A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)] animate-pulse"></span>
            <p className="text-[10px] font-mono text-emerald-500 tracking-wider uppercase">AI AGENT ACTIVE // @{mockRole}</p>
          </div>
          <h2 className="text-2xl font-medium font-serif italic text-white mt-1">
            Executive Morning Briefing
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Real-time strategic synthesis of workspace metrics. Calibrating threat matrices and optimizing cognitive load.
          </p>
        </div>
        
        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-1.5 bg-white text-black hover:bg-gray-200 active:scale-95 text-xs font-bold rounded transition duration-150 disabled:opacity-50"
          id="btn-recalibrate-briefing"
        >
          <Activity className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          RECALIBRATE BRIEFING
        </button>
      </div>

      {/* ⚠ FAILURE FORECAST HERO CARD */}
      <div className={`p-6 rounded-xl border transition-all duration-300 ${cardBg}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left Block: Probability score metrics */}
          <div className="space-y-2 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-[#1A1A1A] pb-5 lg:pb-0 lg:pr-6 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className={`text-[10px] font-mono tracking-[0.15em] font-semibold ${headingColor} flex items-center gap-1`}>
                ⚠ FAILURE FORECAST
              </span>
              <span className={`px-1.5 py-0.5 rounded tracking-widest uppercase text-[8px] font-bold ${badgeStyle}`}>
                {highestRiskTask ? highestRiskTask.failureForecast?.riskLevel : 'NOMINAL'}
              </span>
            </div>

            <div className="mt-3.5 flex items-baseline gap-2">
              <span className={`text-6xl font-light tracking-tighter font-sans leading-none ${probabilityColor}`}>
                {highestRiskTask ? `${maxProbability}%` : '0%'}
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-mono text-gray-500 tracking-wider leading-none">
                  Failure Probability
                </span>
                <span className="text-[8px] font-mono text-gray-655 mt-1 uppercase tracking-widest">
                  THRESHOLD TARGET
                </span>
              </div>
            </div>
            
            <p className="text-[8px] font-mono text-gray-505 leading-relaxed uppercase tracking-widest pt-1">
              {highestRiskTask ? 'ACTIVE PROBABILITY ASSESSMENT MATRIX' : 'SYSTEM CALIBRATED // SAFE FORECAST'}
            </p>
          </div>

          {/* Right Block: Highest Risk task particulars */}
          <div className="flex-grow space-y-4">
            <div>
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block font-medium">Highest Risk Objective</span>
              <h3 className="text-base font-serif italic text-white mt-1 uppercase tracking-tight">
                {highestRiskTask ? highestRiskTask.title : 'No Urgent Scheduling Threat Detected'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-3.5 bg-[#131313] rounded border border-[#1A1A1A]">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">Critical Risk Reasoning</span>
                <p className="text-xs text-[#C0C0C0] mt-1.5 leading-relaxed">
                  {highestRiskTask ? highestRiskTask.failureForecast?.reasoning : 'All task deadlines are safely structured relative to estimated cognitive hours.'}
                </p>
              </div>

              <div className="p-3.5 bg-[#131313] rounded border border-[#111A13]/30 border-dashed">
                <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-wider block">AI Mitigation Strategy</span>
                <p className="text-xs text-indigo-200 mt-1.5 leading-relaxed font-serif italic">
                  {highestRiskTask ? highestRiskTask.failureForecast?.recommendedIntervention : 'Maintain current delivery rate. Allocate secondary buffers where available.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CHIEF OF STAFF STRATEGIC GUIDANCE row */}
      {briefing && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-[#0A0A0C] p-6 rounded-xl border border-indigo-950/30 shadow-[0_4px_30px_rgba(99,102,241,0.02)]"
        >
          <div className="md:col-span-5 border-b border-[#1A1A1A] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              <p className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase">CHIEF OF STAFF STRATEGIC INTEL</p>
            </div>
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">REAL-TIME FORECAST</span>
          </div>

          <div className="md:col-span-1 p-4 bg-[#111115]/80 rounded border border-indigo-950/20">
            <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-wider block font-semibold">Strategic Focus</span>
            <p className="text-xs font-serif italic text-white mt-1.5">
              {briefing.strategicFocusArea || 'Aligning workspace vectors.'}
            </p>
          </div>

          <div className="md:col-span-1 p-4 bg-[#111115]/80 rounded border border-indigo-950/20">
            <span className="text-[9px] font-mono text-rose-400 uppercase tracking-wider block font-semibold">Biggest Risk Today</span>
            <p className="text-xs text-[#E5E5E5] mt-1.5 font-sans leading-relaxed">
              {briefing.biggestRiskToday || 'None active.'}
            </p>
          </div>

          <div className="md:col-span-1 p-4 bg-[#111115]/80 rounded border border-indigo-950/20">
            <span className="text-[9px] font-mono text-amber-400 uppercase tracking-wider block font-semibold">Most Important Task</span>
            <p className="text-xs text-white mt-1.5 font-sans font-medium">
              {briefing.mostImportantTask || 'Standard pacing.'}
            </p>
          </div>

          <div className="md:col-span-1 p-4 bg-[#111115]/80 rounded border border-indigo-950/20">
            <span className="text-[9px] font-mono text-sky-400 uppercase tracking-wider block font-semibold">Critical Bottleneck</span>
            <p className="text-xs text-[#E5E5E5] mt-1.5 font-sans leading-relaxed">
              {briefing.criticalBottleneck || 'No operational roadblocks.'}
            </p>
          </div>

          <div className="md:col-span-1 p-4 bg-gradient-to-br from-[#121215] to-[#121C1C] rounded border border-emerald-950/30">
            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block font-semibold">Recommended Intervention</span>
            <p className="text-xs text-emerald-200/90 mt-1.5 font-serif italic leading-relaxed">
              {briefing.recommendedIntervention || 'Continue normal operations.'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Stats row Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* SUCCESS PROBABILITY COMPONENT */}
        <div className="bg-[#0E0E0E] border border-[#1A1A1A] p-6 rounded-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full filter blur-xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Success Probability</span>
              <ShieldCheck className="h-4.5 w-4.5 text-blue-500" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className={`text-5xl font-light text-white font-sans ${briefing ? getProbabilityColor(briefing.successProbability) : 'text-slate-400'}`}>
                {loading ? '---' : `${briefing?.successProbability ?? 87.4}%`}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2 leading-relaxed italic">
              {loading ? 'AI scanning cognitive queues...' : briefing?.successReason}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#1A1A1A]">
            <div className="w-full bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                initial={{ width: 0 }}
                animate={{ width: `${briefing?.successProbability ?? 87.4}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>

        {/* WORKLOAD STRESS ASSESSMENT */}
        <div className="bg-[#0E0E0E] border border-[#1A1A1A] p-6 rounded-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-505/5 rounded-full filter blur-xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Workload Stress</span>
              <Brain className="h-4.5 w-4.5 text-indigo-400" />
            </div>
            <div className="mt-4">
              <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded font-mono border ${getStressColor(briefing?.workloadStressLevel)}`}>
                {loading ? 'Computing...' : (briefing?.workloadStressLevel || 'Optimal')}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2 leading-relaxed italic">
              Dynamically monitoring {pendingTasks.length} objectives with {totalEffort}h total estimated labor effort.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#1A1A1A] flex items-center justify-between text-xs">
            <span className="text-gray-500 tracking-wider">TOTAL ESTIMATED EFFORT</span>
            <span className="text-white font-mono font-bold">{totalEffort}h</span>
          </div>
        </div>

        {/* THREAT ANALYSIS AND HIGHRISK */}
        <div className="bg-[#0E0E0E] border border-[#1A1A1A] p-6 rounded-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
            <div className="w-24 h-24 rounded-full border-[10px] border-orange-500"></div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Threat Matrix</span>
              <Flame className="h-4.5 w-4.5 text-orange-500 animate-pulse" />
            </div>
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-5xl font-light text-orange-500 font-sans">
                {loading ? '--' : String(briefing?.highRiskCount ?? 0).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">HIGH-RISK GOALS</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2 leading-relaxed italic">
              Requires structural de-escalation for items near or beyond deadline borders.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#1A1A1A] flex justify-between text-xs text-orange-500 font-mono">
            <span className="tracking-wider">CRITICAL BLOCKERS</span>
            <span>{tasks.filter(t => t.importance === 'Critical' && t.status !== 'completed').length} Tasks</span>
          </div>
        </div>

        {/* COGNITIVE RECOVERY METRIC */}
        <div className="bg-[#0E0E0E] border border-[#1A1A1A] p-6 rounded-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full filter blur-xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Completed SECURED</span>
              <UserCheck className="h-4.5 w-4.5 text-emerald-400" />
            </div>
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-5xl font-light text-white font-sans">
                {String(tasks.filter(t => t.status === 'completed').length).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">/ {tasks.length} SECURED</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2 leading-relaxed italic">
              Secured {tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) : 100}% of milestone requirements.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#1A1A1A] flex justify-between text-xs text-emerald-400 font-mono">
            <span className="tracking-wider">RESOLVED TODAY</span>
            <span className="font-bold">{tasks.filter(t => t.status === 'completed' && t.completedAt).length} Units</span>
          </div>
        </div>

      </div>

      {/* Main Grid: AI Recommendations & Effort Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ACTION ITEMS RECOMMENDATIONS */}
        <div className="lg:col-span-7 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-blue-500" />
                <h4 className="text-xs font-semibold text-white tracking-widest uppercase">Executive Recommendations</h4>
              </div>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Real-Time Synthesis</span>
            </div>

            <div className="space-y-3">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse flex items-start gap-3 p-4 bg-[#131313] rounded border border-[#1A1A1A]">
                    <div className="h-5 w-5 bg-gray-800 rounded-full"></div>
                    <div className="space-y-2 flex-grow">
                      <div className="h-3 w-3/4 bg-gray-800 rounded"></div>
                      <div className="h-2 w-1/2 bg-gray-800 rounded"></div>
                    </div>
                  </div>
                ))
              ) : briefing?.recommendedActions && briefing.recommendedActions.length > 0 ? (
                briefing.recommendedActions.map((action, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3.5 p-4 bg-[#131313] hover:bg-[#1A1A1A]/50 rounded border border-[#1A1A1A] group transition duration-155"
                  >
                    <div className="mt-1 h-5 w-5 rounded bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-medium text-[#E0E0E0] group-hover:text-white transition uppercase tracking-tight">
                        {action}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                        <Clock className="h-3 w-3 text-gray-600" />
                        <span>TACTICAL WORKSPACE FLOW</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center bg-[#131313] rounded border border-[#1A1A1A]">
                  <Lightbulb className="h-8 w-8 text-gray-700 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Ready for scanning. Refresh or create new tasks to initialize the intelligence matrix.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 p-3.5 bg-[#131313] rounded border border-[#1A1A1A] flex items-start gap-2.5">
            <AlertTriangle className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#A0A0A0] leading-relaxed font-mono">
              <strong>COGNITIVE LOAD BALANCER:</strong> Running active workspace heuristics. All sectors report normal flow. Avoid high frequency multitasking to prevent focus degradation.
            </p>
          </div>
        </div>

        {/* WORKLOAD FORCE DIAGRAMS */}
        <div className="lg:col-span-5 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4.5 w-4.5 text-blue-500" />
                <h4 className="text-xs font-semibold text-white tracking-widest uppercase">Workload Force Metrics</h4>
              </div>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">BY SECTOR</span>
            </div>

            <p className="text-[11px] text-gray-400 mb-4 italic">
              Real-time aggregation of estimated focus hours and computed average hazard quotients per workspace sector.
            </p>

            <div className="h-44 w-full">
              {pendingTasks.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F97316" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#555555" fontSize={10} tickLine={false} />
                    <YAxis stroke="#555555" fontSize={10} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0E0E0E', border: '1px solid #1A1A1A', borderRadius: '4px' }}
                      labelStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                      itemStyle={{ fontSize: '11px' }}
                    />
                    <Area type="monotone" dataKey="Focus Hours" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorHours)" />
                    <Area type="monotone" dataKey="Risk %" stroke="#F97316" strokeWidth={1.5} strokeDasharray="3 3" fillOpacity={1} fill="url(#colorRisk)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-gray-500">
                  Insufficient data. No active pending tasks exists.
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 text-center">
            <div className="bg-[#131313] p-2.5 rounded border border-[#1A1A1A]">
              <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider">Focus Hours Loaded</span>
              <span className="text-lg font-bold text-blue-400 font-mono">{totalEffort}h</span>
            </div>
            <div className="bg-[#131313] p-2.5 rounded border border-[#1A1A1A]">
              <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider">Peak Hazard Quotient</span>
              <span className="text-lg font-bold text-orange-500 font-mono">
                {pendingTasks.length > 0 ? Math.max(...pendingTasks.map(t => t.riskScore || 0), 10) : 0}%
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* WORKSPACE MOMENTUM INTELLIGENCE SECTION */}
      <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
              <h3 className="text-sm font-semibold text-white tracking-widest uppercase">
                WORKSPACE MOMENTUM INTELLIGENCE
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Dynamic AI analytics tracking your execution cadence, velocity score, and task lifecycle patterns.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-[#151224] rounded-full border border-indigo-950/40 shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest">
              Powered by Gemini Intelligence Layer
            </span>
          </div>
        </div>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: AI EXECUTIVE PERFORMANCE ANALYSIS */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  EXECUTIVE PERFORMANCE ANALYSIS
                </span>
                <span className="text-[9px] font-mono text-gray-600">
                  {momentum?.generatedAt ? `SYNCED // ${new Date(momentum.generatedAt).toLocaleTimeString()}` : 'SYNCED // REAL-TIME'}
                </span>
              </div>

              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-10 bg-[#141414] rounded border border-gray-800"></div>
                  <div className="h-20 bg-[#111] rounded border border-gray-800"></div>
                  <div className="h-20 bg-[#111] rounded border border-gray-800"></div>
                </div>
              ) : momentum?.analysis ? (
                <div className="space-y-4">
                  {/* Status Badge */}
                  <div className="p-4 bg-[#141414] rounded border border-[#222222] flex items-center justify-between">
                    <div>
                      <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest">Momentum Status</span>
                      <span className="text-sm font-bold tracking-tight text-white mt-0.5 block">
                        {momentum.analysis.momentumStatus}
                      </span>
                    </div>
                    {getStatusBadge(momentum.analysis.momentumStatus)}
                  </div>

                  {/* Key Observation */}
                  <div className="p-4 bg-[#111] rounded border border-[#1A1A1A] space-y-1">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                      <Activity className="h-3.5 w-3.5 text-blue-400" />
                      <span>Key Observation</span>
                    </div>
                    <p className="text-xs text-[#CCCCCC] leading-relaxed font-sans">
                      {momentum.analysis.keyObservation}
                    </p>
                  </div>

                  {/* Risk Assessment */}
                  <div className="p-4 bg-[#111] rounded border border-[#1A1A1A] space-y-1">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                      <span>Risk Assessment</span>
                    </div>
                    <p className="text-xs text-[#CCCCCC] leading-relaxed font-sans">
                      {momentum.analysis.riskAssessment}
                    </p>
                  </div>

                  {/* Executive Recommendation */}
                  <div className="p-4 bg-gradient-to-br from-[#121212] to-[#161310] rounded border border-[#2B2319] space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-amber-400 uppercase tracking-widest">
                      <Award className="h-3.5 w-3.5" />
                      <span>Executive Recommendation</span>
                    </div>
                    <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
                      {momentum.analysis.executiveRecommendation}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-[#131313] rounded border border-[#1A1A1A]">
                  <Activity className="h-8 w-8 text-gray-700 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Awaiting executive alignment scans. Please trigger recalibration.</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: VISUALIZATIONS & METRICS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Completion Ratio Indicator Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#131313] p-4 rounded border border-[#1A1A1A] flex flex-col justify-between">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Completed Secured</span>
                <span className="text-xl font-bold text-white font-mono mt-1">
                  {momentum?.stats?.totalCompleted ?? 0}
                </span>
              </div>
              <div className="bg-[#131313] p-4 rounded border border-[#1A1A1A] flex flex-col justify-between">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Created Overall</span>
                <span className="text-xl font-bold text-white font-mono mt-1">
                  {momentum?.stats?.totalCreated ?? 0}
                </span>
              </div>
              <div className="bg-[#131313] p-4 rounded border border-[#1A1A1A] flex flex-col justify-between">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Completion Ratio</span>
                <span className="text-xl font-bold text-emerald-400 font-mono mt-1">
                  {momentum?.stats?.completionRatio ?? 0}%
                </span>
              </div>
              <div className="bg-[#131313] p-4 rounded border border-[#1A1A1A] flex flex-col justify-between">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Weekly Change</span>
                <div className="flex items-center gap-1.5 mt-1">
                  {(momentum?.stats?.weeklyChange ?? 0) >= 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-emerald-500 font-bold" />
                      <span className="text-xl font-bold text-emerald-400 font-mono">
                        +{momentum?.stats?.weeklyChange ?? 0}%
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-rose-500 font-bold" />
                      <span className="text-xl font-bold text-rose-500 font-mono">
                        {momentum?.stats?.weeklyChange ?? 0}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Charts Container */}
            <div className="bg-[#111] p-4 rounded border border-[#1A1A1A] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  {chartTab === 'velocity' ? 'PRODUCTIVITY VELOCITY SCORE (LAST 7 DAYS)' : 'TASK COMPLETION CADENCE'}
                </span>
                
                <div className="flex bg-[#161616] rounded border border-[#222] p-1 gap-1">
                  <button
                    onClick={() => setChartTab('velocity')}
                    className={`px-3 py-1 rounded text-[10px] font-semibold tracking-wider uppercase transition duration-150 ${
                      chartTab === 'velocity' ? 'bg-white text-black font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Velocity (Line)
                  </button>
                  <button
                    onClick={() => setChartTab('cadence')}
                    className={`px-3 py-1 rounded text-[10px] font-semibold tracking-wider uppercase transition duration-150 ${
                      chartTab === 'cadence' ? 'bg-white text-black font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Activity (Bar)
                  </button>
                </div>
              </div>

              <div className="h-56 w-full">
                {loading ? (
                  <div className="h-full flex items-center justify-center text-xs text-gray-500 animate-pulse font-mono">
                    Regenerating dynamic visual streams...
                  </div>
                ) : momentum?.chartData && momentum.chartData.length > 0 ? (
                  chartTab === 'velocity' ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={momentum.chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        <XAxis dataKey="date" stroke="#444444" fontSize={9} tickLine={false} />
                        <YAxis stroke="#444444" fontSize={9} tickLine={false} domain={[0, 100]} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#090909', border: '1px solid #1C1C1C', borderRadius: '6px' }}
                          labelStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                          itemStyle={{ fontSize: '10px' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="velocity"
                          name="Velocity Score"
                          stroke="#10B981"
                          strokeWidth={2.5}
                          dot={{ fill: '#10B981', r: 3, strokeWidth: 0 }}
                          activeDot={{ r: 5, strokeWidth: 0, fill: '#34D399' }}
                          filter="url(#emeraldGlow)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={momentum.chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <XAxis dataKey="date" stroke="#444444" fontSize={9} tickLine={false} />
                        <YAxis stroke="#444444" fontSize={9} tickLine={false} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#090909', border: '1px solid #1C1C1C', borderRadius: '6px' }}
                          labelStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                          itemStyle={{ fontSize: '10px' }}
                        />
                        <Bar dataKey="created" name="Tasks Created" fill="#3B82F6" opacity={0.65} radius={[2, 2, 0, 0]} />
                        <Bar dataKey="completed" name="Tasks Completed" fill="#10B981" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-gray-500 font-mono">
                    Awaiting historic metrics telemetry.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
