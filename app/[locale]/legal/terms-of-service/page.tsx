import { Metadata } from "next";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Terms of Service ${METADATA.exTitle}`,
  description: "Terms of Service for Rizqi Kevin's Portfolio App.",
  keywords: "portfolio frontend developer, terms of service",
  alternates: {
    canonical: `${process.env.DOMAIN}/terms-of-service`,
  },
};

const TermsOfServicePage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading title={"Terms of Service"} />

      <div className="mt-8 space-y-8 leading-relaxed text-neutral-700 dark:text-neutral-300">
        <p className="text-sm italic">Last Updated: January 12, 2026</p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            1. Purpose of the Website
          </h2>
          <p>
            This website is a personal portfolio created to showcase Rizqi
            Kevin&apos;s professional projects, technical skills, and social
            media presence.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            2. Intellectual Property
          </h2>
          <p>
            All original code, design elements, and content on this website are
            the property of Rizqi Kevin unless otherwise stated. Third-party
            trademarks, platform names, and linked content remain the property
            of their respective owners.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            3. Acceptable Use
          </h2>
          <p>
            By using this site, you agree:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              Not to misuse, copy, or redistribute website content without
              authorization.
            </li>
            <li>
              That the site is intended for informational and portfolio
              showcasing purposes.
            </li>
            <li>
              To comply with the terms of any third-party platform you access
              through links on this site.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            4. Disclaimer
          </h2>
          <p>
            The &quot;Portfolio&quot; application is provided &quot;as is.&quot;
            The developer is not responsible for interruptions, outdated
            external information, or changes to third-party services linked
            from this site.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            5. External Links
          </h2>
          <p>
            This site may contain links to external websites and social media
            profiles. The developer is not responsible for the content or
            policies of those external destinations.
          </p>
        </section>
      </div>
    </Container>
  );
};

export default TermsOfServicePage;
