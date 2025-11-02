import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Use Guidelines | Transition Nexus Europe',
  description: 'Guidelines for using the Transition Nexus Europe brand',
};

export default function BrandUsePage() {
  return (
    <div className="container py-12 max-w-4xl space-y-4">
      <h1 className="text-3xl font-bold">Brand Use Guidelines</h1>
      <p className="text-sm leading-relaxed text-muted-foreground">Last updated: January 2025</p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Brand Identity</h2>
      <p className="text-sm leading-relaxed">
        "Transition Nexus Europe" is the trade name of our platform. These guidelines govern the
        proper use of our name, logo, and brand materials.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Permitted Uses</h2>
      <p className="text-sm leading-relaxed">You may reference Transition Nexus Europe when:</p>
      <ul className="space-y-2 text-sm pl-5 list-disc">
        <li>Accurately describing our platform or services</li>
        <li>Linking to our website in editorial or informational content</li>
        <li>Citing data or resources from our platform with proper attribution</li>
        <li>Acknowledging participation in events or listings on our platform</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-3">Prohibited Uses</h2>
      <p className="text-sm leading-relaxed">You may not:</p>
      <ul className="space-y-2 text-sm pl-5 list-disc">
        <li>Imply endorsement, sponsorship, or affiliation without written permission</li>
        <li>Use our name or logo in a misleading or disparaging manner</li>
        <li>Modify, distort, or create derivative versions of our branding</li>
        <li>Use our brand to promote commercial products or services without authorization</li>
        <li>Register domain names, social media handles, or trademarks confusingly similar to our brand</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-3">Independence Statement</h2>
      <p className="text-sm leading-relaxed">
        <strong>Transition Nexus Europe is an independent initiative.</strong> We are not affiliated
        with, sponsored by, or endorsed by any third-party companies, events, or organizations unless
        explicitly stated.
      </p>
      <p className="text-sm leading-relaxed">
        References to technologies, jurisdictions, or industry terms (e.g., "solar", "wind", "Germany")
        are descriptive only and do not imply commercial relationships.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Logo Usage</h2>
      <p className="text-sm leading-relaxed">
        Our logo consists of our name alongside a lightning bolt icon. When using our logo with permission:
      </p>
      <ul className="space-y-2 text-sm pl-5 list-disc">
        <li>Maintain clear space around the logo</li>
        <li>Do not alter colors, proportions, or elements</li>
        <li>Ensure sufficient contrast with background</li>
        <li>Do not place the logo on busy or distracting backgrounds</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-3">Attribution Requirements</h2>
      <p className="text-sm leading-relaxed">
        When citing data, analysis, or content from Transition Nexus Europe:
      </p>
      <ul className="space-y-2 text-sm pl-5 list-disc">
        <li>Clearly attribute the source: "Source: Transition Nexus Europe"</li>
        <li>Include a link to the relevant page when possible</li>
        <li>Do not alter data or present it out of context</li>
        <li>Include any disclaimers that accompanied the original content</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-3">Media and Press</h2>
      <p className="text-sm leading-relaxed">
        Media outlets may reference Transition Nexus Europe in editorial coverage following standard
        journalistic practices. For interviews, quotes, or collaborative content, please contact us first.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Partnership and Sponsorship</h2>
      <p className="text-sm leading-relaxed">
        If you wish to partner with, sponsor, or formally collaborate with Transition Nexus Europe,
        please contact us to discuss terms and brand usage rights.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Enforcement</h2>
      <p className="text-sm leading-relaxed">
        We reserve the right to take action against unauthorized or improper use of our brand, including
        requesting removal of content or pursuing legal remedies if necessary.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Questions</h2>
      <p className="text-sm leading-relaxed">
        For permission requests or questions about brand usage, please contact us through our contact page.
      </p>
    </div>
  );
}
