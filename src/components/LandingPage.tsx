import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  TrendingUp, 
  Layers, 
  Flame, 
  Activity, 
  Briefcase, 
  BookOpen, 
  Code, 
  ShieldCheck
} from 'lucide-react';

interface LandingPageProps {
  onLaunch: () => void;
  brandLogo: React.ReactNode;
}

// Interactive Live System Status indicator
const SystemStatus = () => {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-950/20 border border-emerald-500/20 rounded font-mono text-[9px] text-emerald-400 tracking-wider">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
      </span>
      SYSTEM ONLINE
    </div>
  );
};

// Premium Count-up KPI Strip Component
const KpiStrip = () => {
  const [counts, setCounts] = useState({ profiles: 0, engines: 0, uptime: 0 });

  useEffect(() => {
    let active = true;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      if (!active) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuad
      const ease = progress * (2 - progress);

      setCounts({
        profiles: Math.floor(ease * 4),
        engines: Math.floor(ease * 20),
        uptime: parseFloat((ease * 99.98).toFixed(2))
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCounts({ profiles: 4, engines: 20, uptime: 99.98 });
      }
    };

    requestAnimationFrame(animate);

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 px-4">
      <div className="bg-[#09090c]/60 border border-zinc-900/90 p-4 rounded-lg text-center backdrop-blur-sm hover:border-zinc-800 transition-colors">
        <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">{counts.profiles}</div>
        <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Specialized Profiles</div>
      </div>
      <div className="bg-[#09090c]/60 border border-zinc-900/90 p-4 rounded-lg text-center backdrop-blur-sm hover:border-zinc-800 transition-colors">
        <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">{counts.engines}+</div>
        <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-1">AI Decision Rules</div>
      </div>
      <div className="bg-[#09090c]/60 border border-zinc-900/90 p-4 rounded-lg text-center backdrop-blur-sm hover:border-zinc-800 transition-colors">
        <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">Real-Time</div>
        <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Telemetry Diagnostics</div>
      </div>
      <div className="bg-[#09090c]/60 border border-zinc-900/90 p-4 rounded-lg text-center backdrop-blur-sm hover:border-zinc-800 transition-colors">
        <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">{counts.uptime}%</div>
        <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Uptime SLA Target</div>
      </div>
    </div>
  );
};

// Cinematic Boot Terminal Simulator with real sequential delays & blinking cursors
const BootTerminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState<string>('');
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const bootSequence = [
    { text: "Booting DeadlineOS v1.0.0-RC1...", delay: 250 },
    { text: "Loading Cognitive Engine (Gemini 1.5 Pro)...", delay: 450 },
    { text: "Initializing Decision Intelligence Models...", delay: 350 },
    { text: "Initializing Developer Profile heuristics...", delay: 200 },
    { text: "Initializing Student Profile heuristics...", delay: 180 },
    { text: "Initializing Career Profile heuristics...", delay: 180 },
    { text: "Initializing Professional Profile heuristics...", delay: 180 },
    { text: ">> Telemetry Engine ONLINE [Stochastic Mode]", delay: 300 },
    { text: ">> Recovery Engine ONLINE [SLA Guardian Active]", delay: 300 },
    { text: ">> Executive Intelligence READY.", delay: 400 },
  ];

  useEffect(() => {
    let currentIdx = 0;
    let charIdx = 0;
    let timer: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentIdx >= bootSequence.length) {
        setIsFinished(true);
        return;
      }

      const targetText = bootSequence[currentIdx].text;
      if (charIdx < targetText.length) {
        setCurrentLine(prev => prev + targetText[charIdx]);
        charIdx++;
        timer = setTimeout(typeNextChar, 10);
      } else {
        // Line finished typing
        setLines(prev => [...prev, targetText]);
        setCurrentLine('');
        currentIdx++;
        charIdx = 0;
        timer = setTimeout(typeNextChar, bootSequence[currentIdx - 1]?.delay || 300);
      }
    };

    timer = setTimeout(typeNextChar, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative rounded-xl border border-zinc-800/80 bg-[#07070a]/95 p-1 md:p-2 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden font-mono text-[11px] leading-relaxed">
      {/* Glow highlight */}
      <div className="absolute -top-12 left-1/4 w-60 h-24 bg-purple-600/10 blur-xl pointer-events-none rounded-full" />
      
      {/* Window Controls */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-900/60 bg-[#050508]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/20 border border-rose-500/40 block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40 block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 block" />
        </div>
        <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">deadlineos_core_boot.sh</span>
        <div className="w-12 text-right">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 md:p-6 bg-[#030305]/95 min-h-[220px] max-h-[380px] overflow-y-auto text-left space-y-2">
        <div className="flex items-center gap-2 text-zinc-500 border-b border-zinc-900 pb-1.5 mb-2">
          <Terminal className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
          <span className="text-[10px] text-zinc-400">root@deadline-os:~$ ./init_intelligence_brief.sh</span>
        </div>

        {/* Existing typed lines */}
        {lines.map((line, idx) => {
          const isHighlight = line.startsWith('>>');
          return (
            <p key={idx} className={isHighlight ? "text-purple-400 font-bold" : "text-zinc-400"}>
              {line}
            </p>
          );
        })}

        {/* Currently typing line */}
        {currentLine && (
          <p className="text-zinc-300 flex items-center">
            {currentLine}
            <span className="w-1.5 h-3.5 bg-purple-500 ml-0.5 animate-pulse" />
          </p>
        )}

        {/* Finished state */}
        {isFinished && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 pt-3 border-t border-zinc-900/60"
          >
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span>✓ System state synchronized. Entering active decision matrix.</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="border border-zinc-900 bg-[#09090d] p-3 rounded hover:border-purple-900/40 transition-colors">
                <div className="text-[9px] text-zinc-500 uppercase font-bold">COGNITIVE WORKFLOW</div>
                <div className="text-xs font-bold text-white mt-0.5">Stochastic Planner</div>
                <div className="text-[10px] text-zinc-400 mt-1">Generates temporal roadmaps utilizing predictive risk vectors.</div>
              </div>
              <div className="border border-zinc-900 bg-[#09090d] p-3 rounded hover:border-purple-900/40 transition-colors">
                <div className="text-[9px] text-purple-400 uppercase font-bold">SLA RECOVERY AGENT</div>
                <div className="text-xs font-bold text-white mt-0.5">Incident Recovery</div>
                <div className="text-[10px] text-zinc-400 mt-1">Restructures timelines automatically on potential milestone breach.</div>
              </div>
              <div className="border border-zinc-900 bg-[#09090d] p-3 rounded hover:border-purple-900/40 transition-colors">
                <div className="text-[9px] text-zinc-500 uppercase font-bold">DECISION ENGINE</div>
                <div className="text-xs font-bold text-white mt-0.5">What-If Simulator</div>
                <div className="text-[10px] text-zinc-400 mt-1">Simulates code freeze delays, effort contraction, or scope changes.</div>
              </div>
            </div>

            <p className="text-zinc-400 flex items-center gap-1">
              <span>root@deadline-os:~$</span>
              <span className="w-1.5 h-3.5 bg-zinc-100 animate-pulse" />
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Animated Architecture Flow with sequential spotlight illumination
const LogicalFlowDiagram = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 5);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { title: "Active Tasks", desc: "Milestones declared with exact SLA, role, and effort data." },
    { title: "Telemetry Engine", desc: "Mathematical aggregation of stress indexes and risk deadlines." },
    { title: "AI Intelligence", desc: "Gemini-driven semantic reasoning on opportunity cost solutions." },
    { title: "Recovery / Planning", desc: "Adaptive day-planning matrices and timeline re-structuring." },
    { title: "Decision Output", desc: "High-value executive recommendations for prompt execution." }
  ];

  return (
    <div className="bg-[#09090c]/90 border border-zinc-800/80 rounded-xl p-6 md:p-8 space-y-6 relative overflow-hidden">
      <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-purple-500/5 blur-[50px] pointer-events-none rounded-full" />
      
      {/* Responsive Horizontal / Vertical Flow */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {steps.map((step, idx) => {
          const isActive = idx === activeStep;
          return (
            <React.Fragment key={idx}>
              {/* Step Card with smooth hover/active scaling and transition */}
              <div 
                className={`w-full md:w-1/5 bg-[#040406] border p-4 rounded text-center transition-all duration-500 ease-out cursor-default ${
                  isActive 
                    ? 'border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.15)] bg-purple-950/10 scale-[1.03]' 
                    : 'border-zinc-850/80 hover:border-zinc-800'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto text-[10px] font-mono mb-2 transition-colors duration-500 ${
                  isActive ? 'bg-purple-500 text-white font-bold' : 'bg-zinc-900 border border-zinc-800 text-zinc-400'
                }`}>
                  0{idx + 1}
                </div>
                <h4 className={`text-xs font-mono font-bold uppercase transition-colors duration-500 ${isActive ? 'text-purple-400' : 'text-zinc-300'}`}>
                  {step.title}
                </h4>
                <p className="text-[10px] text-zinc-500 leading-normal mt-1">{step.desc}</p>
              </div>

              {/* Glowing animated pointer arrow */}
              {idx < steps.length - 1 && (
                <div className="flex items-center justify-center md:h-8 w-6 h-6 md:w-auto text-zinc-700 select-none">
                  <ArrowRight className={`h-4 w-4 transition-all duration-500 ${
                    isActive ? 'text-purple-400 scale-110 animate-pulse' : 'text-zinc-850'
                  }`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Dynamic Detail Panel */}
      <motion.div 
        key={activeStep}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-zinc-900/80 pt-5 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-[#050508] border border-zinc-900/60 p-3 rounded text-left space-y-1 hover:border-zinc-800 transition-colors">
          <span className="text-[9px] font-mono text-rose-400 uppercase font-bold">RECOVERY ACTION</span>
          <h5 className="text-xs font-mono text-white">SLA REALLOCATION</h5>
          <p className="text-[10px] text-zinc-400 leading-relaxed">Runs on-demand optimization matrices to clear backlogs instantly.</p>
        </div>
        <div className="bg-[#050508] border border-zinc-900/60 p-3 rounded text-left space-y-1 hover:border-zinc-800 transition-colors">
          <span className="text-[9px] font-mono text-amber-400 uppercase font-bold">PLANNING LAYER</span>
          <h5 className="text-xs font-mono text-white">STOCHASTIC TIMELINES</h5>
          <p className="text-[10px] text-zinc-400 leading-relaxed">Builds day and week action checklists sorted by decision value.</p>
        </div>
        <div className="bg-[#050508] border border-zinc-900/60 p-3 rounded text-left space-y-1 hover:border-zinc-800 transition-colors">
          <span className="text-[9px] font-mono text-indigo-400 uppercase font-bold">SIMULATOR ENGINE</span>
          <h5 className="text-xs font-mono text-white">WHAT-IF MODELLING</h5>
          <p className="text-[10px] text-zinc-400 leading-relaxed">Forecasts the butterfly effect of delays on all secondary milestones.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default function LandingPage({ onLaunch, brandLogo }: LandingPageProps) {
  const architectureRef = useRef<HTMLDivElement>(null);
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      onLaunch();
    }, 500);
  };

  const scrollToArchitecture = () => {
    architectureRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const workspaces = [
    {
      title: "Developer Mode",
      icon: <Code className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110" />,
      tagline: "AI Sprint Intelligence",
      items: ["AI Sprint Intelligence", "Incident Recovery", "Roadmaps", "Sprint Decisions"],
      accent: "hover:border-purple-500/30 hover:bg-purple-950/5"
    },
    {
      title: "Student Mode",
      icon: <BookOpen className="h-5 w-5 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />,
      tagline: "High-yield scheduling",
      items: ["Study Planner", "Exam Forecast", "Daily Learning Timeline"],
      accent: "hover:border-emerald-500/30 hover:bg-emerald-950/5"
    },
    {
      title: "Career Mode",
      icon: <Briefcase className="h-5 w-5 text-amber-400 transition-transform duration-300 group-hover:scale-110" />,
      tagline: "Employment acquisition",
      items: ["Interview Pipeline", "Resume Optimizer", "Job Search Analytics"],
      accent: "hover:border-amber-500/30 hover:bg-amber-950/5"
    },
    {
      title: "Professional Mode",
      icon: <ShieldCheck className="h-5 w-5 text-rose-400 transition-transform duration-300 group-hover:scale-110" />,
      tagline: "Enterprise risk mitigation",
      items: ["SLA Recovery", "Executive Simulator", "Strategic Planning"],
      accent: "hover:border-rose-500/30 hover:bg-rose-950/5"
    }
  ];

  const capabilities = [
    {
      title: "Timeline Planning",
      description: "Stochastic day & week timeline creation optimized for your focus parameters.",
      badge: "Real-time",
      icon: <Layers className="h-4 w-4 text-purple-400" />
    },
    {
      title: "Risk Forecasting",
      description: "Proactive predictive models that warn you of bottlenecks long before deadlines breach.",
      badge: "AI-Powered",
      icon: <Activity className="h-4 w-4 text-amber-400" />
    },
    {
      title: "AI Briefings",
      description: "Instant executive-level executive digests summarizing workload stress levels.",
      badge: "Cognitive",
      icon: <Sparkles className="h-4 w-4 text-emerald-400" />
    },
    {
      title: "Recovery Engine",
      description: "Automated intervention plays to immediately recover failing projects & SLAs.",
      badge: "Active Agent",
      icon: <Flame className="h-4 w-4 text-rose-400" />
    },
    {
      title: "Scenario Simulation",
      description: "Run What-If experiments on bottlenecks, resource delays, and code freeze events.",
      badge: "Deterministic",
      icon: <Cpu className="h-4 w-4 text-indigo-400" />
    },
    {
      title: "Executive Decisions",
      description: "Make strategic choices using dynamic cost/benefit opportunity calculations.",
      badge: "Heuristic",
      icon: <TrendingUp className="h-4 w-4 text-blue-400" />
    }
  ];

  // Subtle floating background particles
  const particles = Array.from({ length: 12 });

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 overflow-x-hidden font-sans selection:bg-purple-950 selection:text-purple-300 relative">
      
      {/* Decorative Floating Lights & Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10vh] left-[15vw] w-96 h-96 bg-purple-900/5 rounded-full blur-[100px]" />
        <div className="absolute top-[40vh] right-[10vw] w-[450px] h-[450px] bg-indigo-900/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10vh] left-[20vw] w-80 h-80 bg-purple-950/10 rounded-full blur-[90px]" />
        
        {/* Soft floating stars */}
        {particles.map((_, idx) => (
          <div 
            key={idx}
            className="absolute rounded-full bg-purple-500/20"
            style={{
              top: `${15 + (idx * 7) % 80}%`,
              left: `${10 + (idx * 13) % 80}%`,
              width: `${2 + (idx % 3)}px`,
              height: `${2 + (idx % 3)}px`,
              animation: `pulse ${3 + (idx % 4)}s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      {/* Moving subtle tech grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#131318_1px,transparent_1px),linear-gradient(to_bottom,#131318_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0" />
      
      {/* Tech line animations */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent z-0" />

      {/* Header */}
      <header className="relative z-10 border-b border-[#121216]/80 bg-[#050507]/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {brandLogo}
            <div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-[0.15em] flex items-center">
                DEADLINE<span className="text-zinc-400 pl-1 font-bold">OS</span>
              </span>
              <span className="text-[9px] text-zinc-500 font-mono block tracking-wider leading-none">CHIEF OF STAFF // AI</span>
            </div>
          </div>
          
          {/* Status and Action controls */}
          <div className="flex items-center gap-4">
            <SystemStatus />
            <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-900/60 border border-zinc-800/80 px-2 py-0.5 rounded">
              v1.0 RC-1
            </span>
            <button 
              onClick={handleLaunch}
              disabled={isLaunching}
              className="px-4 py-1.5 bg-white text-black font-mono text-xs font-semibold rounded hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.08)] active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {isLaunching ? 'BOOTING...' : 'LAUNCH OS'} <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-12 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/20 border border-purple-800/20 rounded-full text-[10px] font-mono uppercase tracking-widest text-purple-300 shadow-[inset_0_1px_10px_rgba(168,85,247,0.05)]"
        >
          <Sparkles className="h-3 w-3 text-purple-400 animate-pulse" />
          The Next Generation AI Chief of Staff
        </motion.div>

        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white uppercase font-mono max-w-4xl mx-auto leading-[1.05]"
          >
            Stop Managing Tasks.<br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-zinc-400 bg-clip-text text-transparent">
              Start Managing Outcomes.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            DeadlineOS is built on continuous real-time intelligence. Our system models risk parameters, simulates execution bottlenecks, automatically handles SLA recovery plays, and delivers tactical decision logic instead of passive notifications.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={handleLaunch}
            disabled={isLaunching}
            className="group px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-bold tracking-wider rounded uppercase flex items-center gap-2 shadow-[0_0_25px_rgba(147,51,234,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {isLaunching ? 'Booting OS System...' : 'Launch DeadlineOS'}{" "}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <button
            onClick={scrollToArchitecture}
            className="px-6 py-3.5 bg-[#0e0e12] border border-zinc-800/80 hover:bg-zinc-800/40 text-zinc-300 hover:text-white font-mono text-xs font-bold tracking-wider rounded uppercase flex items-center gap-2 transition-all cursor-pointer"
          >
            View Architecture <Layers className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Hero KPI Strip with GPU accelerated entrance reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <KpiStrip />
        </motion.div>

        {/* Simulated Boot Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-10 max-w-4xl mx-auto"
        >
          <BootTerminal />
        </motion.div>
      </section>

      {/* Feature Section (Four Intelligent Workspaces) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-zinc-900/60 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">INTENTIONAL WORKSPACES</span>
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase font-mono text-white tracking-tight">Four Specializations. One Single Source of Truth.</h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-2xl mx-auto">
            Switch seamlessly between tailored profiles. Each mode adapts the AI heuristic engine, timelines, planning constraints, and recovery strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workspaces.map((ws, i) => (
            <motion.div
              key={ws.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`bg-[#08080b]/90 border border-zinc-900/90 p-5 rounded-lg flex flex-col justify-between transition-all duration-200 group cursor-pointer ${ws.accent}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-md bg-[#050508] border border-zinc-900/80 text-zinc-300 group-hover:border-purple-500/20 group-hover:text-purple-400 transition-colors">
                    {ws.icon}
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{ws.tagline}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider group-hover:text-purple-400 transition-colors">
                    {ws.title}
                  </h3>
                </div>
                <ul className="space-y-2 border-t border-zinc-900/60 pt-3">
                  {ws.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                      <div className="h-1 w-1 bg-purple-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 flex items-center justify-between text-zinc-500 text-[10px] font-mono border-t border-zinc-900/20 mt-4">
                <span className="group-hover:text-zinc-400 transition-colors">Profile Active</span>
                <CheckCircle2 className="h-3 w-3 text-zinc-700 group-hover:text-purple-400 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enterprise Capabilities Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-zinc-900/60 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">OPERATING INTEL</span>
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase font-mono text-white tracking-tight">Decisions, Not Just Reminders.</h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-2xl mx-auto">
            Traditional tools track tasks. DeadlineOS executes logic models to tell you exactly how to save breaching milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div 
              key={cap.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ borderColor: 'rgba(168, 85, 247, 0.2)', y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="bg-[#08080b]/90 border border-zinc-900/90 p-5 rounded-lg space-y-3 flex flex-col justify-between transition-all duration-200 cursor-default"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded bg-[#050508] border border-zinc-900">
                    {cap.icon}
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-[#050508] border border-zinc-900 text-zinc-400 rounded-full">{cap.badge}</span>
                </div>
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">{cap.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">{cap.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Animated Architecture Section */}
      <section ref={architectureRef} className="relative z-10 max-w-5xl mx-auto px-6 py-24 border-t border-zinc-900/60 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">LOGICAL ARCHITECTURE</span>
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase font-mono text-white tracking-tight">Continuous Decision System</h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-2xl mx-auto">
            A continuous loop from input parameters to high-fidelity AI mitigation output.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <LogicalFlowDiagram />
        </motion.div>
      </section>

      {/* Premium Call to Action */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center space-y-8 border-t border-zinc-900/40">
        <div className="space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">COMMENCE EXECUTIVE TRIAL</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono uppercase text-white tracking-tight leading-none">Ready to Re-Profile Your Timeline?</h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Eliminate operational chaos. Gain perfect clarity over every active sprint, milestone, study timeline, and interview pipeline.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={handleLaunch}
            disabled={isLaunching}
            className="group px-8 py-4 bg-white text-black font-mono text-xs font-bold tracking-widest rounded uppercase hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {isLaunching ? 'BOOTING TERMINAL...' : 'LAUNCH OS TERMINAL'}{" "}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <button
            onClick={scrollToArchitecture}
            className="px-8 py-4 bg-[#0a0a0d] border border-zinc-850 hover:bg-zinc-900 text-zinc-300 hover:text-white font-mono text-xs font-bold tracking-widest rounded uppercase flex items-center gap-2 transition-all cursor-pointer"
          >
            View Architecture <Layers className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Enterprise-grade Detailed Footer */}
      <footer className="relative z-10 border-t border-zinc-900/80 bg-[#030304] px-6 py-16 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              {brandLogo}
              <span className="text-sm font-bold font-mono text-white uppercase tracking-[0.15em] flex items-center">
                DEADLINE<span className="text-zinc-400 pl-1.5 font-bold">OS</span>
              </span>
            </div>
            <p className="text-[11px] text-zinc-600 leading-relaxed max-w-xs">
              Continuous incident mitigation, stochastic planning engine, and telemetry aggregation. Powered by Gemini.
            </p>
            <div className="text-[10px] text-zinc-600 font-mono">
              © 2026 DeadlineOS Inc. All models active.
            </div>
          </div>

          {/* Technology Stack Col */}
          <div>
            <h4 className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-4">RUNTIME ENV</h4>
            <ul className="space-y-2 text-[11px] font-mono text-zinc-500">
              <li>React 18 + Vite</li>
              <li>TypeScript</li>
              <li>Tailwind CSS 4</li>
              <li>Cloud Run Ingress</li>
            </ul>
          </div>

          {/* AI Intelligence Col */}
          <div>
            <h4 className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-4">DESIGNED FOR</h4>
            <ul className="space-y-2 text-[11px] font-mono text-zinc-500">
              <li>Developers</li>
              <li>Students</li>
              <li>Professionals</li>
              <li>Decision Makers</li>
            </ul>
          </div>

          {/* System Environment Col */}
          <div>
            <h4 className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-4">STATUS CONTROL</h4>
            <ul className="space-y-2 text-[11px] text-zinc-500">
              <li className="flex items-center gap-1.5 font-mono text-emerald-400 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                PRODUCTION READY
              </li>
              <li>Version: <span className="text-zinc-400 font-mono">RC-1</span></li>
              <li>Availability: <span className="text-zinc-400">99.98% SLA</span></li>
            </ul>
          </div>

        </div>
      </footer>

    </div>
  );
}
