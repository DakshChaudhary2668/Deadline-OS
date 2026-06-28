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
import { MODE_LANGUAGES } from '../utils/modeLanguage';

const getConfidenceDrivers = (role?: string): string[] => {
  if (role === 'student') {
    return [
      'Coursework consistency',
      'Submission certainty',
      'Exam load volatility',
      'Hypothesis complexity',
      'Syllabic signal indicators'
    ];
  }
  if (role === 'developer') {
    return [
      'Commit history consistency',
      'Code freeze certainty',
      'PR/deploy volatility',
      'Scenario complexity',
      'Branch telemetry signals'
    ];
  }
  if (role === 'job_seeker') {
    return [
      'Interview funnel consistency',
      'Process/round certainty',
      'Hiring wave volatility',
      'Scenario complexity',
      'Recruiter signal indicators'
    ];
  }
  return [
    'Historical deliverable consistency',
    'SLA breach certainty',
    'Operational capacity volatility',
    'Scenario complexity',
    'Contextual telemetry signals'
  ];
};

interface WhatIfSimulatorProps {
  tasks: Task[];
  mockRole?: string;
}

export default function WhatIfSimulator({ tasks, mockRole }: WhatIfSimulatorProps) {
  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [scenario, setScenario] = useState<SimulationScenario>('SKIP_TASK');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showConfidenceDrivers, setShowConfidenceDrivers] = useState<boolean>(false);

  // Selected task context
  const activeTask = pendingTasks.find(t => t.id === selectedTaskId);

  const getSimulatorLabels = (role?: string) => {
    switch (role) {
      case 'student':
        return {
          predictorPanel: "Academic Performance Predictor",
          title: "What-If Course Load Simulator",
          description: "Explore the GPA and timeline impact of skipping homeworks, delaying research milestones, or cramming extra study hours.",
          chooseTarget: "-- Choose Target Syllabus Goal --",
          originalCost: "Study Hours Required",
          constraintDeadline: "Submission Deadline",
          baselineUrgency: "Academic Weight",
          step1: "Step 1: Select Syllabus Target",
          step2: "Step 2: Hypothesize Academic Adjustments",
          executeButton: "RUN ACADEMIC PROJECTION",
          executingButton: "ANALYZING GRADE IMPACT...",
          outcomeHeader: "Projected Academic Standing",
          workspaceSuccess: "Syllabus Mastery",
          objectiveSuccess: "Goal Grade Success",
          failureRisk: "Academic Failure Risk",
          awaitingInput: "Awaiting Course Load Inputs",
          awaitingDesc: "Adjust study hours or deadlines on the left to project exam performance and grade impact."
        };
      case 'developer':
        return {
          predictorPanel: "Sprint Performance Predictor",
          title: "What-If Sprint Simulator",
          description: "Project the sprint success, code velocity, and deployment risk of delaying tickets, scaling down scope, or working overtime.",
          chooseTarget: "-- Choose Target Sprint Ticket --",
          originalCost: "Dev Effort Required",
          constraintDeadline: "Sprint Deadline",
          baselineUrgency: "Ticket Priority",
          step1: "Step 1: Select Backlog Ticket",
          step2: "Step 2: Define Sprint Intervention",
          executeButton: "PROJECT SPRINT IMPACT",
          executingButton: "RUNNING OVERTIME SIMULATION...",
          outcomeHeader: "Projected Sprint Metrics",
          workspaceSuccess: "Sprint Completion",
          objectiveSuccess: "Build Stability",
          failureRisk: "SLA Breach Risk",
          awaitingInput: "Awaiting Sprint Parameters",
          awaitingDesc: "Configure sprint adjustments to simulate code-freeze bottlenecks and delivery velocity."
        };
      case 'job_seeker':
        return {
          predictorPanel: "Placement Pipeline Predictor",
          title: "What-If Placement Simulator",
          description: "Analyze how skipping application tailored adjustments, delaying interview prep, or dropping low-yield job leads impacts your hiring likelihood.",
          chooseTarget: "-- Choose Target Opportunity --",
          originalCost: "Preparation Time",
          constraintDeadline: "Interview/Expiry Date",
          baselineUrgency: "Opportunity Priority",
          step1: "Step 1: Select Career Target",
          step2: "Step 2: Set Placement Hypothesis",
          executeButton: "PROJECT PIPELINE IMPACT",
          executingButton: "CALCULATING CONVERSION LIKELIHOOD...",
          outcomeHeader: "Projected Placement Outlook",
          workspaceSuccess: "Pipeline Health",
          objectiveSuccess: "Hiring Probability",
          failureRisk: "Opportunity Loss Risk",
          awaitingInput: "Awaiting Pipeline Inputs",
          awaitingDesc: "Hypothesize hiring decisions on the left to project active loops and recruiter responses."
        };
      case 'professional':
      default:
        return {
          predictorPanel: "SLA Deliverables Predictor",
          title: "What-If Operational SLA Simulator",
          description: "Explore resource allocations, schedule congestions, and SLA risk factors prior to committing operational team reallocations.",
          chooseTarget: "-- Choose Target Operational Milestone --",
          originalCost: "FTE Focus Hours",
          constraintDeadline: "SLA Delivery Window",
          baselineUrgency: "Strategic Importance",
          step1: "Step 1: Select Operational Objective",
          step2: "Step 2: Hypothesize Resource Adjustments",
          executeButton: "EXECUTE OPERATIONAL SIMULATION",
          executingButton: "ANALYZING RISK BUFFERS...",
          outcomeHeader: "Projected Operational Health",
          workspaceSuccess: "SLA Compliance",
          objectiveSuccess: "Milestone Resolution",
          failureRisk: "SLA Violation Risk",
          awaitingInput: "Awaiting Operational Inputs",
          awaitingDesc: "Simulate operational interventions to analyze capacity bottlenecks and project milestone resolution."
        };
    }
  };

  const getScenarioOptions = (role?: string): { value: SimulationScenario; label: string; description: string }[] => {
    switch (role) {
      case 'student':
        return [
          { 
            value: 'SKIP_TASK', 
            label: 'Skip Homework / Topic', 
            description: 'Skip studying this topic or submitting the homework. Frees up study hours but guarantees zero credit.' 
          },
          { 
            value: 'DELAY_1_DAY', 
            label: 'Extend Deadline by 1 Day', 
            description: 'Request a late extension of 24 hours. Offloads tonight\'s stress but causes late penalty risks.' 
          },
          { 
            value: 'DELAY_3_DAYS', 
            label: 'Extend Deadline by 3 Days', 
            description: 'Delay submission by 72 hours. Postpones exam prep runway and increases grade penalty risk.' 
          },
          { 
            value: 'REDUCE_EFFORT', 
            label: 'Cram Study / Reduce Scope', 
            description: 'Halve the revision depth to meet the exam window, reducing final comprehension and test grade.' 
          },
          { 
            value: 'ADD_2_HOURS', 
            label: 'Cram +2 Extra Hours Daily', 
            description: 'Force 2 extra hours of intensive library cramming daily. Boosts syllabus coverage but increases cognitive fatigue.' 
          },
          { 
            value: 'DROP_LOW_PRIORITY', 
            label: 'Drop Non-Weighted Electives', 
            description: 'Stop reviewing elective non-weighted topics to focus fully on core exam courses.' 
          },
          { 
            value: 'PRIORITIZE_TASK', 
            label: 'Focus Fully on This Paper', 
            description: 'Mark this subject as Critical, committing all study blocks to mastering it.' 
          }
        ];
      case 'developer':
        return [
          { 
            value: 'SKIP_TASK', 
            label: 'Skip Backlog Ticket', 
            description: 'Deprioritize and skip this ticket from the active sprint. Reallocates developer hours but misses delivery.' 
          },
          { 
            value: 'DELAY_1_DAY', 
            label: 'Delay Release by 1 Day', 
            description: 'Push code freeze back by 24 hours. Gives debugging runway but compresses CI/CD and QA testing window.' 
          },
          { 
            value: 'DELAY_3_DAYS', 
            label: 'Delay Release by 3 Days', 
            description: 'Delay target build freeze by 72 hours. Risks missing the deployment train and client SLA targets.' 
          },
          { 
            value: 'REDUCE_EFFORT', 
            label: 'Reduce Scope / Ship MVP', 
            description: 'Halve developer effort hours by building a strict MVP, compromising on refactoring and testing.' 
          },
          { 
            value: 'ADD_2_HOURS', 
            label: 'Sprint +2 Dev Hours Daily', 
            description: 'Increase developer overtime by 2 hours daily. Accelerates code completion but boosts developer burnout.' 
          },
          { 
            value: 'DROP_LOW_PRIORITY', 
            label: 'Drop Secondary Dev Tickets', 
            description: 'Remove low-importance tickets from the sprint backlog to preserve core feature delivery.' 
          },
          { 
            value: 'PRIORITIZE_TASK', 
            label: 'Assign Elite Dev Priority', 
            description: 'Elevate this ticket to Blocker/Critical status, redirecting all developer bandwidth here.' 
          }
        ];
      case 'job_seeker':
        return [
          { 
            value: 'SKIP_TASK', 
            label: 'Skip Application / Lead', 
            description: 'Abandon this job application. Reallocates preparation time but closes this career path.' 
          },
          { 
            value: 'DELAY_1_DAY', 
            label: 'Delay Application by 1 Day', 
            description: 'Postpone your application submission by 24 hours. Gives polish runway but reduces early-applicant advantage.' 
          },
          { 
            value: 'DELAY_3_DAYS', 
            label: 'Delay Interview Prep by 3 Days', 
            description: 'Delay interview preparation by 72 hours. Postpones stress but compresses final rehearsal runway.' 
          },
          { 
            value: 'REDUCE_EFFORT', 
            label: 'Use Standard Resume (No Tailor)', 
            description: 'Apply using a generic resume without custom tailoring, saving time but reducing response rates.' 
          },
          { 
            value: 'ADD_2_HOURS', 
            label: 'Add +2 Career Focus Hours Daily', 
            description: 'Dedicate 2 extra hours daily to portfolio construction and outreach. Boosts pipeline but causes job-hunt fatigue.' 
          },
          { 
            value: 'DROP_LOW_PRIORITY', 
            label: 'Drop Low-Yield Applications', 
            description: 'Erase weak job leads from your active pipelines to concentrate fully on elite placements.' 
          },
          { 
            value: 'PRIORITIZE_TASK', 
            label: 'Prioritize This Dream Role', 
            description: 'Mark this application as Critical, focusing all networking and interview preparation here.' 
          }
        ];
      case 'professional':
      default:
        return [
          { 
            value: 'SKIP_TASK', 
            label: 'Skip Deliverable', 
            description: 'Cancel or archive this milestone deliverable. Frees up immediate FTE capacity but results in missed objectives.' 
          },
          { 
            value: 'DELAY_1_DAY', 
            label: 'Delay SLA Deadline by 1 Day', 
            description: 'Postpone target delivery by 24 hours. Relieves active schedule but reduces delivery buffers.' 
          },
          { 
            value: 'DELAY_3_DAYS', 
            label: 'Delay SLA Deadline by 3 Days', 
            description: 'Defer target milestone by 72 hours. Risks breaching client expectations and downstream delays.' 
          },
          { 
            value: 'REDUCE_EFFORT', 
            label: 'Scope Compression / Limit Deliverables', 
            description: 'Reduce estimated work hours by half. Meets immediate timeline at the expense of quality and polish.' 
          },
          { 
            value: 'ADD_2_HOURS', 
            label: 'Add +2 Executive Overtime Hours Daily', 
            description: 'Force 2 extra hours of operational focus daily. Increases project throughput but elevates burnout index.' 
          },
          { 
            value: 'DROP_LOW_PRIORITY', 
            label: 'Prune Minor Admin Objectives', 
            description: 'Remove low-impact admin tasks to focus maximum corporate capacity on key results.' 
          },
          { 
            value: 'PRIORITIZE_TASK', 
            label: 'Elevate to Top Business Priority', 
            description: 'Assign Critical status to this deliverable, allocating all immediate project bandwidth to it.' 
          }
        ];
    }
  };

  const labels = getSimulatorLabels(mockRole);
  const scenarioOptions = getScenarioOptions(mockRole);

  const handleRunSimulation = async () => {
    // Some scenarios require a task context
    const needsTask = ['SKIP_TASK', 'DELAY_1_DAY', 'DELAY_3_DAYS', 'REDUCE_EFFORT', 'PRIORITIZE_TASK'].includes(scenario);
    if (needsTask && !selectedTaskId) {
      const taskLabel = mockRole === 'student' ? 'milestone' : mockRole === 'developer' ? 'ticket' : mockRole === 'job_seeker' ? 'application' : 'objective';
      setError(`Please choose a target ${taskLabel} to execute this scenario simulation.`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/ai/simulate?role=${mockRole || 'developer'}`, {
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
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">{labels.predictorPanel}</span>
          </div>
          <h2 className="text-2xl font-medium font-serif italic text-white mt-1">{labels.title}</h2>
          <p className="text-xs text-slate-400 mt-1">
            {labels.description}
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
                {labels.step1}
              </label>
              {pendingTasks.length === 0 ? (
                <div className="p-3 bg-[#131313] rounded border border-[#1A1A1A] text-center text-xs text-gray-500 font-sans">
                  {MODE_LANGUAGES[(mockRole || 'professional') as 'student' | 'developer' | 'job_seeker' | 'professional']?.emptyStateMessages.noTasks || 'No active pending deliverables in SLA registry.'}
                </div>
              ) : (
                <select
                  value={selectedTaskId}
                  onChange={(e) => setSelectedTaskId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#131313] border border-[#1A1A1A] rounded text-xs text-white focus:outline-none focus:border-indigo-500 transition [color-scheme:dark]"
                >
                  <option value="">{labels.chooseTarget}</option>
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
                    <span className="font-mono text-[10px] uppercase">{labels.originalCost}:</span>
                    <span className="font-semibold text-white">{activeTask.estimatedEffort} {mockRole === 'student' ? 'study hours' : mockRole === 'job_seeker' ? 'preparation hours' : 'cognitive hours'}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span className="font-mono text-[10px] uppercase">{labels.constraintDeadline}:</span>
                    <span className="font-semibold text-white">{new Date(activeTask.deadline).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span className="font-mono text-[10px] uppercase">{labels.baselineUrgency}:</span>
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
                {labels.step2}
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
                  {labels.executingButton}
                </>
              ) : (
                <>
                  <Activity className="h-3.5 w-3.5" />
                  {labels.executeButton}
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
                <div className="flex flex-col gap-2 border-b border-[#1A1A1A] pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Outcome Model Metrics</span>
                      <h3 className="text-base font-semibold text-white mt-0.5">SIMULATED WORKSPACE STATE</h3>
                    </div>

                    <div className="flex items-center gap-2 bg-[#121212] px-3 py-1 rounded-full border border-[#222]">
                      <span className="text-[9px] font-mono text-gray-500 uppercase">AI CONFIDENCE:</span>
                      <span className="text-xs font-bold font-mono text-emerald-400">{result.confidenceScore}%</span>
                    </div>
                  </div>

                  {/* Expandable Confidence Drivers */}
                  <div className="mt-1" id="confidence-drivers-wrapper">
                    <button 
                      onClick={() => setShowConfidenceDrivers(!showConfidenceDrivers)}
                      className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1 focus:outline-none"
                    >
                      <span className="text-[8px]">{showConfidenceDrivers ? '▼' : '►'}</span>
                      <span>Confidence Drivers</span>
                    </button>
                    <AnimatePresence>
                      {showConfidenceDrivers && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 p-3 bg-[#111] border border-[#222] rounded-lg text-left overflow-hidden space-y-2"
                        >
                          <div className="text-[9px] font-mono uppercase text-gray-500 tracking-wider font-semibold">Contributing Factors</div>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px] text-[#BBBBBB] font-mono">
                            {getConfidenceDrivers(mockRole).map((driver, index) => (
                              <li key={index} className="flex items-center gap-1.5">• {driver}</li>
                            ))}
                          </ul>
                          <p className="text-[10px] text-gray-500 italic leading-relaxed font-sans pt-1 border-t border-[#1C1C1C]">
                            "The confidence score reflects the quality and certainty of the underlying decision model rather than the likelihood of success."
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                      <div className="flex items-center gap-1.5 relative group">
                        <Gauge className="h-4 w-4 text-indigo-400" />
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">{labels.workspaceSuccess}</span>
                        
                        {/* Interactive Tooltip Icon */}
                        <div className="relative inline-block">
                          <HelpCircle className="h-3.5 w-3.5 text-indigo-400/80 hover:text-indigo-400 cursor-help transition" />
                          
                          {/* Tooltip Hover Overlay */}
                          <div className="absolute bottom-6 -left-12 sm:-left-6 w-64 bg-[#0A0A0A] border border-indigo-500/20 rounded-lg p-3 shadow-[0_4px_24px_rgba(0,0,0,0.95)] z-50 text-left space-y-1.5 pointer-events-none invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                            <div className="text-[10px] font-mono uppercase text-indigo-400 tracking-wider font-semibold">How {labels.workspaceSuccess} is Calculated</div>
                            <div className="text-[10px] text-gray-300 space-y-1 font-sans">
                              <p className="font-semibold text-gray-400">{labels.workspaceSuccess} combines:</p>
                              <ul className="list-disc list-inside space-y-0.5 text-gray-400 text-[9px]">
                                <li>Remaining execution capacity</li>
                                <li>Deadline pressure</li>
                                <li>Task completion probability</li>
                                <li>Scheduling conflicts</li>
                                <li>Overall workload balance</li>
                              </ul>
                            </div>
                            <p className="text-[9px] text-gray-500 italic leading-normal pt-1 border-t border-[#1C1C1C] font-sans">
                              "Higher values indicate a healthier and more achievable execution plan."
                            </p>
                          </div>
                        </div>
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
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">{labels.objectiveSuccess}</span>
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
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">{labels.failureRisk}</span>
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

                {/* MINI TIMELINE IMPACT VISUALIZATION */}
                <div className="bg-[#111] p-5 rounded-xl border border-[#1A1A1A] space-y-3" id="timeline-impact-viz">
                  <div className="flex items-center justify-between border-b border-[#1C1C1C] pb-2">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-semibold">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Timeline Impact & Workload Distribution</span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase">Load Analysis</span>
                  </div>

                  <div className="space-y-3 font-mono">
                    {/* Before Simulation */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-gray-400">
                        <span>Before Simulation</span>
                        <span className="text-gray-500">[{result.currentFailureRisk}% Load Pressure]</span>
                      </div>
                      <div className={`text-sm tracking-tight break-all select-none ${
                        result.currentFailureRisk >= 75 ? 'text-rose-500' :
                        result.currentFailureRisk >= 40 ? 'text-amber-500' : 'text-emerald-500'
                      }`}>
                        {'█'.repeat(Math.max(1, Math.round(result.currentFailureRisk / 4)))}
                        <span className="text-gray-800">{'█'.repeat(Math.max(0, 25 - Math.round(result.currentFailureRisk / 4)))}</span>
                      </div>
                    </div>

                    {/* After Simulation */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-gray-400">
                        <span>After Simulation</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-white">[{result.projectedFailureRisk}% Load Pressure]</span>
                          {riskDiff !== 0 && (
                            <span className={`text-[10px] ${riskDiff < 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              ({riskDiff < 0 ? '▼ Relief' : '▲ Compression'})
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`text-sm tracking-tight break-all select-none ${
                        result.projectedFailureRisk >= 75 ? 'text-rose-500' :
                        result.projectedFailureRisk >= 40 ? 'text-emerald-500' : 'text-emerald-500'
                      }`}>
                        {'█'.repeat(Math.max(1, Math.round(result.projectedFailureRisk / 4)))}
                        <span className="text-gray-800">{'█'.repeat(Math.max(0, 25 - Math.round(result.projectedFailureRisk / 4)))}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#0B0B0B] rounded border border-[#1A1A1A] text-[11px] text-slate-400 leading-relaxed font-sans flex items-start gap-2">
                    <span className="text-indigo-400 font-mono mt-0.5">•</span>
                    <span>
                      {riskDiff < 0 
                        ? `The intervention successfully relieves timeline bottlenecks, reducing operational failure risk by ${Math.abs(riskDiff)}%. This provides immediate cognitive breathing room.`
                        : riskDiff > 0 
                          ? `This action compresses outstanding milestones, increasing schedule congestion and failure risk by ${riskDiff}%. Prepare for cascading bottleneck stress.`
                          : `Timeline parameters remain stable with no significant change in active load concentration indices.`
                      }
                    </span>
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
                    {labels.awaitingInput}
                  </h4>
                  <p className="text-[11px] text-slate-500 italic max-w-sm mx-auto mt-1 leading-relaxed">
                    {labels.awaitingDesc}
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
