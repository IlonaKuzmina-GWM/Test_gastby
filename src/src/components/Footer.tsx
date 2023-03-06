import React from "react";
import Button from "./Button";
import NavLinks from "./NavLinks";

const Footer = () => {
    return (
        <div className="footer container">
            <div className="wrapper first-line">
                <div className="column column-one wrapper">
                    <h3>Saņem ’karstākos’ piedāvājumus <br/> e-pastā</h3>
                    <div>
                        <input type="email" name="" id="" placeholder="Tavs e-pasts" />
                        <Button name={"Abonēt"} size={"small"} type={"primary"}/>
                    </div>

                </div>

                <div className="column colum-two wrapper">
                    <h3>Support</h3>
                    <NavLinks></NavLinks>
                </div>

                <div className="column colum-three wrapper">
                    <h3>Noderīgas <br/>saites</h3>
                    <NavLinks></NavLinks>
                </div>

                <div className="column colum-for wrapper">
                    <h3>Dīleri</h3>
                    <NavLinks></NavLinks>
                </div>

                <div className="column colum-five wrapper">
                    <h3>Kontakti</h3>
                    <NavLinks></NavLinks>
                </div>
            </div>

            <div className="wrapper second-line">
                <p>© 2023 PirktAuto.lv - Visas tiesības aizsargātas.</p>
            </div>
        </div>
    );
};

export default Footer;