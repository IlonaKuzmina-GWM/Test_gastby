import React, { FC, useState } from "react";
import Button from "./Button";
import NavLinks from "./NavLinks";
import { Link, graphql, useStaticQuery } from "gatsby";


const Footer = ({ }) => {
const [dealer,] = useState(["Dealer One","Dealer Two","Dealer Three"])

    const data = useStaticQuery(graphql`
    {
     allWpCarCategory {
       nodes {
        wpChildren {
        nodes {
          name
        }
      }
       }
     }
   }`)

    // console.log(data.allWpCarCategory.nodes)

    // console.log("felaeris footeri", dealer)

    return (
        <div className="footer container">
            <div className="wrapper first-line">
                <div className="column column-one wrapper">
                    <h3>Saņem ’karstākos’ piedāvājumus <br /> e-pastā</h3>
                    <div>
                        <form className="first-line-form" action="">
                            <input type="email" name="" id="" placeholder="Tavs e-pasts" />
                            <Button name={"Abonēt"} size={"small"} type={"primary"} />
                        </form>

                    </div>

                </div>

                <div className="column colum-three wrapper">
                    <h3>Dīleri</h3>
                    {dealer.map((link, index) => (
                        <Link key={index} to="/" className="">{link}</Link>
                    ))}
                </div>

                <div className="column colum-for wrapper">
                    <h3>Kontakti</h3>
                    <p>Tel.nr: <a href="tel:1234567">1234567</a></p>
                    <p>E-pasts: <a href="mailto:info@pirktauto.lv">info@pirktauto.lv</a></p>
                    <p>Adrese: Birznieka Upīša 569, Rīga</p>
                    <p>Kaut kas vēl te</p>
                </div>

            </div>

            <div className="wrapper second-line">
                <p>© {new Date().getFullYear()} PirktAuto.lv - Visas tiesības aizsargātas.</p>
            </div>
        </div>
    );
};

export default Footer;