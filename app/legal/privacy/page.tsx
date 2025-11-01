import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Transition Nexus Europe',
  description: 'Privacy policy for Transition Nexus Europe platform',
};

export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-4xl prose prose-sm">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: January 2025</p>

      <h2>Introduction</h2>
      <p>
        Transition Nexus Europe ("we", "our", or "us") is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, and safeguard your information when you
        use our platform.
      </p>

      <h2>Information We Collect</h2>
      <h3>Information You Provide</h3>
      <ul>
        <li>Contact information (name, email, organization) submitted through forms</li>
        <li>Project, investor, or supplier data you choose to publish</li>
        <li>Messages and inquiries sent through our contact form</li>
      </ul>

      <h3>Automatically Collected Information</h3>
      <ul>
        <li>Usage data and analytics (page views, time on site)</li>
        <li>Device information and browser type</li>
        <li>IP address and general location data</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use collected information to:</p>
      <ul>
        <li>Operate and improve the platform</li>
        <li>Respond to inquiries and provide support</li>
        <li>Display project, investor, and supplier information</li>
        <li>Analyze usage patterns and optimize user experience</li>
        <li>Send relevant updates (with your consent)</li>
      </ul>

      <h2>Data Sharing and Disclosure</h2>
      <p>
        We do not sell your personal information. We may share information with:
      </p>
      <ul>
        <li>Service providers who assist in platform operations (e.g., hosting, analytics)</li>
        <li>Legal authorities when required by law</li>
      </ul>
      <p>
        Project, investor, and supplier data you choose to publish is publicly visible on the platform.
      </p>

      <h2>Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your information. However,
        no method of transmission over the Internet is 100% secure.
      </p>

      <h2>Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Opt out of marketing communications</li>
      </ul>

      <h2>Cookies and Tracking</h2>
      <p>
        We use cookies and similar technologies for analytics and to improve user experience.
        You can control cookie preferences through your browser settings.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        Our platform may contain links to third-party websites. We are not responsible for the
        privacy practices of those sites.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. Changes will be posted on this page with
        an updated revision date.
      </p>

      <h2>Contact Us</h2>
      <p>
        For questions about this Privacy Policy or to exercise your rights, please contact us
        through our contact page.
      </p>
    </div>
  );
}
