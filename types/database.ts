export interface Project {
  id: string;
  title: string;
  summary: string;
  country: string;
  technology: 'Solar' | 'Wind' | 'Storage' | 'Hydro' | 'Hydrogen' | 'Efficiency';
  stage: 'Feasibility' | 'Permitting' | 'Construction' | 'Operational';
  size_mw: number;
  capex_eur?: number;
  grid_status?: string;
  owner_type?: string;
  expected_cf: number;
  tags: string[];
  documents: Document[];
  contacts: ContactInfo;
  created_at: string;
  updated_at: string;
}

export interface Investor {
  id: string;
  name: string;
  summary: string;
  ticket_min_eur: number;
  ticket_max_eur: number;
  geographies: string[];
  tech_focus: string[];
  mandate_types: ('Equity' | 'Project Finance' | 'Mezz' | 'Grants')[];
  irr_target?: number;
  tags: string[];
  contacts: ContactInfo;
  created_at: string;
  updated_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  role: 'EPC' | 'OEM' | 'Consulting';
  summary: string;
  geographies: string[];
  technologies: string[];
  capacity_mw_py?: number;
  credentials: Credential[];
  tags: string[];
  contacts: ContactInfo;
  created_at: string;
  updated_at: string;
}

export interface PolicyBrief {
  id: string;
  country: string;
  country_name: string;
  incentives: Incentive[];
  permitting_steps: PermittingStep[];
  avg_lead_times: Record<string, string>;
  agencies: Agency[];
  sources: Source[];
  updated_at: string;
}

export interface GridBrief {
  id: string;
  country: string;
  country_name: string;
  steps: GridStep[];
  lead_time_min_months: number;
  lead_time_max_months: number;
  queue_notes?: string;
  documents: DocumentRequirement[];
  sources: Source[];
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  event_type: string;
  sessions: Session[];
  tags: string[];
  created_at: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  item_type: 'Brief' | 'Report' | 'Case Study';
  read_time_minutes: number;
  tags: string[];
  published_at: string;
  created_at: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  organization?: string;
  message: string;
  submission_type: 'General' | 'Project' | 'Investor' | 'Supplier';
  created_at?: string;
}

export interface Document {
  name: string;
  url: string;
  type: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
}

export interface Credential {
  name: string;
  issuer: string;
  year?: number;
}

export interface Incentive {
  name: string;
  description: string;
  eligibility: string;
  amount?: string;
}

export interface PermittingStep {
  step: number;
  name: string;
  description: string;
  typical_duration: string;
  agency: string;
}

export interface Agency {
  name: string;
  role: string;
  website?: string;
}

export interface Source {
  title: string;
  url: string;
  updated?: string;
}

export interface GridStep {
  step: number;
  name: string;
  description: string;
  typical_duration: string;
}

export interface DocumentRequirement {
  name: string;
  description: string;
  format?: string;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  track?: string;
  speakers?: string[];
}
