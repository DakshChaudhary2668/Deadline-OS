import React, { useState } from 'react';
import { Task } from '../types';
import { calculateStrategicDecision } from '../utils/strategicEngine';
import { 
  Brain, 
  Cpu, 
  Gauge, 
  Clock, 
  TrendingUp, 
  Compass, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  RefreshCw, 
  AlertTriangle, 
  Workflow, 
  Layers, 
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { MODE_LANGUAGES } from '../utils/modeLanguage';
import { WORKSPACE_CATEGORIES } from '../utils/categories';

type RoleType = 'student' | 'developer' | 'job_seeker' | 'professional';

const getStrategicLabels = (role: RoleType) => {
  const config = MODE_LANGUAGES[role] || MODE_LANGUAGES.professional;
  const labels = config.strategicLabels;
  
  return {
    headerTitle: labels.headerTitle,
    headerSubtitle: labels.headerSubtitle,
    newTaskBtn: labels.newTaskBtn,
    workspacePressure: labels.workspacePressure,
    workspaceHealth: labels.workspaceHealth,
    tasksImproved: labels.tasksImproved,
    engineTag: labels.engineTag,
    statusLabel: labels.statusLabel,
    aiBriefHeader: labels.aiBriefHeader,
    whyHeader: labels.whyHeader,
    benefitsHeader: labels.benefitsHeader,
    considerationsHeader: labels.considerationsHeader,
    nextActionHeader: labels.nextActionHeader,
    systemRole: config.systemRole,
    noTasks: config.emptyStateMessages.noTasks,
    adjustFilters: config.emptyStateMessages.adjustFilters,
    taskPlural: config.strategicDynamic.taskPlural,
    taskSingular: config.strategicDynamic.taskSingular,
    slaLabel: config.strategicDynamic.slaLabel,
    overdueLabel: config.strategicDynamic.overdueLabel,
    slaBreachedLabel: config.strategicDynamic.slaBreachedLabel,
  };
};

const getSecondaryStrategicLabels = (role: RoleType) => {
  const config = MODE_LANGUAGES[role] || MODE_LANGUAGES.professional;
  return config.strategicDynamic;
};

interface StrategicDecisionsProps {
  key?: any;
  tasks: Task[];
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onAnalyzePriority: (id: string) => Promise<void>;
  analyzingId: string | null;
  onOpenForm: () => void;
  mockRole?: string;
  briefing?: any;
}

export function StrategicDecisions({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  onAnalyzePriority,
  analyzingId,
  onOpenForm,
  mockRole = 'professional',
  briefing
}: StrategicDecisionsProps) {
  const labels = getStrategicLabels(mockRole as RoleType);
  const secondaryLabels = getSecondaryStrategicLabels(mockRole as RoleType);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [decisionFilter, setDecisionFilter] = useState<string>('ALL');
  const [localAnalyzingId, setLocalAnalyzingId] = useState<string | null>(null);

  const categoriesList = WORKSPACE_CATEGORIES[mockRole as RoleType] || WORKSPACE_CATEGORIES.professional;

  const roleTasks = React.useMemo(() => {
    return tasks.filter(t => t.profile === mockRole);
  }, [tasks, mockRole]);

  // Compute active decisions and scores for all tasks (dynamic fallback ensures zero blank fields)
  const enrichedTasks = roleTasks.map(task => {
    const decision = task.strategicDecision || calculateStrategicDecision(task, roleTasks, mockRole);
    return {
      ...task,
      computedDecision: decision
    };
  });

  // Filter logic
  const filteredTasks = enrichedTasks.filter(task => {
    const catMatch = categoryFilter === 'ALL' || task.category === categoryFilter;
    const decMatch = decisionFilter === 'ALL' || task.computedDecision.decisionType === decisionFilter;
    return catMatch && decMatch;
  });

  // Global aggregate metrics for the Header Panel
  const pendingTasks = enrichedTasks.filter(t => t.status !== 'completed');
  const totalPendingEffort = pendingTasks.reduce((sum, t) => sum + t.estimatedEffort, 0);
  const decisionCounts = pendingTasks.reduce((acc: Record<string, number>, t) => {
    const dType = t.computedDecision.decisionType;
    acc[dType] = (acc[dType] || 0) + 1;
    return acc;
  }, {});

  const tasksOptimizedRate = pendingTasks.length > 0
    ? Math.round(((decisionCounts['DEFER'] || 0) + (decisionCounts['DROP'] || 0) + (decisionCounts['SCOPE REDUCE'] || 0)) / pendingTasks.length * 100)
    : 0;

  const averageAIScore = pendingTasks.length > 0
    ? Math.round(pendingTasks.reduce((sum, t) => sum + (t.computedDecision.executiveScore || 0), 0) / pendingTasks.length)
    : 0;

  const handleRecalibrate = async (taskId: string) => {
    setLocalAnalyzingId(taskId);
    try {
      await onAnalyzePriority(taskId);
    } catch (e) {
      console.error(e);
    } finally {
      setLocalAnalyzingId(null);
    }
  };

  const toggleExpand = (taskId: string) => {
    if (expandedTaskId === taskId) {
      setExpandedTaskId(null);
    } else {
      setExpandedTaskId(taskId);
    }
  };

  // Helper to get recommendation colors
  const getDecisionStyles = (type: string) => {
    switch (type) {
      case 'ACCELERATE':
        return 'bg-red-950/40 text-red-400 border-red-800/60';
      case 'FOCUS':
        return 'bg-amber-950/40 text-amber-400 border-amber-800/60';
      case 'SCOPE REDUCE':
        return 'bg-orange-950/40 text-orange-400 border-orange-800/60';
      case 'CONTINUE':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60';
      case 'DELEGATE':
        return 'bg-blue-950/40 text-blue-400 border-blue-800/60';
      case 'REPLAN':
        return 'bg-indigo-950/40 text-indigo-400 border-indigo-800/60';
      case 'REVIEW':
        return 'bg-purple-950/40 text-purple-400 border-purple-800/60';
      case 'DEFER':
        return 'bg-zinc-800/40 text-zinc-400 border-zinc-700/60';
      case 'DROP':
        return 'bg-rose-950/40 text-rose-500 border-rose-900/60';
      case 'WAIT':
        return 'bg-teal-950/40 text-teal-400 border-teal-800/60';
      case 'BLOCKED':
        return 'bg-red-950/40 text-red-500 border-red-900/60';
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-red-400';
    if (score >= 70) return 'text-amber-400';
    if (score >= 45) return 'text-emerald-400';
    return 'text-zinc-400';
  };

  const getTaskStatusLabel = (score: number) => {
    if (score >= 85) return secondaryLabels.taskStatusLabels?.urgent || 'URGENT ACTION REQUIRED';
    if (score >= 70) return secondaryLabels.taskStatusLabels?.high || 'HIGH VALUE';
    if (score >= 45) return secondaryLabels.taskStatusLabels?.stable || 'STABLE';
    return secondaryLabels.taskStatusLabels?.low || 'LOW PRIORITY';
  };

  const getRiskLabelAndBadge = (probability: number) => {
    const riskTerms = (MODE_LANGUAGES[mockRole as keyof typeof MODE_LANGUAGES] || MODE_LANGUAGES.professional).riskTerminology;
    if (probability >= 75) {
      return { label: riskTerms.critical, text: '🔴 ' + riskTerms.critical, color: 'text-rose-450 bg-rose-950/45 border-rose-900/40' };
    }
    if (probability >= 50) {
      return { label: riskTerms.high, text: '🟠 ' + riskTerms.high, color: 'text-orange-400 bg-orange-950/45 border-orange-900/40' };
    }
    if (probability >= 30) {
      return { label: riskTerms.moderate, text: '🟡 ' + riskTerms.moderate, color: 'text-amber-400 bg-amber-950/45 border-amber-900/40' };
    }
    return { label: riskTerms.low, text: '🟢 ' + riskTerms.low, color: 'text-emerald-400 bg-emerald-950/45 border-emerald-900/40' };
  };

  const getExecutiveScoreLabel = (score: number) => {
    if (score >= 85) return secondaryLabels.executiveScoreLabels?.high || 'High Priority';
    if (score >= 70) return secondaryLabels.executiveScoreLabels?.moderate || 'Moderate Confidence';
    return secondaryLabels.executiveScoreLabels?.low || 'Executive Readiness';
  };

  return (
    <div id="strategic-decisions-root" className="space-y-6 pb-12 text-zinc-100">
      {/* 1. Header Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>AI {labels.systemRole} Suite</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mt-1">{labels.headerTitle}</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {labels.headerSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenForm}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded-lg text-sm text-zinc-200 transition-colors cursor-pointer"
          >
            <span>+ {labels.newTaskBtn}</span>
          </button>
        </div>
      </div>

      {/* 2. System Status & Evaluation Metrics Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-zinc-950 border border-zinc-800 rounded-lg p-5">
        {/* Metric 1: AI Coverage */}
        <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800 pb-4 lg:pb-0 lg:pr-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">{secondaryLabels.coverageTitle || 'AI Coverage'}</span>
            </div>
            <p className="text-xl font-bold text-white mt-3 font-mono">{roleTasks.length} / {roleTasks.length} {labels.taskPlural} Analyzed</p>
            <p className="text-xs text-zinc-500 mt-1">{secondaryLabels.coverageDesc || 'All items evaluated by engine'}</p>
          </div>
          <div className="mt-4 bg-zinc-900/60 p-2 border border-zinc-800/50 rounded text-[10px] font-mono text-zinc-400">
            {labels.engineTag}
          </div>
        </div>

        {/* Metric 2: Workspace Pressure */}
        <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800 pb-4 lg:pb-0 lg:px-4">
          <div>
            <span className="text-xs text-zinc-400 font-mono uppercase">{labels.workspacePressure}</span>
            <div className="flex items-baseline gap-2 mt-3">
              <p className="text-2xl font-bold text-zinc-100 font-mono">{totalPendingEffort}h</p>
              <span className="text-xs text-zinc-500">{secondaryLabels.workloadSubtitle || 'Est. effort'}</span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">{secondaryLabels.workloadDescPrefix || 'Across'} {pendingTasks.length} {secondaryLabels.workloadDescSuffix || 'pending items'}</p>
          </div>
          <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-500" 
              style={{ width: `${Math.min(100, Math.round((totalPendingEffort / 40) * 100))}%` }}
            ></div>
          </div>
        </div>

        {/* Metric 3: Tasks Improved */}
        <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800 pb-4 lg:pb-0 lg:px-4">
          <div>
            <span className="text-xs text-zinc-400 font-mono uppercase">{labels.tasksImproved}</span>
            <p className="text-2xl font-bold text-amber-400 mt-3 font-mono">{tasksOptimizedRate}%</p>
            <p className="text-xs text-zinc-500 mt-1">{secondaryLabels.optimizedDesc || 'Workload reduced via optimization'}</p>
          </div>
          <p className="text-[10px] text-zinc-500 font-mono mt-4 uppercase">
            Optimized: {((decisionCounts['DEFER'] || 0) + (decisionCounts['DROP'] || 0) + (decisionCounts['SCOPE REDUCE'] || 0))} {labels.taskPlural.toUpperCase()}
          </p>
        </div>

        {/* Metric 4: Workspace Health */}
        <div className="flex flex-col justify-between lg:pl-4">
          <div>
            <span className="text-xs text-zinc-400 font-mono uppercase">{labels.workspaceHealth}</span>
            <p className="text-2xl font-bold text-white mt-3 font-mono">
              {briefing?.executiveScore ?? briefing?.codebaseStability ?? averageAIScore}<span className="text-xs text-zinc-500 font-normal font-sans">/100</span>
            </p>
            <p className="text-xs text-zinc-500 mt-1">{secondaryLabels.healthDesc || 'Average strategic readiness'}</p>
          </div>
          <div className="flex gap-2 items-center mt-4">
            <Gauge className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-mono text-emerald-400 uppercase font-semibold">
              {briefing?.workloadStressLevel ? briefing.workloadStressLevel.toUpperCase() : (secondaryLabels.statusBadgeLabel || 'OPTIMAL')}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Filtering & Sorting Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-zinc-900/60 p-3 border border-zinc-800 rounded-lg">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-400 font-mono mr-1">{secondaryLabels.categoryFilterLabel || 'FILTER:'}</span>
          {['ALL', ...categoriesList].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                categoryFilter === cat 
                  ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400' 
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-mono whitespace-nowrap">{secondaryLabels.recommendationFilterLabel || 'ACTION:'}</span>
          <select
            value={decisionFilter}
            onChange={(e) => setDecisionFilter(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 text-zinc-300 px-3 py-1 text-xs rounded font-mono focus:border-emerald-500 focus:outline-none cursor-pointer"
          >
            <option value="ALL">{secondaryLabels.allRecommendationsOption || 'ALL'}</option>
            <option value="ACCELERATE">ACCELERATE</option>
            <option value="FOCUS">FOCUS</option>
            <option value="CONTINUE">CONTINUE</option>
            <option value="DELEGATE">DELEGATE</option>
            <option value="DEFER">DEFER</option>
            <option value="DROP">DROP</option>
            <option value="SCOPE REDUCE">SCOPE REDUCE</option>
            <option value="WAIT">WAIT</option>
            <option value="REVIEW">REVIEW</option>
            <option value="REPLAN">REPLAN</option>
            <option value="BLOCKED">BLOCKED</option>
          </select>
        </div>
      </div>

      {/* 4. Main Executive Grid */}
      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/30 border border-zinc-800 border-dashed rounded-lg text-center">
          <Brain className="w-10 h-10 text-zinc-600 mb-3 animate-pulse" />
          <h3 className="text-sm font-semibold text-zinc-300">{labels.noTasks}</h3>
          <p className="text-xs text-zinc-500 mt-1">{labels.adjustFilters}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map(task => {
            const isExpanded = expandedTaskId === task.id;
            const isAnalyzing = analyzingId === task.id || localAnalyzingId === task.id;
            const d = task.computedDecision;
            const daysRemaining = (new Date(task.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24);

            return (
              <div 
                key={task.id} 
                className={`bg-zinc-950 border transition-all ${
                  isExpanded ? 'border-zinc-700 shadow-lg' : 'border-zinc-800 hover:border-zinc-700'
                } rounded-lg overflow-hidden`}
              >
                {/* Collapsed Header Bar */}
                <div 
                  onClick={() => toggleExpand(task.id)}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    {/* Completion Status Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleComplete(task);
                      }}
                      className="mt-1 transition-transform active:scale-90"
                    >
                      <CheckCircle 
                        className={`w-5 h-5 ${
                          task.status === 'completed' 
                            ? 'text-emerald-400 fill-emerald-400/20' 
                            : 'text-zinc-600 hover:text-zinc-400'
                        }`} 
                      />
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-zinc-400 uppercase">
                          {task.category}
                        </span>
                        {task.status === 'overdue' && (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-red-950/40 border border-red-900/60 text-red-400 rounded">
                            {labels.overdueLabel}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-zinc-500">
                          {task.id}
                        </span>
                      </div>
                      <h3 className={`text-base font-semibold mt-1.5 truncate ${
                        task.status === 'completed' ? 'line-through text-zinc-500' : 'text-zinc-100'
                      }`}>
                        {task.title}
                      </h3>
                    </div>
                  </div>

                  {/* Core Strategic Indicators (Aligned Right) */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 shrink-0 font-mono">
                    {/* Urgency Indicators */}
                    <div className="hidden sm:block text-right">
                      <p className="text-[10px] text-zinc-500 uppercase">{secondaryLabels.deadlineRiskLabel || 'DEADLINE RISK'}</p>
                      <p className="text-xs text-zinc-300 mt-0.5 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        <span>
                          {daysRemaining <= 0 
                            ? labels.slaBreachedLabel 
                            : `${daysRemaining.toFixed(1)} days runway`}
                        </span>
                      </p>
                    </div>

                    {/* AI Score */}
                    <div className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-800 px-3 py-1.5 rounded min-w-[125px]">
                      <div className="text-right flex-1">
                        <p className="text-[9px] text-zinc-500 uppercase">{secondaryLabels.executiveScoreLabel || 'EXECUTIVE SCORE'}</p>
                        <p className={`text-xs font-bold ${getScoreColor(d.executiveScore || 0)}`}>
                          {d.executiveScore || 0}/100
                        </p>
                        <p className="text-[8px] text-zinc-400 tracking-tight leading-tight mt-0.5">
                          {getExecutiveScoreLabel(d.executiveScore || 0)}
                        </p>
                      </div>
                      <div className="w-1.5 h-8 rounded bg-zinc-800 relative overflow-hidden shrink-0">
                        <div 
                          className={`absolute bottom-0 left-0 right-0 rounded transition-all ${
                            (d.executiveScore || 0) >= 85 ? 'bg-red-400' :
                            (d.executiveScore || 0) >= 70 ? 'bg-amber-400' : 'bg-emerald-400'
                          }`}
                          style={{ height: `${d.executiveScore || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* AI Recommendation Badge */}
                    <div className={`px-3 py-1.5 border rounded-lg text-xs font-bold text-center uppercase tracking-wider ${getDecisionStyles(d.decisionType)}`}>
                      {d.decisionType}
                    </div>

                    {/* Expand Trigger Icon */}
                    <div className="text-zinc-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Extended Expandable Intelligence Panel */}
                {isExpanded && (
                  <div className="border-t border-zinc-800 bg-zinc-950/60 p-5 space-y-4">
                    {/* Task Status Alert */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 rounded p-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-emerald-400" />
                        <span className="text-zinc-400 font-mono">{labels.taskSingular.toUpperCase()} STATUS:</span>
                        <span className={`font-mono font-bold ${getScoreColor(d.executiveScore || 0)}`}>
                          {getTaskStatusLabel(d.executiveScore || 0)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
                        <span className="text-zinc-400">Risk:</span>
                        <span className="text-zinc-300 font-bold">
                          {getRiskLabelAndBadge(task.failureForecast?.failureProbability ?? task.riskScore ?? 50).text} • {task.failureForecast?.failureProbability ?? task.riskScore ?? 50}%
                        </span>
                      </div>
                    </div>

                    {/* AI Brief */}
                    <div>
                      <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-semibold">{labels.aiBriefHeader}</h4>
                      <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
                        {d.cosSummary || d.reasoning}
                      </p>
                    </div>

                    {/* Why */}
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold">{labels.whyHeader}</h4>
                      <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
                        {d.whyThisDecision || d.reasoning}
                      </p>
                    </div>

                    {/* Benefits & Considerations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      <div>
                        <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-semibold">{labels.benefitsHeader}</h4>
                        <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
                          {d.expectedBenefit || "Allows focusing on more critical work items."}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold">{labels.considerationsHeader}</h4>
                        <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
                          {d.tradeoffSummary || d.opportunityCost || "No major downsides."}
                        </p>
                      </div>
                    </div>

                    {/* Next Action & Risk Level */}
                    <div className="border-t border-zinc-900 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold">{labels.nextActionHeader}</h4>
                        <p className="text-sm text-zinc-200 mt-1 font-medium">
                          {d.recommendedAction}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRecalibrate(task.id);
                          }}
                          disabled={isAnalyzing}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-mono rounded-lg transition-all cursor-pointer disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3 h-3 ${isAnalyzing ? 'animate-spin' : ''}`} />
                          <span>{isAnalyzing ? 'RECALIBRATING...' : 'RECALIBRATE'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
