import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Pirkt Auto- labākais auto tieši Tev`,
    description: `Tavs ’vietējais’ jaunu auto piedāvājuma portāls`,
    author: `GreenWireMedia.com`,
    siteUrl: `https://pirktautomain.gatsbyjs.io/`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: true,
    // PARALLEL_QUERY_RUNNING: true,
  },
  plugins: [
    "gatsby-plugin-sass",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `PirktAuto`,
        short_name: `PirktAuto`,
        theme_color: `#297373`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL || `http://app-prkatuo.nsncl0rmht-wg96gxe2m3oy.p.temp-site.link/graphql`,
      },
    },
  ],
};

export default config;
