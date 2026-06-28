import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Trash2, 
  Edit3, 
  Brain, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Zap, 
  AlertTriangle, 
  Calendar,
  Sparkles,
  RefreshCw,
  Plus
} from 'lucide-react';
import { Task } from '../types';
import { MODE_LANGUAGES } from '../utils/modeLanguage';

type RoleType = 'student' | 'developer' | 'job_seeker' | 'professional';

const getTaskListLabels = (role: RoleType) => {
  const config = MODE_LANGUAGES[role] || MODE_LANGUAGES.professional;
  const labels = config.taskListLabels;
  
  return {
    searchPlaceholder: labels.searchPlaceholder,
    addTaskLabel: labels.addTaskLabel,
    analyzeBtnLabel: labels.analyzeBtnLabel,
    analyzingBtnLabel: labels.analyzingBtnLabel,
    recoveryBadge: labels.recoveryBadge,
    aiAssessmentHeader: labels.aiAssessmentHeader,
    analyzePromptText: labels.analyzePromptText,
    priorityLabel: labels.priorityLabel,
    riskScoreLabel: labels.riskScoreLabel,
    failRiskLabel: labels.failRiskLabel,
    aiRecommendationTitle: labels.aiRecommendationTitle,
    aiRiskAssessmentTitle: labels.aiRiskAssessmentTitle,
    emptyStateNoTasks: config.emptyStateMessages.noTasks,
    emptyStateAdjustFilters: config.emptyStateMessages.adjustFilters,
  };
};

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onAnalyzePriority: (id: string) => void;
  analyzingId: string | null;
  onOpenForm: () => void;
  mockRole?: string;
}

export default function TaskList({ 
  tasks, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  onAnalyzePriority, 
  analyzingId,
  onOpenForm,
  mockRole = 'professional'
}: TaskListProps) {
  const labels = getTaskListLabels(mockRole as RoleType);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'overdue' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const getCategoryLabel = (cat: string) => {
    switch (mockRole) {
      case 'student':
        if (cat === 'Work') return '🏫 Curriculum';
        if (cat === 'Study') return '📚 Study Blocks';
        if (cat === 'Career') return '🎖️ Academic Growth';
        return '👤 Personal Tasks';
      case 'developer':
        if (cat === 'Work') return '💻 Sprint Tickets';
        if (cat === 'Study') return '📚 Tech Debt / Refactoring';
        if (cat === 'Career') return '🎖️ Professional Skillup';
        return '👤 Individual Tasks';
      case 'job_seeker':
        if (cat === 'Work') return '💼 Job Applications';
        if (cat === 'Study') return '📚 Interview Prep';
        if (cat === 'Career') return '🎖️ Networking Outreaches';
        return '👤 Personal Routine';
      default:
        if (cat === 'Work') return '💼 Operations';
        if (cat === 'Study') return '📚 Skill Acquisition';
        if (cat === 'Career') return '🎖️ Strategic Career';
        return '👤 Personal Habits';
    }
  };

  const getRiskLabelAndBadge = (probability: number) => {
    if (probability >= 75) {
      return { label: 'Critical', text: '🔴 Critical', color: 'text-rose-450 bg-rose-950/40 border-rose-900/30' };
    }
    if (probability >= 50) {
      return { label: 'High', text: '🟠 High', color: 'text-orange-400 bg-orange-950/40 border-orange-900/30' };
    }
    if (probability >= 30) {
      return { label: 'Moderate', text: '🟡 Moderate', color: 'text-amber-400 bg-amber-950/40 border-amber-900/30' };
    }
    return { label: 'Low', text: '🟢 Low', color: 'text-emerald-450 bg-emerald-950/40 border-emerald-900/30' };
  };

  // Relative deadline calculator
  const getDeadlineText = (deadlineStr: string, status: Task['status']) => {
    const d = new Date(deadlineStr);
    const now = new Date();
    const diffMs = d.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHrs / 24);

    if (status === 'completed') {
      return { text: 'Completed', color: 'text-emerald-450 bg-emerald-500/10 border-emerald-500/20' };
    }

    if (diffMs < 0) {
      const overdueDays = Math.abs(diffDays);
      const overdueHrs = Math.abs(diffHrs % 24);
      return { 
        text: `OVERDUE (by ${overdueDays > 0 ? `${overdueDays}d` : ''} ${overdueHrs}h)`, 
        color: 'text-rose-500 bg-rose-500/10 border-rose-500/25 animate-pulse font-bold' 
      };
    }

    if (diffHrs < 12) {
      return { text: `CRITICAL TIMER: ${diffHrs}h remaining`, color: 'text-rose-450 bg-rose-500/5 border-rose-500/15 font-semibold' };
    }
    if (diffHrs < 24) {
      return { text: `URGENT: ${diffHrs}h left`, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    }
    if (diffDays === 1) {
      return { text: `Due tomorrow (${diffHrs % 24}h remain)`, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' };
    }
    return { text: `Due in ${diffDays} days`, color: 'text-slate-400 bg-slate-800/60 border-slate-700/50' };
  };

  const getImportanceBadge = (importance: Task['importance']) => {
    switch (importance) {
      case 'Low': return 'bg-slate-800/60 text-slate-400 border-slate-700/50';
      case 'Medium': return 'bg-indigo-950/40 text-indigo-400 border-indigo-500/15';
      case 'High': return 'bg-amber-950/40 text-amber-500 border-amber-500/15';
      case 'Critical': return 'bg-rose-950/50 text-rose-400 border-rose-500/25 font-bold';
    }
  };

  const getPriorityColor = (p?: number) => {
    if (!p) return 'text-slate-500';
    if (p >= 80) return 'text-rose-450';
    if (p >= 50) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getRiskColor = (r?: number) => {
    if (!r) return 'text-slate-500';
    if (r >= 70) return 'text-rose-500';
    if (r >= 40) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getTabLabel = (tab: 'all' | 'pending' | 'overdue' | 'completed') => {
    switch (mockRole) {
      case 'student':
        if (tab === 'all') return 'All Milestones';
        if (tab === 'pending') return 'Active Study';
        if (tab === 'overdue') return 'Overdue Gates';
        return 'Completed Topics';
      case 'developer':
        if (tab === 'all') return 'All Tickets';
        if (tab === 'pending') return 'Open Issues';
        if (tab === 'overdue') return 'Missed Sprints';
        return 'Closed/Merged';
      case 'job_seeker':
        if (tab === 'all') return 'All Pipeline';
        if (tab === 'pending') return 'Active Loops';
        if (tab === 'overdue') return 'Missed Followups';
        return 'Offers Secured';
      default:
        if (tab === 'all') return 'All Deliverables';
        if (tab === 'pending') return 'Pending Actions';
        if (tab === 'overdue') return 'SLA Overdue';
        return 'Done/Archived';
    }
  };

  const getAllCategoriesLabel = () => {
    switch (mockRole) {
      case 'student': return 'All Syllabus Categories';
      case 'developer': return 'All Repository Scope';
      case 'job_seeker': return 'All Pipeline Goals';
      default: return 'All Operational Domains';
    }
  };

  const getSectionLabels = () => {
    switch (mockRole) {
      case 'student':
        return {
          benefits: 'Strategic Impact',
          considerations: 'Opportunity Cost',
          why: 'Syllabus Risk',
          nextAction: 'Recommended Step',
        };
      case 'developer':
        return {
          benefits: 'Technical Value',
          considerations: 'Technical Tradeoffs',
          why: 'Codebase Risk',
          nextAction: 'Mitigation Step',
        };
      case 'job_seeker':
        return {
          benefits: 'Career Upside',
          considerations: 'Preparation Overhead',
          why: 'Application Risk',
          nextAction: 'Intervention Loop',
        };
      default:
        return {
          benefits: 'Expected Benefit',
          considerations: 'Opportunity Cost',
          why: 'SLA Risk',
          nextAction: 'Next Action',
        };
    }
  };

  const sectionLabels = getSectionLabels();

  // Filtering criteria logical map
  const filteredTasks = tasks.filter(t => {
    const titleMatch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       t.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let statusMatch = true;
    if (statusFilter === 'pending') statusMatch = t.status === 'pending';
    else if (statusFilter === 'overdue') statusMatch = t.status === 'overdue';
    else if (statusFilter === 'completed') statusMatch = t.status === 'completed';

    const categoryMatch = categoryFilter === 'all' || t.category === categoryFilter;

    return titleMatch && statusMatch && categoryMatch;
  });

  return (
    <div className="space-y-4">
      {/* Search and control dashboard */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#080808]/80 p-4 rounded-xl border border-[#1A1A1A]">
        
        {/* TEXT SEARCH */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input 
            type="text"
            placeholder={labels.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#0E0E0E] border border-[#1A1A1A] rounded text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition"
          />
        </div>

        {/* STATUS INDEX TABS */}
        <div className="flex gap-1 bg-[#0E0E0E] p-1 rounded border border-[#1A1A1A]">
          {(['all', 'pending', 'overdue', 'completed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-sm text-[10px] font-mono tracking-wide transition duration-150 ${
                statusFilter === tab 
                  ? 'bg-[#1A1A1A] text-white font-semibold' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {getTabLabel(tab)}
            </button>
          ))}
        </div>

        {/* CATEGORY DROPDOWN */}
        <div className="flex gap-2 w-full md:w-auto self-stretch md:self-auto justify-end">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#0E0E0E] border border-[#1A1A1A] rounded text-xs text-[#E0E0E0] focus:outline-none focus:border-gray-600 cursor-pointer [color-scheme:dark]"
          >
            <option value="all">{getAllCategoriesLabel()}</option>
            <option value="Work">{getCategoryLabel('Work')}</option>
            <option value="Study">{getCategoryLabel('Study')}</option>
            <option value="Career">{getCategoryLabel('Career')}</option>
            <option value="Personal">{getCategoryLabel('Personal')}</option>
          </select>

          <button
            onClick={onOpenForm}
            className="px-4 py-1.5 bg-white text-black font-semibold text-xs rounded hover:bg-gray-200 active:scale-95 flex items-center gap-1.5 transition tracking-wider uppercase"
          >
            <Plus className="h-3 w-3" />
            {labels.addTaskLabel}
          </button>
        </div>

      </div>

      {/* Task list list items container */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center p-12 bg-[#0E0E0E] rounded border border-[#1A1A1A]">
            <Clock className="h-6 w-6 text-gray-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white uppercase tracking-wider font-mono">{labels.emptyStateNoTasks}</p>
            <p className="text-xs text-slate-400 italic mt-2">{labels.emptyStateAdjustFilters}</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((t) => {
              const dlData = getDeadlineText(t.deadline, t.status);
              return (
                <motion.div
                  key={t.id}
                  layoutId={t.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-5 rounded border transition duration-150 bg-[#0E0E0E] relative overflow-hidden group flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                    t.status === 'completed' 
                      ? 'border-[#1A1A1A] opacity-60' 
                      : t.status === 'overdue' 
                        ? 'border-rose-950/80 hover:border-rose-900 bg-[#0A0606]' 
                        : 'border-[#1A1A1A] hover:border-gray-700/60'
                  }`}
                >
                  <div className="flex items-start gap-4 flex-grow max-w-2xl">
                    {/* Tick action indicator */}
                    <button
                      onClick={() => onToggleComplete(t)}
                      className="mt-1 text-slate-400 hover:text-emerald-500 transition active:scale-90 select-none cursor-pointer focus:outline-none"
                    >
                      {t.status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-650 hover:text-slate-200" />
                      )}
                    </button>

                    <div className="space-y-2 flex-grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 select-none bg-[#131313] px-2 py-0.5 rounded border border-[#1A1A1A]">
                          {getCategoryLabel(t.category)}
                        </span>
                        
                        <span className={`px-2 py-0.5 rounded border text-[9px] uppercase font-mono tracking-wider ${getImportanceBadge(t.importance)}`}>
                          {t.importance}
                        </span>

                        <span className={`px-2.5 py-0.5 rounded border text-[9px] font-mono tracking-wider ${dlData.color}`}>
                          {dlData.text}
                        </span>

                        {t.recoveryStrategy && (
                          <span className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[9px] font-semibold px-2 py-0.5 rounded uppercase font-mono animate-pulse">
                            {labels.recoveryBadge}
                          </span>
                        )}
                      </div>

                      <h4 className={`text-base font-semibold text-white ${t.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
                        {t.title}
                      </h4>

                      {t.description && (
                        <p className="text-xs text-slate-400 leading-relaxed max-w-xl italic">
                          {t.description}
                        </p>
                      )}

                      {/* AI Priority & Risk analysis response section */}
                      {t.aiAnalysisReason ? (
                        <div className="mt-2.5 p-3.5 bg-[#131313] border border-[#1A1A1A] rounded space-y-1">
                          <div className="flex items-center gap-1">
                            <Brain className="h-3.5 w-3.5 text-white" />
                            <span className="text-[10px] font-mono uppercase tracking-widest font-semibold text-white">{labels.aiAssessmentHeader}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed font-mono font-light">
                            {t.aiAnalysisReason}
                          </p>
                          {t.riskFactors && t.riskFactors.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2.5 border-t border-[#1A1A1A]/50 text-[10px] text-gray-400 font-mono">
                              <span>Potential Bottlenecks:</span>
                              {t.riskFactors.map((rf, keyIdx) => (
                                <span key={keyIdx} className="bg-[#080808] px-1.5 py-0.5 rounded text-rose-450 border border-rose-950/40">
                                  ⚠️ {rf}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        t.status !== 'completed' && (
                          <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-gray-500 font-mono italic">
                            <span>{labels.analyzePromptText}</span>
                          </div>
                        )
                      )}

                      {/* AI Chief of Staff Strategic Decision */}
                      {t.strategicDecision && (
                        <div className="mt-2.5 p-3.5 bg-gradient-to-br from-[#121215] to-[#0A0A0C] border border-indigo-950/40 rounded-lg space-y-2.5">
                          <div className="flex items-center justify-between border-b border-[#1A1A1A]/50 pb-1.5">
                            <div className="flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                              <span className="text-[9px] font-mono uppercase tracking-[0.12em] font-semibold text-indigo-300">
                                {labels.aiRecommendationTitle}
                              </span>
                            </div>
                            <span className={`px-2 py-0.5 rounded font-mono text-[9px] tracking-widest uppercase font-bold border ${
                              t.strategicDecision.decisionType === 'ACCELERATE' ? 'bg-emerald-950/45 border-emerald-900/35 text-emerald-400' :
                              t.strategicDecision.decisionType === 'FOCUS' ? 'bg-indigo-950/45 border-indigo-900/35 text-indigo-400 animate-pulse' :
                              t.strategicDecision.decisionType === 'CONTINUE' ? 'bg-slate-950/45 border-slate-900/35 text-slate-300' :
                              t.strategicDecision.decisionType === 'DEFER' ? 'bg-amber-950/45 border-amber-900/35 text-amber-400' :
                              'bg-rose-950/45 border-rose-900/35 text-rose-400'
                            }`}>
                              {t.strategicDecision.decisionType}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <p className="text-[11px] text-slate-200 leading-relaxed font-sans">
                              <span className="text-[9px] font-mono text-gray-500 uppercase block tracking-wider mb-0.5">{sectionLabels.why}?</span>
                              {t.strategicDecision.reasoning}
                            </p>

                            <div className="grid grid-cols-2 gap-3.5 border-t border-[#1A1A1A]/40 pt-2 text-[10px] font-mono">
                              <div>
                                <span className="text-emerald-400 block uppercase tracking-wider mb-0.5">{sectionLabels.benefits}</span>
                                <p className="text-slate-350 text-[10px] leading-snug">{t.strategicDecision.expectedBenefit}</p>
                              </div>
                              <div>
                                <span className="text-amber-400 block uppercase tracking-wider mb-0.5">{sectionLabels.considerations}</span>
                                <p className="text-slate-350 text-[10px] leading-snug">{t.strategicDecision.opportunityCost}</p>
                              </div>
                            </div>

                            {t.strategicDecision.recommendedAction && (
                              <p className="text-[11px] text-[#A2E9C1] leading-relaxed font-serif italic border-t border-emerald-950/40 pt-2">
                                <span className="text-emerald-400 font-mono text-[9px] uppercase tracking-wider not-italic mr-1">{sectionLabels.nextAction}:</span>
                                "{t.strategicDecision.recommendedAction}"
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* AI Failure Forecast Section */}
                      {t.failureForecast && t.status !== 'completed' && (
                        <div className={`mt-2.5 p-3.5 rounded border space-y-2 ${
                          t.failureForecast.failureProbability > 70 
                             ? 'bg-[#150a0c]/40 border-rose-950/50' 
                             : 'bg-[#131313] border-[#1A1A1A]'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className={t.failureForecast.failureProbability > 70 ? 'text-rose-500' : 'text-gray-400'}>⚠</span>
                              <span className="text-[9px] font-mono uppercase tracking-[0.12em] font-semibold text-gray-400">
                                {labels.aiRiskAssessmentTitle}
                              </span>
                            </div>
                            <span className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase font-bold border ${getRiskLabelAndBadge(t.failureForecast.failureProbability).color}`}>
                              {getRiskLabelAndBadge(t.failureForecast.failureProbability).text} • {t.failureForecast.failureProbability}%
                            </span>
                          </div>
                          
                          <p className="text-[11px] text-slate-300 leading-relaxed font-mono font-light">
                            <strong className="text-gray-500 uppercase text-[9px] tracking-wider mr-1">{sectionLabels.why}?</strong>
                            {t.failureForecast.reasoning}
                          </p>
                          
                          <p className="text-[11px] text-indigo-300 leading-relaxed font-serif italic border-t border-[#1A1A1A]/50 pt-1.5">
                            <strong className="text-indigo-400 font-mono text-[9px] uppercase tracking-wider not-italic mr-1">{sectionLabels.nextAction}:</strong>
                            "{t.failureForecast.recommendedIntervention}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Scores section + Utilities */}
                  <div className="flex items-center gap-4 border-t border-[#1A1A1A]/40 md:border-t-0 pt-3 md:pt-0 justify-between md:justify-end shrink-0">
                    
                    {/* Score Badges */}
                    {t.status !== 'completed' && (
                      <div className="flex gap-2">
                        {t.priorityScore !== undefined ? (
                          <div className="text-center bg-[#131313] px-3 py-1.5 rounded border border-[#1A1A1A]">
                            <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-widest">{labels.priorityLabel}</span>
                            <span className={`text-xs font-bold font-mono ${getPriorityColor(t.priorityScore)}`}>
                              {t.priorityScore}
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={() => onAnalyzePriority(t.id)}
                            disabled={analyzingId === t.id}
                            className="bg-transparent hover:bg-white hover:text-black border border-[#1A1A1A] text-white text-[10px] px-3 py-1.5 rounded flex items-center gap-1 transition select-none font-mono tracking-wider uppercase opacity-90 hover:opacity-100"
                          >
                            <Brain className={`h-3 w-3 ${analyzingId === t.id ? 'animate-pulse' : ''}`} />
                            {analyzingId === t.id ? labels.analyzingBtnLabel : labels.analyzeBtnLabel}
                          </button>
                        )}

                        {t.riskScore !== undefined && (
                          <div className="text-center bg-[#131313] px-3 py-1.5 rounded border border-[#1A1A1A]">
                            <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-widest">{labels.riskScoreLabel}</span>
                            <span className={`text-xs font-bold font-mono ${getRiskColor(t.riskScore)}`}>
                              {getRiskLabelAndBadge(t.riskScore).label} • {t.riskScore}%
                            </span>
                          </div>
                        )}

                        {t.failureForecast && (
                          <div className={`text-center px-3 py-1.5 rounded border ${
                            t.failureForecast.failureProbability > 70 
                              ? 'bg-[#21090C] border-rose-950 text-rose-500' 
                              : 'bg-[#131313] border-[#1A1A1A]'
                          }`}>
                            <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-widest">{labels.failRiskLabel}</span>
                            <span className={`text-xs font-bold font-mono ${
                              t.failureForecast.failureProbability > 70 ? 'text-rose-500 animate-pulse' : 'text-white'
                            }`}>
                              {getRiskLabelAndBadge(t.failureForecast.failureProbability).label} • {t.failureForecast.failureProbability}%
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Completion date tracker */}
                    {t.status === 'completed' && t.completedAt && (
                      <span className="text-[10px] font-mono text-gray-500 italic">
                        Completed: {new Date(t.completedAt).toLocaleString()}
                      </span>
                    )}

                    {/* Action Panel: edit & delete */}
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => onEdit(t)}
                        className="p-1.5 text-gray-500 hover:text-white rounded hover:bg-gray-900 transition"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => onDelete(t.id)}
                        className="p-1.5 text-gray-500 hover:text-rose-400 rounded hover:bg-rose-950/20 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
