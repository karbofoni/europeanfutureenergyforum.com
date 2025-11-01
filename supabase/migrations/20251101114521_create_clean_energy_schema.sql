/*
  # Transition Nexus Europe - Database Schema

  ## Overview
  Complete database schema for the European clean-energy forum platform.
  Supports projects, investors, suppliers, policy briefs, grid data, events, and library content.

  ## New Tables
  
  ### 1. projects
  - `id` (uuid, primary key)
  - `title` (text) - Project name
  - `summary` (text) - Brief description
  - `country` (text) - Country code (e.g., DE, FR, ES)
  - `technology` (text) - Solar, Wind, Storage, Hydro, Hydrogen, Efficiency
  - `stage` (text) - Feasibility, Permitting, Construction, Operational
  - `size_mw` (numeric) - Capacity in MW
  - `capex_eur` (numeric) - Capital expenditure in EUR
  - `grid_status` (text) - Grid connection status
  - `owner_type` (text) - Type of owner
  - `expected_cf` (numeric) - Expected capacity factor (0-1)
  - `tags` (text[]) - Array of tags
  - `documents` (jsonb) - Array of document references
  - `contacts` (jsonb) - Contact information
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. investors
  - `id` (uuid, primary key)
  - `name` (text) - Investor name
  - `summary` (text) - Investment thesis
  - `ticket_min_eur` (numeric) - Minimum ticket size
  - `ticket_max_eur` (numeric) - Maximum ticket size
  - `geographies` (text[]) - Target geographies
  - `tech_focus` (text[]) - Technology focus areas
  - `mandate_types` (text[]) - Equity, Project Finance, Mezz, Grants
  - `irr_target` (numeric) - Target IRR percentage
  - `tags` (text[])
  - `contacts` (jsonb)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. suppliers
  - `id` (uuid, primary key)
  - `name` (text) - Supplier name
  - `role` (text) - EPC, OEM, Consulting
  - `summary` (text) - Description
  - `geographies` (text[]) - Countries served
  - `technologies` (text[]) - Tech capabilities
  - `capacity_mw_py` (numeric) - Annual capacity in MW/year
  - `credentials` (jsonb) - Certifications and credentials
  - `tags` (text[])
  - `contacts` (jsonb)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. policy_briefs
  - `id` (uuid, primary key)
  - `country` (text) - Country code
  - `country_name` (text) - Full country name
  - `incentives` (jsonb) - Array of incentive programs
  - `permitting_steps` (jsonb) - Permitting process steps
  - `avg_lead_times` (jsonb) - Average lead times by stage
  - `agencies` (jsonb) - Key government agencies
  - `sources` (jsonb) - Reference sources
  - `updated_at` (timestamptz)

  ### 5. grid_briefs
  - `id` (uuid, primary key)
  - `country` (text) - Country code
  - `country_name` (text) - Full country name
  - `steps` (jsonb) - Connection steps
  - `lead_time_min_months` (integer) - Minimum lead time
  - `lead_time_max_months` (integer) - Maximum lead time
  - `queue_notes` (text) - Queue status notes
  - `documents` (jsonb) - Required documents
  - `sources` (jsonb) - Reference sources
  - `updated_at` (timestamptz)

  ### 6. events
  - `id` (uuid, primary key)
  - `title` (text) - Event name
  - `description` (text) - Event description
  - `start_date` (date) - Start date
  - `end_date` (date) - End date
  - `location` (text) - Event location
  - `event_type` (text) - Conference, Workshop, etc.
  - `sessions` (jsonb) - Array of sessions
  - `tags` (text[])
  - `created_at` (timestamptz)

  ### 7. library_items
  - `id` (uuid, primary key)
  - `title` (text) - Article/brief title
  - `summary` (text) - Brief summary
  - `content` (text) - Full content
  - `item_type` (text) - Brief, Report, Case Study
  - `read_time_minutes` (integer) - Estimated read time
  - `tags` (text[])
  - `published_at` (timestamptz)
  - `created_at` (timestamptz)

  ### 8. contact_submissions
  - `id` (uuid, primary key)
  - `name` (text) - Submitter name
  - `email` (text) - Contact email
  - `organization` (text) - Organization name
  - `message` (text) - Message content
  - `submission_type` (text) - General, Project, Investor, Supplier
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for main content tables (projects, investors, suppliers, etc.)
  - Restricted write access (admin only or authenticated users for submissions)
*/

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

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE grid_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

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

CREATE INDEX IF NOT EXISTS idx_projects_country ON projects(country);
CREATE INDEX IF NOT EXISTS idx_projects_technology ON projects(technology);
CREATE INDEX IF NOT EXISTS idx_projects_stage ON projects(stage);
CREATE INDEX IF NOT EXISTS idx_investors_geographies ON investors USING GIN(geographies);
CREATE INDEX IF NOT EXISTS idx_suppliers_role ON suppliers(role);
CREATE INDEX IF NOT EXISTS idx_library_items_published ON library_items(published_at DESC);