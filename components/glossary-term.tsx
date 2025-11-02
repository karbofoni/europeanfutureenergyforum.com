'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const glossary: Record<string, string> = {
  'CAPEX': 'Capital Expenditure: The total upfront investment required to build the project, including equipment, construction, and installation costs.',
  'IRR': 'Internal Rate of Return: The expected annual return on investment, expressed as a percentage. Higher IRR indicates better profitability.',
  'PPA': 'Power Purchase Agreement: A long-term contract to sell electricity at a fixed price, providing revenue certainty for the project.',
  'MW': 'Megawatt: A unit of power equal to one million watts. Measures the instantaneous generation capacity of a power plant.',
  'MWh': 'Megawatt-hour: A unit of energy equal to one megawatt of power sustained for one hour. Measures total energy production.',
  'TSO': 'Transmission System Operator: The entity responsible for managing the high-voltage electricity transmission grid.',
  'DSO': 'Distribution System Operator: The entity responsible for managing the lower-voltage local electricity distribution network.',
  'Grid Connection': 'The physical and contractual link between a power generation facility and the electricity grid, allowing power to be transmitted to consumers.',
  'Ticket Size': 'The minimum and maximum investment amount that an investor typically commits to a single project.',
  'Mandate Types': 'The types of financial instruments an investor uses, such as Equity (ownership stake), Project Finance (debt), or Mezzanine financing (hybrid).',
  'Feasibility': 'Early project stage focused on technical and economic viability studies to determine if the project is worth pursuing.',
  'Permitting': 'Project stage involving obtaining all necessary regulatory approvals, environmental permits, and construction licenses.',
  'Construction': 'Active building phase where the project infrastructure is being physically constructed.',
  'Operational': 'Project is complete and actively generating electricity, selling power to the grid or offtakers.',
};

interface GlossaryTermProps {
  term: string;
  children: React.ReactNode;
  className?: string;
}

export function GlossaryTerm({ term, children, className }: GlossaryTermProps) {
  const definition = glossary[term];

  if (!definition) {
    // If term not in glossary, just render children without tooltip
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`underline decoration-dotted decoration-slate-400 cursor-help ${className || ''}`}>
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs" side="top">
          <p className="text-xs">{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
