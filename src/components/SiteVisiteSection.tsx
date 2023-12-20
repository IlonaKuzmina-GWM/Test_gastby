import React, { FC } from "react";
import Button from "./Button";


const SiteVisiteSection = () => {
    return (
        <section className="bg-secondary text-center text-white py-5 px-0">
            <div className="container-lg wrapper align-items-center">
                <h2>Ready for a <span className="text-primary">Site visit ?</span></h2>
                <p className="mt-1 mb-5 text-white">Lorem ipsum dolo elit Lorem ipsum dolo</p>
                <Button name={"View Now"} size={"small"} type={"primary"} />
            </div>
        </section>
    )
}

export default SiteVisiteSection;