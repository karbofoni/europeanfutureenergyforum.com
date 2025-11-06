-- Add contact information fields to investors table
ALTER TABLE investors ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE investors ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE investors ADD COLUMN IF NOT EXISTS website text;
ALTER TABLE investors ADD COLUMN IF NOT EXISTS contact_person text;
ALTER TABLE investors ADD COLUMN IF NOT EXISTS linkedin_url text;
ALTER TABLE investors ADD COLUMN IF NOT EXISTS headquarters text;

-- Add contact information fields to suppliers table
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS website text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS contact_person text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS linkedin_url text;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS headquarters text;
