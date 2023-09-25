import React from "react";
import { useStaticQuery, graphql } from "gatsby";

type SeoProps = {
  title?: string;
  description?: string;
};

const SEO = ({ title, description }: SeoProps) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const metaTitle = title || site.siteMetadata.title;
  const metaDescription = description || site.siteMetadata.description;

  const seo = {
    title: metaTitle,
    description: metaDescription,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
    </>
  );
};

export default SEO;
