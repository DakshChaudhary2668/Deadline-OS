import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RoadmapSkeleton, SequentialTerminalLoader } from './Skeletons';
import { AnimatedMetric } from './AnimatedMetric';
import { 
  Clock, 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  Compass, 
  Activity, 
  RefreshCw,
  Award,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  CalendarDays
} from 'lucide-react';
import { DayPlan, WeekPlan, Task } from '../types';
import { MODE_LANGUAGES } from '../utils/modeLanguage';

type RoleType = 'student' | 'developer' | 'job_seeker' | 'professional';

const getPlanningLabels = (role: RoleType) => {
  const config = MODE_LANGUAGES[role] || MODE_LANGUAGES.professional;
  const d = config.planningLabels || (MODE_LANGUAGES.professional as any).planningLabels;
  
  return {
    ...d,
    directiveTitle: `AI ${config.systemRole} Directive`,
    generateDayText: config.buttonLabels.generateDayPlan.toUpperCase(),
    generateWeekText: config.buttonLabels.generateWeekPlan.toUpperCase(),
    advisorLabel: `${config.systemRole} recommendation:`,
    recalibrateTooltip: config.buttonLabels.recalibrate
  };
};

interface PlanningAgentProps {
  key?: any;
  dayPlan: DayPlan | null;
  weekPlan: WeekPlan | null;
  tasks: Task[];
  loadingDay: boolean;
  loadingWeek: boolean;
  onGenerateDay: () => void;
  onGenerateWeek: () => void;
  onResetPlans: () => void;
  mockRole?: string;
  briefing?: any;
}

export default function PlanningAgent({
  dayPlan,
  weekPlan,
  tasks,
  loadingDay,
  loadingWeek,
  onGenerateDay,
  onGenerateWeek,
  onResetPlans,
  mockRole = 'professional',
  briefing
}: PlanningAgentProps) {
  const labels = getPlanningLabels(mockRole as RoleType);
  const [activeTab, setActiveTab] = useState<'day' | 'week'>('day');

  const roleTasks = React.useMemo(() => {
    return tasks.filter(t => t.profile === mockRole);
  }, [tasks, mockRole]);

  // Compute real-time analytics for the roadmap view
  const metrics = React.useMemo(() => {
    const pending = roleTasks.filter(t => t.status !== 'completed');
    const completed = roleTasks.filter(t => t.status === 'completed');
    
    const sortedPending = [...pending].sort((a, b) => (b.priorityScore ?? 0) - (a.priorityScore ?? 0));
    const todayFocus = sortedPending[0]?.title || 'No active pending tasks';
    
    const deepWorkHours = briefing?.pendingEffort !== undefined
      ? briefing.pendingEffort
      : pending.reduce((sum, t) => sum + (t.estimatedEffort || 0), 0);
    
    const maxFailureRisk = briefing?.threatIndex !== undefined
      ? briefing.threatIndex
      : pending.reduce((max, t) => {
          const risk = t.failureForecast?.failureProbability ?? t.riskScore ?? 0;
          return risk > max ? risk : max;
        }, 0);
    
    let confidence = briefing?.successProbability !== undefined
      ? briefing.successProbability
      : 100;
      
    if (briefing?.successProbability === undefined) {
      if (roleTasks.length > 0) {
        const completedRatio = completed.length / roleTasks.length;
        confidence = 45 + completedRatio * 55;
        const overdue = pending.filter(t => t.status === 'overdue').length;
        const critical = pending.filter(t => t.importance === 'Critical' || t.importance === 'High').length;
        confidence -= overdue * 12;
        confidence -= critical * 4;
        if (deepWorkHours > 30) confidence -= 10;
        confidence = Math.max(12, Math.min(100, Math.round(confidence)));
      } else {
        confidence = 100;
      }
    }
    
    let burnout = briefing?.burnoutIndex !== undefined
      ? briefing.burnoutIndex
      : 10;
      
    if (briefing?.burnoutIndex === undefined) {
      if (deepWorkHours > 35) burnout = 90;
      else if (deepWorkHours > 25) burnout = 70;
      else if (deepWorkHours > 15) burnout = 45;
      else if (deepWorkHours > 5) burnout = 25;
    }
    
    const overdueCount = briefing?.overdueCount !== undefined
      ? briefing.overdueCount
      : pending.filter(t => t.status === 'overdue').length;
    
    return {
      todayFocus,
      deepWorkHours,
      maxFailureRisk,
      confidence,
      burnout,
      overdueCount
    };
  }, [roleTasks, briefing]);

  const roadmapAnalyticsLabels = React.useMemo(() => {
    if (mockRole === 'student') {
      return {
        cardTitle: "STUDENT ROADMAP ANALYTICS",
        focusLabel: "Today's Study Focus",
        effortLabel: "Study Effort Required",
        confidenceLabel: "Exam Prep Confidence",
        riskLabel: "Curriculum Slip Risk",
        burnoutLabel: "Cognitive Burnout",
        debtLabel: "Student Debt"
      };
    } else if (mockRole === 'developer') {
      return {
        cardTitle: "SPRINT ROADMAP ANALYTICS",
        focusLabel: "Today's Focus Ticket",
        effortLabel: "Deep Work Hours",
        confidenceLabel: "Sprint Delivery Confidence",
        riskLabel: "SLA Breach Risk",
        burnoutLabel: "Overtime Burnout",
        debtLabel: "Technical Debt"
      };
    } else if (mockRole === 'job_seeker') {
      return {
        cardTitle: "PLACEMENT PIPELINE ANALYTICS",
        focusLabel: "Today's Dream Focus",
        effortLabel: "Preparation Effort",
        confidenceLabel: "Placement Probability",
        riskLabel: "Funnel Attrition Risk",
        burnoutLabel: "Job Hunt Fatigue",
        debtLabel: "Application Debt"
      };
    } else {
      return {
        cardTitle: "STRATEGIC ROADMAP ANALYTICS",
        focusLabel: "Today's Strategic Focus",
        effortLabel: "FTE Focus Hours",
        confidenceLabel: "SLA Compliance Confidence",
        riskLabel: "SLA Violation Risk",
        burnoutLabel: "Capacity Burnout",
        debtLabel: "Operational Debt"
      };
    }
  }, [mockRole]);

  const getCompilingTimelineText = () => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    return config.planningDynamic.compilingTimeline;
  };

  const getCompilingRoadmapText = () => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    return config.planningDynamic.compilingRoadmap;
  };

  const getScanningFocusText = () => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    return config.planningDynamic.scanningFocus;
  };

  const getPrecisionSlaText = () => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    return config.planningDynamic.precisionSla;
  };

  const getPlottingMilestonesText = () => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    return config.planningDynamic.plottingMilestones;
  };

  const pDyn = (MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional).planningDynamic;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#080808] p-6 rounded-xl border border-[#1A1A1A]">
        <div>
          <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">{labels.intelligenceCore}</span>
          <h2 className="text-2xl font-medium font-serif italic text-white mt-1">{labels.headerTitle}</h2>
          <p className="text-xs text-slate-400 mt-1">
            {labels.subtitle}
          </p>
        </div>

        {/* Tab switcher + Clear Cache */}
        <div className="flex items-center gap-2">
          <div className="bg-[#0E0E0E] p-1 rounded border border-[#1A1A1A] flex">
            <button
              onClick={() => setActiveTab('day')}
              className={`px-4 py-1.5 rounded-sm text-[11px] font-mono capitalize tracking-wide transition ${
                activeTab === 'day' ? 'bg-[#1A1A1A] text-white font-semibold' : 'text-gray-500 hover:text-white'
              }`}
            >
              {labels.dailyTimelineTab}
            </button>
            <button
              onClick={() => setActiveTab('week')}
              className={`px-4 py-1.5 rounded-sm text-[11px] font-mono capitalize tracking-wide transition ${
                activeTab === 'week' ? 'bg-[#1A1A1A] text-white font-semibold' : 'text-gray-500 hover:text-white'
              }`}
            >
              {labels.weeklyScheduleTab}
            </button>
          </div>

          {(dayPlan || weekPlan) && (
            <button
              onClick={onResetPlans}
              className="p-2 border border-[#1A1A1A] bg-transparent hover:bg-gray-900 text-gray-400 hover:text-rose-400 transition rounded"
              title={labels.recalibrateTooltip}
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {activeTab === 'day' ? (
        /* DAILY TIMELINE VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] relative overflow-hidden">
              <Sparkles className="h-6 w-6 text-emerald-500 mb-3" />
              <h3 className="text-base font-semibold text-white uppercase tracking-wider font-mono">{labels.dailyAlignment}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                {labels.dailyDesc}
              </p>

              {dayPlan ? (
                <div className="mt-5 p-3.5 bg-[#131313] rounded border border-[#1A1A1A]">
                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest">{labels.forecastBrief}</span>
                  <p className="text-xs text-[#E0E0E0] font-medium leading-relaxed mt-2 font-serif italic">
                    "{dayPlan.brief}"
                  </p>
                </div>
              ) : (
                <button
                  onClick={onGenerateDay}
                  disabled={loadingDay}
                  className="w-full mt-6 py-2 bg-white text-black text-xs font-semibold tracking-wider font-mono uppercase rounded hover:bg-gray-200 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loadingDay && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
                  {loadingDay ? "Planning..." : labels.generateDayText}
                </button>
              )}
            </div>

            <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
              <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider font-semibold">{labels.timelineParamsLabel}</span>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center justify-between border-b border-[#1A1A1A]/55 pb-2">
                  <span>{labels.paramPendingLabel}</span>
                  <span className="text-white font-mono font-semibold">
                    <AnimatedMetric value={roleTasks.filter(t => t.status !== 'completed').length} />
                  </span>
                </li>
                <li className="flex items-center justify-between border-b border-[#1A1A1A]/55 pb-2">
                  <span>{labels.paramEffortLabel}</span>
                  <span className="text-white font-mono font-semibold">
                    <AnimatedMetric value={roleTasks.filter(t => t.status !== 'completed').reduce((sum, t) => sum + (t.estimatedEffort || 0), 0)} /> {labels.hoursUnit}
                  </span>
                </li>
                {dayPlan && (
                  <li className="flex items-center justify-between pb-1">
                    <span>{labels.timestampLabel}</span>
                    <span className="text-white font-mono">
                      {new Date(dayPlan.generatedAt).toLocaleTimeString()}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
            {loadingDay ? (
              <div className="space-y-6">
                <SequentialTerminalLoader />
                <div className="space-y-4 pt-4 opacity-30">
                  <div className="h-3 w-1/4 bg-zinc-800 rounded animate-pulse" />
                  <div className="space-y-3">
                    <div className="h-10 bg-[#131313] rounded border border-zinc-800/20" />
                    <div className="h-10 bg-[#131313] rounded border border-zinc-800/20" />
                    <div className="h-10 bg-[#131313] rounded border border-zinc-800/20" />
                  </div>
                </div>
              </div>
            ) : dayPlan ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                  <h4 className="text-xs font-semibold text-white tracking-widest font-mono uppercase">
                    {pDyn.timelineTitle}
                  </h4>
                  <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest">
                    {pDyn.precisionBuffer}
                  </span>
                </div>

                <div className="relative border-l border-[#1A1A1A] pl-6 ml-3 space-y-6">
                  {dayPlan.timeSlots.map((slot, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute -left-[32px] top-1.5 h-3 w-3 rounded-full bg-[#0E0E0E] border-2 border-gray-600 group-hover:border-white transition duration-150 flex items-center justify-center">
                        <div className="h-1 w-1 bg-gray-650 group-hover:bg-white rounded-full"></div>
                      </div>

                      <div className="p-4 bg-[#131313] rounded border border-[#1A1A1A]/80 hover:border-gray-700/60 transition duration-150">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-500/10 self-start sm:self-auto">
                            {slot.time}
                          </span>
                          
                          {slot.taskTitle && (
                            <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950/20 px-2 py-0.5 rounded border border-indigo-500/10 self-start sm:self-auto uppercase tracking-wide">
                              {labels.actionTargetBadge}
                            </span>
                          )}
                        </div>

                        {slot.taskTitle && (
                          <h5 className="text-xs font-semibold text-white mt-2.5 font-mono uppercase tracking-wide">
                            {slot.taskTitle}
                          </h5>
                        )}

                        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed italic font-serif">
                          {slot.activity}
                        </p>

                        {slot.notes && (
                          <div className="mt-2.5 pt-2 border-t border-[#1A1A1A]/40 text-[10px] text-slate-500 font-mono flex items-center gap-1.5">
                            <span className="text-slate-455">{labels.advisorLabel}</span>
                            <span className="text-slate-400 font-sans italic">{slot.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-20 text-center bg-[#131313] rounded border border-[#1A1A1A] border-dashed">
                <Clock className="h-8 w-8 text-gray-655 mx-auto mb-3 animate-pulse" />
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">{labels.timetableInactiveHeader}</h4>
                <p className="text-xs text-slate-450 max-w-sm mx-auto mt-2 leading-relaxed italic">
                  {labels.timetableInactiveDesc}
                </p>
                <button
                  onClick={onGenerateDay}
                  className="mt-6 px-4 py-2 border border-[#1A1A1A] bg-[#0E0E0E] hover:bg-[#1C1C1C] text-[#E0E0E0] text-xs font-mono rounded transition duration-150 uppercase tracking-widest"
                >
                  {labels.generateDayText}
                </button>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* WEEKLY ACTION PLAN */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] relative overflow-hidden">
              <CalendarDays className="h-6 w-6 text-indigo-400 mb-3" />
              <h3 className="text-base font-semibold text-white uppercase tracking-wider font-mono">{labels.weeklyAlignment}</h3>
              <p className="text-xs text-slate-440 leading-relaxed mt-2.5">
                {labels.weeklyPlanDesc}
              </p>

              {weekPlan ? (
                <div className="mt-5 p-4 bg-[#131313] rounded border border-[#1A1A1A]">
                  <span className="block text-[9px] font-mono text-indigo-400 uppercase tracking-widest px-0.5">{labels.directiveTitle}</span>
                  <p className="text-xs text-indigo-200 mt-2 font-serif italic leading-relaxed">
                    "{weekPlan.strategicAdvice}"
                  </p>
                </div>
              ) : (
                <button
                  onClick={onGenerateWeek}
                  disabled={loadingWeek}
                  className="w-full mt-6 py-2 bg-white text-black text-xs font-semibold tracking-wider font-mono uppercase rounded hover:bg-gray-200 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loadingWeek && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
                  {loadingWeek ? "Planning..." : labels.generateWeekText}
                </button>
              )}
            </div>

            <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
              <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider font-semibold">{labels.systemsChecklist}</span>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-400 font-mono">
                <li className="flex items-center gap-2 border-b border-[#1A1A1A]/55 pb-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-455"></div>
                  <span>{labels.burnoutLabel}: {labels.trueLabel}</span>
                </li>
                <li className="flex items-center gap-2 border-b border-[#1A1A1A]/55 pb-2 border-dashed">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                  <span>{labels.resourceDispersal}: {labels.trueLabel}</span>
                </li>
                {weekPlan && (
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                    <span className="text-white font-sans">{labels.weeklyAlignmentCompleted}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* REAL-TIME ROADMAP ANALYTICS PANEL */}
            <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] space-y-4">
              <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider font-semibold">
                {roadmapAnalyticsLabels.cardTitle}
              </span>
              <ul className="mt-4 space-y-3.5 text-xs font-mono">
                <li className="flex flex-col gap-1 border-b border-[#1A1A1A]/55 pb-2.5">
                  <span className="text-gray-500 text-[10px] uppercase">{roadmapAnalyticsLabels.focusLabel}</span>
                  <span className="text-white font-sans font-medium italic truncate" title={metrics.todayFocus}>{metrics.todayFocus}</span>
                </li>
                <li className="flex items-center justify-between border-b border-[#1A1A1A]/55 pb-2.5">
                  <span className="text-gray-500 text-[10px] uppercase">{roadmapAnalyticsLabels.effortLabel}</span>
                  <span className="text-white font-bold">
                    <AnimatedMetric value={metrics.deepWorkHours} suffix="h" />
                  </span>
                </li>
                <li className="flex items-center justify-between border-b border-[#1A1A1A]/55 pb-2.5">
                  <span className="text-gray-500 text-[10px] uppercase">{roadmapAnalyticsLabels.confidenceLabel}</span>
                  <span className={`font-bold ${metrics.confidence >= 75 ? 'text-emerald-400' : metrics.confidence >= 50 ? 'text-amber-400' : 'text-rose-500'}`}>
                    <AnimatedMetric value={metrics.confidence} suffix="%" />
                  </span>
                </li>
                <li className="flex items-center justify-between border-b border-[#1A1A1A]/55 pb-2.5">
                  <span className="text-gray-500 text-[10px] uppercase">{roadmapAnalyticsLabels.riskLabel}</span>
                  <span className={`font-bold ${metrics.maxFailureRisk >= 70 ? 'text-rose-500 animate-pulse' : metrics.maxFailureRisk >= 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    <AnimatedMetric value={metrics.maxFailureRisk} suffix="%" />
                  </span>
                </li>
                <li className="flex items-center justify-between border-b border-[#1A1A1A]/55 pb-2.5">
                  <span className="text-gray-500 text-[10px] uppercase">{roadmapAnalyticsLabels.burnoutLabel}</span>
                  <span className={`font-bold ${metrics.burnout >= 70 ? 'text-rose-400 animate-pulse' : metrics.burnout >= 45 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    <AnimatedMetric value={metrics.burnout} suffix="%" />
                  </span>
                </li>
                <li className="flex items-center justify-between pb-1">
                  <span className="text-gray-500 text-[10px] uppercase">{roadmapAnalyticsLabels.debtLabel}</span>
                  <span className={`font-bold ${metrics.overdueCount > 0 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
                    <AnimatedMetric value={metrics.overdueCount} /> {metrics.overdueCount === 1 ? 'item' : 'items'} overdue
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
            {loadingWeek ? (
              <div className="space-y-6">
                <SequentialTerminalLoader />
                <div className="space-y-4 pt-4 opacity-30">
                  <div className="h-3 w-1/4 bg-zinc-800 rounded animate-pulse" />
                  <div className="space-y-3">
                    <div className="h-10 bg-[#131313] rounded border border-zinc-800/20" />
                    <div className="h-10 bg-[#131313] rounded border border-zinc-800/20" />
                    <div className="h-10 bg-[#131313] rounded border border-zinc-800/20" />
                  </div>
                </div>
              </div>
            ) : weekPlan ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                  <h4 className="text-xs font-semibold text-white tracking-widest font-mono uppercase">
                    {pDyn.weeklyRoadmap}
                  </h4>
                  <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest">
                    {pDyn.balancedAllocation}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weekPlan.days.map((day, dIdx) => (
                    <div 
                      key={day.dayName} 
                      className={`p-4 bg-[#131313] rounded border border-[#1A1A1A] space-y-3.5 hover:border-gray-700/60 transition duration-150 relative ${
                        dIdx === 0 ? 'md:col-span-2 border-indigo-950 bg-gradient-to-r from-[#131313] to-indigo-950/20' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wide">
                          {day.dayName}
                        </span>
                        <span className="text-[9px] text-gray-500 uppercase font-mono tracking-wider">{labels.strategicSectorLabel}</span>
                      </div>

                      <div className="space-y-1">
                        <span className="block text-[9px] uppercase font-mono text-gray-500">{labels.coreObjectiveLabel}</span>
                        <p className="text-xs font-semibold text-white italic font-serif">
                          {day.focus}
                        </p>
                      </div>

                      {day.tasks && day.tasks.length > 0 && (
                        <div className="space-y-1.5 border-t border-[#1A1A1A] pt-2.5">
                          <span className="block text-[9px] uppercase font-mono text-gray-500">{labels.allocatedActionsLabel}</span>
                          <div className="space-y-1">
                            {day.tasks.map((task, mdKey) => (
                              <div key={mdKey} className="flex items-center gap-1.5 text-xs text-slate-350 italic">
                                <ChevronRight className="h-3 w-3 text-indigo-400 shrink-0" />
                                <span className="truncate">{task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-20 text-center bg-[#131313] rounded border border-[#1A1A1A] border-dashed">
                <CalendarDays className="h-8 w-8 text-gray-655 mx-auto mb-3 animate-pulse" />
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">{labels.weeklyPlanInactiveHeader}</h4>
                <p className="text-xs text-slate-455 max-w-sm mx-auto mt-2 leading-relaxed italic">
                  {labels.weeklyPlanInactiveDesc}
                </p>
                <button
                  onClick={onGenerateWeek}
                  className="mt-6 px-4 py-2 border border-[#1A1A1A] bg-[#0E0E0E] hover:bg-[#1C1C1C] text-[#E0E0E0] text-xs font-mono rounded transition duration-150 uppercase tracking-widest"
                >
                  {labels.generateWeekText}
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
