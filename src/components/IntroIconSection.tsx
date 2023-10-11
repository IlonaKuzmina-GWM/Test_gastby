import { StaticImage } from "gatsby-plugin-image";
import React, { FC } from "react";

type IntroIconSectionProps = {

}

const IntroIconSection: FC<IntroIconSectionProps> = ({ }) => {
    return (
        <section className="item-section ">
            <div className="container-lg wrapper">
                <div className="item">
                    <StaticImage
                        className="item-image"
                        src={"../images/laiks.png"}
                        alt={"Icon"}
                        placeholder='blurred'
                        layout="fixed"
                        width={54}
                        height={59}
                    />

                    <div className="item-content">
                        <h3>Jauni auto</h3>
                        <p>Aktuālie auto piedāvājumi no salona</p>
                    </div>
                </div>
                <div className="item">
                    <StaticImage
                        className="item-image"
                        src={"../images/izdevigi.png"}
                        alt={"Icon"}
                        placeholder='blurred'
                        layout="fixed"
                        width={56}
                        height={64}
                    />

                    <div className="item-content">
                        <h3>Mazlietoti auto</h3>
                        <p>Tikai pie dīlera pieejami auto </p>
                    </div>
                </div>
                <div className="item">
                    <StaticImage
                        className="item-image"
                        src={"../images/customer-service.svg"}
                        alt={"Icon"}
                        placeholder='blurred'
                        layout="fixed"
                        width={56}
                        height={56}
                    />

                    <div className="item-content">
                        <h3>Ietaupi laiku</h3>
                        <p>Atlasi pēc sev vēlamajām ekstrām </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default IntroIconSection;