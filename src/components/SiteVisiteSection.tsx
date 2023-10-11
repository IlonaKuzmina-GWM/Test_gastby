import React, { FC } from "react";
import Button from "./Button";


const SiteVisiteSection = () => {
    return (
        <section className="site-visite-section">
            <div className="container-lg wrapper">
                <h2>Ready for a <span className="gold-text">Site visit ?</span></h2>
                <p>Lorem ipsum dolo elit Lorem ipsum dolo</p>
                <Button name={"View Now"} size={"small"} type={"primary"} />
            </div>
        </section>
    )
}

export default SiteVisiteSection;