import { StaticImage } from "gatsby-plugin-image";
import React, { FC } from "react";

type YourNextAutoSectionProps = {
    onClickHandler: (filterBy: string) => void;
}

const YourNextAutoSection: FC<YourNextAutoSectionProps> = ({ onClickHandler }) => {
    return (
        <section className="your-next-auto__section container-lg">
            <h2 className="section-title">Izvēlies savu nākošo auto</h2>
            <p className="section-text">Jauns, mazlietots, elektrisks vai pilnpiedziņas?</p>
            <p className="section-text">Atrodi aktuālo piedāvājumu pie mums.</p>

            <div className="row justify-content-between px-3 mt-5 first-items-container">
                <div className="d-flex item col-md-7 mb-5 item-link" onClick={() => onClickHandler("jauns")}>
                    <StaticImage
                        style={{ position: "absolute" }}
                        src={"../images/1.jpg"}
                        alt={"image"}
                        className={"item-image"}
                        formats={['auto', 'webp', 'avif']}
                        placeholder="blurred"
                    />

                    <p>Jauni auto</p>
                </div>

                <div className="d-flex item col-md-4 mb-5">
                    <StaticImage
                        style={{ position: "absolute" }}
                        src={"../images/2.webp"}
                        alt={"image"}
                        className={"item-image"}
                        formats={['auto', 'webp', 'avif']}
                        placeholder="blurred"
                    />
                    <p>Kaut kādi auto</p>
                </div>
            </div>

            <div className="row justify-content-between px-3 second-items-container" onClick={() => onClickHandler("elektriskais")}>
                <div className="d-flex item col-md-4 mb-5">
                    <StaticImage
                        style={{ position: "absolute" }}
                        src={"../images/3.jpg"}
                        alt={"image"}
                        className={"item-image"}
                        formats={['auto', 'webp', 'avif']}
                        placeholder="blurred"
                    />
                    <p>Elektriskie auto</p>
                </div>

                <div className="d-flex item col-md-7 mb-5 item-link" onClick={() => onClickHandler("mazlietots")}>
                    <StaticImage
                        style={{ position: "absolute" }}
                        src={"../images/4.jpg"}
                        alt={"image"}
                        className={"item-image"}
                        formats={['auto', 'webp', 'avif']}
                        placeholder="blurred"
                    />
                    <p>Mazlietoti auto</p>
                </div>
            </div>
        </section>
    )
}

export default YourNextAutoSection;