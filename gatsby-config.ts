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
    `gatsby-plugin-preload-fonts`,
    "gatsby-plugin-sass",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `PirktAuto`,
        short_name: `PirktAuto`,
        start_url: `/`,
        theme_color: `#297373`,
        background_color: `#DDF0FF`,
        display: `standalone`,
        icon: `src/images/favicon/icon.png`,
        theme_color_in_head: false,
        crossOrigin: `use-credentials`,
        icons: [
          {
            src: `/favicon/android-chrome-48x48.png`,
            sizes: `48x48`,
            type: `image/png`,
          },
          {
            src: `/favicon/icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
          },
          {
            src: `/favicon/icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
          },
          {
            src: `/favicon/icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
          },
          {
            src: `/favicon/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicon/icon-256x256.png`,
            sizes: `256x256`,
            type: `image/png`,
          },
          {
            src: `/favicon/icon-384x384.png`,
            sizes: `384x384`,
            type: `image/png`,
          },
          {
            src: `/favicon/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
        cache_busting_mode: `none`,
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
         workboxConfig: {
            globPatterns: ['**/favicon*'],
            importWorkboxFrom: `cdn`,
         }
      } 
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
