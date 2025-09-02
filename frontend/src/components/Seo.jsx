import { Helmet } from "react-helmet-async";

const Seo = ({ title, description, url, noindex = false }) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        name="keywords"
        content="AI code generator, React component builder, SaaS for developers, UI generator, AI coding tool"
      />

      {/* Optional: hide auth/dashboard pages from search engines */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph for social sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="GenAi" />

      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "SoftwareApplication",
            "name": "GenAi",
            "applicationCategory": "Developer Tools",
            "operatingSystem": "Web",
            "description": "GenAi helps developers generate, preview, and export React components with AI.",
            "url":"url": "${import.meta.env.VITE_WEBSITE_URL}",
            "offers": {
              "@type": "Offer",
              "price": "19",
              "priceCurrency": "USD"
            }
          }
          `}
      </script>
    </Helmet>
  );
};

export default Seo;
