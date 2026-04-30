import { Metadata } from "next";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Privacy Policy ${METADATA.exTitle}`,
  description: "Privacy Policy for Rizqi Kevin Portfolio App.",
  keywords: "portfolio frontend developer, privacy policy",
  alternates: {
    canonical: `${process.env.DOMAIN}/privacy-policy`,
  },
};

const PrivacyPolicyPage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading title={"Privacy Policy"} />

      <div className="mt-8 space-y-8 leading-relaxed text-neutral-700 dark:text-neutral-300">
        <p className="text-sm italic">Effective Date: January 12, 2026</p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            1. Data Collection and Usage
          </h2>
          <p>
            The &quot;Portfolio&quot; application (the &quot;App&quot;) does NOT
            collect, store, or share any personal data from its visitors. The
            App functions as a read-only platform designed to showcase the
            developer&apos;s professional work.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            2. Third-Party Services
          </h2>
          <p>
            The App may link to or display publicly available content from
            third-party platforms such as Instagram, GitHub, LinkedIn, and
            other services referenced throughout the portfolio.
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong>Public Content Only:</strong> The App only references
              public-facing profile or portfolio information.
            </li>
            <li>
              <strong>No Private Access:</strong> The App does not request or
              store private social media account data from visitors.
            </li>
            <li>
              <strong>External Policies:</strong> Any interaction with external
              services is governed by the privacy policies of those platforms.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            3. Contact Information
          </h2>
          <p>
            If you have any questions regarding this Privacy Policy, you may
            contact the developer at: <strong>rizqikevino@gmail.com</strong>.
          </p>
        </section>
      </div>
    </Container>
  );
};

export default PrivacyPolicyPage;
