-- Create health_check_reports table for storing project health check analysis results
CREATE TABLE IF NOT EXISTS health_check_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id VARCHAR(100) UNIQUE NOT NULL, -- User-friendly ID like HC-timestamp-random
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Overall scores
  overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  score_category VARCHAR(50) NOT NULL, -- Excellent, Good, Needs Work, High Risk

  -- Quick summary
  quick_summary JSONB NOT NULL, -- Array of summary points

  -- Category scores (stored as JSONB)
  category_scores JSONB NOT NULL,

  -- Red flags and issues
  red_flags JSONB NOT NULL,

  -- Recommendations
  recommendations JSONB NOT NULL,

  -- Benchmarks
  benchmarks JSONB NOT NULL,
  comparable_projects_count INTEGER DEFAULT 0,
  percentile_rank INTEGER CHECK (percentile_rank >= 0 AND percentile_rank <= 100),

  -- Investor readiness
  investor_readiness JSONB NOT NULL,

  -- Original project data
  project_data JSONB NOT NULL,

  -- Metadata
  views_count INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMP WITH TIME ZONE,

  -- Indexes
  CONSTRAINT valid_report_id CHECK (report_id ~ '^HC-[0-9]+-[a-z0-9]+$')
);

-- Create indexes for faster lookups
CREATE INDEX idx_health_check_reports_report_id ON health_check_reports(report_id);
CREATE INDEX idx_health_check_reports_created_at ON health_check_reports(created_at DESC);
CREATE INDEX idx_health_check_reports_overall_score ON health_check_reports(overall_score);

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_report_views(report_id_param VARCHAR)
RETURNS VOID AS $$
BEGIN
  UPDATE health_check_reports
  SET views_count = views_count + 1,
      last_viewed_at = NOW()
  WHERE report_id = report_id_param;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE health_check_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read reports (they're public once generated)
CREATE POLICY "Reports are publicly readable"
  ON health_check_reports
  FOR SELECT
  USING (true);

-- Policy: Anyone can create reports (no auth required for the health check tool)
CREATE POLICY "Anyone can create reports"
  ON health_check_reports
  FOR INSERT
  WITH CHECK (true);

-- Policy: No one can update or delete reports (they're immutable)
CREATE POLICY "Reports cannot be updated"
  ON health_check_reports
  FOR UPDATE
  USING (false);

CREATE POLICY "Reports cannot be deleted"
  ON health_check_reports
  FOR DELETE
  USING (false);

-- Comment on table
COMMENT ON TABLE health_check_reports IS 'Stores AI-generated project health check analysis reports with unique shareable links';
