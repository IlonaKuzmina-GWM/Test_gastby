import { StaticImage } from "gatsby-plugin-image";
import { title } from "process";
import React, { FC } from "react";
import { Card, Nav, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import Button from "./Button";

type ShopAutoCardProps = {
    title: string;
    price: number | string;
    handleClick: () => void;
    imageUrl: string;
}

const ShopAutoCard: FC<ShopAutoCardProps> = ({ title, price, handleClick, imageUrl }) => {
    return (
        <Card border="light" className="shop-auto-card px-0 m-2 mb-3">
            <Nav.Link href="/single">
            {/* <Card.Img variant="top" src={imageUrl} /> */}
            {/* <Card.Img variant="top" src={"../images/Escultures.png"}></Card.Img> */}
            <StaticImage className="shop-card-image" src={"../images/Escultures1.png"} alt={"Auto"} />
            <Card.Body className="px-4">
                <Card.Text className="mb-0">€ {price}</Card.Text>
                <Card.Title>{title}</Card.Title>
                {/* <Card.Text>
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </Card.Text> */}
                <Row className="justify-content-end">
                    <Button name={"Skatīt"} size={""} type={"primary"}></Button>
                </Row>
            </Card.Body>
            </Nav.Link>
        </Card>
    );
}

export default ShopAutoCard;