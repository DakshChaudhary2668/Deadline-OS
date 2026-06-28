import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CalendarDays, 
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
  HelpCircle
} from 'lucide-react';
import { DayPlan, WeekPlan, Task } from '../types';
import { MODE_LANGUAGES } from '../utils/modeLanguage';

type RoleType = 'student' | 'developer' | 'job_seeker' | 'professional';

const getPlanningLabels = (role: RoleType) => {
  const config = MODE_LANGUAGES[role] || MODE_LANGUAGES.professional;
  
  const data = {
    student: {
      headerTitle: "AI Study Planner", intelligenceCore: "Academic Intelligence Core", dailyAlignment: "Daily Study Alignment",
      weeklyAlignment: "Weekly Curriculum Alignment", forecastBrief: "Academic Advisor Brief", subtitle: "Leverages study hours, exam countdowns, and homework importance to map a personalized high-mastery revision plan.",
      dailyDesc: "Generates timed revision intervals mapped against available study hours. It slots high-difficulty concepts early while leaving buffer blocks to prevent study fatigue.",
      paramPendingLabel: "Pending Syllabus Goals:", paramEffortLabel: "Aggregate Study Hours:", dailyTimelineTab: "Study Timeline",
      weeklyScheduleTab: "Weekly Syllabus", timelineParamsLabel: "Revision Parameters", hoursUnit: "study hours", timestampLabel: "Plan Stamped:", actionTargetBadge: "Study Target", timetableInactiveHeader: "Study plan inactive", timetableInactiveDesc: "Run the temporal intelligence analyzer to schedule study blocks across outstanding syllabus goals.",
      systemsChecklist: "Study Checklist", burnoutLabel: "Study fatigue mapping", resourceDispersal: "Balanced syllabus dispersal",
      weeklyPlanInactiveHeader: "Weekly plan inactive", weeklyPlanInactiveDesc: "Run the weekly planner to map revision weights across outstanding study targets.",
      weeklyPlanDesc: "Assembles a high-level academic syllabus roadmap for the week, dividing course topics into manageable day blocks to eliminate exam pressure.",
      balanceEngineText: "Balancing exam preparation weights", strategicSectorLabel: "Study Domain", coreObjectiveLabel: "Course Goal:", allocatedActionsLabel: "Assigned Milestones"
    },
    developer: {
      headerTitle: "AI Sprint Planner", intelligenceCore: "Sprint Intelligence Core", dailyAlignment: "Daily Sprint Alignment",
      weeklyAlignment: "Weekly Sprint Roadmap", forecastBrief: "Senior Staff Engineer Brief", subtitle: "Leverages sprint capacity, technical debt blockers, and PR priorities to schedule balanced developer workflows.",
      dailyDesc: "Generates timed sprint focus blocks mapped against available coding bandwidth. It slots core ship objectives early while leaving buffer sectors to manage incident responses.",
      paramPendingLabel: "Active Sprint Tickets:", paramEffortLabel: "Sprint Bandwidth Needed:", dailyTimelineTab: "Sprint Timeline",
      weeklyScheduleTab: "Weekly Roadmap", timelineParamsLabel: "Sprint Parameters", hoursUnit: "story hours", timestampLabel: "Deploy Stamped:", actionTargetBadge: "Deploy Target", timetableInactiveHeader: "Sprint plan inactive", timetableInactiveDesc: "Run the temporal intelligence analyzer to schedule sprint blocks across outstanding tickets.",
      systemsChecklist: "CI/CD Checklist", burnoutLabel: "Developer fatigue mapping", resourceDispersal: "Balanced repository dispersal",
      weeklyPlanInactiveHeader: "Weekly plan inactive", weeklyPlanInactiveDesc: "Run the weekly planner to map capacity weights across outstanding sprint tickets.",
      weeklyPlanDesc: "Assembles a high-level technical sprint roadmap for the week, dividing epic requirements into manageable deployment blocks.",
      balanceEngineText: "Balancing repository deployment weights", strategicSectorLabel: "Repository Scope", coreObjectiveLabel: "PR Goal:", allocatedActionsLabel: "Assigned Tickets"
    },
    job_seeker: {
      headerTitle: "AI Career Planner", intelligenceCore: "Career Intelligence Core", dailyAlignment: "Daily Application Alignment",
      weeklyAlignment: "Weekly Outreach Alignment", forecastBrief: "AI Career Coach Brief", subtitle: "Leverages prep hours, interview countdowns, and networking importance to map a personalized high-conversion outreach plan.",
      dailyDesc: "Generates timed networking intervals mapped against available prep hours. It slots high-impact interviews early while leaving buffer blocks to prevent fatigue.",
      paramPendingLabel: "Pending Applications:", paramEffortLabel: "Aggregate Prep Hours:", dailyTimelineTab: "Outreach Timeline",
      weeklyScheduleTab: "Weekly Pipeline", timelineParamsLabel: "Pipeline Parameters", hoursUnit: "prep hours", timestampLabel: "Pipeline Stamped:", actionTargetBadge: "Career Target", timetableInactiveHeader: "Outreach plan inactive", timetableInactiveDesc: "Run the temporal intelligence analyzer to schedule outreach blocks across outstanding applications.",
      systemsChecklist: "Pipeline Checklist", burnoutLabel: "Outreach fatigue mapping", resourceDispersal: "Balanced network dispersal",
      weeklyPlanInactiveHeader: "Weekly plan inactive", weeklyPlanInactiveDesc: "Run the weekly planner to map outreach weights across outstanding applications.",
      weeklyPlanDesc: "Assembles a high-level career growth roadmap for the week, dividing networking tasks into manageable day blocks to eliminate job search pressure.",
      balanceEngineText: "Balancing interview preparation weights", strategicSectorLabel: "Career Pathway", coreObjectiveLabel: "Outreach Goal:", allocatedActionsLabel: "Assigned Actions"
    },
    professional: {
      headerTitle: "Temporal Planner", intelligenceCore: "Temporal Intelligence Core", dailyAlignment: "Daily Temporal Alignment",
      weeklyAlignment: "Weekly Strategic Alignment", forecastBrief: "Chief of Staff Brief", subtitle: "Leverages task efforts, SLA priorities, and deadline countdown metrics to outline customized balanced timetables.",
      dailyDesc: "Generates timed focus blocks mapped against available hours. It slots high-cognitive objectives early while leaving buffer sectors to manage incident responses.",
      paramPendingLabel: "Pending Goals:", paramEffortLabel: "Aggregate Effort Hours:", dailyTimelineTab: "Daily Timeline",
      weeklyScheduleTab: "Weekly Schedule", timelineParamsLabel: "Timeline Parameters", hoursUnit: "hours", timestampLabel: "Generated Timestamp:", actionTargetBadge: "Action Target", timetableInactiveHeader: "Timetable inactive", timetableInactiveDesc: "Run the temporal intelligence analyzer to schedule focus blocks across outstanding milestones.",
      systemsChecklist: "Systems Checklist", burnoutLabel: "Burnout threshold mapping", resourceDispersal: "Balanced resource dispersal",
      weeklyPlanInactiveHeader: "Weekly plan inactive", weeklyPlanInactiveDesc: "Run the weekly planner to map focus weights across outstanding milestones.",
      weeklyPlanDesc: "Assembles a high-level strategic canvas for the week, allocating specific workspace modules to designated days. Prevents burnout while guaranteeing target accomplishment.",
      balanceEngineText: "Running calendar balance engines", strategicSectorLabel: "Strategic Sector", coreObjectiveLabel: "Core Objective:", allocatedActionsLabel: "Allocated Actions"
    }
  };

  const d = data[role as keyof typeof data] || data.professional;
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
  dayPlan: DayPlan | null;
  weekPlan: WeekPlan | null;
  tasks: Task[];
  loadingDay: boolean;
  loadingWeek: boolean;
  onGenerateDay: () => void;
  onGenerateWeek: () => void;
  onResetPlans: () => void;
  mockRole?: string;
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
  mockRole = 'professional'
}: PlanningAgentProps) {
  const labels = getPlanningLabels(mockRole as RoleType);
  const [activeTab, setActiveTab] = useState<'day' | 'week'>('day');

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
                  className="w-full mt-6 py-2 bg-white text-black text-xs font-semibold tracking-wider font-mono uppercase rounded hover:bg-gray-200 transition disabled:opacity-50"
                >
                  {loadingDay ? getCompilingTimelineText() : labels.generateDayText}
                </button>
              )}
            </div>

            <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
              <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider font-semibold">{labels.timelineParamsLabel}</span>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center justify-between border-b border-[#1A1A1A]/55 pb-2">
                  <span>{labels.paramPendingLabel}</span>
                  <span className="text-white font-mono font-semibold">{tasks.filter(t => t.status !== 'completed').length}</span>
                </li>
                <li className="flex items-center justify-between border-b border-[#1A1A1A]/55 pb-2">
                  <span>{labels.paramEffortLabel}</span>
                  <span className="text-white font-mono font-semibold">
                    {tasks.filter(t => t.status !== 'completed').reduce((sum, t) => sum + t.estimatedEffort, 0)} {labels.hoursUnit}
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
              <div className="py-24 space-y-3 text-center bg-[#131313] rounded border border-[#1A1A1A] border-dashed">
                <RefreshCw className="h-6 w-6 text-emerald-500 animate-spin mx-auto" />
                <p className="text-sm font-semibold text-white uppercase tracking-widest font-mono">{getScanningFocusText()}</p>
                <p className="text-xs text-slate-450 italic mt-1.5">{getPrecisionSlaText()}</p>
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
                  className="w-full mt-6 py-2 bg-white text-black text-xs font-semibold tracking-wider font-mono uppercase rounded hover:bg-gray-200 transition disabled:opacity-50"
                >
                  {loadingWeek ? getCompilingRoadmapText() : labels.generateWeekText}
                </button>
              )}
            </div>

            <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
              <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider font-semibold">{labels.systemsChecklist}</span>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-400 font-mono">
                <li className="flex items-center gap-2 border-b border-[#1A1A1A]/55 pb-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-455"></div>
                  <span>{labels.burnoutLabel}: True</span>
                </li>
                <li className="flex items-center gap-2 border-b border-[#1A1A1A]/55 pb-2 border-dashed">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                  <span>{labels.resourceDispersal}: True</span>
                </li>
                {weekPlan && (
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                    <span className="text-white font-sans">Weekly alignment: Completed</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
            {loadingWeek ? (
              <div className="py-24 space-y-3 text-center bg-[#131313] rounded border border-[#1A1A1A] border-dashed">
                <RefreshCw className="h-6 w-6 text-indigo-400 animate-spin mx-auto" />
                <p className="text-sm font-semibold text-white uppercase tracking-widest font-mono">{getPlottingMilestonesText()}</p>
                <p className="text-xs text-slate-455 italic mt-1.5">{labels.balanceEngineText}</p>
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
