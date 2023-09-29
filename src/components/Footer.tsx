import { Link } from "gatsby";
import React from "react";
import Button from "./Button";

import useAllWpCarData from "../queries/useAllWpCarData";

const Footer = ({ }) => {
    const dealers = useAllWpCarData();

    const uniqueDealersNames = dealers.reduce((result: { [x: string]: any; }, car: { carInfo: any; }) => {
        const carInfo = car.carInfo;

        Object.keys(carInfo).forEach((key) => {
            if (!result[key]) {
                result[key] = [];
            }

            const valuesArray = result[key];
            const value = carInfo[key];

            if (!valuesArray.some((existingValue: any) => JSON.stringify(existingValue) === JSON.stringify(value))) {
                valuesArray.push(value);
            }
        });

        return result;
    }, {});

    return (
        <div className="footer container">
            <div className="wrapper first-line">
                <div className="column column-one wrapper">
                    <h3>Uzzini par aktuālākajiem piedāvājumiem pirmais</h3>
                    <div>
                        <form className="first-line-form" action="">
                            <input type="email" name="" id="" placeholder="Tavs e-pasts" />
                            <Button name={"Pieteikties"} size={"small"} type={"primary"} />
                        </form>

                    </div>

                </div>

                <div className="column colum-three wrapper">
                    <h3>Dīleri</h3>
                    {uniqueDealersNames.dileris.map((dileris: string, index: number) => (
                        <Link to="/" className="" key={index}>{dileris}</Link>
                    ))}
                </div>

                <div className="column colum-for wrapper">
                    <h3>Kontakti</h3>
                    <p>Tel.nr: <a href="tel:1234567">1234567</a></p>
                    <p>E-pasts: <a href="mailto:info@pirktauto.lv">info@pirktauto.lv</a></p>
                </div>

            </div>

            <div className="wrapper second-line">
                <p>© {new Date().getFullYear()} PirktAuto.lv - Visas tiesības aizsargātas.</p>
            </div>
        </div>
    );
};

export default Footer;