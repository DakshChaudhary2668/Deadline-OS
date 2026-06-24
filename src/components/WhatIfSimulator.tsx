import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  RefreshCw, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertTriangle,
  CheckCircle2, 
  Gauge, 
  HelpCircle,
  Skull,
  ShieldCheck,
  Flame,
  MinusCircle
} from 'lucide-react';
import { Task, SimulationScenario, SimulationResult } from '../types';

interface WhatIfSimulatorProps {
  tasks: Task[];
}

export default function WhatIfSimulator({ tasks }: WhatIfSimulatorProps) {
  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [scenario, setScenario] = useState<SimulationScenario>('SKIP_TASK');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Selected task context
  const activeTask = pendingTasks.find(t => t.id === selectedTaskId);

  const scenarioOptions: { value: SimulationScenario; label: string; description: string }[] = [
    { 
      value: 'SKIP_TASK', 
      label: 'Skip Task completely', 
      description: 'Remove this task from the queue entirely. Reallocates estimated effort hours but fails the objective.' 
    },
    { 
      value: 'DELAY_1_DAY', 
      label: 'Delay Task by 1 Day', 
      description: 'Postpone the target deadline by 24 hours. Offloads near-term stress but causes timeline compression.' 
    },
    { 
      value: 'DELAY_3_DAYS', 
      label: 'Delay Task by 3 Days', 
      description: 'Push the task deadline out by 72 hours. Postpones immediate focus requirement with downstream spillover risks.' 
    },
    { 
      value: 'REDUCE_EFFORT', 
      label: 'Reduce Effort (Scope compression)', 
      description: 'Halve the estimated cognitive effort hours to meet the timeline at the cost of final quality.' 
    },
    { 
      value: 'ADD_2_HOURS', 
      label: 'Add +2 Focus Hours Daily', 
      description: 'Force 2 extra hours of uninterrupted daily deep-work capacity. Boosts output but increases fatigue.' 
    },
    { 
      value: 'DROP_LOW_PRIORITY', 
      label: 'Drop Low Priority Tasks', 
      description: 'Erase all low-importance outstanding tasks from the queue to prioritize core deliverables.' 
    },
    { 
      value: 'PRIORITIZE_TASK', 
      label: 'Prioritize This Task', 
      description: 'Elevate this objective to Critical status, assigning all immediate cognitive bandwidth to it.' 
    }
  ];

  const handleRunSimulation = async () => {
    // Some scenarios require a task context
    const needsTask = ['SKIP_TASK', 'DELAY_1_DAY', 'DELAY_3_DAYS', 'REDUCE_EFFORT', 'PRIORITIZE_TASK'].includes(scenario);
    if (needsTask && !selectedTaskId) {
      setError('Please choose a target task to execute this scenario simulation.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: selectedTaskId || null,
          scenario
        })
      });

      if (!res.ok) {
        throw new Error('Simulation calculation sequence timed out.');
      }

      const data: SimulationResult = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during simulation analysis.');
    } finally {
      setLoading(false);
    }
  };

  // Difference calculator for colors/icons
  const wsDiff = result ? result.projectedWorkspaceSuccess - result.currentWorkspaceSuccess : 0;
  const objDiff = result ? result.projectedObjectiveSuccess - result.currentObjectiveSuccess : 0;
  const riskDiff = result ? result.projectedFailureRisk - result.currentFailureRisk : 0;

  return (
    <div className="space-y-6" id="what-if-simulator-root">
      
      {/* HEADER PROTOCOL DECORATION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#080808] p-6 rounded-xl border border-[#1A1A1A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_5px_rgba(99,102,241,0.5)] animate-pulse"></span>
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Workspace Core Predictor Panel</span>
          </div>
          <h2 className="text-2xl font-medium font-serif italic text-white mt-1">What-If Scenario Intelligence Simulator</h2>
          <p className="text-xs text-slate-400 mt-1">
            Explore cognitive outcome parameters, deadline impacts, and risk indicators before confirming critical task reallocations.
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-[#151224] rounded-full border border-indigo-950/40 shrink-0 select-none">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
          <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest">
            Powered by Gemini Scenario Intelligence
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: SCENARIO PARAMETERS CONFIGURATION */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] space-y-5">
            <div className="flex items-center gap-2 border-b border-[#1A1A1A] pb-3">
              <Gauge className="h-4.5 w-4.5 text-indigo-400" />
              <h4 className="text-xs font-semibold text-white tracking-widest uppercase font-mono">Simulation Parameters</h4>
            </div>

            {/* ERROR NOTIFICATION */}
            {error && (
              <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded text-xs text-rose-300 leading-relaxed font-sans">
                {error}
              </div>
            )}

            {/* STEP 1: SELECT TASK */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase text-gray-500 tracking-wider">
                Step 1: Select Focus Target
              </label>
              {pendingTasks.length === 0 ? (
                <div className="p-3 bg-[#131313] rounded border border-[#1A1A1A] text-center text-xs text-gray-500 font-sans">
                  No active pending tasks in database.
                </div>
              ) : (
                <select
                  value={selectedTaskId}
                  onChange={(e) => setSelectedTaskId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#131313] border border-[#1A1A1A] rounded text-xs text-white focus:outline-none focus:border-indigo-500 transition [color-scheme:dark]"
                >
                  <option value="">-- Choose Target Milestone --</option>
                  {pendingTasks.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.estimatedEffort}h / {t.importance})
                    </option>
                  ))}
                </select>
              )}
              {activeTask && (
                <div className="p-3 bg-[#131313] rounded border border-[#1C1C1C] text-[11px] space-y-1.5 font-sans">
                  <div className="flex justify-between items-center text-gray-400">
                    <span className="font-mono text-[10px] uppercase">Original Cost:</span>
                    <span className="font-semibold text-white">{activeTask.estimatedEffort} cognitive hours</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span className="font-mono text-[10px] uppercase">Constraint Deadline:</span>
                    <span className="font-semibold text-white">{new Date(activeTask.deadline).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span className="font-mono text-[10px] uppercase">Baseline Urgency:</span>
                    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                      activeTask.importance === 'Critical' ? 'bg-rose-950/40 text-rose-400 border border-rose-900/40' :
                      activeTask.importance === 'High' ? 'bg-orange-950/40 text-orange-400 border border-orange-900/40' :
                      activeTask.importance === 'Medium' ? 'bg-blue-950/40 text-blue-400 border border-blue-900/40' :
                      'bg-gray-800 text-gray-400'
                    }`}>
                      {activeTask.importance}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2: SELECT INTERVENTION SCENARIO */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase text-gray-500 tracking-wider">
                Step 2: Define Hypothesized Intervention
              </label>
              <div className="space-y-1">
                {scenarioOptions.map(opt => {
                  const active = scenario === opt.value;
                  const needsTask = ['SKIP_TASK', 'DELAY_1_DAY', 'DELAY_3_DAYS', 'REDUCE_EFFORT', 'PRIORITIZE_TASK'].includes(opt.value);
                  const disabled = needsTask && !selectedTaskId;

                  return (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setScenario(opt.value);
                        setError(null);
                      }}
                      disabled={disabled}
                      className={`w-full text-left p-3 rounded transition flex flex-col ${
                        active 
                          ? 'bg-indigo-950/30 border border-indigo-500/40 text-white' 
                          : disabled
                            ? 'opacity-35 bg-[#121212] border border-[#1A1A1A] cursor-not-allowed text-gray-600'
                            : 'bg-[#131313] border border-[#1A1A1A] text-slate-300 hover:border-gray-700/60'
                      }`}
                    >
                      <span className="text-xs font-semibold font-mono">{opt.label}</span>
                      <span className="text-[10px] text-gray-500 mt-0.5 font-sans leading-relaxed">
                        {opt.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTION SIMULATOR TRIGGER */}
            <button
              onClick={handleRunSimulation}
              disabled={loading || (['SKIP_TASK', 'DELAY_1_DAY', 'DELAY_3_DAYS', 'REDUCE_EFFORT', 'PRIORITIZE_TASK'].includes(scenario) && !selectedTaskId)}
              className="w-full py-3 bg-white hover:bg-gray-100 disabled:bg-gray-800 disabled:text-gray-500 text-black text-xs font-bold font-mono tracking-widest rounded uppercase transition flex items-center justify-center gap-2 shadow select-none"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ANALYZING RISK BUFFERS...
                </>
              ) : (
                <>
                  <Activity className="h-3.5 w-3.5" />
                  EXECUTE STRATEGIC SIMULATION
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: SIMULATION DASHBOARD OUTCOMES */}
        <div className="lg:col-span-7 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] min-h-[500px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="simulation-results"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-5 text-left"
              >
                {/* Result header */}
                <div className="flex justify-between items-center border-b border-[#1A1A1A] pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Outcome Model Metrics</span>
                    <h3 className="text-base font-semibold text-white mt-0.5">SIMULATED WORKSPACE STATE</h3>
                  </div>

                  <div className="flex items-center gap-2 bg-[#121212] px-3 py-1 rounded-full border border-[#222]">
                    <span className="text-[9px] font-mono text-gray-500 uppercase">AI CONFIDENCE:</span>
                    <span className="text-xs font-bold font-mono text-emerald-400">{result.confidenceScore}%</span>
                  </div>
                </div>

                {/* EXECUTIVE DECISION VERDICT BANNER */}
                <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden ${
                  result.verdict === 'RECOMMENDED' 
                    ? 'bg-emerald-950/10 border-emerald-500/20 text-emerald-400' 
                    : result.verdict === 'ACCEPTABLE_RISK'
                      ? 'bg-amber-950/10 border-amber-500/20 text-amber-400'
                      : 'bg-rose-950/10 border-rose-500/20 text-rose-400'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      result.verdict === 'RECOMMENDED' ? 'bg-emerald-500/10 text-emerald-400' :
                      result.verdict === 'ACCEPTABLE_RISK' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-rose-500/10 text-rose-400'
                    }`}>
                      {result.verdict === 'RECOMMENDED' ? <ShieldCheck className="h-5 w-5" /> :
                       result.verdict === 'ACCEPTABLE_RISK' ? <AlertTriangle className="h-5 w-5" /> :
                       <Skull className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Executive Decision Verdict</div>
                      <div className="text-sm font-bold tracking-wide mt-0.5">
                        {result.verdict === 'RECOMMENDED' && '✅ STRATEGICALLY RECOMMENDED'}
                        {result.verdict === 'ACCEPTABLE_RISK' && '⚠️ ACCEPTABLE WITH RISK'}
                        {result.verdict === 'NOT_RECOMMENDED' && '❌ NOT RECOMMENDED'}
                      </div>
                      <p className="text-xs text-slate-300 mt-1 font-sans leading-relaxed">
                        {result.verdictExplanation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* VISUAL GAUGE PANEL FOR CORE PROBABILITIES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* WORKSPACE SUCCESS PROBABILITY */}
                  <div className="p-4 bg-[#121212] rounded-xl border border-[#1C1C1C] flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <Gauge className="h-4 w-4 text-indigo-400" />
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Workspace Success</span>
                      </div>
                      
                      {wsDiff !== 0 && (
                        <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                          wsDiff > 0 
                            ? 'bg-emerald-950/45 text-emerald-400 border border-emerald-900/30' 
                            : 'bg-rose-950/45 text-rose-400 border border-rose-900/30'
                        }`}>
                          {wsDiff > 0 ? `+${wsDiff}%` : `${wsDiff}%`}
                        </div>
                      )}
                    </div>

                    <div className="flex items-end justify-between gap-2 mt-1">
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wide">Baseline</span>
                        <div className="text-lg font-bold text-gray-400 font-mono">
                          {result.currentWorkspaceSuccess}%
                        </div>
                      </div>

                      <div className="h-8 w-px bg-gray-800/60"></div>

                      <div className="space-y-0.5 text-right">
                        <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-wide">Projected</span>
                        <div className={`text-2xl font-extrabold font-mono transition-all ${
                          wsDiff > 0 ? 'text-emerald-400' : wsDiff < 0 ? 'text-rose-400' : 'text-indigo-400'
                        }`}>
                          {result.projectedWorkspaceSuccess}%
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-1 bg-gray-900 rounded-full mt-3 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.projectedWorkspaceSuccess}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          result.projectedWorkspaceSuccess >= 70 ? 'bg-emerald-500' :
                          result.projectedWorkspaceSuccess >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* OBJECTIVE SUCCESS PROBABILITY */}
                  <div className="p-4 bg-[#121212] rounded-xl border border-[#1C1C1C] flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-sky-400" />
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Objective Success</span>
                      </div>
                      
                      {objDiff !== 0 && (
                        <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                          objDiff > 0 
                            ? 'bg-emerald-950/45 text-emerald-400 border border-emerald-900/30' 
                            : 'bg-rose-950/45 text-rose-400 border border-rose-900/30'
                        }`}>
                          {objDiff > 0 ? `+${objDiff}%` : `${objDiff}%`}
                        </div>
                      )}
                    </div>

                    <div className="flex items-end justify-between gap-2 mt-1">
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wide">Baseline</span>
                        <div className="text-lg font-bold text-gray-400 font-mono">
                          {result.currentObjectiveSuccess}%
                        </div>
                      </div>

                      <div className="h-8 w-px bg-gray-800/60"></div>

                      <div className="space-y-0.5 text-right">
                        <span className="text-[8px] font-mono text-sky-400 uppercase tracking-wide">Projected</span>
                        <div className={`text-2xl font-extrabold font-mono transition-all ${
                          objDiff > 0 ? 'text-emerald-400' : objDiff < 0 ? 'text-rose-400' : 'text-sky-400'
                        }`}>
                          {result.projectedObjectiveSuccess}%
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-1 bg-gray-900 rounded-full mt-3 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.projectedObjectiveSuccess}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          result.projectedObjectiveSuccess >= 70 ? 'bg-emerald-500' :
                          result.projectedObjectiveSuccess >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* THREAT RISK LEVEL */}
                  <div className="p-4 bg-[#121212] rounded-xl border border-[#1C1C1C] flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <Skull className="h-4 w-4 text-rose-400" />
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Failure Risk Level</span>
                      </div>
                      
                      {riskDiff !== 0 && (
                        <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                          riskDiff < 0 
                            ? 'bg-emerald-950/45 text-emerald-400 border border-emerald-900/30' 
                            : 'bg-rose-950/45 text-rose-400 border border-rose-900/30'
                        }`}>
                          {riskDiff < 0 ? 'De-escalated' : `+${riskDiff}% Risk`}
                        </div>
                      )}
                    </div>

                    <div className="flex items-end justify-between gap-2 mt-1">
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wide">Baseline</span>
                        <div className="text-lg font-bold text-gray-400 font-mono">
                          {result.currentFailureRisk}%
                        </div>
                      </div>

                      <div className="h-8 w-px bg-gray-800/60"></div>

                      <div className="space-y-0.5 text-right">
                        <span className="text-[8px] font-mono text-rose-400 uppercase tracking-wide">Projected</span>
                        <div className={`text-2xl font-extrabold font-mono transition-all ${
                          riskDiff < 0 ? 'text-emerald-400' : 'text-rose-500 animate-pulse'
                        }`}>
                          {result.projectedFailureRisk}%
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-1 bg-gray-900 rounded-full mt-3 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.projectedFailureRisk}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          result.projectedFailureRisk >= 75 ? 'bg-rose-600' :
                          result.projectedFailureRisk >= 40 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                      />
                    </div>
                  </div>

                </div>

                {/* STRATEGIC TRADE-OFF ANALYSIS */}
                <div className="bg-[#111] p-5 rounded-xl border border-[#1A1A1A] space-y-4">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-semibold border-b border-[#1A1A1A] pb-2">
                    <Activity className="h-3.5 w-3.5" />
                    <span>Strategic Trade-Off Analysis</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* GAINS */}
                    <div className="space-y-2">
                      <div className="text-[9px] font-mono uppercase text-emerald-400 tracking-wider font-semibold">GAINS</div>
                      <ul className="space-y-1.5">
                        {result.gains && result.gains.map((gain, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#CCCCCC] leading-relaxed">
                            <span className="text-emerald-400 shrink-0 mt-0.5 font-bold font-mono">+</span>
                            <span>{gain}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* LOSSES */}
                    <div className="space-y-2">
                      <div className="text-[9px] font-mono uppercase text-rose-400 tracking-wider font-semibold">LOSSES</div>
                      <ul className="space-y-1.5">
                        {result.losses && result.losses.map((loss, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#CCCCCC] leading-relaxed font-sans">
                            <span className="text-rose-400 shrink-0 mt-0.5 font-bold font-mono">-</span>
                            <span>{loss}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* NET IMPACT */}
                  <div className="mt-3 pt-3 border-t border-[#1C1C1C] space-y-1">
                    <div className="text-[9px] font-mono uppercase text-slate-400 tracking-wider font-semibold">NET IMPACT</div>
                    <p className="text-xs font-mono text-slate-200 bg-[#0B0B0B] p-3 rounded border border-[#1A1A1A] leading-relaxed">
                      {result.netImpact}
                    </p>
                  </div>
                </div>

                {/* AI EXECUTIVE IMPACT SUMMARY */}
                <div className="p-5 bg-gradient-to-r from-indigo-950/10 via-[#131313] to-indigo-950/5 rounded-xl border border-indigo-500/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-semibold mb-2">
                    <Sparkles className="h-4 w-4 animate-pulse" />
                    <span>Executive Simulation Reasoning</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {result.impactSummary}
                  </p>
                </div>

                {/* TWO COLUMN GRID FOR CONSEQUENCES & RECOVERY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* CRITICAL CONSEQUENCES */}
                  <div className="bg-[#111] p-4 rounded-xl border border-[#1A1A1A] space-y-3">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-rose-400 uppercase tracking-widest font-semibold border-b border-[#1A1A1A] pb-2">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Critical Consequences</span>
                    </div>

                    <ul className="space-y-2.5">
                      {result.criticalConsequences.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#CCCCCC] leading-relaxed font-sans">
                          <MinusCircle className="h-3.5 w-3.5 text-rose-500/70 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* RECOVERY RECOMMENDATIONS */}
                  <div className="bg-[#111] p-4 rounded-xl border border-[#1A1A1A] space-y-3">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-semibold border-b border-[#1A1A1A] pb-2">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Recovery Recommendations</span>
                    </div>

                    <ul className="space-y-2.5">
                      {result.recoveryRecommendations.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#CCCCCC] leading-relaxed font-sans">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </motion.div>
            ) : (
              <motion.div
                key="awaiting-simulation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-grow flex flex-col items-center justify-center text-center p-12 self-center space-y-3"
              >
                <div className="h-12 w-12 rounded-full bg-indigo-950/20 border border-indigo-550/20 flex items-center justify-center text-indigo-400">
                  <Activity className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-widest font-mono">
                    Awaiting Simulation Model Inputs
                  </h4>
                  <p className="text-[11px] text-slate-500 italic max-w-sm mx-auto mt-1 leading-relaxed">
                    Set hypothetical parameters in the left panel and trigger the execution stream to map projected outcome timelines.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
