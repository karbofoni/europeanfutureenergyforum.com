-- Add INSERT policies for seeding data
-- These policies allow anyone to insert data for seeding purposes
-- In production, you would want more restrictive policies

CREATE POLICY "Allow insert for projects"
  ON projects FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert for investors"
  ON investors FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert for suppliers"
  ON suppliers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert for policy_briefs"
  ON policy_briefs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert for grid_briefs"
  ON grid_briefs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert for events"
  ON events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert for library_items"
  ON library_items FOR INSERT
  WITH CHECK (true);
