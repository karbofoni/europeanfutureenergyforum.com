import type { HealthCheckResult, ProjectHealthCheckInput } from '@/types/health-check';

// Sample project for demo and quick-fill
export const EXAMPLE_PROJECT: ProjectHealthCheckInput = {
  technology: 'Solar',
  country: 'Germany',
  capacity_mw: 50,
  stage: 'Permitting',
  capex_eur: 50000000,
  expected_irr: 8.5,
  revenue_model: 'PPA',
  ppa_status: 'Negotiation',
  grid_status: 'Application Submitted',
  permit_status: 'In Progress',
  expected_cod: '2026-06',
  team_experience: '2-5 Projects',
  land_status: 'Leased',
  financing_status: 'Searching',
  offtaker_name: 'Deutsche Bahn',
};

// Pre-generated demo report for showcase
export const DEMO_REPORT: HealthCheckResult = {
  report_id: 'DEMO-2025-SAMPLE',
  created_at: new Date().toISOString(),
  overall_score: 68,
  score_category: 'Good',
  quick_summary: [
    'Strong technical foundation with experienced developer team and appropriate technology choice',
    'Financial structure shows competitive CAPEX (€1M/MW) and realistic IRR expectations for German market',
    'Development timeline is ambitious but achievable given current permitting progress',
    'Grid connection timeline presents moderate risk - Germany averages 2-4 years for applications',
  ],
  category_scores: {
    technical: {
      score: 75,
      summary: 'Solar PV technology is mature and well-suited for German market. Capacity sizing is appropriate for utility-scale development.',
      key_findings: [
        '50MW capacity aligns with typical German solar farm economics',
        'Technology choice matches regional solar irradiation levels (1,000-1,200 kWh/m²/year)',
        'Expected capacity factor of 11-13% is realistic for German solar',
      ],
      concerns: [
        'Solar resource in Germany is moderate compared to Southern Europe',
        'Performance warranty terms should account for lower irradiation',
      ],
      grade: 'Good',
    },
    financial: {
      score: 72,
      summary: 'CAPEX of €1M/MW is within market range. IRR expectation of 8.5% is realistic for German PPA-backed projects.',
      key_findings: [
        'CAPEX benchmarks favorably (market range: €800k-1.2M/MW)',
        'IRR target aligns with European utility solar returns (7-10%)',
        'PPA revenue model provides stable cash flow foundation',
      ],
      concerns: [
        'German PPA prices have compressed in 2024-2025',
        'O&M cost assumptions should be validated for German climate',
      ],
      grade: 'Good',
    },
    legal: {
      score: 58,
      summary: 'Permitting is in progress but not yet secured. Land status is solid with long-term lease. Grid queue position unclear.',
      key_findings: [
        'Land secured via long-term lease reduces execution risk',
        'Deutsche Bahn as offtaker is investment-grade (strong creditworthiness)',
      ],
      concerns: [
        'Building permits not yet obtained - major execution risk',
        'Grid connection application submitted but timeline uncertain (2-4 years typical)',
        'EIA approval status unknown',
      ],
      grade: 'Fair',
    },
    market: {
      score: 70,
      summary: 'German solar market is mature with stable policy support. PPA negotiation with Deutsche Bahn is positive signal.',
      key_findings: [
        'Germany has strong renewable energy targets (80% by 2030)',
        'Corporate PPA market is active and growing',
        'Deutsche Bahn is reputable offtaker actively sourcing renewables',
      ],
      concerns: [
        'PPA pricing pressure due to increasing solar capacity in Germany',
        'Cannibalization risk during midday hours with high solar penetration',
      ],
      grade: 'Good',
    },
    development: {
      score: 65,
      summary: 'Developer has relevant experience (2-5 projects delivered). Timeline to 2026 COD is achievable but tight.',
      key_findings: [
        'Team has delivered multiple projects, reducing execution risk',
        'Timeline allows for reasonable construction period (12-15 months)',
      ],
      concerns: [
        'Permitting timeline is aggressive for Germany (typically 18-24 months)',
        'Grid connection approval could delay COD significantly',
        'Financing not yet secured - requires additional effort',
      ],
      grade: 'Fair',
    },
  },
  red_flags: [
    {
      severity: 'warning',
      title: 'Grid Connection Timeline Risk',
      description: 'Grid application submitted but approval pending. German TSOs currently have 2-4 year backlogs.',
      impact: 'COD could slip to 2027-2028 if grid approval is delayed. This would impact PPA economics and investor returns.',
      recommendations: [
        'Request TSO for estimated approval timeline and queue position',
        'Consider backup interconnection points or grid capacity alternatives',
        'Build grid delay contingency into project schedule and financial model',
      ],
    },
    {
      severity: 'warning',
      title: 'Permitting Not Yet Secured',
      description: 'Building permits are still in progress. German permitting involves BImSchG procedures which can be unpredictable.',
      impact: 'Without permits, project cannot reach FID or begin construction. Delays are common.',
      recommendations: [
        'Engage actively with local authorities to expedite review',
        'Ensure all environmental assessments are complete and compliant',
        'Consider parallel track for any missing documentation',
      ],
    },
    {
      severity: 'advisory',
      title: 'Financing Not Yet Secured',
      description: 'Project is still searching for financing. This is normal for permitting stage but needs active progress.',
      impact: 'Financial close typically takes 3-6 months after permits are secured. Delay could push COD.',
      recommendations: [
        'Begin debt advisor engagement to prepare financing package',
        'Prepare investor-ready data room with all permits, PPA terms, and technical studies',
        'Consider bridge equity or development capital to maintain momentum',
      ],
    },
  ],
  recommendations: [
    'Focus immediately on securing building permits and grid connection approval - these are your critical path items',
    'Strengthen relationship with Deutsche Bahn and work toward PPA signature to de-risk revenue stream',
    'Engage financial advisor now to prepare for capital raise once permits are secured',
    'Conduct grid interconnection study to validate timeline assumptions and identify mitigation options',
    'Develop contingency timeline showing COD scenarios based on grid approval dates (Q4 2025, Q2 2026, Q4 2026)',
    'Prepare investor materials highlighting strong technical/financial fundamentals while being transparent about permitting timeline',
  ],
  benchmarks: [
    {
      metric: 'CAPEX per MW',
      your_value: 1000,
      p25: 850,
      p50: 1000,
      p75: 1150,
      percentile: 50,
      unit: 'k EUR',
    },
    {
      metric: 'Expected IRR',
      your_value: 8.5,
      p25: 7.2,
      p50: 8.3,
      p75: 9.5,
      percentile: 55,
      unit: '%',
    },
  ],
  comparable_projects_count: 18,
  percentile_rank: 62,
  investor_readiness: {
    score: 58,
    completed_milestones: [
      'Land secured (long-term lease)',
      'Technology and capacity sizing validated',
      'Offtaker identified and in negotiation (Deutsche Bahn)',
      'Grid connection application submitted',
      'Development team with relevant experience',
    ],
    pending_milestones: [
      'Complete building permit applications',
      'Finalize PPA with Deutsche Bahn',
      'Secure grid connection approval',
      'Engage financial advisor for capital raise',
    ],
    critical_gaps: [
      'No building permits obtained yet',
      'Grid connection approval timeline uncertain',
      'Financing package not yet prepared',
      'EIA and environmental permits status unclear',
    ],
  },
  project_data: EXAMPLE_PROJECT,
};
