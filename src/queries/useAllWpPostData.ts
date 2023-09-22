import { graphql, useStaticQuery } from "gatsby";

export default function useAllWpPostData() {
  const data = useStaticQuery(graphql`
    {
      allWpPost {
        nodes {
          featuredImage {
            node {
              gatsbyImage(aspectRatio: 1.5, fit: COVER, formats: WEBP, placeholder: BLURRED)
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
