import { StaticImage } from "gatsby-plugin-image";
import React, { FC } from "react";

type YourNextAutoSectionProps = {
    onClickHandler: (filterBy: string) => void;
}

const YourNextAutoSection: FC<YourNextAutoSectionProps> = ({ onClickHandler }) => {
    return (
        <section className="your-next-auto__section container-lg text-center">
            <h2 className="section-title">Izvēlies savu nākošo auto</h2>
            <p className="mb-0 fs-5">Jauns, mazlietots, elektrisks vai pilnpiedziņas?</p>
            <p className="mb-0 fs-5">Atrodi aktuālo piedāvājumu pie mums.</p>

            <div className="row justify-content-between px-3 mt-5 first-items-container">
                <div className="d-flex item pointer col-md-7 mb-5 py-0 px-3 position-relative text-center overflow-hidden justify-content-center align-items-center rounded-5 bg-secondary" onClick={() => onClickHandler("jauns")}>
                    <StaticImage
                        style={{ position: "absolute" }}
                        src={"../images/1.jpg"}
                        alt={"image"}
                        className={"item-image z-0 d-block object-fit-cover"}
                        formats={['auto', 'webp', 'avif']}
                        placeholder="blurred"
                    />
                    <p className="z-1 d-block text-white fs-1 fw-semibold">Jauni auto</p>
                </div>

                <div className="d-flex item pointer col-md-4 mb-5 py-0 px-3 position-relative text-center overflow-hidden justify-content-center align-items-center rounded-5 bg-secondary">
                    <StaticImage
                        style={{ position: "absolute" }}
                        src={"../images/2.webp"}
                        alt={"image"}
                        className={"item-image z-0 d-block object-fit-cover"}
                        formats={['auto', 'webp', 'avif']}
                        placeholder="blurred"
                    />
                    <p className="z-1 d-block text-white fs-1 fw-semibold">Kaut kādi auto</p>
                </div>
            </div>

            <div className="row justify-content-between px-3 second-items-container">
                <div className="d-flex item pointer col-md-4 mb-5 py-0 px-3 position-relative text-center overflow-hidden justify-content-center align-items-center rounded-5 bg-secondary" onClick={() => onClickHandler("Elektriskais")}>
                    <StaticImage
                        style={{ position: "absolute" }}
                        src={"../images/3.jpg"}
                        alt={"image"}
                        className={"item-image z-0 d-block object-fit-cover"}
                        formats={['auto', 'webp', 'avif']}
                        placeholder="blurred"
                    />
                    <p className="z-1 d-block text-white fs-1 fw-semibold">Elektriskie auto</p>
                </div>

                <div className="d-flex item pointer col-md-7 mb-5 py-0 px-3 position-relative text-center overflow-hidden justify-content-center align-items-center rounded-5 bg-secondary" onClick={() => onClickHandler("mazlietots")}>
                    <StaticImage
                        style={{ position: "absolute" }}
                        src={"../images/4.jpg"}
                        alt={"image"}
                        className={"item-image z-0 d-block object-fit-cover"}
                        formats={['auto', 'webp', 'avif']}
                        placeholder="blurred"
                    />
                    <p className="z-1 d-block text-white fs-1 fw-semibold">Mazlietoti auto</p>
                </div>
            </div>
        </section>
    )
}

export default YourNextAutoSection;