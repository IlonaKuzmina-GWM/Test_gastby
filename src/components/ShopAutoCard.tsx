import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { FC } from "react";
import { Card, Nav } from "react-bootstrap";
import Button from "./Button";
import { CarInfo } from "../types/allWpCarTypes";

type ShopAutoCardProps = {
    title: string;
    slug: string;
    handleClick?: () => void;
    gatsbyImageData: IGatsbyImageData;
    carInfo?: CarInfo;
}

const ShopAutoCard: FC<ShopAutoCardProps> = ({ title, handleClick, gatsbyImageData, slug, carInfo }) => {

    return (
        <Card className="shop-auto-card px-0 m-2 mb-3 mx-1">
            <Nav.Link href={"/" + slug} className="d-flex flex-column">
                <GatsbyImage
                    image={gatsbyImageData}
                    alt={title}
                    loading="lazy"
                    className="shop-card-image" />

                <Card.Body className="d-flex flex-column">
                    <Card.Text className="small-title mb-0">
                        {carInfo?.autoStavoklis}
                    </Card.Text>
                    <Card.Title>{carInfo?.gads} {title}</Card.Title>
                    <Card.Footer>
                        <div>{carInfo?.nobraukums && <div>{carInfo?.nobraukums} km</div>}</div>
                        <div>€ {carInfo?.carPrice}</div>
                    </Card.Footer>
                </Card.Body>
            </Nav.Link>
        </Card>
    );
}

export default ShopAutoCard;