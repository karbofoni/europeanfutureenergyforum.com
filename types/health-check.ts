/**
 * Types for AI Due Diligence / Project Health Check
 */

export type Technology = 'Solar' | 'Wind' | 'Hydrogen' | 'Storage' | 'Hydro';
export type Stage = 'Feasibility' | 'Permitting' | 'Construction' | 'Operational';
export type RevenueModel = 'PPA' | 'Mixed' | 'Merchant';
export type PPAStatus = 'Signed' | 'Negotiation' | 'None' | 'Not Applicable';
export type GridStatus = 'Connected' | 'Secured' | 'Application Submitted' | 'Planning';
export type PermitStatus = 'All Obtained' | 'In Progress' | 'Not Started';
export type TeamExperience = 'First Project' | '2-5 Projects' | '5+ Projects' | 'Experienced Developer';
export type LandStatus = 'Owned' | 'Leased' | 'Option' | 'Under Negotiation';
export type FinancingStatus = 'Closed' | 'Term Sheet' | 'Searching' | 'Self-Funded';
export type Severity = 'critical' | 'warning' | 'advisory';

export interface ProjectHealthCheckInput {
  // Step 1: Basics
  technology: Technology;
  country: string;
  capacity_mw: number;
  stage: Stage;

  // Step 2: Financial
  capex_eur: number;
  expected_irr?: number;
  revenue_model: RevenueModel;

  // Step 3: Development
  ppa_status: PPAStatus;
  grid_status: GridStatus;
  permit_status: PermitStatus;
  expected_cod?: string;

  // Step 4: Optional
  team_experience?: TeamExperience;
  land_status?: LandStatus;
  financing_status?: FinancingStatus;
  offtaker_name?: string;
}

export interface CategoryScore {
  score: number; // 0-100
  summary: string;
  key_findings: string[];
  concerns: string[];
  grade: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

export interface RedFlag {
  severity: Severity;
  title: string;
  description: string;
  impact: string;
  recommendations: string[];
}

export interface BenchmarkData {
  metric: string;
  your_value: number;
  p25: number;
  p50: number;
  p75: number;
  percentile: number;
  unit: string;
}

export interface InvestorReadiness {
  score: number; // 0-100
  completed_milestones: string[];
  pending_milestones: string[];
  critical_gaps: string[];
}

export interface HealthCheckResult {
  report_id: string;
  created_at: string;

  // Overall
  overall_score: number; // 0-100
  score_category: 'Excellent' | 'Good' | 'Needs Work' | 'High Risk';
  quick_summary: string[];

  // Category Analysis
  category_scores: {
    technical: CategoryScore;
    financial: CategoryScore;
    legal: CategoryScore;
    market: CategoryScore;
    development: CategoryScore;
  };

  // Issues & Actions
  red_flags: RedFlag[];
  recommendations: string[];

  // Comparisons
  benchmarks: BenchmarkData[];
  comparable_projects_count: number;
  percentile_rank: number; // 0-100, higher is better

  // Investment
  investor_readiness: InvestorReadiness;

  // Metadata
  project_data: ProjectHealthCheckInput;
}
