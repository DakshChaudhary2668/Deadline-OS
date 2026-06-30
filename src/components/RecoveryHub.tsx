import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Sparkles, 
  RefreshCw, 
  HelpCircle, 
  CheckCircle, 
  Clock, 
  ChevronRight, 
  Activity, 
  AlertOctagon,
  Calendar,
  Undo2,
  ListTodo
} from 'lucide-react';
import { Task } from '../types';
import { MODE_LANGUAGES } from '../utils/modeLanguage';

type RoleType = 'student' | 'developer' | 'job_seeker' | 'professional';

const getRecoveryLabels = (role: RoleType) => {
  const config = MODE_LANGUAGES[role] || MODE_LANGUAGES.professional;
  return config.recoveryLabels;
};

const getSecondaryRecoveryLabels = (role: RoleType) => {
  const config = MODE_LANGUAGES[role] || MODE_LANGUAGES.professional;
  return config.recoveryDynamic;
};

interface RecoveryHubProps {
  key?: any;
  tasks: Task[];
  onGenerateRecovery: (id: string, strategy?: string) => void;
  generatingId: string | null;
  mockRole?: string;
}

export default function RecoveryHub({ 
  tasks, 
  onGenerateRecovery, 
  generatingId,
  mockRole = 'professional'
}: RecoveryHubProps) {
  const labels = getRecoveryLabels(mockRole as RoleType);
  const secondaryLabels = getSecondaryRecoveryLabels(mockRole as RoleType);
  
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [selectedStrategy, setSelectedStrategy] = useState<string>('Emergency Execution Plan');

  // Backend dashboard state
  const [recoveryState, setRecoveryState] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch recovery dashboard calculations from the backend
  useEffect(() => {
    let active = true;
    const fetchRecoveryState = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/ai/recovery/dashboard?role=${mockRole}`);
        if (res.ok && active) {
          const data = await res.json();
          setRecoveryState(data);
          if (data.recommendedStrategy) {
            setSelectedStrategy(data.recommendedStrategy);
          }
        }
      } catch (err) {
        console.error("Failed to fetch recovery dashboard data:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchRecoveryState();
    return () => {
      active = false;
    };
  }, [tasks, mockRole]);

  const roleTasks = React.useMemo(() => {
    return tasks.filter(t => t.profile === mockRole);
  }, [tasks, mockRole]);
  
  // Overdue or High Risk tasks
  const vulnerableTasks = roleTasks.filter(t => t.status === 'overdue' || (t.riskScore !== undefined && t.riskScore >= 70));
  const otherTasks = roleTasks.filter(t => !vulnerableTasks.some(vt => vt.id === t.id) && t.status !== 'completed');

  // Currently viewed recovery task
  const [viewTaskId, setViewTaskId] = useState<string | null>(null);
  const activeTask = roleTasks.find(t => t.id === (viewTaskId || selectedTaskId));

  const handleRunRecovery = () => {
    const targetId = selectedTaskId || viewTaskId;
    if (!targetId) return;
    onGenerateRecovery(targetId, selectedStrategy);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER DECORATION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#080808] p-6 rounded-xl border border-[#1A1A1A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(239,68,68,0.5)] animate-pulse"></span>
            <span className="text-[10px] font-mono text-rose-500 uppercase tracking-widest">{labels.activeProtocol}</span>
          </div>
          <h2 className="text-2xl font-medium font-serif italic text-white mt-1">{labels.headerTitle}</h2>
          <p className="text-xs text-slate-400 mt-1">
            {labels.description}
          </p>
        </div>
      </div>

      {/* THREAT LEVEL ASSESSMENT & ROOT CAUSE */}
      {recoveryState && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
          <div className="md:col-span-8 space-y-3">
            <span className="text-[10px] font-mono text-rose-500 uppercase tracking-widest block font-bold">
              AI Operational Root Cause Analysis
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {loading ? "Re-assessing active workspace parameters..." : recoveryState.rootCause}
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#1A1A1A] pt-4 md:pt-0 md:pl-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">Dynamic Threat Level</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                  recoveryState.threatLevel === 'Critical' ? 'bg-rose-950/40 border-rose-500/30 text-rose-400' :
                  recoveryState.threatLevel === 'High' ? 'bg-orange-950/40 border-orange-500/30 text-orange-400' :
                  recoveryState.threatLevel === 'Moderate' ? 'bg-amber-950/40 border-amber-500/30 text-amber-400' :
                  'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                }`}>
                  {recoveryState.threatLevel}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-light text-white font-mono">{recoveryState.threatScore}%</span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Threat Index</span>
              </div>
            </div>
            <div className="w-full bg-[#161616] h-1.5 rounded-full overflow-hidden mt-3">
              <div 
                className={`h-full transition-all duration-500 ${
                  recoveryState.threatScore >= 85 ? 'bg-rose-500' :
                  recoveryState.threatScore >= 60 ? 'bg-orange-500' :
                  recoveryState.threatScore >= 30 ? 'bg-amber-500' :
                  'bg-emerald-500'
                }`}
                style={{ width: `${recoveryState.threatScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* EXECUTIVE OPERATIONAL METRICS */}
      {recoveryState && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {/* CARD 1: OVERDUE */}
          <div className="bg-[#0E0E0E] p-4 rounded-xl border border-[#1A1A1A] flex flex-col justify-between">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">Overdue Tasks</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className={`text-2xl font-mono ${recoveryState.metrics.overdueTasks > 0 ? 'text-rose-500 font-bold' : 'text-white'}`}>
                {recoveryState.metrics.overdueTasks}
              </span>
            </div>
          </div>

          {/* CARD 2: CRITICAL */}
          <div className="bg-[#0E0E0E] p-4 rounded-xl border border-[#1A1A1A] flex flex-col justify-between">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">Critical Tasks</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className={`text-2xl font-mono ${recoveryState.metrics.criticalTasks > 0 ? 'text-amber-500 font-bold' : 'text-white'}`}>
                {recoveryState.metrics.criticalTasks}
              </span>
            </div>
          </div>

          {/* CARD 3: BLOCKED */}
          <div className="bg-[#0E0E0E] p-4 rounded-xl border border-[#1A1A1A] flex flex-col justify-between">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">Blocked Tasks</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className={`text-2xl font-mono ${recoveryState.metrics.blockedTasks > 0 ? 'text-rose-400 font-bold' : 'text-white'}`}>
                {recoveryState.metrics.blockedTasks}
              </span>
            </div>
          </div>

          {/* CARD 4: REMAINING WORKLOAD */}
          <div className="bg-[#0E0E0E] p-4 rounded-xl border border-[#1A1A1A] flex flex-col justify-between">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">Remaining Workload</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-2xl font-mono text-white">{recoveryState.metrics.remainingWorkload}h</span>
            </div>
          </div>

          {/* CARD 5: COMPLETION VELOCITY */}
          <div className="bg-[#0E0E0E] p-4 rounded-xl border border-[#1A1A1A] flex flex-col justify-between">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">Completion Velocity</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-2xl font-mono text-white">{recoveryState.metrics.completionVelocity}%</span>
            </div>
          </div>

          {/* CARD 6: ESTIMATED RECOVERY TIME */}
          <div className="bg-[#0E0E0E] p-4 rounded-xl border border-[#1A1A1A] flex flex-col justify-between">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">Est. Recovery Time</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-2xl font-mono text-emerald-400">{recoveryState.metrics.estimatedRecoveryTime}h</span>
            </div>
          </div>

          {/* CARD 7: RECOVERY CONFIDENCE */}
          <div className="bg-[#0E0E0E] p-4 rounded-xl border border-[#1A1A1A] flex flex-col justify-between">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">Recovery Confidence</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className={`text-2xl font-mono font-bold ${
                recoveryState.metrics.recoveryConfidence >= 75 ? 'text-emerald-400' :
                recoveryState.metrics.recoveryConfidence >= 50 ? 'text-amber-400' :
                'text-rose-500'
              }`}>
                {recoveryState.metrics.recoveryConfidence}%
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: VULNERABILITY MONITOR */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
            <div className="flex items-center gap-2 border-b border-[#1A1A1A] pb-3 mb-4">
              <ShieldAlert className="h-4.5 w-4.5 text-rose-500" />
              <h4 className="text-xs font-semibold text-white tracking-widest uppercase font-mono">{labels.queueTitle}</h4>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed italic">
              {labels.queueDesc}
            </p>

            {vulnerableTasks.length === 0 ? (
              <div className="p-8 text-center bg-[#131313] rounded border border-[#1A1A1A]">
                <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">{labels.activeNominal}</h4>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed italic">
                  {labels.nominalDesc}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {vulnerableTasks.map(t => (
                  <button
                     key={t.id}
                     onClick={() => {
                       setViewTaskId(t.id);
                       setSelectedTaskId('');
                     }}
                     className={`w-full text-left p-4 rounded border transition duration-150 ${
                       (viewTaskId === t.id && !selectedTaskId)
                         ? 'bg-rose-950/20 border-rose-500/40 text-white' 
                         : 'bg-[#131313] border-[#1A1A1A] text-slate-300 hover:border-gray-700/60'
                     }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${
                        t.status === 'overdue' 
                          ? 'bg-rose-950/50 border-rose-500/30 text-rose-400 font-bold' 
                          : 'bg-orange-950/40 border-orange-500/20 text-orange-400'
                      }`}>
                        {t.status === 'overdue' ? secondaryLabels.nominalOverdue : secondaryLabels.nominalStatus}
                      </span>
                      {t.recoveryStrategy && (
                        <span className="text-[9px] font-mono text-emerald-500 uppercase flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></span>
                          {secondaryLabels.planLoaded}
                        </span>
                      )}
                    </div>
                    <h5 className="text-xs font-semibold font-mono mt-2.5 truncate">
                      {t.title}
                    </h5>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono mt-1.5 pt-1.5 border-t border-[#1A1A1A]/30">
                      <span>{secondaryLabels.laborEffort}: {t.estimatedEffort}h</span>
                      <span>{secondaryLabels.threatLabel || 'Threat'}: {t.riskScore ?? 50}%</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* EMERGENCY TRIGGER SELECTOR */}
          <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest font-mono">{labels.deescalationTitle}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-1 italic">
                {labels.deescalationDesc}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block mb-1.5">Target Task</label>
                <select
                  value={selectedTaskId}
                  onChange={(e) => {
                    setSelectedTaskId(e.target.value);
                    setViewTaskId(null);
                   }}
                  className="w-full px-3 py-2 bg-[#131313] border border-[#1A1A1A] rounded text-xs text-[#E0E0E0] focus:outline-none focus:border-rose-500 transition [color-scheme:dark]"
                >
                  <option value="">{secondaryLabels.selectPending || '-- Select Target Task --'}</option>
                  {otherTasks.map((t, index) => (
                    <option key={'opt_' + t.id + '_' + index} value={t.id}>
                      {t.title} ({t.estimatedEffort}h)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block mb-1.5">Recovery Framework</label>
                <select
                  value={selectedStrategy}
                  onChange={(e) => setSelectedStrategy(e.target.value)}
                  className="w-full px-3 py-2 bg-[#131313] border border-[#1A1A1A] rounded text-xs text-[#E0E0E0] focus:outline-none focus:border-rose-500 transition [color-scheme:dark]"
                >
                  {recoveryState?.suggestedStrategies?.map((strat: string) => (
                    <option key={strat} value={strat}>
                      {strat}
                    </option>
                  )) || (
                    <>
                      <option value="Immediate Recovery">Immediate Recovery</option>
                      <option value="Resource Reallocation">Resource Reallocation</option>
                      <option value="Scope Reduction">Scope Reduction</option>
                      <option value="Priority Reset">Priority Reset</option>
                      <option value="Weekend Sprint">Weekend Sprint</option>
                      <option value="Stakeholder Escalation">Stakeholder Escalation</option>
                      <option value="Deadline Extension">Deadline Extension</option>
                      <option value="Risk Containment">Risk Containment</option>
                      <option value="Focus Mode">Focus Mode</option>
                      <option value="Emergency Execution Plan">Emergency Execution Plan</option>
                    </>
                  )}
                </select>
              </div>

              <button
                onClick={handleRunRecovery}
                disabled={generatingId !== null || (!selectedTaskId && !viewTaskId)}
                className="w-full mt-2 py-2 bg-white text-black text-xs font-bold font-mono tracking-wide rounded hover:bg-gray-200 transition select-none disabled:opacity-40"
              >
                {generatingId ? labels.loadingDeploy : labels.deployButton}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TURNAROUND BLUEPRINT DISPLAY */}
        <div className="lg:col-span-7 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
          <AnimatePresence mode="wait">
            {activeTask ? (
              <motion.div
                key={activeTask.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex border-b border-[#1A1A1A] pb-4 justify-between items-start gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">{labels.blueprintTitle}</span>
                    <h3 className="text-base font-semibold text-white mt-1 uppercase tracking-tight">{activeTask.title}</h3>
                  </div>
                  
                  {activeTask.recoveryStrategy && (
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-2.5 py-1 rounded uppercase tracking-wide">
                        {labels.lockLabel}
                      </span>
                    </div>
                  )}
                </div>

                {activeTask.recoveryStrategy ? (
                  <div className="space-y-5">
                    
                    {/* CORE turnaround STRATEGY */}
                    <div className="p-4 bg-[#131313] rounded border border-rose-550/10">
                      <span className="text-[10px] font-mono uppercase text-rose-400 block tracking-widest font-semibold">{secondaryLabels.turnaroundMission}</span>
                      <p className="text-xs text-[#E0E0E0] leading-relaxed mt-2.5 font-mono">
                        {activeTask.recoveryStrategy.strategyText}
                      </p>
                    </div>

                    {/* FIVE CHANNEL RECOVERY CHANNELS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* RECOMMENDED EXTENSION */}
                      <div className="p-4 bg-[#131313] border border-[#1A1A1A] rounded">
                        <span className="text-[10px] uppercase font-mono text-gray-500 block tracking-wider font-semibold">{labels.extensionTitle}</span>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-mono font-bold text-white">
                            {new Date(activeTask.recoveryStrategy.suggestedNewDeadline || '').toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* DEFENSE MECHANISM */}
                      <div className="p-4 bg-[#131313] border border-[#1A1A1A] rounded">
                        <span className="text-[10px] uppercase font-mono text-gray-500 block tracking-wider font-semibold">{labels.defenseTitle}</span>
                        <p className="text-xs text-slate-300 leading-relaxed mt-1.5 font-mono">
                          {activeTask.recoveryStrategy.riskMitigation}
                        </p>
                      </div>

                      {/* RESOURCE REALLOCATION */}
                      {activeTask.recoveryStrategy.resourceReallocation && (
                        <div className="p-4 bg-[#131313] border border-[#1A1A1A] rounded col-span-1 md:col-span-2">
                          <span className="text-[10px] uppercase font-mono text-indigo-400 block tracking-wider font-semibold">{labels.resourceTitle}</span>
                          <p className="text-xs text-indigo-200 mt-1.5 font-mono leading-relaxed">
                            {activeTask.recoveryStrategy.resourceReallocation}
                          </p>
                        </div>
                      )}

                      {/* SCOPE REDUCTION */}
                      {activeTask.recoveryStrategy.scopeReduction && (
                        <div className="p-4 bg-[#131313] border border-[#1A1A1A] rounded col-span-1">
                          <span className="text-[10px] uppercase font-mono text-amber-400 block tracking-wider font-semibold">{labels.scopeTitle}</span>
                          <p className="text-xs text-amber-200 mt-1.5 leading-relaxed font-mono">
                            {activeTask.recoveryStrategy.scopeReduction}
                          </p>
                        </div>
                      )}

                      {/* PRIORITY SHIFTS */}
                      {activeTask.recoveryStrategy.priorityShifts && (
                        <div className="p-4 bg-[#131313] border border-[#1A1A1A] rounded col-span-1">
                          <span className="text-[10px] uppercase font-mono text-sky-400 block tracking-wider font-semibold">{labels.priorityTitle}</span>
                          <p className="text-xs text-sky-200 mt-1.5 leading-relaxed font-mono">
                            {activeTask.recoveryStrategy.priorityShifts}
                          </p>
                        </div>
                      )}

                    </div>

                    {/* MICRO turn checklist */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
                        <ListTodo className="h-4 w-4 text-gray-600" />
                        <span>{labels.roadmapTitle}</span>
                      </div>
                      
                      <div className="space-y-2">
                        {activeTask.recoveryStrategy.actionItems.map((item, keyIndex) => (
                          <div key={keyIndex} className="flex items-start gap-3 p-3 bg-[#131313] rounded border border-[#1A1A1A] font-mono text-xs text-[#E0E0E0]">
                            <span className="h-4 w-4 rounded bg-[#080808] border border-[#1A1A1A] text-gray-500 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none font-sans">
                              {keyIndex + 1}
                            </span>
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* DEPLOY BUTTON FOR RE-ANALYSIS */}
                    <button
                      onClick={handleRunRecovery}
                      disabled={generatingId !== null}
                      className="w-full mt-4 py-2 border border-[#1A1A1A] hover:bg-gray-900 bg-transparent text-[#E0E0E0] text-xs font-mono rounded transition duration-150 tracking-wide uppercase"
                    >
                      {labels.recalculateButton}
                    </button>

                  </div>
                ) : (
                  <div className="py-20 text-center space-y-3 bg-[#131313] rounded border border-[#1A1A1A]">
                    <AlertOctagon className="h-10 w-10 text-rose-500 mx-auto animate-pulse" />
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">{labels.safeguardInactive}</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto mt-2 italic leading-relaxed">
                      {labels.safeguardActiveText}
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="space-y-6">
                <div className="border-b border-[#1A1A1A] pb-4">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Active Workspace Roadmap</span>
                  <h3 className="text-base font-semibold text-white mt-1 uppercase tracking-tight">
                    {mockRole === 'developer' ? 'Sprint Recovery Steps' :
                     mockRole === 'student' ? 'Academic Recovery Steps' :
                     mockRole === 'job_seeker' ? 'Placement Recovery Steps' :
                     'Corporate SLA Recovery Steps'}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-[#131313] rounded border border-rose-500/10">
                    <span className="text-[10px] font-mono uppercase text-rose-400 block tracking-widest font-semibold">Active Strategy: {recoveryState?.recommendedStrategy || 'Emergency Plan'}</span>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2 font-mono">
                      {recoveryState?.rootCause || 'All systems operating within nominal parameters.'}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
                      <ListTodo className="h-4 w-4 text-gray-600" />
                      <span>Operational Roadmap</span>
                    </div>

                    <div className="space-y-2">
                      {recoveryState?.recommendedActions?.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-[#131313] rounded border border-[#1A1A1A] font-mono text-xs text-[#E0E0E0]">
                          <span className="h-4 w-4 rounded bg-[#080808] border border-[#1A1A1A] text-gray-500 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none font-sans">
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{item}</span>
                        </div>
                      )) || (
                        <div className="p-8 text-center bg-[#131313] rounded border border-[#1A1A1A]">
                          <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                          <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">Workspace nominal</h4>
                          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed italic">
                            No active recovery steps pending. Everything is tracking within nominal margins.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
