import React, { useState } from 'react';
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

interface RecoveryHubProps {
  tasks: Task[];
  onGenerateRecovery: (id: string) => void;
  generatingId: string | null;
}

export default function RecoveryHub({ tasks, onGenerateRecovery, generatingId }: RecoveryHubProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  
  // Overdue or High Risk tasks
  const vulnerableTasks = tasks.filter(t => t.status === 'overdue' || (t.riskScore !== undefined && t.riskScore >= 70));
  const otherTasks = tasks.filter(t => !vulnerableTasks.some(vt => vt.id === t.id) && t.status !== 'completed');

  // Currently viewed recovery task
  const [viewTaskId, setViewTaskId] = useState<string | null>(null);
  const activeTask = tasks.find(t => t.id === (viewTaskId || selectedTaskId));

  const handleRunRecovery = () => {
    const targetId = selectedTaskId || viewTaskId;
    if (!targetId) return;
    onGenerateRecovery(targetId);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER DECORATION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#080808] p-6 rounded-xl border border-[#1A1A1A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(239,68,68,0.5)] animate-pulse"></span>
            <span className="text-[10px] font-mono text-rose-500 uppercase tracking-widest">Active Core Safeguard Protocol</span>
          </div>
          <h2 className="text-2xl font-medium font-serif italic text-white mt-1">SLA Recovery Agent</h2>
          <p className="text-xs text-slate-400 mt-1">
            Failsafe AI counselor to deploy immediate recovery pathways when tasks are breached, delayed, or under severe capability constraints.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: VULNERABILITY MONITOR */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
            <div className="flex items-center gap-2 border-b border-[#1A1A1A] pb-3 mb-4">
              <ShieldAlert className="h-4.5 w-4.5 text-rose-500" />
              <h4 className="text-xs font-semibold text-white tracking-widest uppercase font-mono">Breached & At-Risk Queue</h4>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed italic">
              These objectives require micro-turnaround directives. Select a task to configure buffer mitigation strategies.
            </p>

            {vulnerableTasks.length === 0 ? (
              <div className="p-8 text-center bg-[#131313] rounded border border-[#1A1A1A]">
                <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">All Systems Nominal</h4>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed italic">
                  Zero overdue tasks or critical hazard indices detected. Outstanding focus posture.
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
                        {t.status === 'overdue' ? '🛑 Overdue' : '⚠️ Danger Target'}
                      </span>
                      {t.recoveryStrategy && (
                        <span className="text-[9px] font-mono text-emerald-500 uppercase flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></span>
                          Plan loaded
                        </span>
                      )}
                    </div>
                    <h5 className="text-xs font-semibold font-mono mt-2.5 truncate">
                      {t.title}
                    </h5>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono mt-1.5 pt-1.5 border-t border-[#1A1A1A]/30">
                      <span>Labor Effort: {t.estimatedEffort}h</span>
                      <span>Threat: {t.riskScore}%</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* EMERGENCY TRIGGER SELECTOR */}
          <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest font-mono">Emergency De-escalation</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-1 italic">
                Proactively configure a containment plan for pending tasks before boundary breach triggers a default protocol.
              </p>
            </div>

            <div className="space-y-3">
              <select
                value={selectedTaskId}
                onChange={(e) => {
                  setSelectedTaskId(e.target.value);
                  setViewTaskId(null);
                 }}
                className="w-full px-3 py-2 bg-[#131313] border border-[#1A1A1A] rounded text-xs text-[#E0E0E0] focus:outline-none focus:border-rose-500 transition [color-scheme:dark]"
              >
                <option value="">-- Select Pending Task --</option>
                {otherTasks.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({t.estimatedEffort}h)
                  </option>
                ))}
              </select>

              <button
                onClick={handleRunRecovery}
                disabled={generatingId !== null || (!selectedTaskId && !viewTaskId)}
                className="w-full py-2 bg-white text-black text-xs font-bold font-mono tracking-wide rounded hover:bg-gray-200 transition select-none disabled:opacity-40"
              >
                {generatingId ? 'ANALYZING THREAT BUFFERS...' : 'DEPLOY TRANSITION STRATEGY'}
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
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Operational Assessment Blueprint</span>
                    <h3 className="text-base font-semibold text-white mt-1 uppercase tracking-tight">{activeTask.title}</h3>
                  </div>
                  
                  {activeTask.recoveryStrategy && (
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-2.5 py-1 rounded uppercase tracking-wide">
                        SLA RECOVERY LOCKED
                      </span>
                    </div>
                  )}
                </div>

                {activeTask.recoveryStrategy ? (
                  <div className="space-y-5">
                    
                    {/* CORE turnaround STRATEGY */}
                    <div className="p-4 bg-[#131313] rounded border border-rose-550/10">
                      <span className="text-[10px] font-mono uppercase text-rose-400 block tracking-widest font-semibold">TURNAROUND ALIGNMENT MISSION</span>
                      <p className="text-xs text-[#E0E0E0] leading-relaxed mt-2.5 font-mono">
                        {activeTask.recoveryStrategy.strategyText}
                      </p>
                    </div>

                    {/* FIVE CHANNEL RECOVERY CHANNELS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* RECOMMENDED EXTENSION */}
                      <div className="p-4 bg-[#131313] border border-[#1A1A1A] rounded">
                        <span className="text-[10px] uppercase font-mono text-gray-500 block tracking-wider font-semibold">SLA Extension Boundary</span>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-mono font-bold text-white">
                            {new Date(activeTask.recoveryStrategy.suggestedNewDeadline || '').toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* DEFENSE MECHANISM */}
                      <div className="p-4 bg-[#131313] border border-[#1A1A1A] rounded">
                        <span className="text-[10px] uppercase font-mono text-gray-500 block tracking-wider font-semibold">Pre-emptive Defense Routine</span>
                        <p className="text-xs text-slate-300 leading-relaxed mt-1.5 font-mono">
                          {activeTask.recoveryStrategy.riskMitigation}
                        </p>
                      </div>

                      {/* RESOURCE REALLOCATION */}
                      {activeTask.recoveryStrategy.resourceReallocation && (
                        <div className="p-4 bg-[#131313] border border-[#1A1A1A] rounded col-span-1 md:col-span-2">
                          <span className="text-[10px] uppercase font-mono text-indigo-400 block tracking-wider font-semibold">Resource & Focus Reallocation</span>
                          <p className="text-xs text-indigo-200 mt-1.5 font-mono leading-relaxed">
                            {activeTask.recoveryStrategy.resourceReallocation}
                          </p>
                        </div>
                      )}

                      {/* SCOPE REDUCTION */}
                      {activeTask.recoveryStrategy.scopeReduction && (
                        <div className="p-4 bg-[#131313] border border-[#1A1A1A] rounded col-span-1">
                          <span className="text-[10px] uppercase font-mono text-amber-400 block tracking-wider font-semibold">Scope Trimming Recommendations</span>
                          <p className="text-xs text-amber-200 mt-1.5 leading-relaxed font-mono">
                            {activeTask.recoveryStrategy.scopeReduction}
                          </p>
                        </div>
                      )}

                      {/* PRIORITY SHIFTS */}
                      {activeTask.recoveryStrategy.priorityShifts && (
                        <div className="p-4 bg-[#131313] border border-[#1A1A1A] rounded col-span-1">
                          <span className="text-[10px] uppercase font-mono text-sky-400 block tracking-wider font-semibold">Temporary Priority Deferrals</span>
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
                        <span>TACTICAL ACTION ROADMAP</span>
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
                      RE-CALCULATE TUNNEL MITIGATION
                    </button>

                  </div>
                ) : (
                  <div className="py-20 text-center space-y-3 bg-[#131313] rounded border border-[#1A1A1A]">
                    <AlertOctagon className="h-10 w-10 text-rose-500 mx-auto" />
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Safeguard Draft Deactivated</h4>
                    <p className="text-xs text-slate-450 max-w-xs mx-auto mt-2 italic leading-relaxed">
                      Invoke 'DEPLOY TRANSITION STRATEGY' on the active queue item to run turnaround simulations.
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center py-24 text-center bg-[#131313] rounded border border-[#1A1A1A] border-dashed">
                <div className="max-w-xs space-y-2">
                  <Activity className="h-8 w-8 text-gray-650 mx-auto" />
                  <h4 className="text-sm font-semibold text-white uppercase tracking-widest font-mono">Safekeeping Console Idle</h4>
                  <p className="text-xs text-slate-450 italic mt-2.5 leading-relaxed">
                    Select any overdue or pending task from the left panels to audit or fire dynamic recovery plans.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
