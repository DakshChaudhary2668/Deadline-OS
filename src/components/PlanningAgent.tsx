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

interface PlanningAgentProps {
  dayPlan: DayPlan | null;
  weekPlan: WeekPlan | null;
  tasks: Task[];
  loadingDay: boolean;
  loadingWeek: boolean;
  onGenerateDay: () => void;
  onGenerateWeek: () => void;
  onResetPlans: () => void;
}

export default function PlanningAgent({
  dayPlan,
  weekPlan,
  tasks,
  loadingDay,
  loadingWeek,
  onGenerateDay,
  onGenerateWeek,
  onResetPlans
}: PlanningAgentProps) {
  const [activeTab, setActiveTab] = useState<'day' | 'week'>('day');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#080808] p-6 rounded-xl border border-[#1A1A1A]">
        <div>
          <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Temporal Intelligence Core</span>
          <h2 className="text-2xl font-medium font-serif italic text-white mt-1">AI Planning Agent</h2>
          <p className="text-xs text-slate-400 mt-1">
            Leverages task efforts, SLA priorities, and deadline countdown metrics to outline customized balanced timetables.
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
              Daily Timeline
            </button>
            <button
              onClick={() => setActiveTab('week')}
              className={`px-4 py-1.5 rounded-sm text-[11px] font-mono capitalize tracking-wide transition ${
                activeTab === 'week' ? 'bg-[#1A1A1A] text-white font-semibold' : 'text-gray-500 hover:text-white'
              }`}
            >
              Weekly Schedule
            </button>
          </div>

          {(dayPlan || weekPlan) && (
            <button
              onClick={onResetPlans}
              className="p-2 border border-[#1A1A1A] bg-transparent hover:bg-gray-900 text-gray-400 hover:text-rose-400 transition rounded"
              title="Recalibrate Schedule"
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
              <h3 className="text-base font-semibold text-white uppercase tracking-wider font-mono">Daily Strategic Alignment</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                Generates timed productivity intervals mapped against available hours. It slots high-cognitive objectives early while leaving buffer sectors to suppress stress spikes.
              </p>

              {dayPlan ? (
                <div className="mt-5 p-3.5 bg-[#131313] rounded border border-[#1A1A1A]">
                  <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest">Active Forecast Brief</span>
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
                  {loadingDay ? 'COMPILING TIMELINE...' : 'COMPILE DAY TIMELINE'}
                </button>
              )}
            </div>

            <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
              <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider font-semibold">Timeline Parameters</span>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center justify-between border-b border-[#1A1A1A]/55 pb-2">
                  <span>Pending Tasks Checked:</span>
                  <span className="text-white font-mono font-semibold">{tasks.filter(t => t.status !== 'completed').length}</span>
                </li>
                <li className="flex items-center justify-between border-b border-[#1A1A1A]/55 pb-2">
                  <span>Aggregate Focus Effort:</span>
                  <span className="text-white font-mono font-semibold">
                    {tasks.filter(t => t.status !== 'completed').reduce((sum, t) => sum + t.estimatedEffort, 0)} hours
                  </span>
                </li>
                {dayPlan && (
                  <li className="flex items-center justify-between pb-1">
                    <span>Generated Timestamp:</span>
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
                <p className="text-sm font-semibold text-white uppercase tracking-widest font-mono">Scanning focus blocks...</p>
                <p className="text-xs text-slate-450 italic mt-1.5">Generating high precision SLA timetable slots</p>
              </div>
            ) : dayPlan ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                  <h4 className="text-xs font-semibold text-white tracking-widest font-mono uppercase">24h Task Timetable</h4>
                  <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest">Precision SLA buffers</span>
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
                              Action Target
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
                            <span className="text-slate-450">Advisor recommendation:</span>
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
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Timetable inactive</h4>
                <p className="text-xs text-slate-450 max-w-sm mx-auto mt-2 leading-relaxed italic">
                  Run the temporal intelligence analyzer to schedule focus blocks across outstanding milestones.
                </p>
                <button
                  onClick={onGenerateDay}
                  className="mt-6 px-4 py-2 border border-[#1A1A1A] bg-[#0E0E0E] hover:bg-[#1C1C1C] text-[#E0E0E0] text-xs font-mono rounded transition duration-150 uppercase tracking-widest"
                >
                  Generate Daily Plan
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
              <h3 className="text-base font-semibold text-white uppercase tracking-wider font-mono">Weekly Macro Alignment</h3>
              <p className="text-xs text-slate-440 leading-relaxed mt-2.5">
                Assembles a high-level strategic canvas for the week, allocating specific workspace modules to designated days. Prevents burnout while guaranteeing target accomplishment.
              </p>

              {weekPlan ? (
                <div className="mt-5 p-4 bg-[#131313] rounded border border-[#1A1A1A]">
                  <span className="block text-[9px] font-mono text-indigo-400 uppercase tracking-widest px-0.5">Chief of Staff Directive</span>
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
                  {loadingWeek ? 'COMPILING ROADMAP...' : 'COMPILE WEEKLY ROADMAP'}
                </button>
              )}
            </div>

            <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
              <span className="text-[10px] font-mono text-gray-505 uppercase block tracking-wider font-semibold">Systems Checklist</span>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-400 font-mono">
                <li className="flex items-center gap-2 border-b border-[#1A1A1A]/55 pb-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-450"></div>
                  <span>Burnout threshold mapping: True</span>
                </li>
                <li className="flex items-center gap-2 border-b border-[#1A1A1A]/55 pb-2 border-dashed">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                  <span>Balanced resource dispersal: True</span>
                </li>
                {weekPlan && (
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                    <span className="text-white">Weekly alignment: Completed</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A]">
            {loadingWeek ? (
              <div className="py-24 space-y-3 text-center bg-[#131313] rounded border border-[#1A1A1A] border-dashed">
                <RefreshCw className="h-6 w-6 text-indigo-400 animate-spin mx-auto" />
                <p className="text-sm font-semibold text-white uppercase tracking-widest font-mono">Plotting weekly milestones...</p>
                <p className="text-xs text-slate-450 italic mt-1.5">Running calendar balance engines</p>
              </div>
            ) : weekPlan ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                  <h4 className="text-xs font-semibold text-white tracking-widest font-mono uppercase">WEEKLY MILESTONE TILES</h4>
                  <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest">Balanced Resource Allocation</span>
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
                        <span className="text-[9px] text-gray-500 uppercase font-mono tracking-wider">Strategic Sector</span>
                      </div>

                      <div className="space-y-1">
                        <span className="block text-[9px] uppercase font-mono text-gray-505">Core Objective:</span>
                        <p className="text-xs font-semibold text-white italic font-serif">
                          {day.focus}
                        </p>
                      </div>

                      {day.tasks && day.tasks.length > 0 && (
                        <div className="space-y-1.5 border-t border-[#1A1A1A] pt-2.5">
                          <span className="block text-[9px] uppercase font-mono text-gray-505">Allocated Actions</span>
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
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Weekly plan inactive</h4>
                <p className="text-xs text-slate-450 max-w-sm mx-auto mt-2 leading-relaxed italic">
                  Run the weekly planner to map focus weights across outstanding milestones.
                </p>
                <button
                  onClick={onGenerateWeek}
                  className="mt-6 px-4 py-2 border border-[#1A1A1A] bg-[#0E0E0E] hover:bg-[#1C1C1C] text-[#E0E0E0] text-xs font-mono rounded transition duration-150 uppercase tracking-widest"
                >
                  Generate Week Roadmap
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
