import { GatsbyNode } from "gatsby";

const path = require("path");

exports.createPages = async ({ graphql, actions }: any) => {
  const { data } = await graphql(`
    query allWpCarData {
      allWpCar {
        nodes {
          content
          carCategories {
            nodes {
              name
              databaseId
              parentDatabaseId
            }
          }
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

  const singleCarTempalte = path.resolve(`src/templates/single-car-page.tsx`);

  allWpCar.nodes.forEach((node: { slug: string }) => {
    actions.createPage({
      path: `/${node.slug}`,
      component: singleCarTempalte,
      context: node,
    });
  });
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
