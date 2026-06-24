export interface FailureForecast {
  failureProbability: number; // 0-100
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  reasoning: string;
  recommendedIntervention: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string; // ISO date string (YYYY-MM-DDTHH:mm)
  estimatedEffort: number; // hours
  category: 'Work' | 'Study' | 'Career' | 'Personal';
  importance: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'pending' | 'completed' | 'overdue';
  completedAt?: string;
  createdAt?: string;
  
  // AI Analysis Results
  priorityScore?: number; // 0-100
  riskScore?: number; // 0-100
  aiAnalysisReason?: string;
  riskFactors?: string[];
  lastAnalyzedAt?: string;
  
  // AI Recovery Plan
  recoveryStrategy?: {
    strategyText: string;
    suggestedNewDeadline?: string;
    actionItems: string[];
    resourceReallocation: string;
    scopeReduction: string;
    priorityShifts: string;
    riskMitigation: string;
    generatedAt: string;
  };

  // AI Failure Forecast Engine
  failureForecast?: FailureForecast;

  // Strategic Decision Layer
  strategicDecision?: {
    decisionType: 'CONTINUE' | 'FOCUS' | 'ACCELERATE' | 'DEFER' | 'DROP';
    reasoning: string;
    expectedBenefit: string;
    opportunityCost: string;
    recommendedAction: string;
    whyThisDecision: string;
  };
}

export interface DayPlan {
  timeSlots: {
    time: string;
    taskTitle?: string;
    activity: string;
    notes?: string;
  }[];
  brief: string;
  generatedAt: string;
}

export interface MomentumDayData {
  date: string;
  velocity: number;
  completed: number;
  created: number;
}

export interface MomentumStats {
  totalCompleted: number;
  totalCreated: number;
  completionRatio: number;
  weeklyChange: number;
}

export interface MomentumAnalysis {
  momentumStatus: 'ACCELERATING' | 'STABLE' | 'DECLINING' | 'OVERLOADED';
  keyObservation: string;
  riskAssessment: string;
  executiveRecommendation: string;
}

export interface MomentumIntelligence {
  chartData: MomentumDayData[];
  stats: MomentumStats;
  analysis: MomentumAnalysis;
  generatedAt: string;
}

export interface WeekPlan {
  days: {
    dayName: string; // "Monday", "Tuesday", etc.
    focus: string;
    tasks: string[];
  }[];
  strategicAdvice: string;
  generatedAt: string;
}

export interface DashboardBriefing {
  successProbability: number; // 0-100
  successReason: string;
  highRiskCount: number;
  recommendedActions: string[];
  workloadStressLevel: 'Low' | 'Moderate' | 'Optimal' | 'High' | 'Meltdown Risk';
  biggestRiskToday: string;
  mostImportantTask: string;
  criticalBottleneck: string;
  recommendedIntervention: string;
  strategicFocusArea: string;
  generatedAt: string;
}

export type SimulationScenario =
  | 'SKIP_TASK'
  | 'DELAY_1_DAY'
  | 'DELAY_3_DAYS'
  | 'REDUCE_EFFORT'
  | 'ADD_2_HOURS'
  | 'DROP_LOW_PRIORITY'
  | 'PRIORITIZE_TASK';

export interface SimulationResult {
  currentWorkspaceSuccess: number;
  projectedWorkspaceSuccess: number;
  currentObjectiveSuccess: number;
  projectedObjectiveSuccess: number;
  currentFailureRisk: number;
  projectedFailureRisk: number;
  impactSummary: string;
  gains: string[];
  losses: string[];
  netImpact: string;
  criticalConsequences: string[];
  recoveryRecommendations: string[];
  verdict: 'RECOMMENDED' | 'ACCEPTABLE_RISK' | 'NOT_RECOMMENDED';
  verdictExplanation: string;
  confidenceScore: number;
}

