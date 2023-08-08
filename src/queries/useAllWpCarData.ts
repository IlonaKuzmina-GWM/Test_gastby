import { graphql, useStaticQuery } from "gatsby";

export default function useAllWpCarData() {
  const data = useStaticQuery(graphql`
    {
      allWpCar {
        nodes {
          slug
          title
          id
          featuredImage {
            node {
              gatsbyImage(cropFocus: CENTER, fit: COVER, formats: WEBP, placeholder: BLURRED, width: 302, height: 172)
            }
          }
          carInfo {
            carPrice
            atrasanasVieta
            atrumkarba
            autoStavoklis
            dzinejs
            durvjuSkaits
            gads
            krasa
            marka
            piedzina
            virsbuvesTips
            dileris
            versija
          }
          carEquipment {
            drosiba
            elektronika
            fieldGroupName
            hiFi
            papildaprikojums
          }
        }
      }
    }
  `);

  return data.allWpCar.nodes;
}
