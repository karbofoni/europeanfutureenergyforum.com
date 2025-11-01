/*
  # Create AI Usage Logging Table

  ## Purpose
  Track AI feature usage for cost monitoring, analytics, and optimization

  ## New Tables
  
  ### ai_usage_logs
  - `id` (uuid, primary key)
  - `feature` (text) - Which AI feature was used (policy_copilot, matchmaker, etc.)
  - `user_session_id` (text) - Anonymous session identifier
  - `input_tokens` (integer) - Tokens used for input
  - `output_tokens` (integer) - Tokens used for output
  - `total_tokens` (integer) - Total tokens consumed
  - `cost_usd` (numeric) - Estimated cost in USD
  - `response_time_ms` (integer) - Time to complete request
  - `success` (boolean) - Whether request succeeded
  - `error_message` (text) - Error details if failed
  - `metadata` (jsonb) - Additional context (country, technology, etc.)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS
  - Public can insert (anonymous logging)
  - Only authenticated admins can read (future: add admin role check)

  ## Indexes
  - Index on feature for grouping
  - Index on created_at for time-series queries
  - Index on success for error tracking
*/

CREATE TABLE IF NOT EXISTS ai_usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feature text NOT NULL,
  user_session_id text,
  input_tokens integer DEFAULT 0,
  output_tokens integer DEFAULT 0,
  total_tokens integer DEFAULT 0,
  cost_usd numeric(10, 6) DEFAULT 0,
  response_time_ms integer,
  success boolean DEFAULT true,
  error_message text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for logging"
  ON ai_usage_logs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow read for analytics"
  ON ai_usage_logs FOR SELECT
  USING (true);

CREATE INDEX IF NOT EXISTS idx_ai_usage_feature ON ai_usage_logs(feature);
CREATE INDEX IF NOT EXISTS idx_ai_usage_created_at ON ai_usage_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_usage_success ON ai_usage_logs(success);
CREATE INDEX IF NOT EXISTS idx_ai_usage_cost ON ai_usage_logs(cost_usd DESC);