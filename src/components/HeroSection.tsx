import { StaticImage } from "gatsby-plugin-image";
import React, { FC } from "react";
import TooltipBoot from "./Tooltip";

type HeroSectionProps = {
    autoCounter: number;
    children?: React.ReactNode;
}

const HeroSection: FC<HeroSectionProps> = ({ autoCounter, children }) => {
    return (
        <section className="hero-section position-relative d-flex align-items-start justify-content-center">
            <StaticImage
                src="../images/hero_image.webp"
                alt="Hero Background"
                layout="fullWidth"
                placeholder="none"
                className="hero-background position-absolute"
                loading="lazy"
            />
            <div className="hero-content text-center text-white z-1">
                <h1 className="hero-title fw-bold lh-sm mt-0 mx-auto mb-3">Jaunu un mazlietotu auto piedāvājums</h1>
                <p>Atrodi sev aktuālo auto piedāvājumu vienuviet. </p>
                {children}
                <TooltipBoot text="Labākie piedāvājumi vienuviet" />
            </div>

            <div className="review-pop-up position-absolute text-start rounded-5 border border-white py-2 px-3">
                <StaticImage
                    style={{ position: "absolute" }}
                    src={"../images/review-img.png"}
                    alt={"Avatar"}
                    className={"review-avatar position-absolute"}
                    placeholder="blurred"
                    width={65}
                    height={65}
                />
                <h2 className="review-name fs-2 text-light lh-base">R. Bērziņš</h2>
                <p className="fs-6 text-white">Super! Ātri un pārskatāmie atradu sev vēlamo auto.</p>
            </div>

            <div className="car-counter d-flex align-items-center justify-content-center position-absolute text-white border border-white rounded-5 my-0 mx-auto">
                <h2 className="fs-1 fw-bold text-light mb-0 me-3 lh-lg">  {autoCounter} </h2>
                <p className="m-0">auto tavai <br /> izvēlei</p>
            </div>

            <div className="white-gradient position-absolute"></div>
        </section>
    );
}

export default HeroSection;