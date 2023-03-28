exports.onCreateWebpackConfig = ({ actions }:any) => {
  const { setWebpackConfig } = actions;
  setWebpackConfig({
    externals: {
      jquery: "jQuery", // important: 'Q' capitalized
    },
  });
};
// import { CreatePagesArgs } from "gatsby";
// import { FetchingData, WpPost } from "./src/types/fetchingDataTypes";

// const path = require("path");

// exports.createPages = async ({ graphql, actions }: any) => {
//   const { data } = await graphql(`
//     query PostsToTemplatePage {
//       allWpPost {
//         nodes {
//           slug
//           categories {
//             nodes {
//               slug
//             }
//           }
//           title
//           content
//           tags {
//             nodes {
//               name
//             }
//           }
//           featuredImage {
//             node {
//               id
//             }
//           }
//         }
//       }
//     }
//   `);

//   if (!data) {
//     return;
//   }

//   const { allWpPost } = data;

//   data.allWpPost.nodes.forEach((node: WpPost) => {
//     const { categories } = node;

//     if (!categories || !categories.nodes || categories.nodes.length === 0) {
//       return;
//     }

//     categories.nodes.forEach((category: { slug: string }) => {
//       if (category.slug.length >= 1 && category.slug === "blog") {
//         actions.createPage({
//           path: "/blog/" + node.slug,
//           component: path.resolve("./src/templates/single-blog-post.tsx"),
//           context: { slug: node.slug },
//         });
//       } else if (category.slug.length >= 1 && category.slug === "vacancies") {
//         actions.createPage({
//           path: "/vacancies/" + node.slug,
//           component: path.resolve("./src/templates/vacancy-details.tsx"),
//           context: { slug: node.slug },
//         });
//       } else {
//         return;
//       }
//     });
//   });
// };
