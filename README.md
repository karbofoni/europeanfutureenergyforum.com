# Transition Nexus Europe

A production-ready platform connecting European clean energy projects, investors, and suppliers with transparent data and AI-powered tools.

## 🌟 Features

- **Project Directory**: Browse renewable energy projects across Europe with detailed filters
- **Investor Mandates**: Connect with investors seeking clean energy opportunities
- **Supplier Network**: Find EPCs, OEMs, and consultants
- **Policy Guides**: Plain-English briefs on EU and member-state renewable energy policy
- **Grid Connection Guide**: Understand interconnection processes and timelines
- **CO₂ Impact Calculator**: Calculate carbon abatement with transparent methodology
- **Events Platform**: Discover events and plan meeting schedules
- **Knowledge Library**: Curated briefs, reports, and case studies

### 🤖 **AI-Powered Tools** (NEW!)

- **AI Policy Copilot** ⭐: Real-time Q&A about renewable energy policy, permitting, and incentives in plain English
- **Smart Matchmaker** ⭐: Semantic matching between projects and investors using embeddings
- **Grid Estimator**: Timeline predictions for interconnection processes
- **Event Scheduler**: Intelligent session and meeting recommendations

> **See [AI-FEATURES.md](./AI-FEATURES.md) for detailed documentation**

## 🏗️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL with pgvector)
- **AI**: OpenAI GPT-4o-mini + text-embedding-3-small
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- **OpenAI API key** (for AI features) - Get one at https://platform.openai.com/api-keys

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd project
npm install
```

### 2. Environment Variables

The `.env` file is already configured with Supabase credentials. **Add your OpenAI API key:**

```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# REQUIRED for AI features
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

Optional environment variables:

```env
# Analytics (e.g., Plausible or Google Analytics)
NEXT_PUBLIC_ANALYTICS_ID=

# hCaptcha for form protection
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=
HCAPTCHA_SECRET=
```

> **Note:** AI features will gracefully disable if OPENAI_API_KEY is not set, showing a helpful message instead of crashing.

### 3. Database Setup

The database schema has already been created via Supabase migrations. To seed the database with sample data:

```bash
npx tsx scripts/seed.ts
```

This will populate:
- 6 sample projects (Solar, Wind, Hydro, Storage, Hydrogen, Efficiency)
- 5 investor mandates
- 6 suppliers (EPCs, OEMs, Consultants)
- 3 policy briefs (Spain, Germany, France)
- 3 grid connection guides
- 1 sample event
- 3 library articles

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
/app
  /api/ai          - AI tool API routes (stubs)
  /projects        - Project directory page
  /investors       - Investor mandates page
  /suppliers       - Supplier directory page
  /policy          - Policy briefs page
  /grid            - Grid connection guide page
  /impact          - CO₂ calculator page
  /events          - Events page
  /library         - Knowledge library page
  /about           - About page
  /contact         - Contact form page
  /legal           - Legal pages (Privacy, Terms, Brand Use)

/components
  /ui              - shadcn/ui components
  site-header.tsx  - Main navigation header
  site-footer.tsx  - Footer with links and disclaimer

/lib
  supabase.ts      - Supabase client configuration
  utils.ts         - Utility functions

/types
  database.ts      - Database type definitions
  ai.ts            - AI tool type definitions

/scripts
  seed.ts          - Database seeding script
```

## 🔧 Key Configuration Files

- **`next.config.js`**: Next.js configuration
- **`tailwind.config.ts`**: Tailwind CSS configuration
- **`tsconfig.json`**: TypeScript configuration
- **`.eslintrc.json`**: ESLint rules
- **`components.json`**: shadcn/ui configuration

## 🗄️ Database Schema

All tables have Row Level Security (RLS) enabled:

- **projects**: Renewable energy projects
- **investors**: Investment mandates
- **suppliers**: EPCs, OEMs, consultants
- **policy_briefs**: Country-specific policy guides
- **grid_briefs**: Grid connection processes by country
- **events**: Upcoming events
- **library_items**: Articles, briefs, reports
- **contact_submissions**: Contact form submissions

## 🤖 AI Tools (Stub Implementation)

The following AI tools have stub APIs that return deterministic mock data:

1. **AI Matchmaker** (`/api/ai/match`)
   - Matches projects ↔ investors ↔ suppliers
   - Returns scored matches with transparent reasoning

2. **Policy Copilot** (`/api/ai/policy`)
   - Plain-English Q&A for permitting and eligibility
   - Returns checklists and citations

3. **Grid Estimator** (`/api/ai/grid`)
   - Estimates interconnection timelines
   - Provides step-by-step process guide

4. **Event Scheduler** (`/api/ai/schedule`)
   - Recommends sessions and 1:1 meetings
   - Builds personalized agendas

To integrate real AI/RAG:
- Replace stub logic in `/app/api/ai/*` routes
- Add vector embeddings to Supabase for semantic search
- Integrate with OpenAI, Anthropic, or similar LLM APIs

## 🎨 Design System

- **Colors**: Emerald accent on neutral slate base
- **Typography**: Inter font with proper line heights
- **Spacing**: Consistent 8px grid system
- **Components**: shadcn/ui with custom theming
- **Accessibility**: WCAG 2.2 AA compliant, keyboard navigation, semantic HTML

## 📊 SEO & Metadata

- Unique meta titles and descriptions on every page
- OpenGraph and Twitter card support
- Semantic HTML with proper heading hierarchy
- Server-side rendering for optimal indexing

To add:
- XML sitemap generation
- JSON-LD structured data (Organization, ItemList, Event schemas)
- robots.txt configuration

## 🔒 Security & Privacy

- Row Level Security (RLS) enabled on all database tables
- Public read access for content tables
- Restricted write access (currently open for seeding, should be admin-only in production)
- Contact form submissions have INSERT policy only
- No hardcoded secrets in code
- Environment variables for sensitive data

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The application is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- AWS (Amplify, ECS, etc.)
- Google Cloud Run
- Self-hosted with Node.js

## 📝 Content Management

### Adding Projects, Investors, or Suppliers

1. Use the contact form (stores in `contact_submissions`)
2. Directly insert into Supabase tables (requires appropriate permissions)
3. Build an admin dashboard (future enhancement)

### Updating Policy or Grid Briefs

Update records in `policy_briefs` and `grid_briefs` tables via Supabase dashboard or SQL migrations.

### Adding Library Content

Insert new records into `library_items` table with appropriate metadata.

## 🔮 Future Enhancements

- **Authentication**: Add user accounts for personalized experiences
- **Admin Dashboard**: Content management interface
- **Real AI Integration**: Connect to LLM APIs and vector databases
- **Advanced Filters**: More granular search and filter options
- **Saved Searches**: Allow users to save project/investor searches
- **Email Notifications**: Alert users about new matches
- **Multilingual Support**: i18n implementation (structure is ready)
- **Analytics Dashboard**: User behavior and content metrics
- **API Access**: Public API for programmatic access to data

## 🧪 Testing

To add tests:

```bash
# Install testing libraries
npm install -D @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test
```

## 📄 License

This project is provided as-is for informational and educational purposes.

## 🤝 Contributing

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## ⚠️ Important Disclaimers

**Transition Nexus Europe is an independent initiative.** Not affiliated with any third-party brands or events.

**Information is for informational purposes only.** Not financial, legal, or investment advice. Users must conduct their own due diligence.

**Data accuracy:** While we strive for accuracy, we cannot guarantee the completeness or timeliness of all data. Verify with official sources.

## 📞 Contact

Use the contact form on the platform to get in touch.

---

**Built with ❤️ for the European clean energy community**
