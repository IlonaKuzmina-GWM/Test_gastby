import { GatsbyNode } from "gatsby";

const path = require("path");

exports.createPages = async ({ graphql, actions }: any) => {
  const { data } = await graphql(`
    query allWpData {
      allWpPost {
        totalCount
        edges {
          next {
            title
            slug
          }
          previous {
            slug
            title
          }
          node {
            title
            slug
            author {
              node {
                name
              }
            }
            content
            date(formatString: "DD.MM.Y")
            excerpt
            featuredImage {
              node {
                gatsbyImage(fit: COVER, formats: WEBP, placeholder: BLURRED)
              }
            }
          }
        }
      }
      allWpCar {
        nodes {
          content
          slug
          title
          databaseId
          id
          featuredImage {
            node {
              gatsbyImage(formats: WEBP, placeholder: BLURRED, width: 976, height: 549)
            }
          }
          carInfo {
            carPrice
            carGallery {
              gatsbyImage(formats: WEBP, placeholder: BLURRED, width: 976, height: 549)
            }
            atrasanasVieta
            atrumkarba
            autoStavoklis
            virsbuvesTips
            piedzina
            marka
            krasa
            gads
            dzinejs
            durvjuSkaits
            versija
            dileris
          }
          carEquipment {
            drosiba
            elektronika
            hiFi
            papildaprikojums
          }
        }
      }
    }
  `);

  if (!data) {
    return;
  }

  const { allWpCar } = data;
  const { allWpPost } = data;

  const singleCarTempalte = path.resolve(`src/templates/single-car-page.tsx`);
  const singlePostTempalte = path.resolve(`src/templates/single-post-page.tsx`);

  allWpCar.nodes.forEach((node: { slug: string }) => {
    actions.createPage({
      path: `/${node.slug}`,
      component: singleCarTempalte,
      context: node,
    });
  });

  // allWpPost.nodes.forEach((node: { slug: string }) => {
  //   actions.createPage({
  //     path: `/${node.slug}`,
  //     component: singlePostTempalte,
  //     context: node,
  //   });
  // });
};

export const createPagesStatefully: GatsbyNode["createPagesStatefully"] = async ({ actions }) => {
  const { createRedirect } = actions;

  // Set cache headers for font files
  createRedirect({
    fromPath: "static/fonts/*.woff2",
    toPath: "/fonts/:splat",
    statusCode: 200,
    force: true,
    headers: {
      "Cache-Control": "public, max-age=31536000",
    },
  });
};
