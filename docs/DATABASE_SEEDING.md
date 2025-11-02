# Database Seeding Guide

## Overview

The project includes automated database seeding to keep the Supabase database populated with sample data for projects, investors, suppliers, events, library items, policy briefs, and grid briefs.

## Manual Seeding (Local Development)

To manually seed the database locally:

```bash
npm run seed
```

This will:
- Read credentials from your `.env` file
- Connect to Supabase
- Insert sample data into all tables
- Report success/errors for each table

**Note:** You may see duplicate key errors for policy briefs and grid briefs - this is normal if they already exist.

## Automated Seeding (GitHub Actions)

The database is automatically seeded every **Monday at 2 AM UTC** via GitHub Actions.

### Workflow File

Location: `.github/workflows/seed-database.yml`

### Schedule

- **Automatic:** Every Monday at 2 AM UTC
- **Manual:** Can be triggered manually from GitHub Actions tab
- **Frequency Rationale:** Weekly is sufficient since the data is manually curated and doesn't change frequently

### How It Works

1. GitHub Actions workflow triggers on schedule or manual dispatch
2. Checks out the code
3. Sets up Node.js 18
4. Installs dependencies
5. Runs `npm run seed` with Supabase credentials from GitHub secrets
6. Reports success or failure

### Required GitHub Secrets

For automated seeding to work, these secrets must be configured in your GitHub repository:

1. Go to: **Repository Settings → Secrets and variables → Actions**
2. Add the following secrets:

| Secret Name | Description |
|-------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

**Note:** These should already be configured if you've deployed to Netlify, as they're the same credentials used for the application.

### Verifying Secrets

To check if secrets are configured:
1. Go to: **Repository → Settings → Secrets and variables → Actions**
2. Look for the two secrets listed above
3. If missing, click "New repository secret" and add them

### Manual Trigger

To manually trigger the seeding workflow:

1. Go to: **Repository → Actions**
2. Click on "Seed Database" workflow
3. Click "Run workflow" button
4. Select branch (usually `main`)
5. Click "Run workflow"

### Viewing Logs

To see seeding results:
1. Go to: **Repository → Actions**
2. Click on the latest "Seed Database" workflow run
3. Click on the "seed" job
4. Expand "Run database seed" step to see output

## Seed Data Contents

The seed script (`scripts/seed.ts`) currently includes:

- **30 Projects** - Renewable energy projects across 15 European countries
- **20 Investors** - Various investment strategies and ticket sizes
- **6 Suppliers** - Equipment and service suppliers
- **1 Event** - Sample industry event
- **3 Library Items** - Sample reports and guides
- **Policy Briefs** - For Spain, Germany, France with real policy links
- **Grid Briefs** - Grid connection guides for major European TSOs/DSOs

## Customizing the Schedule

To change the seeding frequency, edit `.github/workflows/seed-database.yml`:

```yaml
on:
  schedule:
    # Change this cron expression
    # Currently: Every Monday at 2 AM UTC
    - cron: '0 2 * * 1'
```

### Cron Expression Examples

- Every day at 2 AM: `0 2 * * *`
- Every week on Sunday: `0 2 * * 0`
- First day of month: `0 2 1 * *`
- Every 6 hours: `0 */6 * * *`

**Recommendation:** Keep it weekly or less frequent since the data is manually curated.

## Troubleshooting

### Seed fails with "Missing Supabase environment variables"

**Solution:** Check that GitHub secrets are properly configured (see "Required GitHub Secrets" section).

### Duplicate key errors

**Expected:** Policy briefs and grid briefs have unique constraints on the country column. If they already exist, you'll see duplicate key errors - this is normal and can be ignored.

### Local seed fails

**Solution:** Ensure your `.env` file contains:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Updating Seed Data

To add or modify seed data:

1. Edit `scripts/seed.ts`
2. Add/modify items in the appropriate arrays (projects, investors, etc.)
3. Test locally: `npm run seed`
4. Commit and push changes
5. The updated data will be seeded on the next scheduled run (or manually trigger it)

## Security Note

The seed script uses the **anon key**, not the service role key. This means:
- It respects Row Level Security (RLS) policies
- It can only perform operations allowed by your Supabase RLS policies
- It's safe to run in public CI/CD environments

If you need to bypass RLS for seeding, you would need to use the service role key, but this should be stored as a separate secret and used carefully.
