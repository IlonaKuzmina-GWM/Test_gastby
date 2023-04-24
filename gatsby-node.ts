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
              wpParent {
                node {
                  name
                  wpChildren {
                    nodes {
                      name
                      slug
                      databaseId
                      cars {
                        nodes {
                          databaseId
                        }
                      }
                    }
                  }
                  databaseId
                }
              }
            }
          }
          slug
          title
          databaseId
          id
          featuredImage {
            node {
              gatsbyImage(cropFocus: CENTER, fit: COVER, formats: WEBP, placeholder: BLURRED, width: 500, height:250)
            }
          }
          carInfo {
            carPrice
            carGallery {
              gatsbyImage(cropFocus: CENTER, fit: COVER, formats: WEBP, placeholder: BLURRED, width: 500, height:250)
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
  const brokerPage = path.resolve("src/templates/broker-page.tsx");

  allWpCar.nodes.forEach((node: { slug: any }) => {
    actions.createPage({
      path: `/${node.slug}`,
      component: singleCarTempalte,
      context: node,
    });
  });
};
