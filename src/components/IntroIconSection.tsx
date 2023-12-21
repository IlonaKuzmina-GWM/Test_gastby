import { StaticImage } from "gatsby-plugin-image";
import React, { FC } from "react";

type IntroIconSectionProps = {

}

const IntroIconSection: FC<IntroIconSectionProps> = ({ }) => {
    return (
        <section className="item-section py-5">
            <div className="wrapper flex-column gap-4 flex-sm-row justify-content-around px-3">
                <div className="item d-flex gap-2 flex-column flex-lg-row align-items-center text-center align-items-sm-start text-sm-start">
                    <StaticImage
                        className="item-image object-fit-contain"
                        src={"../images/laiks.png"}
                        alt={"Icon"}
                        placeholder='blurred'
                        layout="fixed"

                        width={54}
                        height={59}
                    />

                    <div className="item-content ml-3">
                        <h3 className="fs-4 fw-bold">Jauni auto</h3>
                        <p className="fs-6 text-secondary">Aktuālie auto piedāvājumi no salona</p>
                    </div>
                </div>
                <div className="item d-flex gap-2 flex-column flex-lg-row align-items-center text-center align-items-sm-start text-sm-start">
                    <StaticImage
                        className="item-image"
                        src={"../images/izdevigi.png"}
                        alt={"Icon"}
                        placeholder='blurred'
                        layout="fixed"
                        width={56}
                        height={64}
                    />

                    <div className="item-content ml-3">
                        <h3 className="fs-4 fw-bold">Mazlietoti auto</h3>
                        <p className="fs-6 text-secondary">Tikai pie dīlera pieejami auto </p>
                    </div>
                </div>
                <div className="item d-flex gap-2 flex-column flex-lg-row align-items-center text-center align-items-sm-start text-sm-start">
                    <StaticImage
                        className="item-image"
                        src={"../images/customer-service.svg"}
                        alt={"Icon"}
                        placeholder='blurred'
                        layout="fixed"
                        width={56}
                        height={56}
                    />

                    <div className="item-content ml-3">
                        <h3 className="fs-4 fw-bold">Ietaupi laiku</h3>
                        <p className="fs-6 text-secondary">Atlasi pēc sev vēlamajām ekstrām </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default IntroIconSection;