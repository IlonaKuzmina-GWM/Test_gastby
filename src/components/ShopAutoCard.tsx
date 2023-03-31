import { GatsbyImage } from "gatsby-plugin-image";
import React, { FC } from "react";
import { Card, Nav } from "react-bootstrap";
import Button from "./Button";

type ShopAutoCardProps = {
    title: string;
    price: number | string;
    slug?: string;
    handleClick?: () => void;
    gatsbyImageData: any;
}

const ShopAutoCard: FC<ShopAutoCardProps> = ({ title, price, handleClick, gatsbyImageData, slug }) => {
    return (
        <Card border="light" className="shop-auto-card px-0 m-2 mb-3">
            <Nav.Link href={"/single" + slug} className="d-flex flex-column">
                <GatsbyImage image={gatsbyImageData} alt={title} className="shop-card-image" />
                <Card.Body className="px-4 d-flex flex-column">
                    <Card.Text className="mb-0">€ {price}</Card.Text>
                    <Card.Title>{title}</Card.Title>
                    <div className="justify-content-end d-flex btn-wrapper">
                        <Button name={"Skatīt"} size={""} type={"primary"}></Button>
                    </div>
                </Card.Body>
            </Nav.Link>
        </Card>
    );
}

export default ShopAutoCard;