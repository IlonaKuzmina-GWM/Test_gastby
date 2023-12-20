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
        <Card className="shop-auto-card px-0 mb-3 mx-1 bg-white border-0 rounded-4">
            <Nav.Link href={"/" + slug} className="d-flex flex-column">
                <GatsbyImage
                    image={gatsbyImageData}
                    alt={title}
                    loading="lazy"
                    className="shop-card-image border-0 rounded-top-4 overflow-hidden"/>

                <Card.Body className="d-flex flex-column gap-2">
                    <Card.Text className="small-title mb-0 text-primary fw-light text-uppercase">
                        {carInfo?.autoStavoklis}
                    </Card.Text>
                    <Card.Title className="mb-0 fs-6 fw-medium">{carInfo?.gads} {title}</Card.Title>
                    <Card.Footer className="p-0 bg-transparent d-flex flex-row justify-content-between border-0 mt-auto mx-0 mb-0 align-items-end">
                        <div className="mileage-container fw-semibold text-secondary">{carInfo?.nobraukums && <div>{carInfo?.nobraukums} km</div>}</div>
                        <div className="fw-medium">€ {carInfo?.carPrice}</div>
                    </Card.Footer>
                </Card.Body>
            </Nav.Link>
        </Card>
    );
}

export default ShopAutoCard;