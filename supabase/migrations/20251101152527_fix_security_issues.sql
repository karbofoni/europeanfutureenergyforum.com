/*
  # Fix Security Issues

  1. Move vector extension from public to extensions schema
  2. Remove unused indexes to improve performance and reduce maintenance overhead

  ## Changes
    - Move vector extension to extensions schema
    - Drop unused embedding indexes (not being used for vector search yet)
    - Drop unused filter indexes on projects, investors, and suppliers
    - Drop unused AI analytics indexes

  ## Security
    - Extensions should not be in public schema per best practices
    - Unused indexes can be re-added when features are implemented
*/

-- Move vector extension from public to extensions schema
DROP EXTENSION IF EXISTS vector CASCADE;
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- Drop unused embedding indexes (can be re-added when vector search is implemented)
DROP INDEX IF EXISTS public.investors_embedding_idx;
DROP INDEX IF EXISTS public.suppliers_embedding_idx;
DROP INDEX IF EXISTS public.projects_embedding_idx;

-- Drop unused AI usage log indexes (can be re-added when analytics queries need them)
DROP INDEX IF EXISTS public.idx_ai_usage_feature;
DROP INDEX IF EXISTS public.idx_ai_usage_success;
DROP INDEX IF EXISTS public.idx_ai_usage_cost;

-- Drop unused filter indexes (can be re-added when filtering features are implemented)
DROP INDEX IF EXISTS public.idx_projects_country;
DROP INDEX IF EXISTS public.idx_projects_technology;
DROP INDEX IF EXISTS public.idx_projects_stage;
DROP INDEX IF EXISTS public.idx_investors_geographies;
DROP INDEX IF EXISTS public.idx_suppliers_role;