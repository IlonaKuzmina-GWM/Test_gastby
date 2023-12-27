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
            <div className="wrapper first-line d-flex flex-row flex-wrap flex-lg-nowrap justify-content-around justify-content-lg-between 
            gap-5
            mb-5">
                <div className="column column-one wrapper flex-fill">
                    <h3 className="fs-4 fw-bold mb-3">Uzzini par aktuālākajiem piedāvājumiem pirmais</h3>
                    <div>
                        <form className="first-line-form d-flex border  rounded-5 p-1 justify-content-between" action="">
                            <input type="email" name="" id="" placeholder="Tavs e-pasts" className="border-0 bg-transparent m-0 fs-5 text-secondary rounded-5 py-3 px-3 flex-fill me-2"/>
                            <Button name={"Pieteikties"} size={"small"} type={"primary"}/>
                        </form>

                    </div>

                </div>

                <div className="column colum-three wrapper flex-fill">
                    <h3 className="fs-4 fw-bold mb-3">Dīleri</h3>
                    {uniqueDealers && uniqueDealers.map((dealerName: string, index: number) =>
                        <Link to="/" className="text-decoration-none fs-5" key={index}>{dealerName}</Link>
                    )}
                </div>

                <div className="column colum-for wrapper flex-fill">
                    <h3 className="fs-4 fw-bold mb-3">Kontakti</h3>
                    <p className="mb-0 fs-5">Tel.nr: <a href="tel:1234567">1234567</a></p>
                    <p className="mb-0 fs-5">E-pasts: <a href="mailto:info@pirktauto.lv">info@pirktauto.lv</a></p>
                </div>

            </div>

            <div className="wrapper border-top text-center text-dark pt-4 pb-5">
                <p className="mb-0">© {new Date().getFullYear()} PirktAuto.lv - Visas tiesības aizsargātas.</p>
            </div>
        </div>
    );
};

export default Footer;