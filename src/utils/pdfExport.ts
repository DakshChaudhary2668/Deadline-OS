import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Task, DashboardBriefing, MomentumIntelligence, DayPlan, WeekPlan } from "../types";
import { calculateWorkspaceAnalytics } from "./sharedAnalytics";

export interface PDFExportData {
  mockRole: 'developer' | 'student' | 'job_seeker' | 'professional';
  tasks: Task[];
  briefing: DashboardBriefing | null;
  momentum: MomentumIntelligence | null;
  dayPlan: DayPlan | null;
  weekPlan: WeekPlan | null;
}

// Format date nicely
const formatDate = (dateStr: string) => {
  if (!dateStr) return "N/A";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return dateStr;
  }
};

// Simple text wrapping helper that returns the new Y coordinate
const cleanText = (str: string): string => {
  if (!str) return "";
  return str
    .replace(/[\u2018\u2019]/g, "'") // smart single quotes
    .replace(/[\u201C\u201D]/g, '"') // smart double quotes
    .replace(/[\u2013\u2014]/g, "-") // en/em dashes
    .replace(/[\u2022]/g, "•")       // bullets
    .replace(/[\u2713\u2714]/g, "[OK]") // checkmarks
    .replace(/[^\x20-\x7E\u2022]/g, " "); // Replace any other non-printable/non-WinAnsi with space, keeping bullet •
};

function drawWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number = 6
): number {
  if (!text) return y;
  const cleaned = cleanText(text);
  const lines: string[] = doc.splitTextToSize(cleaned, maxWidth);
  lines.forEach(line => {
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
}

export const generatePDFReport = async (data: PDFExportData): Promise<void> => {
  const { mockRole, tasks, briefing, momentum, dayPlan, weekPlan } = data;

  // Filter tasks to active workspace only
  const workspaceTasks = tasks.filter(t => t.profile === mockRole);
  const analytics = calculateWorkspaceAnalytics(tasks, mockRole);

  // Determine Workspace Titles & Branding colors
  let workspaceTitle = "Developer Mode";
  let workspaceAccent: [number, number, number] = [139, 92, 246]; // Purple
  let accentHex = "#8b5cf6";

  if (mockRole === 'student') {
    workspaceTitle = "Student Mode";
    workspaceAccent = [16, 185, 129]; // Emerald
    accentHex = "#10b981";
  } else if (mockRole === 'job_seeker') {
    workspaceTitle = "Career Mode";
    workspaceAccent = [245, 158, 11]; // Amber
    accentHex = "#f59e0b";
  } else if (mockRole === 'professional') {
    workspaceTitle = "Professional Mode";
    workspaceAccent = [6, 182, 212]; // Cyan
    accentHex = "#06b6d4";
  }

  // Initialize jsPDF (A4, Portrait, mm)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  // Helper to draw clean page header
  const drawPageHeader = (doc: jsPDF, pageNum: number, sectionTitle: string) => {
    // Sleek minimalist executive logo insignia
    doc.setFillColor(15, 23, 42); // Slate-900
    doc.rect(20, 11, 4, 4, 'F');
    
    // Dynamic brand accent core inside insignia
    doc.setFillColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
    doc.rect(21.5, 12.5, 1, 1, 'F');

    doc.setFont("courier", "bold");
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59); // Slate-800
    doc.text("DEADLINEOS // CHIEF OF STAFF AI", 26, 14);
    
    doc.setFont("courier", "bold");
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text(`${workspaceTitle.toUpperCase()} // REPORT`, 190, 14, { align: "right" });
    
    // Thin line
    doc.setDrawColor(226, 232, 240); // Slate-200
    doc.setLineWidth(0.2);
    doc.line(20, 17, 190, 17);

    // Section header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42); // Slate-900
    doc.text(sectionTitle.toUpperCase(), 20, 25);
  };

  // ----------------------------------------------------
  // PAGE 1: COVER
  // ----------------------------------------------------
  
  // Large thick accent band at the top
  doc.setFillColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
  doc.rect(0, 0, 210, 15, 'F');

  // Secondary sub-band
  doc.setFillColor(30, 30, 30);
  doc.rect(0, 15, 210, 2, 'F');

  // Brand header
  doc.setFont("courier", "bold");
  doc.setFontSize(15);
  doc.setTextColor(30, 30, 30);
  doc.text("DEADLINEOS", 20, 45);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("COGNITIVE CHIEF OF STAFF OPERATING SYSTEM", 20, 51);

  // Large elegant report title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(17, 24, 39); // Deep dark gray
  doc.text("EXECUTIVE INTELLIGENCE", 20, 95);
  doc.text("DECISION REPORT", 20, 107);

  // Accent horizontal bar
  doc.setFillColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
  doc.rect(20, 117, 45, 1.5, 'F');

  // Metadata block
  // Structured metadata panel
  doc.setFillColor(248, 250, 252); // soft slate background
  doc.roundedRect(20, 125, 170, 75, 1.5, 1.5, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.25);
  doc.roundedRect(20, 125, 170, 75, 1.5, 1.5, 'D');

  const reportId = `DOS-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
  const metadataItems = [
    { label: "Generated For", value: workspaceTitle.toUpperCase() },
    { label: "Generated By", value: "DEADLINEOS COGNITIVE ENGINE" },
    { label: "Report ID", value: reportId },
    { label: "Version", value: "v1.0 RC-6" },
    { label: "Classification", value: "CONFIDENTIAL", isClassified: true },
    { label: "Generation Timestamp", value: `${formattedDate} @ ${formattedTime}` },
    { label: "Security Clearance", value: "EXECUTIVE INTELLIGENCE" }
  ];

  let my = 133;
  metadataItems.forEach(item => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text(item.label.toUpperCase() + ":", 25, my);

    if (item.isClassified) {
      doc.setFillColor(239, 68, 68); // Red background for Confidential
      doc.roundedRect(80, my - 3.2, 32, 4.5, 0.5, 0.5, 'F');
      doc.setFont("courier", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text(item.value, 96, my, { align: "center" });
    } else {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59); // Slate-800
      doc.text(item.value, 80, my);
    }
    
    // Tiny divider line between elements
    if (my < 187) {
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.15);
      doc.line(25, my + 3.5, 185, my + 3.5);
    }
    my += 9;
  });

  // Prepared Exclusively For block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139); // Slate-500
  doc.text("PREPARED EXCLUSIVELY FOR:", 20, 214);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.text(workspaceTitle.toUpperCase(), 64, 214);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("COGNITIVE SOURCE:", 20, 221);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("DEADLINEOS EXECUTIVE INTELLIGENCE ENGINE", 64, 221);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("VERSION REVISION:", 125, 214);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("RC-6", 158, 214);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("SECURITY CLASS:", 125, 221);
  doc.setFont("courier", "bold");
  doc.setFontSize(8);
  doc.setTextColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
  doc.text("CONFIDENTIAL INTERNAL REPORT", 158, 221);

  // Tagline / Bottom Banner
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(20, 236, 190, 236);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(9.5);
  doc.setTextColor(100, 116, 139);
  doc.text("AI-powered operational intelligence for smarter execution.", 20, 246);

  doc.setFont("courier", "bold");
  doc.setFontSize(8);
  doc.setTextColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
  doc.text("ENGINE ACTIVE: STOCHASTIC COGNITIVE GUARDIAN", 20, 254);

  // ----------------------------------------------------
  // PAGE 2: EXECUTIVE SUMMARY
  // ----------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 2, "01 // Executive Dashboard Summary");

  // KPI Bento Grid style cards
  const drawKPICard = (
    x: number, 
    y: number, 
    w: number, 
    h: number, 
    value: string, 
    label: string, 
    desc: string, 
    badgeText: string, 
    badgeType: 'success' | 'warning' | 'danger' | 'info'
  ) => {
    // Card border and background
    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(255, 255, 255);
    doc.setLineWidth(0.25);
    doc.roundedRect(x, y, w, h, 1.5, 1.5, 'FD');

    // Accent line on left of the card
    let color: [number, number, number] = workspaceAccent;
    if (badgeType === 'success') color = [16, 185, 129]; // Emerald-500
    else if (badgeType === 'warning') color = [245, 158, 11]; // Amber-500
    else if (badgeType === 'danger') color = [239, 68, 68]; // Red-500
    else if (badgeType === 'info') color = [59, 130, 246]; // Blue-500

    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(x, y, 1.2, h, 'F');

    // Value
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(15, 23, 42);
    doc.text(value, x + 5, y + 8);

    // Badge drawing: right-aligned badge at top of card
    const badgeW = 20;
    const badgeH = 4.5;
    const badgeX = x + w - badgeW - 4;
    const badgeY = y + 4.5;

    // Badge bg
    let bgBadgeColor: [number, number, number] = [241, 245, 249];
    let textBadgeColor: [number, number, number] = [100, 116, 139];
    if (badgeType === 'success') {
      bgBadgeColor = [240, 253, 250];
      textBadgeColor = [13, 148, 136];
    } else if (badgeType === 'warning') {
      bgBadgeColor = [254, 243, 199];
      textBadgeColor = [180, 83, 9];
    } else if (badgeType === 'danger') {
      bgBadgeColor = [254, 242, 242];
      textBadgeColor = [185, 28, 28];
    } else if (badgeType === 'info') {
      bgBadgeColor = [239, 246, 255];
      textBadgeColor = [29, 78, 216];
    }

    doc.setFillColor(bgBadgeColor[0], bgBadgeColor[1], bgBadgeColor[2]);
    doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 0.75, 0.75, 'F');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(textBadgeColor[0], textBadgeColor[1], textBadgeColor[2]);
    doc.text(badgeText, badgeX + (badgeW / 2), badgeY + 3.2, { align: "center" });

    // Label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(label.toUpperCase(), x + 5, y + 14);

    // Subtle horizontal progress bar for percentage cards
    if (value.includes("%")) {
      const valNum = parseInt(value) || 0;
      const barX = x + 5;
      const barY = y + 16.5;
      const barW = w - 10;
      const barH = 1.5;

      // Track (Background) with rounded caps
      doc.setFillColor(241, 245, 249); // Slate-100
      doc.roundedRect(barX, barY, barW, barH, 0.75, 0.75, 'F');

      // Filled Track with rounded caps
      doc.setFillColor(color[0], color[1], color[2]);
      const fillW = Math.max(1.5, (valNum / 100) * barW);
      doc.roundedRect(barX, barY, fillW, barH, 0.75, 0.75, 'F');
    }

    // Desc
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(148, 163, 184);
    doc.text(desc, x + 5, y + 21);
  };

  // 6 KPI cards
  const completedCount = workspaceTasks.filter(t => t.status === 'completed').length;
  const pendingCount = workspaceTasks.filter(t => t.status !== 'completed').length;
  const overdueCount = workspaceTasks.filter(t => t.status === 'overdue').length;
  const criticalCount = workspaceTasks.filter(t => t.importance === 'Critical' || t.importance === 'High').length;

  // Determine Executive badge types
  const getBadgeForScore = (val: number): { text: string; type: 'success' | 'warning' | 'danger' } => {
    if (val >= 70) return { text: "STRONG", type: 'success' };
    if (val >= 40) return { text: "MODERATE", type: 'warning' };
    return { text: "CRITICAL", type: 'danger' };
  };

  const getBadgeForProb = (val: number): { text: string; type: 'success' | 'warning' | 'danger' } => {
    if (val >= 75) return { text: "HIGH", type: 'success' };
    if (val >= 40) return { text: "MODERATE", type: 'warning' };
    return { text: "LOW", type: 'danger' };
  };

  const getBadgeForThreat = (val: number): { text: string; type: 'success' | 'warning' | 'danger' } => {
    if (val < 30) return { text: "LOW", type: 'success' };
    if (val < 60) return { text: "MODERATE", type: 'warning' };
    return { text: "CRITICAL", type: 'danger' };
  };

  const getBadgeForBurnout = (val: number): { text: string; type: 'success' | 'warning' | 'danger' } => {
    if (val < 40) return { text: "NORMAL", type: 'success' };
    if (val < 70) return { text: "WARNING", type: 'warning' };
    return { text: "DANGEROUS", type: 'danger' };
  };

  const getBadgeForRecovery = (val: number): { text: string; type: 'success' | 'warning' | 'danger' } => {
    if (val >= 75) return { text: "STRONG", type: 'success' };
    if (val >= 40) return { text: "MODERATE", type: 'warning' };
    return { text: "WEAK", type: 'danger' };
  };

  const getBadgeForCompletion = (val: number): { text: string; type: 'success' | 'warning' | 'info' } => {
    if (val >= 70) return { text: "ADVANCED", type: 'success' };
    if (val >= 30) return { text: "PROGRESSING", type: 'warning' };
    return { text: "STARTING", type: 'info' };
  };

  const scoreB = getBadgeForScore(analytics.executiveScore);
  const probB = getBadgeForProb(analytics.successProbability);
  const threatB = getBadgeForThreat(analytics.threatIndex);
  const burnoutB = getBadgeForBurnout(analytics.burnoutIndex);
  const recoveryB = getBadgeForRecovery(analytics.recoveryConfidence);
  const completionB = getBadgeForCompletion(analytics.completionVelocity);

  // Executive Summary Compact Box (Page 2 Header snapshot)
  doc.setFillColor(248, 250, 252); // Slate-50
  doc.setDrawColor(226, 232, 240); // Slate-200
  doc.setLineWidth(0.25);
  doc.roundedRect(20, 31, 170, 21, 1.2, 1.2, 'FD');

  // Small workspace-specific left highlight strip
  doc.setFillColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
  doc.rect(20, 31, 1.2, 21, 'F');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.text("EXECUTIVE SUMMARY", 24, 36);

  // Column 1
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`• Workspace: ${workspaceTitle}`, 24, 41.5);
  doc.text(`• Active Tasks: ${pendingCount}`, 24, 46.5);

  // Column 2
  doc.text(`• Critical Tasks: ${criticalCount}`, 75, 41.5);
  doc.text(`• Success Probability: ${analytics.successProbability}%`, 75, 46.5);

  // Column 3
  doc.text(`• Recovery Confidence: ${analytics.recoveryConfidence}%`, 130, 41.5);
  doc.text(`• Burnout Risk: ${burnoutB.text}`, 130, 46.5);

  // Executive Score highlight
  doc.setFont("helvetica", "bold");
  doc.setTextColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
  doc.text(`• Executive Score: ${analytics.executiveScore}%`, 24, 50.2);

  // 6 KPI cards shifted down
  drawKPICard(20, 56, 52, 25, `${analytics.executiveScore}%`, "Executive Score", "Overall execution safety", scoreB.text, scoreB.type);
  drawKPICard(79, 56, 52, 25, `${analytics.successProbability}%`, "Success Prob.", "Likelihood of meeting targets", probB.text, probB.type);
  drawKPICard(138, 56, 52, 25, `${analytics.threatIndex}%`, "Threat Index", "SLA & timeline risk metrics", threatB.text, threatB.type);

  drawKPICard(20, 85, 52, 25, `${analytics.burnoutIndex}%`, "Burnout Index", "Cognitive & fatigue pressure", burnoutB.text, burnoutB.type);
  drawKPICard(79, 85, 52, 25, `${analytics.recoveryConfidence}%`, "Recovery Conf.", "Self-healing capability rating", recoveryB.text, recoveryB.type);
  drawKPICard(138, 85, 52, 25, `${analytics.completionVelocity}%`, "Completion Ratio", "Workspace goals completed", completionB.text, completionB.type);

  // Summary list of Task stats shifted down
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  doc.text("WORKSPACE STATISTICS SUMMARY", 20, 114);

  // Horizontal divider
  doc.setDrawColor(240, 240, 240);
  doc.line(20, 117, 190, 117);

  // Stats table layout in compact rows
  const statsRows = [
    { label: "Total Registered Workspace Tasks", val: `${workspaceTasks.length}` },
    { label: "Outstanding (Pending) Objectives", val: `${pendingCount}` },
    { label: "Completed Milestones", val: `${completedCount}` },
    { label: "Critical High-Priority Items", val: `${criticalCount}` },
    { label: "Overdue Timeline Breaches", val: `${overdueCount}` },
    { label: "Total Remaining Execution Time", val: `${analytics.pendingEffort} hours` }
  ];

  let sy = 123;
  statsRows.forEach(row => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99);
    doc.text(row.label, 22, sy);
    
    doc.setFont("courier", "bold");
    doc.setFontSize(9);
    doc.setTextColor(31, 41, 55);
    doc.text(row.val, 185, sy, { align: "right" });

    doc.setDrawColor(245, 245, 245);
    doc.setLineWidth(0.15);
    doc.line(20, sy + 3, 190, sy + 3);
    sy += 8;
  });

  // AI-Generated Executive Summary
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.text("AI CHIEF OF STAFF DIAGNOSTIC STATEMENT", 20, 178);

  // Reasoning Confidence indicator (91% with progress bar)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("REASONING CONFIDENCE: 91%", 134, 178);

  // Draw reasoning confidence progress track & bar
  const confBarX = 172;
  const confBarY = 175.0;
  const confBarW = 18;
  const confBarH = 1.5;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(confBarX, confBarY, confBarW, confBarH, 0.75, 0.75, 'F');
  doc.setFillColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
  doc.roundedRect(confBarX, confBarY, confBarW * 0.91, confBarH, 0.75, 0.75, 'F');

  doc.setDrawColor(226, 232, 240);
  doc.line(20, 181, 190, 181);

  // Custom multi-box structure for Findings, Root Cause, Recommendations
  const drawSectionBox = (boxY: number, title: string, bullets: string[]) => {
    doc.setFillColor(248, 250, 252); // Slate-50
    doc.roundedRect(20, boxY, 170, 24, 1.2, 1.2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.roundedRect(20, boxY, 170, 24, 1.2, 1.2, 'D');

    // Left colored accent indicator line
    doc.setFillColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
    doc.rect(20, boxY, 1.2, 24, 'F');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(title.toUpperCase(), 25, boxY + 5.5);

    let by = boxY + 11;
    bullets.forEach(bullet => {
      doc.setFont("courier", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
      doc.text("•", 25, by);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      drawWrappedText(doc, bullet, 29, by, 156, 3.5);
      by += 5;
    });
  };

  const findings = [
    briefing?.successReason 
      ? `Briefing report reveals success factors: ${briefing.successReason.slice(0, 110)}`
      : `Operational health is rated ${analytics.executiveScore}% with a success confidence probability of ${analytics.successProbability}%.`,
    `Current workload strain profile is flagged under standard ${analytics.workloadStressLevel.toUpperCase()} parameters.`
  ];

  const rootCauses = [
    analytics.rootCause ? (analytics.rootCause.length > 115 ? `${analytics.rootCause.slice(0, 112)}...` : analytics.rootCause) : "No timeline root causes identified.",
    `Workload fatigue metrics indicate a ${analytics.burnoutIndex}% risk of cognitive depletion under active schedules.`
  ];

  const recommendations = [
    `Initiate systematic action sequence aligning with the standard ${analytics.recommendedStrategy.toUpperCase()} posture.`,
    `Address critical timeline bottleneck: "${briefing?.criticalBottleneck || analytics.criticalBottleneck || 'No immediate bottlenecks'}"`
  ];

  drawSectionBox(185, "Executive Findings", findings);
  drawSectionBox(212, "Root Cause Analysis", rootCauses);
  drawSectionBox(239, "Immediate Recommendations", recommendations);

  // ----------------------------------------------------
  // PAGE 3: AI DAILY BRIEF
  // ----------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 3, "02 // Operational Daily Briefing");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  doc.text("TODAY'S EXECUTIVE INTEL BRIEF", 20, 35);
  doc.setDrawColor(240, 240, 240);
  doc.line(20, 38, 190, 38);

  // Focus Area Card
  doc.setFillColor(243, 244, 246);
  doc.rect(20, 42, 170, 16, 'F');
  doc.setDrawColor(229, 231, 235);
  doc.line(20, 42, 20, 58); // thick left border
  doc.setFillColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
  doc.rect(20, 42, 1.5, 16, 'F');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
  doc.text("CURRENT STRATEGIC FOCUS", 25, 47);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(31, 41, 55);
  doc.text(briefing?.strategicFocusArea || `Optimize remaining high-priority backlog to align scheduled deliverables with core targets.`, 25, 53);

  // Risks & Opportunities Columns
  const drawColumnCard = (x: number, y: number, w: number, h: number, title: string, content: string, headerColor: [number, number, number]) => {
    doc.setDrawColor(229, 231, 235);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(x, y, w, h, 1, 1, 'FD');
    
    // Header band
    doc.setFillColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.rect(x, y, w, 6, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), x + 4, y + 4.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(55, 65, 81);
    drawWrappedText(doc, content, x + 4, y + 11, w - 8, 4.5);
  };

  const riskDesc = briefing?.biggestRiskToday || analytics.biggestRiskToday;
  const oppDesc = briefing?.mostImportantTask || analytics.mostImportantTask;
  const bottleneckDesc = briefing?.criticalBottleneck || analytics.criticalBottleneck;

  drawColumnCard(20, 65, 52, 45, "CRITICAL RISK FACTOR", riskDesc, [239, 68, 68]); // Red
  drawColumnCard(79, 65, 52, 45, "CORE REVISION / TASK OPPORTUNITY", oppDesc, workspaceAccent); // Accent
  drawColumnCard(138, 65, 52, 45, "SYSTEM BOTTLENECK", bottleneckDesc, [107, 114, 128]); // Gray

  // AI Recommendations Bullet Points
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  doc.text("AI ACTIONABLE STRATEGIC INTERVENTIONS", 20, 122);
  doc.setDrawColor(240, 240, 240);
  doc.line(20, 125, 190, 125);

  const actions = briefing?.recommendedActions && briefing.recommendedActions.length > 0 
    ? briefing.recommendedActions 
    : analytics.recommendedActions;

  let ay = 132;
  if (actions && actions.length > 0) {
    actions.forEach((act, index) => {
      // Draw modern chevron bullet
      doc.setFont("courier", "bold");
      doc.setFontSize(9);
      doc.setTextColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
      doc.text(">", 22, ay);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(55, 65, 81);
      drawWrappedText(doc, act, 28, ay, 160, 5);
      ay += 10;
    });
  } else {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(156, 163, 175);
    doc.text("No active intervention recommendations. Workspace schedule remains optimal.", 22, ay);
    ay += 10;
  }

  // Momentum Block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  doc.text("OPERATIONAL MOMENTUM STATE", 20, 185);
  doc.setDrawColor(240, 240, 240);
  doc.line(20, 188, 190, 188);

  const mStatus = momentum?.analysis?.momentumStatus || "STABLE";
  const mObs = momentum?.analysis?.keyObservation || "Pacing is stable and matches target velocity thresholds.";
  const mRec = momentum?.analysis?.executiveRecommendation || "Continue executing scheduled blocks without excessive schedule deviations.";

  // Status Badge
  doc.setFillColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
  doc.roundedRect(20, 193, 40, 7, 1, 1, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(mStatus.toUpperCase(), 40, 198, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(55, 65, 81);
  doc.text("System Observation:", 20, 208);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(75, 85, 99);
  const nextY = drawWrappedText(doc, mObs, 20, 213, 170, 5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(55, 65, 81);
  doc.text("Strategic Guidance:", 20, nextY + 3);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(75, 85, 99);
  drawWrappedText(doc, mRec, 20, nextY + 8, 170, 5);


  // ----------------------------------------------------
  // PAGE 4: PLANNING & STRATEGIC DECISIONS
  // ----------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 4, "03 // Planning & Strategic Decisions");

  // Today's Plan TimeSlots
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  doc.text("TODAY'S TEMPORAL SCHEDULE TIMELINE", 20, 35);
  doc.setDrawColor(240, 240, 240);
  doc.line(20, 38, 190, 38);

  let py = 45;
  if (dayPlan?.timeSlots && dayPlan.timeSlots.length > 0) {
    // Draw first 4 slots of the day plan
    dayPlan.timeSlots.slice(0, 4).forEach((slot) => {
      // Timeline bullet line
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.5);
      doc.line(26, py - 4, 26, py + 8);

      // Bullet dot
      doc.setFillColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
      doc.circle(26, py, 1.5, 'F');

      doc.setFont("courier", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 30, 30);
      doc.text(slot.time, 32, py + 1.5);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(55, 65, 81);
      doc.text(slot.activity, 55, py + 1.5);

      if (slot.notes) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text(`- ${slot.notes}`, 120, py + 1.5);
      }
      py += 10;
    });
  } else {
    // Fallback daily timeline
    const fallbackSlots = [
      { time: "08:00 AM", activity: "Morning Sync & Routine Audit", notes: "Review critical items" },
      { time: "10:00 AM", activity: "Core Production Focus Block", notes: "Deep work scheduled" },
      { time: "02:00 PM", activity: "Active Stakeholder Alignments", notes: "Manage communications" },
      { time: "04:30 PM", activity: "SLA Risk Safeguard Review", notes: "Adjust timeline buffers" }
    ];
    fallbackSlots.forEach((slot) => {
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.5);
      doc.line(26, py - 4, 26, py + 8);
      doc.setFillColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
      doc.circle(26, py, 1.5, 'F');

      doc.setFont("courier", "bold");
      doc.setFontSize(8.5);
      doc.text(slot.time, 32, py + 1.5);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(55, 65, 81);
      doc.text(slot.activity, 55, py + 1.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(`- ${slot.notes}`, 125, py + 1.5);
      py += 10;
    });
  }

  // Active Strategic Decisions Table
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  doc.text("ACTIVE AI STRATEGIC ALIGNMENTS", 20, 105);
  doc.setDrawColor(240, 240, 240);
  doc.line(20, 108, 190, 108);

  const tasksWithDecisions = workspaceTasks
    .filter(t => t.strategicDecision !== undefined && t.strategicDecision !== null)
    .slice(0, 4);

  if (tasksWithDecisions.length > 0) {
    const tableBody = tasksWithDecisions.map(t => [
      t.title,
      t.strategicDecision?.decisionType || "CONTINUE",
      t.strategicDecision?.recommendedAction || "Execute timeline normally",
      t.strategicDecision?.whyThisDecision || "Tracking standard schedule parameters"
    ]);

    autoTable(doc, {
      startY: 112,
      margin: { left: 20, right: 20 },
      head: [["Milestone/Task", "AI Decision", "Recommended Action", "Strategic Rationalization"]],
      body: tableBody,
      theme: "plain",
      styles: {
        fontSize: 8,
        font: "helvetica",
        cellPadding: 3.5,
        textColor: [55, 65, 81],
        lineColor: [241, 245, 249],
        lineWidth: 0.1,
      },
      headStyles: {
        fontStyle: "bold",
        textColor: [255, 255, 255],
        fillColor: [15, 23, 42],
        cellPadding: 4,
      },
      columnStyles: {
        0: { cellWidth: 40, fontStyle: "bold" },
        1: { cellWidth: 25, fontStyle: "bold" },
        2: { cellWidth: 50 },
        3: { cellWidth: 55 }
      }
    });

    // Draw professional card outer border with rounded corners
    const tableEndY = (doc as any).lastAutoTable.finalY;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.25);
    doc.roundedRect(20, 112, 170, tableEndY - 112, 1.5, 1.5, 'D');
  } else {
    // Show static professional strategic guidance
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("No active schedule-altering decisions triggered by the strategic engine.", 22, 115);
    doc.text("All goals are tracking nominal margins with maximum execution confidence.", 22, 121);
  }

  // Weekly Plan Strategy block
  const weeklyStartY = (tasksWithDecisions.length > 0) ? (doc as any).lastAutoTable.finalY + 12 : 135;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  doc.text("WEEKLY ROADMAP OUTLINE", 20, weeklyStartY);
  doc.setDrawColor(240, 240, 240);
  doc.line(20, weeklyStartY + 3, 190, weeklyStartY + 3);

  let wY = weeklyStartY + 8;
  if (weekPlan?.days && weekPlan.days.length > 0) {
    weekPlan.days.slice(0, 4).forEach(day => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
      doc.text(day.dayName.toUpperCase(), 20, wY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(55, 65, 81);
      doc.text(`: ${day.focus}`, 45, wY);

      if (day.tasks && day.tasks.length > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text(` (Tasks: ${day.tasks.join(", ")})`, 110, wY, { maxWidth: 80 });
      }
      wY += 8;
    });

    if (weekPlan.strategicAdvice) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(107, 114, 128);
      doc.text("AI WEEKLY STRATEGIC COUNSEL:", 20, wY + 3);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(75, 85, 99);
      drawWrappedText(doc, weekPlan.strategicAdvice, 20, wY + 7, 170, 4);
    }
  } else {
    // Fallback weekly goals
    const fallbackDays = [
      { name: "Phase I (Focus)", focus: "Prune bottlenecks and execute outstanding core deliverables." },
      { name: "Phase II (Velocity)", focus: "Engage deep focus blocks for major high-stakes objectives." },
      { name: "Phase III (Stabilize)", focus: "Deploy recovery buffers to safeguard deadlines." }
    ];
    fallbackDays.forEach(day => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
      doc.text(day.name, 20, wY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(75, 85, 99);
      doc.text(`: ${day.focus}`, 55, wY);
      wY += 8;
    });
  }


  // ----------------------------------------------------
  // PAGE 5: RECOVERY INTELLIGENCE
  // ----------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 5, "04 // Recovery & Risk Safeguard Engine");

  // Executive Snapshot Cards
  const drawSnapshotCard = (x: number, y: number, w: number, h: number, label: string, value: string, color: [number, number, number]) => {
    doc.setFillColor(252, 253, 254);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(x, y, w, h, 1, 1, 'FD');

    // Colored top border accent line
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(x, y, w, 1, 'F');

    // Label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(label.toUpperCase(), x + (w / 2), y + 5, { align: "center" });

    // Value
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(value, x + (w / 2), y + 11.5, { align: "center" });
  };

  const snapshotY = 32;
  const snapshotH = 15;
  const cardW = 31;
  const spacing = 3.5;

  const threatColor: [number, number, number] = analytics.threatIndex >= 60 ? [239, 68, 68] : (analytics.threatIndex >= 30 ? [245, 158, 11] : [16, 185, 129]);
  const recConfidenceColor: [number, number, number] = analytics.recoveryConfidence >= 75 ? [16, 185, 129] : (analytics.recoveryConfidence >= 40 ? [245, 158, 11] : [239, 68, 68]);

  drawSnapshotCard(20, snapshotY, cardW, snapshotH, "Threat Level", analytics.workloadStressLevel.toUpperCase(), threatColor);
  drawSnapshotCard(20 + (cardW + spacing), snapshotY, cardW, snapshotH, "Recovery ETA", "T-48 HOURS", [99, 102, 241]);
  drawSnapshotCard(20 + 2 * (cardW + spacing), snapshotY, cardW, snapshotH, "Confidence", `${analytics.recoveryConfidence}%`, recConfidenceColor);
  drawSnapshotCard(20 + 3 * (cardW + spacing), snapshotY, cardW, snapshotH, "Pending Critical", `${criticalCount}`, [239, 68, 68]);
  drawSnapshotCard(20 + 4 * (cardW + spacing), snapshotY, cardW, snapshotH, "Workload", `${analytics.pendingEffort} hrs`, [100, 116, 139]);

  // Recovery Timeline (Monochrome & Minimal)
  const tlY = 51.5;

  const steps = [
    { label: "NOW", x: 25, active: true },
    { label: "Analysis", x: 65, active: false },
    { label: "Recovery Strategy", x: 105, active: false },
    { label: "Execution", x: 145, active: false },
    { label: "Stabilized", x: 185, active: false }
  ];

  steps.forEach((step, idx) => {
    // Circle Node
    if (step.active) {
      doc.setFillColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
      doc.setDrawColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
    } else {
      doc.setFillColor(241, 245, 249); // Slate-100
      doc.setDrawColor(203, 213, 225); // Slate-300
    }
    doc.setLineWidth(0.4);
    doc.circle(step.x, tlY, 1.5, 'FD'); // Balanced 1.5mm radius

    // Inner dot for active status
    if (step.active) {
      doc.setFillColor(255, 255, 255);
      doc.circle(step.x, tlY, 0.6, 'F');
    }

    // Label
    doc.setFont("helvetica", step.active ? "bold" : "normal");
    doc.setFontSize(7);
    if (step.active) {
      doc.setTextColor(15, 23, 42); // High-contrast active (Slate-900)
    } else {
      doc.setTextColor(100, 116, 139); // Slate-500 for inactive
    }
    doc.text(step.label.toUpperCase(), step.x, tlY - 3.5, { align: "center" });

    // Precise Arrow Connectors (Vector-drawn)
    if (idx < steps.length - 1) {
      const startX = step.x + 4;
      const endX = steps[idx + 1].x - 4;
      doc.setDrawColor(226, 232, 240); // Slate-200
      doc.setLineWidth(0.35);
      doc.line(startX, tlY, endX, tlY);
      
      // Draw a tiny minimalist arrowhead
      doc.setDrawColor(148, 163, 184); // Slate-400 for arrow tip
      doc.setLineWidth(0.25);
      doc.line(endX - 1.2, tlY - 0.6, endX, tlY);
      doc.line(endX - 1.2, tlY + 0.6, endX, tlY);
    }
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("ACTIVE THREATS & DELINQUENCY STATUS", 20, 60);
  doc.setDrawColor(226, 232, 240);
  doc.line(20, 63, 190, 63);

  const atRiskTasks = workspaceTasks.filter(t => t.status === 'overdue' || (t.riskScore && t.riskScore >= 70)).slice(0, 3);
  let ry = 68;
  if (atRiskTasks.length > 0) {
    atRiskTasks.forEach(t => {
      doc.setDrawColor(239, 68, 68); // Red
      doc.setFillColor(254, 242, 242);
      doc.roundedRect(20, ry, 170, 14, 0.5, 0.5, 'FD');

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(185, 28, 28);
      doc.text(`[CRITICAL THREAT] ${t.title}`, 24, ry + 5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(127, 29, 29);
      const riskFact = t.riskFactors && t.riskFactors.length > 0 ? t.riskFactors.join(", ") : "Timeline delinquency";
      doc.text(`Reason: ${t.aiAnalysisReason || "Timeline pressure exceeds prepared safety buffers."} (${riskFact})`, 24, ry + 10, { maxWidth: 160 });

      ry += 18;
    });
  } else {
    doc.setDrawColor(16, 185, 129); // Emerald/Green
    doc.setFillColor(240, 253, 250);
    doc.roundedRect(20, ry, 170, 14, 0.5, 0.5, 'FD');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(5, 150, 105);
    doc.text("NOMINAL RUNTIME STATUS CONFIRMED", 25, ry + 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(4, 120, 87);
    doc.text("No timeline breaches or high-risk delays. All active milestones are safe.", 98, ry + 9);
    ry += 20;
  }

  // Recovery Blueprints
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("ACTIVE RECOVERY SCHEMATICS & TURNAROUND ACTIONS", 20, ry + 8);
  doc.setDrawColor(226, 232, 240);
  doc.line(20, ry + 11, 190, ry + 11);

  let blueprintY = ry + 17;
  const tasksWithRecovery = workspaceTasks.filter(t => t.recoveryStrategy !== undefined && t.recoveryStrategy !== null).slice(0, 2);

  if (tasksWithRecovery.length > 0) {
    tasksWithRecovery.forEach(t => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
      doc.text(`Milestone Target: "${t.title}"`, 20, blueprintY);
      
      doc.setFont("courier", "bold");
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`NEW TARGET DEADLINE: ${formatDate(t.recoveryStrategy?.suggestedNewDeadline || "")}`, 190, blueprintY, { align: "right" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(55, 65, 81);
      doc.text("Recovery Strategy Summary:", 20, blueprintY + 5.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      const nextBy = drawWrappedText(doc, t.recoveryStrategy?.strategyText || "No active text", 20, blueprintY + 10, 170, 4.5);

      // Draw Action items
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(55, 65, 81);
      doc.text("Mandated Turnaround Protocols:", 20, nextBy + 2);

      let innerY = nextBy + 6;
      if (t.recoveryStrategy?.actionItems && t.recoveryStrategy.actionItems.length > 0) {
        t.recoveryStrategy.actionItems.slice(0, 3).forEach(act => {
          doc.setFillColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
          doc.circle(22, innerY - 1, 0.8, 'F');
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);
          doc.setTextColor(100, 116, 139);
          doc.text(act, 26, innerY, { maxWidth: 160 });
          innerY += 4.5;
        });
      } else {
        doc.setFont("helvetica", "italic");
        doc.text("No mandated protocols defined. Maintain core standard checklist.", 26, innerY);
        innerY += 4.5;
      }

      blueprintY = innerY + 6;
    });
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(55, 65, 81);
    doc.text("Recommended Standby Strategy:", 20, blueprintY);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(107, 114, 128);
    const defaultStrategyText = `In the event of localized timeline failures, deploy the Chief of Staff turnaround model immediately. This triggers dynamic timeline extensions of up to 40% while simultaneously executing a 15% reduction in secondary milestone deliverables.`;
    const nextBY = drawWrappedText(doc, defaultStrategyText, 20, blueprintY + 5, 170, 4.5);

    // Turnaround recommendations
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(55, 65, 81);
    doc.text("Fallback Recovery Protocols:", 20, nextBY + 3);

    const fallbackItems = [
      "Prune secondary deliverables by 15-20% immediately.",
      "Redirect operational effort from non-critical tasks to highest priority item.",
      "Negotiate deadlines with relevant external stakeholders as preemptive safety.",
      "Re-profile current temporal slots to block deep focus times."
    ];

    let fy = nextBY + 8;
    fallbackItems.forEach(item => {
      doc.setFillColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
      doc.circle(22, fy - 1, 0.8, 'F');
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(107, 114, 128);
      doc.text(item, 26, fy);
      fy += 4.5;
    });
  }


  // ----------------------------------------------------
  // PAGE 6: TASK DATA APPENDIX
  // ----------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 6, "05 // Workspace Task Data Appendix");

  const tableData = workspaceTasks.map(t => [
    t.title,
    t.category || "General",
    t.importance,
    t.status.toUpperCase(),
    `${t.estimatedEffort || 0} hrs`,
    formatDate(t.deadline)
  ]);

  const startPage = doc.getNumberOfPages();
  autoTable(doc, {
    startY: 35,
    margin: { left: 20, right: 20 },
    head: [["Goal / Task Title", "Category", "Priority", "Status", "Effort", "Target Deadline"]],
    body: tableData,
    theme: "striped",
    styles: {
      fontSize: 8,
      font: "helvetica",
      textColor: [55, 65, 81],
      cellPadding: 4.5,
      lineColor: [241, 245, 249],
      lineWidth: 0.1,
      valign: 'middle'
    },
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      cellPadding: 5,
    },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: "bold" },
      1: { cellWidth: 25 },
      2: { cellWidth: 22, halign: "center" },
      3: { cellWidth: 23, halign: "center", fontStyle: "bold" },
      4: { cellWidth: 15, halign: "center" },
      5: { cellWidth: 35 }
    },
    didParseCell: (data) => {
      if (data.section === 'body') {
        const priority = data.row.cells[2]?.text[0];
        const status = data.row.cells[3]?.text[0];

        // Base alternating rows
        if (data.row.index % 2 === 1) {
          data.cell.styles.fillColor = [250, 250, 251];
        }

        // Column-specific premium badges
        if (data.column.index === 2) { // Priority Badge
          data.cell.styles.fontStyle = 'bold';
          if (priority === 'Critical' || priority === 'High') {
            data.cell.styles.fillColor = [254, 242, 242]; // Soft Red
            data.cell.styles.textColor = [185, 28, 28];
          } else if (priority === 'Medium') {
            data.cell.styles.fillColor = [239, 246, 255]; // Soft Blue
            data.cell.styles.textColor = [29, 78, 216];
          } else {
            data.cell.styles.fillColor = [240, 253, 250]; // Soft Green
            data.cell.styles.textColor = [5, 150, 105];
          }
        }

        if (data.column.index === 3) { // Status Badge
          data.cell.styles.fontStyle = 'bold';
          if (status === 'OVERDUE') {
            data.cell.styles.fillColor = [254, 242, 242]; // Soft Red
            data.cell.styles.textColor = [185, 28, 28];
          } else if (status === 'COMPLETED') {
            data.cell.styles.fillColor = [240, 253, 250]; // Soft Green
            data.cell.styles.textColor = [5, 150, 105];
          } else {
            data.cell.styles.fillColor = [239, 246, 255]; // Soft Blue
            data.cell.styles.textColor = [29, 78, 216];
          }
        }
      }
    }
  });

  const endPage = doc.getNumberOfPages();
  if (startPage === endPage) {
    const taskTableEndY = (doc as any).lastAutoTable.finalY;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.25);
    doc.roundedRect(20, 35, 170, taskTableEndY - 35, 1.5, 1.5, 'D');
  }

  // Centered Closing Section beneath the Appendix Table
  const taskTableEndY = (doc as any).lastAutoTable.finalY || 120;
  const closingY = Math.max(taskTableEndY + 18, 170);

  if (closingY < 260) {
    // Divider line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(75, closingY, 135, closingY);

    // END OF EXECUTIVE REPORT
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42); // Slate-900
    doc.text("END OF EXECUTIVE REPORT", 105, closingY + 8, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text("Generated Automatically by", 105, closingY + 14, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text("DeadlineOS Executive Intelligence Engine", 105, closingY + 19, { align: "center" });

    doc.setFont("courier", "bold");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Version RC-6", 105, closingY + 24, { align: "center" });

    // Classification badge
    const badgeW = 32;
    const badgeH = 5;
    const badgeX = 105 - (badgeW / 2);
    const badgeY = closingY + 28;
    doc.setFillColor(254, 242, 242); // Soft red
    doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 0.8, 0.8, 'F');
    doc.setFont("courier", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(185, 28, 28);
    doc.text("CONFIDENTIAL", 105, badgeY + 3.6, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(workspaceAccent[0], workspaceAccent[1], workspaceAccent[2]);
    doc.text("Executive Intelligence Complete.", 105, closingY + 39, { align: "center" });
  }


  // ----------------------------------------------------
  // PASS 2: DRAW GLOBAL FOOTER AND PAGE NUMBERS
  // ----------------------------------------------------
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    if (i > 1) {
      // Bottom divider line above footer
      doc.setDrawColor(203, 213, 225); // Slate-300
      doc.setLineWidth(0.3);
      doc.line(20, 281, 190, 281);

      // Common Text Color
      doc.setTextColor(100, 116, 139); // Slate-500 (improved readability/opacity)

      // Left Footer text
      doc.setFont("courier", "bold");
      doc.setFontSize(7.5);
      doc.text("DEADLINEOS COGNITIVE ENGINE", 20, 286.5);
      
      // Center Footer text (Two-line executive block)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.text("EXECUTIVE INTELLIGENCE REPORT", 105, 285, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6);
      doc.text("GENERATED AUTOMATICALLY", 105, 288.5, { align: "center" });

      // Right Footer Page number
      doc.setFont("courier", "bold");
      doc.setFontSize(7.5);
      const curPageStr = String(i).padStart(2, '0');
      const totPageStr = String(totalPages).padStart(2, '0');
      doc.text(`PAGE ${curPageStr} / ${totPageStr}`, 190, 286.5, { align: "right" });
    }
  }

  // Save the generated document
  const fileNameDate = now.toISOString().split("T")[0];
  const fileSafeWorkspace = workspaceTitle.toLowerCase().replace(/\s+/g, "-");
  doc.save(`deadlineos-${fileSafeWorkspace}-${fileNameDate}.pdf`);
};
