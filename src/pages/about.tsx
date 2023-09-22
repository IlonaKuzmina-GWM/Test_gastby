import React from "react";
import MainLayout from "../layouts/MainLayout";
import { HeadFC } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const AboutUs = () => {
    return (
        <MainLayout>
            <section className="about-hero-section">
                <div className="white-gradient-top" />
                <StaticImage
                    src="../images/About_intro-image.jpg"
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
                    <h1 className="banner__title">Par mums</h1>
                </div>

                <div className="white-gradient-bottom" />
            </section>
            <section className="">

            </section>
        </MainLayout>
    );
};

export default AboutUs;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;