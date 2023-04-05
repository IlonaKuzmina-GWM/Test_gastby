import { CreatePagesArgs } from "gatsby";
import { AllWpCarNode, FetchingData } from "./src/types/allWpCarTypes";

const path = require("path");

exports.createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions;
  const queryResults = await graphql(`
    query allWpCarData {
      allWpCar {
        nodes {
          carCategories {
            nodes {
              name
              databaseId
            }
          }
          slug
          title
          databaseId
          id
          featuredImage {
            node {
              gatsbyImage(cropFocus: CENTER, fit: COVER, formats: WEBP, placeholder: BLURRED, width: 300, height: 200)
            }
          }
          carInfo {
            carPrice
            carGallery {
              gatsbyImage(cropFocus: CENTER, fit: COVER, formats: WEBP, placeholder: BLURRED, width: 500)
            }
          }
        }
      }
    }
  `);

  if (!queryResults) {
    return;
  }

  const singleCarTempalte = path.resolve(`src/templates/single-car-page.tsx`);
  queryResults.data.allWpCar.nodes.forEach((node: { slug: any }) => {
    createPage({
      path: `/${node.slug}`,
      component: singleCarTempalte,
      context: node,
    });
  });

  //   allWpCarData.forEach((car: FetchingData) => {
  //     actions.createPage({
  //       path: path.join("/", car.slug),
  //       component: path.resolve("./src/templates/single-car-page.tsx"),
  //       context: { slug: car.slug },
  //     });
  //   });
};
