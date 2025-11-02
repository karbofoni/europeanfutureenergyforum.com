const projects = [
  {
    technology: "Wind Onshore",
    country: "Poland",
    capacity_mw: 100,
    stage: "Construction",
    capex_eur: 120000000,
    expected_irr: 9.5,
    revenue_model: "PPA (Power Purchase Agreement)",
    ppa_status: "Signed",
    grid_status: "Secured",
    permit_status: "All Obtained",
    expected_cod: "2025-09",
    team_experience: "5+ Delivered Projects",
    land_status: "Land Leased (Long-term)",
    financing_status: "Closed",
    offtaker_name: "PGE"
  },
  {
    technology: "Solar PV",
    country: "Spain",
    capacity_mw: 200,
    stage: "Development",
    capex_eur: 180000000,
    expected_irr: 11,
    revenue_model: "Merchant (Spot Market)",
    ppa_status: "Not Applicable",
    grid_status: "Application Submitted",
    permit_status: "In Progress",
    expected_cod: "2026-12",
    team_experience: "2-5 Delivered Projects",
    land_status: "Option Agreement",
    financing_status: "Searching for Financing",
    offtaker_name: ""
  },
  {
    technology: "Wind Offshore",
    country: "Denmark",
    capacity_mw: 500,
    stage: "Permitting",
    capex_eur: 1500000000,
    expected_irr: 8,
    revenue_model: "FiT (Feed-in Tariff)",
    ppa_status: "Not Applicable",
    grid_status: "Application Submitted",
    permit_status: "In Progress",
    expected_cod: "2028-06",
    team_experience: "First Project",
    land_status: "Not Applicable",
    financing_status: "Searching for Financing",
    offtaker_name: ""
  },
  {
    technology: "Solar PV",
    country: "Italy",
    capacity_mw: 75,
    stage: "Operational",
    capex_eur: 60000000,
    expected_irr: 10.5,
    revenue_model: "PPA (Power Purchase Agreement)",
    ppa_status: "Signed",
    grid_status: "Connected",
    permit_status: "All Obtained",
    expected_cod: "2024-03",
    team_experience: "5+ Delivered Projects",
    land_status: "Owned",
    financing_status: "Closed",
    offtaker_name: "Enel"
  },
  {
    technology: "Wind Onshore",
    country: "France",
    capacity_mw: 150,
    stage: "Development",
    capex_eur: 180000000,
    expected_irr: 7.5,
    revenue_model: "Hybrid (PPA + Merchant)",
    ppa_status: "Under Negotiation",
    grid_status: "Not Started",
    permit_status: "In Progress",
    expected_cod: "2027-06",
    team_experience: "2-5 Delivered Projects",
    land_status: "Land Leased (Long-term)",
    financing_status: "Searching for Financing",
    offtaker_name: ""
  },
  {
    technology: "Solar PV",
    country: "Portugal",
    capacity_mw: 120,
    stage: "Construction",
    capex_eur: 100000000,
    expected_irr: 12,
    revenue_model: "PPA (Power Purchase Agreement)",
    ppa_status: "Signed",
    grid_status: "Secured",
    permit_status: "All Obtained",
    expected_cod: "2025-12",
    team_experience: "5+ Delivered Projects",
    land_status: "Land Leased (Long-term)",
    financing_status: "Term Sheet",
    offtaker_name: "EDP"
  },
  {
    technology: "Hydro",
    country: "Norway",
    capacity_mw: 80,
    stage: "Permitting",
    capex_eur: 200000000,
    expected_irr: 6.5,
    revenue_model: "Merchant (Spot Market)",
    ppa_status: "Not Applicable",
    grid_status: "Application Submitted",
    permit_status: "In Progress",
    expected_cod: "2029-06",
    team_experience: "2-5 Delivered Projects",
    land_status: "Option Agreement",
    financing_status: "Searching for Financing",
    offtaker_name: ""
  },
  {
    technology: "Solar PV",
    country: "Greece",
    capacity_mw: 60,
    stage: "Permitting",
    capex_eur: 50000000,
    expected_irr: 13,
    revenue_model: "FiT (Feed-in Tariff)",
    ppa_status: "Not Applicable",
    grid_status: "Application Submitted",
    permit_status: "Permitting In Progress",
    expected_cod: "2026-09",
    team_experience: "First Project",
    land_status: "Option Agreement",
    financing_status: "Searching for Financing",
    offtaker_name: ""
  },
  {
    technology: "Wind Onshore",
    country: "Sweden",
    capacity_mw: 200,
    stage: "Construction",
    capex_eur: 240000000,
    expected_irr: 9,
    revenue_model: "PPA (Power Purchase Agreement)",
    ppa_status: "Signed",
    grid_status: "Secured",
    permit_status: "All Obtained",
    expected_cod: "2025-06",
    team_experience: "5+ Delivered Projects",
    land_status: "Land Leased (Long-term)",
    financing_status: "Closed",
    offtaker_name: "Vattenfall"
  },
  {
    technology: "Solar PV",
    country: "Netherlands",
    capacity_mw: 40,
    stage: "Development",
    capex_eur: 35000000,
    expected_irr: 8.5,
    revenue_model: "Hybrid (PPA + Merchant)",
    ppa_status: "Under Negotiation",
    grid_status: "Not Started",
    permit_status: "Not Started",
    expected_cod: "2027-03",
    team_experience: "First Project",
    land_status: "Option Agreement",
    financing_status: "Searching for Financing",
    offtaker_name: ""
  }
];

async function generateReports() {
  console.log('Generating 10 health check reports...\n');

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    console.log(`[${i + 1}/10] Submitting: ${project.technology} ${project.capacity_mw}MW in ${project.country}...`);

    try {
      const response = await fetch('http://localhost:3001/api/ai/health-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Report created: ${result.report_id} (Score: ${result.overall_score}/100)\n`);
      } else {
        const error = await response.json();
        console.log(`❌ Failed: ${error.error}\n`);
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}\n`);
    }

    // Wait 2 seconds between requests to avoid overwhelming the API
    if (i < projects.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n✅ All reports generated!');
}

generateReports().catch(console.error);
