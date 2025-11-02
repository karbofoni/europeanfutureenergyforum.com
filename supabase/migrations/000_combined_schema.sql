-- Combined Schema Migration for Transition Nexus Europe
-- Run this in Supabase SQL Editor to create all tables

-- Main Content Tables
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  country text NOT NULL,
  technology text NOT NULL,
  stage text NOT NULL,
  size_mw numeric NOT NULL,
  capex_eur numeric,
  grid_status text,
  owner_type text,
  expected_cf numeric DEFAULT 0.25,
  tags text[] DEFAULT '{}',
  documents jsonb DEFAULT '[]',
  contacts jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS investors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  summary text NOT NULL,
  ticket_min_eur numeric NOT NULL,
  ticket_max_eur numeric NOT NULL,
  geographies text[] DEFAULT '{}',
  tech_focus text[] DEFAULT '{}',
  mandate_types text[] DEFAULT '{}',
  irr_target numeric,
  tags text[] DEFAULT '{}',
  contacts jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  summary text NOT NULL,
  geographies text[] DEFAULT '{}',
  technologies text[] DEFAULT '{}',
  capacity_mw_py numeric,
  credentials jsonb DEFAULT '[]',
  tags text[] DEFAULT '{}',
  contacts jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS policy_briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL UNIQUE,
  country_name text NOT NULL,
  incentives jsonb DEFAULT '[]',
  permitting_steps jsonb DEFAULT '[]',
  avg_lead_times jsonb DEFAULT '{}',
  agencies jsonb DEFAULT '[]',
  sources jsonb DEFAULT '[]',
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS grid_briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL UNIQUE,
  country_name text NOT NULL,
  steps jsonb DEFAULT '[]',
  lead_time_min_months integer NOT NULL,
  lead_time_max_months integer NOT NULL,
  queue_notes text,
  documents jsonb DEFAULT '[]',
  sources jsonb DEFAULT '[]',
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  location text NOT NULL,
  event_type text NOT NULL,
  sessions jsonb DEFAULT '[]',
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS library_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  item_type text NOT NULL,
  read_time_minutes integer DEFAULT 2,
  tags text[] DEFAULT '{}',
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  organization text,
  message text NOT NULL,
  submission_type text DEFAULT 'General',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE grid_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read access for projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Public read access for investors"
  ON investors FOR SELECT
  USING (true);

CREATE POLICY "Public read access for suppliers"
  ON suppliers FOR SELECT
  USING (true);

CREATE POLICY "Public read access for policy briefs"
  ON policy_briefs FOR SELECT
  USING (true);

CREATE POLICY "Public read access for grid briefs"
  ON grid_briefs FOR SELECT
  USING (true);

CREATE POLICY "Public read access for events"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Public read access for library items"
  ON library_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit contacts"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_country ON projects(country);
CREATE INDEX IF NOT EXISTS idx_projects_technology ON projects(technology);
CREATE INDEX IF NOT EXISTS idx_projects_stage ON projects(stage);
CREATE INDEX IF NOT EXISTS idx_investors_geographies ON investors USING GIN(geographies);
CREATE INDEX IF NOT EXISTS idx_suppliers_role ON suppliers(role);
CREATE INDEX IF NOT EXISTS idx_library_items_published ON library_items(published_at DESC);
