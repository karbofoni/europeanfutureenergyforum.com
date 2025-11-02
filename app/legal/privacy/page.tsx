import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Transition Nexus Europe',
  description: 'Privacy policy for Transition Nexus Europe platform',
};

export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-4xl space-y-4">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="text-sm leading-relaxed text-muted-foreground">Last updated: January 2025</p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Introduction</h2>
      <p className="text-sm leading-relaxed">
        Transition Nexus Europe ("we", "our", or "us") is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, and safeguard your information when you
        use our platform.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Information We Collect</h2>
      <h3 className="text-base font-semibold mt-4 mb-2">Information You Provide</h3>
      <ul className="space-y-2 text-sm pl-5 list-disc">
        <li>Contact information (name, email, organization) submitted through forms</li>
        <li>Project, investor, or supplier data you choose to publish</li>
        <li>Messages and inquiries sent through our contact form</li>
      </ul>

      <h3 className="text-base font-semibold mt-4 mb-2">Automatically Collected Information</h3>
      <ul className="space-y-2 text-sm pl-5 list-disc">
        <li>Usage data and analytics (page views, time on site)</li>
        <li>Device information and browser type</li>
        <li>IP address and general location data</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-3">How We Use Your Information</h2>
      <p className="text-sm leading-relaxed">We use collected information to:</p>
      <ul className="space-y-2 text-sm pl-5 list-disc">
        <li>Operate and improve the platform</li>
        <li>Respond to inquiries and provide support</li>
        <li>Display project, investor, and supplier information</li>
        <li>Analyze usage patterns and optimize user experience</li>
        <li>Send relevant updates (with your consent)</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-3">Data Sharing and Disclosure</h2>
      <p className="text-sm leading-relaxed">
        We do not sell your personal information. We may share information with:
      </p>
      <ul className="space-y-2 text-sm pl-5 list-disc">
        <li>Service providers who assist in platform operations (e.g., hosting, analytics)</li>
        <li>Legal authorities when required by law</li>
      </ul>
      <p className="text-sm leading-relaxed">
        Project, investor, and supplier data you choose to publish is publicly visible on the platform.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Data Security</h2>
      <p className="text-sm leading-relaxed">
        We implement industry-standard security measures to protect your information. However,
        no method of transmission over the Internet is 100% secure.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Your Rights</h2>
      <p className="text-sm leading-relaxed">You have the right to:</p>
      <ul className="space-y-2 text-sm pl-5 list-disc">
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Opt out of marketing communications</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-3">Cookies and Tracking</h2>
      <p className="text-sm leading-relaxed">
        We use cookies and similar technologies for analytics and to improve user experience.
        You can control cookie preferences through your browser settings.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Third-Party Links</h2>
      <p className="text-sm leading-relaxed">
        Our platform may contain links to third-party websites. We are not responsible for the
        privacy practices of those sites.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Changes to This Policy</h2>
      <p className="text-sm leading-relaxed">
        We may update this Privacy Policy periodically. Changes will be posted on this page with
        an updated revision date.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-3">Contact Us</h2>
      <p className="text-sm leading-relaxed">
        For questions about this Privacy Policy or to exercise your rights, please contact us
        through our contact page.
      </p>
    </div>
  );
}
