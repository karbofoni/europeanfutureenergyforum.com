export interface MatchRequest {
  entityType: 'project' | 'investor' | 'supplier';
  entityId: string;
  filters?: {
    countries?: string[];
    technologies?: string[];
    stages?: string[];
    minSize?: number;
    maxSize?: number;
    minTicket?: number;
    maxTicket?: number;
  };
}

export interface MatchResult {
  id: string;
  name: string;
  score: number;
  reasons: MatchReason[];
  entity: any;
}

export interface MatchReason {
  factor: string;
  score: number;
  explanation: string;
}

export interface PolicyCopilotRequest {
  country: string;
  technology: string;
  size_mw: number;
  status?: string;
  question: string;
}

export interface PolicyCopilotResponse {
  answer: string;
  checklist: ChecklistItem[];
  citations: Citation[];
}

export interface ChecklistItem {
  step: number;
  task: string;
  deadline?: string;
  agency?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface Citation {
  title: string;
  url: string;
  relevance: string;
}

export interface GridEstimatorRequest {
  country: string;
  technology: string;
  size_mw: number;
  interconnection_type: 'Distribution' | 'Transmission';
  has_ppa?: boolean;
}

export interface GridEstimatorResponse {
  range_months: [number, number];
  steps: EstimatorStep[];
  documents: string[];
  notes: string;
}

export interface EstimatorStep {
  name: string;
  duration_months: number;
  description: string;
}

export interface ImpactCalculatorRequest {
  baseline_intensity_g_kwh: number;
  technology: string;
  capacity_mw: number;
  capacity_factor: number;
  lifetime_years: number;
}

export interface ImpactCalculatorResponse {
  annual_mwh: number;
  annual_co2_tonnes: number;
  lifetime_co2_tonnes: number;
  error_band_percent: number;
  assumptions: string[];
}

export interface SchedulerRequest {
  interests: string[];
  roles: string[];
  availability: TimeSlot[];
}

export interface TimeSlot {
  date: string;
  start_time: string;
  end_time: string;
}

export interface SchedulerResponse {
  sessions: RecommendedSession[];
  intros: RecommendedIntro[];
  schedule: ScheduleBlock[];
}

export interface RecommendedSession {
  session_id: string;
  title: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export interface RecommendedIntro {
  name: string;
  role: string;
  organization: string;
  reason: string;
  suggested_time?: string;
}

export interface ScheduleBlock {
  time: string;
  activity: string;
  location?: string;
  type: 'session' | 'meeting' | 'break';
}
