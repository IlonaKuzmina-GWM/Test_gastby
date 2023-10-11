import { Link } from "gatsby";
import React from "react";
import Button from "./Button";

import useAllWpCarData from "../queries/useAllWpCarData";
import { CarInfo } from "../types/allWpCarTypes";

const Footer = ({ }) => {
    const dealers = useAllWpCarData();

    const uniqueDealersNames: string[] = dealers.reduce((result: string[], car: { carInfo: CarInfo; }) => {
        const carInfo = car.carInfo.dileris;

        if (Array.isArray(carInfo)) {
            result = result.concat(carInfo);
        } else {
            result.push(carInfo);
        }
        return result;
    }, []);

    const uniqueDealers: string[] = [...new Set(uniqueDealersNames)];


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
                    {uniqueDealers && uniqueDealers.map((dealerName: string, index: number) =>
                        <Link to="/" className="" key={index}>{dealerName}</Link>
                    )}
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