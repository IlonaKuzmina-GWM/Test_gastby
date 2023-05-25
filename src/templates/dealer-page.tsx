import React, { FC } from "react";
import MainLayout from "../layouts/MainLayout";
import { graphql, useStaticQuery } from "gatsby";

type DealerPageProps = {
    // pageContext: {
    //     databaseId: number; // Add the databaseId property
    //   };
}

const DealerPage: FC<DealerPageProps> = ({ }) => {
//     const filteredByDealerName = useStaticQuery(graphql`
//     query CarsByDealerQuery($databaseId: Int!) {
//       allWpCar(filter: { carCategories: { nodes: { elemMatch: { databaseId: { eq: $databaseId } } } } }) {
//         nodes {
//           title
//           slug
//           carInfo {
//             carPrice
//           }
//           featuredImage {
//             node {
//               gatsbyImage(cropFocus: CENTER, fit: COVER, formats: WEBP, placeholder: BLURRED, width: 1024, height: 1024)
//             }
//           }
//         }
//       }
//     }
//   `);


    // const dealerId = pageContext

    // console.log(filteredByDealerName)

    return (
        <MainLayout>
            <h1> this is a dealer page</h1>
        </MainLayout>);
}

export default DealerPage;
