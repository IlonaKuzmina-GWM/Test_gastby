import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import React, { FC, ReactNode } from "react";

type HomeAutoCardProps = {
    imageUrl: string;
    title: string;
    price: number;
    children?: ReactNode;
    labels: ReactNode;
}

const HomeAutoCard: FC<HomeAutoCardProps> = ({ labels, imageUrl, title, price, children }) => {
console.log(imageUrl)

    return (
        <div className="auto-card-wrapper">
            {/* <GatsbyImage alt={""} image={imageUrl}></GatsbyImage> */}
            <StaticImage className="auto-card-image" src={"../images/Escultures.png"} alt={""}/>
            <div className="auto-card-content">
                <h4 className="auto-card-title">{title}</h4>
                <p className="auto-card-price">€ {price}</p>
                <div className="label-wrapper">
                    {/* {children} */}
                    {labels}
                </div>
            </div>

        </div>);
}

export default HomeAutoCard;