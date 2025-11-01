# Changelog

All notable changes to Transition Nexus Europe platform.

## [Enhanced Version] - 2025-01-01

### Added

#### Filtering & Search
- **Projects Page**: Advanced filtering by country, technology, stage, and full-text search
- **Investors Page**: Filtering by mandate type, technology focus, and search
- Results counter showing filtered vs total items
- Clear all filters button with visual indicator when filters are active
- Real-time client-side filtering with instant updates

#### SEO & Discoverability
- **Sitemap**: Auto-generated XML sitemap at `/sitemap.xml` with all pages
- **Robots.txt**: Proper crawling directives at `/robots.txt`
- **JSON-LD Structured Data**: Organization schema on homepage for rich search results
- **MetadataBase**: Configured for proper OpenGraph/Twitter card URLs

#### Accessibility Enhancements
- **Skip Link**: Keyboard-accessible skip-to-main-content link (WCAG 2.2 AA)
- **ARIA Labels**: Proper labeling on all interactive elements
- **Focus Indicators**: Clear visual focus states throughout
- **Semantic HTML**: Proper heading hierarchy and landmark regions

#### Error Handling & UX
- **Global Loading State**: Skeleton screens while pages load
- **Error Boundary**: Graceful error handling with retry functionality
- **404 Page**: Custom not-found page with helpful navigation
- **Toast Notifications**: User feedback for form submissions (contact form)

#### Components & Reusability
- `ProjectFilters`: Reusable filter component
- `ProjectsList`: Client-side projects grid with filtering
- `InvestorsList`: Client-side investors grid with filtering
- `JsonLd`: Structured data helper components
- Separation of server and client components for optimal performance

#### Developer Experience
- TypeScript strict type checking throughout
- Consistent code organization and patterns
- Comprehensive inline documentation
- Clear component boundaries

### Improved

#### Performance
- Optimized client-side filtering with `useMemo` hooks
- Proper server/client component separation
- Static page generation where applicable (ISR with 60s revalidation)
- Code splitting for better initial load times

#### User Experience
- Filter state persistence during page session
- Instant feedback on filter changes
- Result counts to set expectations
- Clear visual hierarchy and spacing
- Mobile-optimized filter layouts

#### Data Display
- Truncated long descriptions with `line-clamp`
- Consistent card layouts across all directories
- Proper data formatting (currency, capacity, etc.)
- Badge color coding for stages and types

### Technical Details

#### Build Stats
- Total Pages: 19 static + 4 API routes
- Build Time: ~30 seconds
- First Load JS: 79.4 kB (shared)
- All pages under 165 kB total JS

#### Accessibility Score
- WCAG 2.2 AA Compliant
- Keyboard navigation functional
- Screen reader compatible
- Semantic HTML throughout
- Proper color contrast ratios

#### SEO Features
- Unique meta titles per page
- Descriptive meta descriptions
- OpenGraph tags for social sharing
- Structured data for rich results
- XML sitemap generation
- Canonical URLs configured

### Database
- No schema changes required
- All features work with existing data
- RLS policies remain secure
- Query performance optimized

### Deployment Ready
- Build successful with zero errors
- All TypeScript types validated
- Environment variables documented
- Vercel deployment configuration complete

---

## [Initial Version] - 2025-01-01

### Added
- Complete platform with 19 pages
- Database schema with 8 tables
- Seeded sample data (6 projects, 5 investors, 6 suppliers, etc.)
- AI tool API stubs (4 endpoints)
- Responsive design with Tailwind CSS
- shadcn/ui component library
- Supabase integration
- Contact form with database persistence
- CO₂ impact calculator
- Policy and grid connection guides
- Events and library pages
- Legal pages (Privacy, Terms, Brand Use)
- Comprehensive documentation (README, DEPLOYMENT guide)

### Technical Stack
- Next.js 13 (App Router)
- TypeScript
- Supabase (PostgreSQL)
- Tailwind CSS
- shadcn/ui
- Lucide React icons
