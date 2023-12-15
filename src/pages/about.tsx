import React from "react";
import MainLayout from "../layouts/MainLayout";
import { HeadFC } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import SiteVisiteSection from "../components/SiteVisiteSection";
import SimpleHero from "../components/SimpleHeroSection";

const AboutUs = () => {
    return (
        <MainLayout>
            <SimpleHero heroTitleFirstLine={"Par mums"} />

            <section className="container mb-5">
                <div>

                    <h2 className="fs-2">Strādājam godīgi un atklāti</h2>
                    <p>
                        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
                    </p>

                    <h2 className="fs-2">What is Lorem Ipsum?</h2>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>

                    <h2 className="fs-2">What is Lorem Ipsum?</h2>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>

                    <h2 className="fs-2">What is Lorem Ipsum?</h2>
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

                    <h2 className="fs-2">Strādājam godīgi un atklāti</h2>
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