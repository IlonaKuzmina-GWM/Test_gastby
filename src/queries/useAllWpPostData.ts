import { graphql, useStaticQuery } from "gatsby";

export default function useAllWpPostData() {
  const data = useStaticQuery(graphql`
    {
      allWpPost {
        nodes {
          featuredImage {
            node {
              gatsbyImage(cropFocus: CENTER, fit: COVER, formats: WEBP, placeholder: BLURRED, width: 386, height: 217)
              title
            }
          }
          content
          slug
          title
          tags {
            nodes {
              name
            }
          }
          date(formatString: "D.MM.Y")
          author {
            node {
              name
            }
          }
          excerpt
        }
        totalCount
      }
    }
  `);

  return data.allWpPost.nodes;
}
