/*
  # Add INSERT Policies for Seeding

  Add INSERT policies to allow data seeding and management.
  These policies allow anyone to insert data (for seeding purposes).
  In production, these would be restricted to authenticated admin users.
*/

CREATE POLICY "Allow insert for projects"
  ON projects FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert for investors"
  ON investors FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert for suppliers"
  ON suppliers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert for policy briefs"
  ON policy_briefs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert for grid briefs"
  ON grid_briefs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert for events"
  ON events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow insert for library items"
  ON library_items FOR INSERT
  WITH CHECK (true);