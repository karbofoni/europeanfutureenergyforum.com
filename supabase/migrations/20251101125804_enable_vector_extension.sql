/*
  # Enable pgvector for AI embeddings

  1. Extensions
    - Enable pgvector extension for vector similarity search
  
  2. New Columns
    - Add embedding columns to projects, investors, suppliers tables
    - These will store OpenAI text-embedding-3-small vectors (1536 dimensions)
  
  3. Indexes
    - Add vector similarity search indexes for fast matching
*/

CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE projects ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE investors ADD COLUMN IF NOT EXISTS embedding vector(1536);
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS embedding vector(1536);

CREATE INDEX IF NOT EXISTS projects_embedding_idx ON projects 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

CREATE INDEX IF NOT EXISTS investors_embedding_idx ON investors 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

CREATE INDEX IF NOT EXISTS suppliers_embedding_idx ON suppliers 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);