// import { CreatePagesArgs } from "gatsby";
// import { AllWpCarNode, FetchingData } from "./src/types/allWpCarTypes";

// const path = require("path");

// exports.createPages = async ({ graphql, actions }: CreatePagesArgs) => {
//   const {data} = await graphql(`
//     query CarInfoToTemplatePage {
//       allWpCar {
//         nodes {
//           slug
//         }
//       }
//     }
//   `);

//   if (!data) {
//     return;
//   }

//   const allWpCar = data;

//   allWpCar.nodes.forEach((node: FetchingData) => {
//     actions.createPage({
//       path: path.join("/", node.slug),
//       component: path.resolve("./src/templates/single-car-page.tsx"),
//       context: { slug: node.slug },
//     });
//   });
// };
