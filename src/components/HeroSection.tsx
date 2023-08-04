import { StaticImage } from "gatsby-plugin-image";
import React, { FC } from "react";
import TooltipBoot from "./Tooltip";

type HeroSectionProps = {
    autoCounter: number;
    children?: React.ReactNode;
}

const HeroSection: FC<HeroSectionProps> = ({ autoCounter, children }) => {
    return (
        <section className="hero-section">
            <StaticImage
                src="../images/hero_image.webp"
                alt="Hero Background"
                layout="fullWidth"
                placeholder="none"
                className="hero-background"
                loading="lazy"
            />
            <div className="hero-content">
                <h1 className="hero-title">Tavs ’vietējais’ jaunu auto
                    piedāvājuma portāls</h1>
                <p>atrodi sev piemērotu auto ātri, vienkārši un
                    vēl papildus bla bla :D </p>
                {children}
                <TooltipBoot text="Labākie piedāvājumi vienuviet" />
            </div>

            <div className="review-pop-up">
                <StaticImage
                    style={{ position: "absolute" }}
                    src={"../images/review-img.png"}
                    alt={"Avatar"}
                    className={"review-avatar"}
                    placeholder="blurred"
                    width={65}
                    height={65}
                />
                <h2 className="review-name">Andris Bērziņš</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum.</p>
            </div>

            <div className="car-counter d-flex align-items-center justify-content-center">
                <h2>  {autoCounter} </h2>
                <p>auto tavai <br /> izvēlei</p>
            </div>

            <div className="white-gradient"></div>
        </section>
    );
}

export default HeroSection;