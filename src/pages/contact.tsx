import React from "react";
import MainLayout from "../layouts/MainLayout";
import { HeadFC } from "gatsby";

const Contact = () => {
    return (
        <MainLayout>
            <section className="contact__hero--section">
                <div className="banner__text--wrapper container">
                    <h1 className="banner__title">Sazinies ar mums</h1>
                </div>

                <div className="white__gradient--bottom"></div>
            </section>
        </MainLayout>
    );
};

export default Contact;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;