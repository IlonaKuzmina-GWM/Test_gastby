import React from "react";
import MainLayout from "../layouts/MainLayout";
import { HeadFC } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const Contact = () => {
    return (
        <MainLayout>
            <section className="contact-hero-section">
            <div className="white-gradient-top"/>
                <StaticImage
                    src="../images/Contact_intro-image.jpg"
                    alt="Hero Background"
                    layout="fullWidth"
                    placeholder="blurred"
                    className="banner-background "
                    loading="lazy"
                    height={250}
                    width={1000}
                    quality={95}
                />
                <div className="banner__text-wrap container">
                    <h1 className="banner__title">Sazinies ar mums</h1>
                </div>

                <div className="black-gradient"></div>
            </section>
        </MainLayout>
    );
};

export default Contact;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;