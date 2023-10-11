import React from "react";
import MainLayout from "../layouts/MainLayout";
import { HeadFC } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import SiteVisiteSection from "../components/SiteVisiteSection";

const AboutUs = () => {
    return (
        <MainLayout>
            <section className="about__hero--section">
                <div className="banner__text--wrapper container">
                    <h1 className="banner__title">Par mums</h1>
                </div>

                <div className="white-gradient-bottom" />
            </section>

            <section className="about__content--section container mb-5">
                <div>
                    <div className="title__top--line" />
                    <h2 className="about__content--title">Strādājam godīgi un atklāti</h2>
                    <p>
                        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
                    </p>
                    <div className="title__top--line" />
                    <h2 className="about__content--title">What is Lorem Ipsum?</h2>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <div className="title__top--line" />
                    <h2 className="about__content--title">What is Lorem Ipsum?</h2>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <div className="title__top--line" />
                    <h2 className="about__content--title">What is Lorem Ipsum?</h2>
                    <ul>
                        <li>Viens</li>
                        <li>Divi</li>
                        <li>Trīs</li>
                        <li>Četri</li>
                    </ul>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
                <div>
                    <div className="title-top-line" />
                    <h2 className="about__content--title">Strādājam godīgi un atklāti</h2>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <div>
                    </div>
                </div>
            </section>

            <SiteVisiteSection />
        </MainLayout>
    );
};

export default AboutUs;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;