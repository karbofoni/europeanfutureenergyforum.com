import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env');
const envContent = readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};

envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Seeding database...');

  const projects = [
    {
      title: 'Valencia Solar Park',
      summary: 'Ground-mounted solar PV facility with 150 MW capacity in Valencia region',
      country: 'ES',
      technology: 'Solar',
      stage: 'Permitting',
      size_mw: 150,
      capex_eur: 120000000,
      grid_status: 'Grid application submitted',
      owner_type: 'Independent Developer',
      expected_cf: 0.22,
      tags: ['PV', 'Utility-Scale', 'Spain'],
    },
    {
      title: 'Baltic Offshore Wind Farm',
      summary: '500 MW offshore wind project in the Baltic Sea',
      country: 'DE',
      technology: 'Wind',
      stage: 'Construction',
      size_mw: 500,
      capex_eur: 1500000000,
      grid_status: 'Grid connection secured',
      owner_type: 'Consortium',
      expected_cf: 0.45,
      tags: ['Offshore Wind', 'Germany', 'Large-Scale'],
    },
    {
      title: 'Lyon Battery Storage',
      summary: '50 MW / 100 MWh lithium-ion battery storage facility',
      country: 'FR',
      technology: 'Storage',
      stage: 'Operational',
      size_mw: 50,
      capex_eur: 40000000,
      grid_status: 'Connected',
      owner_type: 'Utility',
      expected_cf: 0.85,
      tags: ['Battery', 'Storage', 'France', 'Operational'],
    },
    {
      title: 'Danube Hydro Upgrade',
      summary: 'Upgrade and expansion of existing run-of-river hydro plant',
      country: 'AT',
      technology: 'Hydro',
      stage: 'Feasibility',
      size_mw: 25,
      capex_eur: 35000000,
      grid_status: 'Existing connection',
      owner_type: 'Municipal Utility',
      expected_cf: 0.55,
      tags: ['Hydro', 'Upgrade', 'Austria'],
    },
    {
      title: 'Hamburg Green Hydrogen Hub',
      summary: '100 MW electrolyzer for green hydrogen production',
      country: 'DE',
      technology: 'Hydrogen',
      stage: 'Permitting',
      size_mw: 100,
      capex_eur: 200000000,
      grid_status: 'Grid capacity reserved',
      owner_type: 'Industrial Partnership',
      expected_cf: 0.70,
      tags: ['Hydrogen', 'Electrolyzer', 'Germany', 'Industrial'],
    },
    {
      title: 'Milan Industrial Efficiency Program',
      summary: 'Combined heat and power efficiency upgrades across 10 industrial sites',
      country: 'IT',
      technology: 'Efficiency',
      stage: 'Construction',
      size_mw: 30,
      capex_eur: 25000000,
      grid_status: 'N/A',
      owner_type: 'Corporate',
      expected_cf: 0.80,
      tags: ['Efficiency', 'CHP', 'Italy', 'Industrial'],
    },
  ];

  const investors = [
    {
      name: 'Alpine Energy Partners',
      summary: 'Mid-market infrastructure fund focusing on renewable energy across Central Europe',
      ticket_min_eur: 10000000,
      ticket_max_eur: 50000000,
      geographies: ['DE', 'AT', 'CH', 'IT'],
      tech_focus: ['Solar', 'Wind', 'Hydro'],
      mandate_types: ['Equity', 'Mezz'],
      irr_target: 12,
      tags: ['Infrastructure', 'Mid-Market'],
    },
    {
      name: 'Green Transition Fund II',
      summary: 'Project finance provider for utility-scale solar and wind in Southern Europe',
      ticket_min_eur: 50000000,
      ticket_max_eur: 300000000,
      geographies: ['ES', 'PT', 'IT', 'GR'],
      tech_focus: ['Solar', 'Wind'],
      mandate_types: ['Project Finance'],
      irr_target: 8,
      tags: ['Project Finance', 'Large-Scale'],
    },
    {
      name: 'Nordic Clean Capital',
      summary: 'Early-stage equity investor in emerging clean energy technologies',
      ticket_min_eur: 1000000,
      ticket_max_eur: 15000000,
      geographies: ['SE', 'NO', 'DK', 'FI'],
      tech_focus: ['Hydrogen', 'Storage', 'Efficiency'],
      mandate_types: ['Equity'],
      irr_target: 20,
      tags: ['Early-Stage', 'Technology-Focused'],
    },
    {
      name: 'EU Transition Grant Facility',
      summary: 'Grant co-funding for innovative renewable projects with policy alignment',
      ticket_min_eur: 500000,
      ticket_max_eur: 10000000,
      geographies: ['All EU'],
      tech_focus: ['Solar', 'Wind', 'Hydrogen', 'Storage', 'Efficiency'],
      mandate_types: ['Grants'],
      tags: ['Grants', 'Innovation'],
    },
    {
      name: 'Baltic Infrastructure Investors',
      summary: 'Long-term equity partner for operational and near-operational assets',
      ticket_min_eur: 20000000,
      ticket_max_eur: 100000000,
      geographies: ['PL', 'LT', 'LV', 'EE'],
      tech_focus: ['Wind', 'Solar', 'Storage'],
      mandate_types: ['Equity'],
      irr_target: 10,
      tags: ['Operational', 'Long-Term'],
    },
  ];

  const suppliers = [
    {
      name: 'SolarBuild Europe',
      role: 'EPC',
      summary: 'Full-service EPC contractor for utility-scale solar projects',
      geographies: ['ES', 'PT', 'IT', 'FR', 'GR'],
      technologies: ['Solar'],
      capacity_mw_py: 800,
      credentials: [
        { name: 'ISO 9001', issuer: 'ISO', year: 2023 },
        { name: 'ISO 14001', issuer: 'ISO', year: 2023 },
      ],
      tags: ['Solar EPC', 'Utility-Scale'],
    },
    {
      name: 'WindTech Systems',
      role: 'OEM',
      summary: 'Manufacturer of onshore and offshore wind turbines, 5-15 MW class',
      geographies: ['All EU'],
      technologies: ['Wind'],
      capacity_mw_py: 2000,
      credentials: [
        { name: 'IEC 61400 Certification', issuer: 'IEC', year: 2024 },
      ],
      tags: ['Wind Turbines', 'OEM'],
    },
    {
      name: 'GreenGrid Consulting',
      role: 'Consulting',
      summary: 'Grid integration and permitting advisory for renewable projects',
      geographies: ['DE', 'NL', 'BE', 'DK', 'AT'],
      technologies: ['Solar', 'Wind', 'Storage', 'Hydrogen'],
      tags: ['Consulting', 'Grid', 'Permitting'],
    },
    {
      name: 'HydroCell Technologies',
      role: 'OEM',
      summary: 'Electrolyzer and fuel cell manufacturer for green hydrogen applications',
      geographies: ['All EU'],
      technologies: ['Hydrogen'],
      capacity_mw_py: 500,
      credentials: [
        { name: 'PED Certification', issuer: 'EU', year: 2024 },
      ],
      tags: ['Hydrogen', 'Electrolyzer', 'OEM'],
    },
    {
      name: 'BatteryStore Solutions',
      role: 'EPC',
      summary: 'Turnkey battery storage system integrator',
      geographies: ['UK', 'IE', 'FR', 'BE', 'NL'],
      technologies: ['Storage'],
      capacity_mw_py: 300,
      credentials: [
        { name: 'ISO 9001', issuer: 'ISO', year: 2023 },
      ],
      tags: ['Battery', 'Storage', 'EPC'],
    },
    {
      name: 'EuroEnergy Advisory',
      role: 'Consulting',
      summary: 'Financial modeling, due diligence, and transaction advisory for energy projects',
      geographies: ['All EU'],
      technologies: ['Solar', 'Wind', 'Storage', 'Hydro', 'Hydrogen', 'Efficiency'],
      tags: ['Financial Advisory', 'Due Diligence'],
    },
  ];

  const policyBriefs = [
    {
      country: 'ES',
      country_name: 'Spain',
      incentives: [
        {
          name: 'PERTE Renovables',
          description: 'Strategic project for renewable energy and green hydrogen',
          eligibility: 'Projects above 5 MW with domestic content requirements',
          amount: 'Up to 30% CAPEX grant',
        },
      ],
      permitting_steps: [
        {
          step: 1,
          name: 'Environmental Impact Assessment',
          description: 'Submit EIA documentation to regional authority',
          typical_duration: '6-12 months',
          agency: 'Regional Environmental Agency',
        },
        {
          step: 2,
          name: 'Grid Access Permit',
          description: 'Apply for grid connection point and capacity allocation',
          typical_duration: '3-6 months',
          agency: 'Red Eléctrica de España',
        },
        {
          step: 3,
          name: 'Construction Permit',
          description: 'Obtain local construction authorization',
          typical_duration: '2-4 months',
          agency: 'Municipal Authority',
        },
      ],
      avg_lead_times: {
        solar: '12-18 months',
        wind: '18-36 months',
      },
      agencies: [
        { name: 'MITECO', role: 'National energy and environment ministry', website: 'miteco.gob.es' },
        { name: 'IDAE', role: 'Energy efficiency and renewable promotion', website: 'idae.es' },
      ],
      sources: [
        { title: 'Spanish Renewable Energy Law', url: '#' },
      ],
    },
    {
      country: 'DE',
      country_name: 'Germany',
      incentives: [
        {
          name: 'EEG Feed-in Premium',
          description: 'Market premium for renewable electricity',
          eligibility: 'Competitive auction participation',
          amount: 'Variable, auction-determined',
        },
        {
          name: 'H2Global Program',
          description: 'Support for green hydrogen imports and domestic production',
          eligibility: 'Hydrogen projects with verified green credentials',
          amount: 'Price differential contracts',
        },
      ],
      permitting_steps: [
        {
          step: 1,
          name: 'BImSchG Approval',
          description: 'Federal Immission Control Act permit for large installations',
          typical_duration: '6-12 months',
          agency: 'State Environmental Authority',
        },
        {
          step: 2,
          name: 'Grid Connection Agreement',
          description: 'Secure connection with TSO or DSO',
          typical_duration: '4-8 months',
          agency: 'Transmission/Distribution System Operator',
        },
        {
          step: 3,
          name: 'Building Permit',
          description: 'Local construction authorization',
          typical_duration: '2-3 months',
          agency: 'Local Building Authority',
        },
      ],
      avg_lead_times: {
        solar: '10-16 months',
        wind: '24-48 months',
        hydrogen: '18-30 months',
      },
      agencies: [
        { name: 'BMWi', role: 'Federal Ministry for Economic Affairs and Energy', website: 'bmwk.de' },
        { name: 'BNetzA', role: 'Federal Network Agency', website: 'bundesnetzagentur.de' },
      ],
      sources: [
        { title: 'EEG 2023 Amendment', url: '#' },
      ],
    },
    {
      country: 'FR',
      country_name: 'France',
      incentives: [
        {
          name: 'CRE Tender Program',
          description: 'Competitive tenders for renewable projects',
          eligibility: 'Projects above threshold capacity',
          amount: 'Auction-determined feed-in tariff',
        },
      ],
      permitting_steps: [
        {
          step: 1,
          name: 'Environmental Authorization',
          description: 'Unified environmental permit (permis environnemental unique)',
          typical_duration: '9-12 months',
          agency: 'Prefect / DREAL',
        },
        {
          step: 2,
          name: 'Grid Connection',
          description: 'Proposal and agreement with Enedis/RTE',
          typical_duration: '4-6 months',
          agency: 'Enedis or RTE',
        },
        {
          step: 3,
          name: 'Building Permit',
          description: 'Local construction permit (permis de construire)',
          typical_duration: '2-3 months',
          agency: 'Municipal Authority',
        },
      ],
      avg_lead_times: {
        solar: '12-18 months',
        wind: '24-36 months',
      },
      agencies: [
        { name: 'CRE', role: 'Energy Regulatory Commission', website: 'cre.fr' },
        { name: 'ADEME', role: 'Ecological Transition Agency', website: 'ademe.fr' },
      ],
      sources: [
        { title: 'French Energy Transition Law', url: '#' },
      ],
    },
  ];

  const gridBriefs = [
    {
      country: 'ES',
      country_name: 'Spain',
      steps: [
        {
          step: 1,
          name: 'Pre-application Consultation',
          description: 'Discuss project with TSO/DSO',
          typical_duration: '1 month',
        },
        {
          step: 2,
          name: 'Grid Access Request',
          description: 'Formal application and capacity check',
          typical_duration: '3-6 months',
        },
        {
          step: 3,
          name: 'Connection Agreement',
          description: 'Sign agreement and pay deposits',
          typical_duration: '2-3 months',
        },
        {
          step: 4,
          name: 'Construction and Commissioning',
          description: 'Build connection assets and test',
          typical_duration: '6-12 months',
        },
      ],
      lead_time_min_months: 12,
      lead_time_max_months: 24,
      queue_notes: 'Significant queue in high-generation areas; prioritization for storage',
      documents: [
        { name: 'Technical Project Description', description: 'Detailed technical specs and layout' },
        { name: 'Land Rights Documentation', description: 'Proof of land control or easements' },
        { name: 'Environmental Clearance', description: 'EIA approval certificate' },
      ],
      sources: [
        { title: 'REE Grid Connection Guide', url: '#' },
      ],
    },
    {
      country: 'DE',
      country_name: 'Germany',
      steps: [
        {
          step: 1,
          name: 'Informal Inquiry',
          description: 'Initial capacity and feasibility check',
          typical_duration: '1 month',
        },
        {
          step: 2,
          name: 'Formal Application',
          description: 'Submit full connection request',
          typical_duration: '4-6 months',
        },
        {
          step: 3,
          name: 'Connection Offer',
          description: 'Receive and accept connection terms',
          typical_duration: '2-4 months',
        },
        {
          step: 4,
          name: 'Implementation',
          description: 'Build connection infrastructure',
          typical_duration: '12-18 months',
        },
      ],
      lead_time_min_months: 18,
      lead_time_max_months: 36,
      queue_notes: 'North-South bottlenecks; offshore wind has dedicated capacity',
      documents: [
        { name: 'Plant Description', description: 'Technical specs per VDE standards' },
        { name: 'Site Plan', description: 'Detailed layout and grid interface' },
        { name: 'BImSchG Permit', description: 'Environmental approval' },
      ],
      sources: [
        { title: 'BNetzA Connection Guidelines', url: '#' },
      ],
    },
    {
      country: 'FR',
      country_name: 'France',
      steps: [
        {
          step: 1,
          name: 'Pre-study Request',
          description: 'Request grid capacity assessment',
          typical_duration: '1-2 months',
        },
        {
          step: 2,
          name: 'Full Study and Proposal',
          description: 'Detailed technical and cost proposal from TSO/DSO',
          typical_duration: '4-6 months',
        },
        {
          step: 3,
          name: 'Agreement Signature',
          description: 'Sign PTF (Proposal Technique et Financière)',
          typical_duration: '2 months',
        },
        {
          step: 4,
          name: 'Works Execution',
          description: 'Grid reinforcement and connection construction',
          typical_duration: '6-12 months',
        },
      ],
      lead_time_min_months: 13,
      lead_time_max_months: 22,
      queue_notes: 'Regional variations; southern regions have faster timelines',
      documents: [
        { name: 'Project Description', description: 'Technical dossier per NF standards' },
        { name: 'Environmental Authorization', description: 'Permis environnemental unique' },
        { name: 'Land Availability', description: 'Proof of site control' },
      ],
      sources: [
        { title: 'RTE Connection Procedures', url: '#' },
      ],
    },
  ];

  const events = [
    {
      title: 'European Clean Energy Forum 2026',
      description: 'Annual gathering of projects, investors, and policymakers across European renewable energy',
      start_date: '2026-03-15',
      end_date: '2026-03-17',
      location: 'Brussels, Belgium',
      event_type: 'Conference',
      sessions: [
        {
          id: 's1',
          title: 'Offshore Wind: Scaling to 100 GW',
          description: 'Panel on offshore wind targets and supply chain challenges',
          start_time: '2026-03-15T09:00:00',
          end_time: '2026-03-15T10:30:00',
          track: 'Technology',
          speakers: ['Jane Doe', 'John Smith'],
        },
        {
          id: 's2',
          title: 'Green Hydrogen Economics',
          description: 'Current costs, subsidies, and pathways to competitiveness',
          start_time: '2026-03-15T11:00:00',
          end_time: '2026-03-15T12:30:00',
          track: 'Market',
          speakers: ['Maria Garcia', 'Lars Nielsen'],
        },
        {
          id: 's3',
          title: 'Permitting Reform: Progress and Gaps',
          description: 'Update on EU and member-state permitting acceleration',
          start_time: '2026-03-15T14:00:00',
          end_time: '2026-03-15T15:30:00',
          track: 'Policy',
          speakers: ['Policy Expert 1', 'Policy Expert 2'],
        },
      ],
      tags: ['Conference', 'Brussels', '2026'],
    },
  ];

  const libraryItems = [
    {
      title: 'Understanding EU Renewable Energy Directive (RED III)',
      summary: 'Plain-English breakdown of the revised Renewable Energy Directive and its implications for project developers',
      content: 'The EU Renewable Energy Directive (RED III) sets binding targets for renewable energy across member states. Key updates include accelerated permitting timelines (maximum 12 months for solar, 24 months for wind in designated areas), mandatory go-to areas for renewables, and strengthened sustainability criteria. For developers, this means streamlined processes in designated zones, but stricter environmental safeguards. Member states must transpose RED III by mid-2024, with implementation timelines varying by country. Practical impact: Projects in designated renewable acceleration areas benefit from presumed public interest and simplified environmental assessments.',
      item_type: 'Brief',
      read_time_minutes: 2,
      tags: ['Policy', 'EU', 'Permitting'],
    },
    {
      title: 'Grid Connection Queue Management Across Europe',
      summary: 'Comparative analysis of how different countries handle grid connection applications and queue priorities',
      content: 'Grid connection queues vary significantly across Europe. Germany employs a first-come-first-served model with conditional milestones, while Spain recently reformed its system to prioritize projects with advanced development status. France uses a mixed approach with regional capacity allocation. Key insight: Storage projects are increasingly receiving priority treatment due to grid stabilization benefits. Best practice for developers: secure grid capacity early, maintain milestone compliance, and consider hybrid projects (solar + storage) for preferential treatment. Typical queue times range from 12 months (France, distribution level) to 36+ months (Germany, transmission level).',
      item_type: 'Brief',
      read_time_minutes: 2,
      tags: ['Grid', 'Infrastructure', 'Permitting'],
    },
    {
      title: 'Green Hydrogen Production Costs: 2024 Benchmark',
      summary: 'Current levelized cost breakdown for electrolytic hydrogen production in Europe',
      content: 'As of 2024, green hydrogen production costs in Europe range from €4-7/kg depending on electricity prices, electrolyzer efficiency, and utilization rates. Key cost drivers: renewable electricity (50-60% of LCOH), electrolyzer CAPEX (25-30%), and O&M (10-15%). Costs are falling rapidly—electrolyzer prices dropped 40% since 2020. Pathways to competitiveness: securing low-cost PPAs (target <€30/MWh), achieving high capacity factors (>4,000 hours/year), and accessing grant support (IPCEI, H2Global). Projects with co-located renewables and merchant offtake are reaching €3.5-4.5/kg in Iberia and Northern Europe. Policy support remains critical—most projects rely on CAPEX grants or price guarantees to close the gap with grey hydrogen (€1.5-2.5/kg).',
      item_type: 'Brief',
      read_time_minutes: 3,
      tags: ['Hydrogen', 'Economics', 'Technology'],
    },
  ];

  const { error: projectsError } = await supabase.from('projects').insert(projects);
  if (projectsError) console.error('Projects error:', projectsError);
  else console.log(`✓ Inserted ${projects.length} projects`);

  const { error: investorsError } = await supabase.from('investors').insert(investors);
  if (investorsError) console.error('Investors error:', investorsError);
  else console.log(`✓ Inserted ${investors.length} investors`);

  const { error: suppliersError } = await supabase.from('suppliers').insert(suppliers);
  if (suppliersError) console.error('Suppliers error:', suppliersError);
  else console.log(`✓ Inserted ${suppliers.length} suppliers`);

  const { error: policyError } = await supabase.from('policy_briefs').insert(policyBriefs);
  if (policyError) console.error('Policy briefs error:', policyError);
  else console.log(`✓ Inserted ${policyBriefs.length} policy briefs`);

  const { error: gridError } = await supabase.from('grid_briefs').insert(gridBriefs);
  if (gridError) console.error('Grid briefs error:', gridError);
  else console.log(`✓ Inserted ${gridBriefs.length} grid briefs`);

  const { error: eventsError } = await supabase.from('events').insert(events);
  if (eventsError) console.error('Events error:', eventsError);
  else console.log(`✓ Inserted ${events.length} events`);

  const { error: libraryError } = await supabase.from('library_items').insert(libraryItems);
  if (libraryError) console.error('Library items error:', libraryError);
  else console.log(`✓ Inserted ${libraryItems.length} library items`);

  console.log('✅ Seeding complete!');
}

seed().catch(console.error);
