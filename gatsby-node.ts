import { CreatePagesArgs } from "gatsby";
import { AllWpCarNode, FetchingData } from "./src/types/allWpCarTypes";

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
              gatsbyImage(cropFocus: CENTER, fit: COVER, formats: WEBP, placeholder: BLURRED, width: 1024, height: 1024)
            }
          }
          carInfo {
            carPrice
            carGallery {
              gatsbyImage(cropFocus: CENTER, fit: COVER, formats: WEBP, placeholder: BLURRED, width: 1024, height: 1024)
            }
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

  allWpCar.nodes.forEach((node: { slug: any }) => {
    actions.createPage({
      path: `/${node.slug}`,
      component: singleCarTempalte,
      context: node,
    });
  });

  const dealerPageTemplate = path.resolve("src/templates/broker-page.tsx");

  allWpCar.nodes.forEach((node: { slug: any; databaseId: any; }) => {
    const { slug, databaseId } = node; // Destructure the required properties
  
    actions.createPage({
      path: `/dīleris/${slug}`,
      component: dealerPageTemplate,
      context: {
        slug, // Pass the slug
        databaseId, // Pass the databaseId
      },
    });
  });
};

