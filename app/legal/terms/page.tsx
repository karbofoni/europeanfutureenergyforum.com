import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Transition Nexus Europe',
  description: 'Terms of service for Transition Nexus Europe platform',
};

export default function TermsPage() {
  return (
    <div className="container py-12 max-w-4xl space-y-4">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="text-sm leading-relaxed text-muted-foreground">Last updated: January 2025</p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Acceptance of Terms</h2>
      <p className="text-sm leading-relaxed">
        By accessing and using Transition Nexus Europe (the "Platform"), you agree to be bound by these
        Terms of Service. If you do not agree, please do not use the Platform.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Platform Purpose</h2>
      <p className="text-sm leading-relaxed">
        Transition Nexus Europe is an informational platform connecting renewable energy projects,
        investors, and suppliers. We provide data, tools, and resources for informational purposes only.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">User Responsibilities</h2>
      <p className="text-sm leading-relaxed">You agree to:</p>
      <ul className="space-y-2 text-sm pl-5 list-disc">
        <li>Provide accurate and truthful information</li>
        <li>Not misuse the Platform or attempt unauthorized access</li>
        <li>Respect intellectual property rights</li>
        <li>Comply with applicable laws and regulations</li>
        <li>Conduct your own due diligence before making decisions</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-3">Disclaimer of Warranties</h2>
      <p className="text-sm leading-relaxed">
        <strong>The Platform is provided "as is" without warranties of any kind.</strong>
      </p>
      <ul className="space-y-2 text-sm pl-5 list-disc">
        <li>We do not guarantee the accuracy, completeness, or timeliness of information</li>
        <li>Information is not financial, legal, or investment advice</li>
        <li>Project, investor, and supplier data is user-submitted and not independently verified</li>
        <li>AI tools provide informational outputs only, not professional recommendations</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-3">Limitation of Liability</h2>
      <p className="text-sm leading-relaxed">
        To the fullest extent permitted by law, Transition Nexus Europe and its operators shall not
        be liable for any damages arising from your use of the Platform, including but not limited to:
      </p>
      <ul className="space-y-2 text-sm pl-5 list-disc">
        <li>Investment losses or business decisions</li>
        <li>Inaccurate or incomplete information</li>
        <li>Service interruptions or technical issues</li>
        <li>Third-party actions or content</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-3">User-Generated Content</h2>
      <p className="text-sm leading-relaxed">
        When you submit project, investor, or supplier data, you grant us a license to display and
        distribute that content on the Platform. You represent that you have the right to submit
        such content and that it does not infringe on third-party rights.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Intellectual Property</h2>
      <p className="text-sm leading-relaxed">
        The Platform's design, code, and original content are owned by Transition Nexus Europe and
        protected by copyright and other intellectual property laws.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Links to Third Parties</h2>
      <p className="text-sm leading-relaxed">
        The Platform may contain links to external websites. We are not responsible for the content
        or practices of third-party sites.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Modifications to Service</h2>
      <p className="text-sm leading-relaxed">
        We reserve the right to modify, suspend, or discontinue the Platform at any time without notice.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Governing Law</h2>
      <p className="text-sm leading-relaxed">
        These Terms are governed by the laws of the European Union and the jurisdiction where our
        operations are based.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Changes to Terms</h2>
      <p className="text-sm leading-relaxed">
        We may update these Terms periodically. Continued use of the Platform constitutes acceptance
        of revised Terms.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Contact</h2>
      <p className="text-sm leading-relaxed">
        For questions about these Terms, please contact us through our contact page.
      </p>
    </div>
  );
}
