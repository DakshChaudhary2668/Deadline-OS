import React from 'react';
import { motion } from 'motion/react';

// Unified premium dark-themed shimmer component
export const ShimmerBlock = ({ className = '', height = 'h-4', width = 'w-full' }: { className?: string, height?: string, width?: string }) => {
  return (
    <div className={`relative overflow-hidden bg-zinc-900/60 border border-zinc-850/50 rounded ${height} ${width} ${className}`}>
      <motion.div
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: 'linear',
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

// Text block simulation using custom characters or pure clean shimmer bars
export const TextPlaceholder = ({ width = 'w-16', className = '' }: { width?: string, className?: string }) => {
  return (
    <span className={`inline-block select-none font-mono text-zinc-800 opacity-30 animate-pulse ${width} ${className}`}>
      ██████
    </span>
  );
};

// 1. KPI Cards Skeleton Loader
export const KpiCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div 
          key={idx} 
          className="bg-[#0E0E0E] border border-[#1A1A1A] p-6 rounded-xl flex flex-col justify-between min-h-[170px] relative overflow-hidden"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <ShimmerBlock height="h-3" width="w-24" />
              <ShimmerBlock height="h-4" width="w-4" className="rounded-full" />
            </div>
            <div className="pt-2">
              <ShimmerBlock height="h-10" width="w-28" />
            </div>
            <ShimmerBlock height="h-3" width="w-full" className="mt-2" />
          </div>
          <div className="pt-4 border-t border-[#1A1A1A] mt-4">
            <ShimmerBlock height="h-1.5" width="w-full" className="rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

// 2. Executive Brief / Failure Forecast Hero Card Skeleton
export const ExecutiveBriefSkeleton = () => {
  return (
    <div className="bg-[#0E0E0E] border border-[#1A1A1A] p-6 rounded-xl space-y-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-4 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-[#1A1A1A] pb-5 lg:pb-0 lg:pr-6 shrink-0">
          <div className="flex items-center gap-2">
            <ShimmerBlock height="h-3.5" width="w-28" />
            <ShimmerBlock height="h-4" width="w-16" className="rounded-full" />
          </div>
          <div className="pt-1.5">
            <ShimmerBlock height="h-14" width="w-36" />
          </div>
          <ShimmerBlock height="h-3" width="w-24" />
        </div>
        <div className="flex-grow space-y-3">
          <div className="flex items-center gap-2">
            <ShimmerBlock height="h-4" width="w-4" className="rounded-full" />
            <ShimmerBlock height="h-3" width="w-40" />
          </div>
          <div className="space-y-2 pt-1">
            <ShimmerBlock height="h-3" width="w-full" />
            <ShimmerBlock height="h-3" width="w-5/6" />
            <ShimmerBlock height="h-3" width="w-4/5" />
          </div>
        </div>
      </div>
      
      {/* Three block sub-brief recommendations grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[#1A1A1A] pt-5">
        <div className="p-4 bg-[#111115]/40 rounded border border-[#1A1A1A]/40 space-y-2">
          <ShimmerBlock height="h-3" width="w-28" />
          <ShimmerBlock height="h-2.5" width="w-full" />
          <ShimmerBlock height="h-2.5" width="w-5/6" />
        </div>
        <div className="p-4 bg-[#111115]/40 rounded border border-[#1A1A1A]/40 space-y-2">
          <ShimmerBlock height="h-3" width="w-28" />
          <ShimmerBlock height="h-2.5" width="w-full" />
          <ShimmerBlock height="h-2.5" width="w-5/6" />
        </div>
        <div className="p-4 bg-[#111115]/40 rounded border border-[#1A1A1A]/40 space-y-2">
          <ShimmerBlock height="h-3" width="w-28" />
          <ShimmerBlock height="h-2.5" width="w-full" />
          <ShimmerBlock height="h-2.5" width="w-5/6" />
        </div>
      </div>
    </div>
  );
};

// 3. AI Recommendations Skeleton
export const AIRecommendationsSkeleton = () => {
  return (
    <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] space-y-4">
      <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
        <div className="flex items-center gap-2">
          <ShimmerBlock height="h-4.5" width="w-4.5" className="rounded" />
          <ShimmerBlock height="h-3" width="w-44" />
        </div>
        <ShimmerBlock height="h-2.5" width="w-20" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="p-4 bg-[#131313]/60 rounded border border-[#1A1A1A]/60 flex items-start gap-3">
            <ShimmerBlock height="h-4.5" width="w-4.5" className="rounded-full shrink-0 mt-0.5" />
            <div className="space-y-2 flex-grow">
              <div className="flex items-center justify-between">
                <ShimmerBlock height="h-3" width="w-1/2" />
                <ShimmerBlock height="h-2.5" width="w-12" />
              </div>
              <ShimmerBlock height="h-2.5" width="w-full" />
              <ShimmerBlock height="h-2.5" width="w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Analytics Cards Skeleton (Charts layout)
export const AnalyticsCardsSkeleton = () => {
  return (
    <div className="bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] space-y-4">
      <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
        <ShimmerBlock height="h-3.5" width="w-32" />
        <div className="flex gap-2">
          <ShimmerBlock height="h-6" width="w-16" className="rounded" />
          <ShimmerBlock height="h-6" width="w-16" className="rounded" />
        </div>
      </div>
      <div className="h-48 flex items-end gap-3 px-2 pt-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex-grow flex flex-col items-center gap-2 h-full justify-end">
            <ShimmerBlock height="h-[60%]" width="w-8" className="rounded-t bg-zinc-800/40" />
            <ShimmerBlock height="h-2" width="w-10" />
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Temporal Planner / Roadmap Skeleton (PlanningAgent.tsx)
export const RoadmapSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      {/* Sidebar Focus matrix */}
      <div className="lg:col-span-4 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] space-y-6">
        <div className="space-y-2 border-b border-[#1A1A1A] pb-4">
          <ShimmerBlock height="h-3" width="w-36" />
          <ShimmerBlock height="h-5" width="w-24" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <ShimmerBlock height="h-7" width="w-7" className="rounded" />
              <div className="space-y-1.5 flex-grow">
                <ShimmerBlock height="h-3" width="w-1/2" />
                <ShimmerBlock height="h-2" width="w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Main roadmap timeline display */}
      <div className="lg:col-span-8 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] space-y-6">
        <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
          <ShimmerBlock height="h-3.5" width="w-36" />
          <ShimmerBlock height="h-3" width="w-24" />
        </div>
        <div className="relative border-l border-zinc-800/80 pl-6 ml-3 space-y-6 pt-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="relative space-y-2">
              <div className="absolute -left-[32px] top-1.5 h-3.5 w-3.5 rounded-full bg-[#0E0E0E] border-2 border-zinc-800 flex items-center justify-center">
                <div className="h-1.5 w-1.5 bg-zinc-800 rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                <ShimmerBlock height="h-3" width="w-16" />
                <ShimmerBlock height="h-3.5" width="w-48" />
              </div>
              <div className="bg-[#111115]/50 border border-[#1A1A1A]/50 p-3 rounded space-y-1.5">
                <ShimmerBlock height="h-2.5" width="w-1/4" />
                <ShimmerBlock height="h-2" width="w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 6. SLA Incident Recovery Skeleton (RecoveryHub.tsx)
export const IncidentRecoverySkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      {/* High-risk task lists */}
      <div className="lg:col-span-5 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] space-y-4">
        <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
          <ShimmerBlock height="h-3.5" width="w-36" />
          <ShimmerBlock height="h-4" width="w-8" className="rounded" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="p-4 bg-[#111115]/50 rounded border border-[#1A1A1A]/40 space-y-3">
              <div className="flex items-center justify-between">
                <ShimmerBlock height="h-3" width="w-2/3" />
                <ShimmerBlock height="h-3" width="w-10" />
              </div>
              <div className="flex gap-2">
                <ShimmerBlock height="h-4" width="w-12" className="rounded" />
                <ShimmerBlock height="h-4" width="w-16" className="rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main playbook simulation display */}
      <div className="lg:col-span-7 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] space-y-6">
        <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
          <ShimmerBlock height="h-3.5" width="w-48" />
          <ShimmerBlock height="h-4" width="w-16" />
        </div>
        <div className="space-y-4">
          <ShimmerBlock height="h-12" width="w-full" className="rounded-lg" />
          <div className="p-5 bg-zinc-950/40 rounded-xl border border-[#1A1A1A] space-y-3">
            <ShimmerBlock height="h-3" width="w-32" />
            <div className="space-y-2 pt-1">
              <ShimmerBlock height="h-2.5" width="w-full" />
              <ShimmerBlock height="h-2.5" width="w-11/12" />
              <ShimmerBlock height="h-2.5" width="w-4/5" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <ShimmerBlock height="h-10" width="w-44" className="rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. What-If Simulator Skeleton
export const WhatIfSimulatorSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      {/* Left panel triggers */}
      <div className="lg:col-span-5 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] space-y-6">
        <div className="border-b border-[#1A1A1A] pb-3">
          <ShimmerBlock height="h-3.5" width="w-32" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between">
                <ShimmerBlock height="h-3" width="w-24" />
                <ShimmerBlock height="h-3" width="w-8" />
              </div>
              <ShimmerBlock height="h-2" width="w-full" className="rounded-full" />
            </div>
          ))}
          <ShimmerBlock height="h-10" width="w-full" className="rounded pt-2" />
        </div>
      </div>

      {/* Right panel outputs */}
      <div className="lg:col-span-7 bg-[#0E0E0E] p-6 rounded-xl border border-[#1A1A1A] space-y-6">
        <div className="border-b border-[#1A1A1A] pb-3">
          <ShimmerBlock height="h-3.5" width="w-40" />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#111115]/40 rounded border border-[#1A1A1A]/40 space-y-2">
              <ShimmerBlock height="h-3" width="w-24" />
              <ShimmerBlock height="h-8" width="w-16" />
            </div>
            <div className="p-4 bg-[#111115]/40 rounded border border-[#1A1A1A]/40 space-y-2">
              <ShimmerBlock height="h-3" width="w-24" />
              <ShimmerBlock height="h-8" width="w-16" />
            </div>
          </div>
          <div className="p-4 bg-zinc-950/40 border border-[#1A1A1A] rounded space-y-2">
            <ShimmerBlock height="h-3" width="w-28" />
            <ShimmerBlock height="h-2.5" width="w-full" />
            <ShimmerBlock height="h-2.5" width="w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
};

// 8. AI Chief of Staff Decisions Skeleton
export const ChiefOfStaffDecisionsSkeleton = () => {
  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="bg-[#0E0E0E] border border-[#1A1A1A] p-6 rounded-xl space-y-4 flex flex-col justify-between min-h-[220px]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <ShimmerBlock height="h-3.5" width="w-24" />
                <ShimmerBlock height="h-4" width="w-4" className="rounded-full" />
              </div>
              <ShimmerBlock height="h-3" width="w-full" />
              <ShimmerBlock height="h-2" width="w-5/6" />
              <ShimmerBlock height="h-2" width="w-4/5" />
            </div>
            <div className="pt-4 border-t border-[#1A1A1A] flex items-center justify-between">
              <ShimmerBlock height="h-3" width="w-16" />
              <ShimmerBlock height="h-7" width="w-20" className="rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 9. Task List Skeleton (TaskList.tsx)
export const TaskListSkeleton = () => {
  return (
    <div className="bg-[#0E0E0E] rounded-xl border border-[#1A1A1A] overflow-hidden w-full">
      {/* Toolbar */}
      <div className="p-4 sm:p-5 border-b border-[#1A1A1A] flex flex-col sm:flex-row justify-between gap-4">
        <ShimmerBlock height="h-10" width="w-full sm:w-80" className="rounded-lg" />
        <div className="flex gap-2 w-full sm:w-auto">
          <ShimmerBlock height="h-10" width="w-32" className="rounded-lg" />
          <ShimmerBlock height="h-10" width="w-32" className="rounded-lg" />
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#1A1A1A]">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="p-4 sm:p-5 flex items-center gap-4">
            <ShimmerBlock height="h-5" width="w-5" className="rounded-full shrink-0" />
            <div className="space-y-2 flex-grow">
              <div className="flex flex-wrap items-center gap-2">
                <ShimmerBlock height="h-4.5" width="w-1/3" />
                <ShimmerBlock height="h-3.5" width="w-12" className="rounded" />
              </div>
              <div className="flex items-center gap-4 pt-1">
                <ShimmerBlock height="h-3" width="w-20" />
                <ShimmerBlock height="h-3" width="w-24" />
                <ShimmerBlock height="h-3" width="w-16" />
              </div>
            </div>
            <div className="flex gap-2">
              <ShimmerBlock height="h-8" width="w-8" className="rounded shrink-0" />
              <ShimmerBlock height="h-8" width="w-8" className="rounded shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 10. Sequential Terminal Loading Activity
export const SequentialTerminalLoader = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    "Loading telemetry diagnostic array...",
    "Synchronizing workspace workload metrics...",
    "Calculating predictive deadline risk matrices...",
    "Harmonizing cognitive chief-of-staff decision engines...",
    "System matrix synchronization complete."
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#050508]/90 border border-[#1A1A1A] p-4 rounded-lg font-mono text-[10px] leading-relaxed text-zinc-400 space-y-1 w-full max-w-lg mx-auto shadow-xl">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5 mb-2">
        <span className="text-[9px] uppercase tracking-wider text-purple-400">TELEMETRY_ENGINE_BUSY.SH</span>
        <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
      </div>
      {steps.slice(0, activeStep + 1).map((step, idx) => {
        const isLast = idx === activeStep;
        const isSuccess = idx === steps.length - 1;
        return (
          <div key={idx} className={`flex items-start gap-1.5 ${isSuccess ? 'text-emerald-400' : isLast ? 'text-white' : 'text-zinc-500'}`}>
            <span>{isSuccess ? '✓' : '>'}</span>
            <span>{step}</span>
            {isLast && !isSuccess && <span className="w-1 h-3.5 bg-zinc-200 ml-0.5 animate-pulse shrink-0 inline-block self-center" />}
          </div>
        );
      })}
    </div>
  );
};
