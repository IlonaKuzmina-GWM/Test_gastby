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
            atrumkarba
            atrasanasVieta
            autoStavoklis
            carPrice
            virsbuvesTips
            sedvietuSkaits
            piedzina
            nobraukums
            motoraTilpums
            modelis
            marka
            krasa
            jauda
            gads
            dzinejs
            durvjuSkaits
            dileris
            degvielasPaterins
            coIzmesuDaudzums
          }
          carEquipment {
            aizsardziba
            aprikojums
            audioVideoAprikojums
            cits
            drosiba
            eksterjers
            gaismas
            hiFi
            interjers
            salons
            sedekli
            spoguli
            sture
          }
        }
      }
    }
  `);

  return data.allWpCar.nodes;
}
