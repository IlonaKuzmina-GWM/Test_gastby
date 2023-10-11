import React from "react";
import MainLayout from "../layouts/MainLayout";
import { HeadFC } from "gatsby";
import SiteVisiteSection from "../components/SiteVisiteSection";

const Contact = () => {
    return (
        <MainLayout>
            <section className="contact__hero--section mb-5">
                <div className="banner__text--wrapper container">
                    <h1 className="banner__title">Sazinies ar mums</h1>
                </div>

                <div className="white__gradient--bottom"></div>
            </section>

            <SiteVisiteSection />
        </MainLayout>
    );
};

export default Contact;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;