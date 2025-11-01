# Netlify Deployment Guide

## Prerequisites

- GitHub repository created and code pushed (see GITHUB-SETUP.md)
- Netlify account (free tier works perfectly) - Sign up at https://app.netlify.com/signup

## Step 1: Import Your Project to Netlify

1. Log in to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify to access your GitHub account
5. Select your repository: `transition-nexus-europe` (or whatever you named it)

## Step 2: Configure Build Settings

Netlify should auto-detect Next.js settings, but verify:

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18 (already configured in netlify.toml)

The `netlify.toml` file in your repository already has the correct configuration with the Next.js plugin.

## Step 3: Add Environment Variables

Before deploying, add these environment variables in Netlify:

1. Go to "Site configuration" → "Environment variables"
2. Click "Add a variable" and add each of these:

### Required Variables

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://jiutqbdawjjvvfmnripi.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppdXRxYmRhd2pqdnZmbW5yaXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5OTE5OTQsImV4cCI6MjA3NzU2Nzk5NH0.a04un6kjEDlCcO63IxpWyyDEn_WqSPouL5_Ge1Zt_vc

NEXT_PUBLIC_SITE_URL
Value: https://YOUR-SITE-NAME.netlify.app
(Replace with your actual Netlify domain - you'll update this after first deploy)
```

### Optional Variables (for AI Features)

```
OPENAI_API_KEY
Value: your-openai-api-key
(Only needed if you want to enable AI features like Policy Copilot and Smart Matchmaker)
Get your key from: https://platform.openai.com/api-keys
```

### Optional Analytics Variables

```
NEXT_PUBLIC_ANALYTICS_ID
Value: your-analytics-id
(For Plausible, Google Analytics, etc.)

NEXT_PUBLIC_HCAPTCHA_SITE_KEY
Value: your-hcaptcha-site-key
(For contact form spam protection)

HCAPTCHA_SECRET
Value: your-hcaptcha-secret
```

## Step 4: Deploy

1. Click "Deploy site"
2. Netlify will:
   - Clone your repository
   - Install dependencies
   - Build your Next.js application
   - Deploy to a public URL
3. Wait 2-5 minutes for the build to complete

## Step 5: Update Site URL

After your first deployment:

1. Note your Netlify site URL (e.g., `https://wonderful-site-123456.netlify.app`)
2. Go back to "Site configuration" → "Environment variables"
3. Update `NEXT_PUBLIC_SITE_URL` with your actual Netlify URL
4. Trigger a new deploy: "Deploys" → "Trigger deploy" → "Deploy site"

## Step 6: Optional - Set Up Custom Domain

1. Go to "Domain management" → "Add a domain"
2. Enter your custom domain (e.g., `transitionnexus.eu`)
3. Follow Netlify's instructions to configure DNS:
   - Add A record pointing to Netlify's load balancer
   - Or use Netlify DNS for easier setup
4. Netlify will automatically provision an SSL certificate

## Step 7: Enable Continuous Deployment

Already configured! Every time you push to the `main` branch on GitHub, Netlify will automatically:
- Detect the changes
- Rebuild your site
- Deploy the updated version

## Verify Your Deployment

Once deployed, test your site:

1. Visit your Netlify URL
2. Check these pages work:
   - Home page (/)
   - Projects (/projects)
   - Investors (/investors)
   - Suppliers (/suppliers)
   - Policy (/policy)
   - Contact form (/contact)
3. Verify the Supabase database connection by checking if data loads on pages
4. Test the contact form submission

## Troubleshooting

### Build Fails

- Check the build logs in Netlify's "Deploys" tab
- Common issues:
  - Missing environment variables
  - TypeScript errors (run `npm run typecheck` locally first)
  - Missing dependencies

### Environment Variables Not Working

- Make sure variables starting with `NEXT_PUBLIC_` are spelled correctly
- Redeploy after adding/changing environment variables
- Check the "Environment variables" tab shows all required variables

### Pages Not Loading

- Check browser console for errors
- Verify Supabase URL and anon key are correct
- Check Network tab to see if API calls are failing

### AI Features Not Working

- If you see "AI features unavailable" messages, add your `OPENAI_API_KEY`
- The app is designed to work without AI features - they're optional

## Production Security Checklist

After successful deployment, consider:

- [ ] Review and tighten Supabase RLS policies (currently open for INSERT on most tables)
- [ ] Add rate limiting to API routes
- [ ] Enable hCaptcha on contact form
- [ ] Set up uptime monitoring
- [ ] Configure Netlify's form spam filters
- [ ] Add Netlify Analytics or external analytics

## Monitoring & Maintenance

- Monitor builds: Netlify dashboard → "Deploys"
- Check site analytics: Add analytics integration
- Database monitoring: Supabase dashboard → "Database" → "Logs"
- Error tracking: Consider adding Sentry or similar

## Support & Resources

- Netlify Documentation: https://docs.netlify.com
- Netlify Community: https://answers.netlify.com
- Next.js on Netlify: https://docs.netlify.com/frameworks/next-js/overview/

---

Your Transition Nexus Europe platform is now live and accessible to users worldwide!
