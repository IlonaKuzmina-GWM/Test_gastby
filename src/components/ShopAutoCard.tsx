import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { title } from "process";
import React, { FC } from "react";
import { Card, Nav, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import Button from "./Button";

type ShopAutoCardProps = {
    title: string;
    price: number | string;
    handleClick: () => void;
    gatsbyImageData: any;
}

const ShopAutoCard: FC<ShopAutoCardProps> = ({ title, price, handleClick, gatsbyImageData }) => {
    return (
        <Card border="light" className="shop-auto-card px-0 m-2 mb-3">
            <Nav.Link href="/single">
                {/* <Card.Img variant="top" src={imageUrl} /> */}
                {/* <Card.Img variant="top" src={gatsbyImageData}></Card.Img> */}
                <GatsbyImage image={gatsbyImageData} alt={title} className="shop-card-image" />
                {/* <StaticImage className="shop-card-image" src={"../images/Escultures1.png"} alt={"Auto"} /> */}
                <Card.Body className="px-4">
                    <Card.Text className="mb-0">€ {price}</Card.Text>
                    <Card.Title>{title}</Card.Title>
                    <Row className="justify-content-end">
                        <Button name={"Skatīt"} size={""} type={"primary"}></Button>
                    </Row>
                </Card.Body>
            </Nav.Link>
        </Card>
    );
}

export default ShopAutoCard;