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
        <Card border="light" className="shop-auto-card px-0 m-2">
            <Nav.Link href="/shop">
                {/* <Card.Img variant="top" src={imageUrl}></Card.Img> */}
                {/* <Card.Img variant="top" src={"../images/Escultures.png"}></Card.Img> */}
                <StaticImage className="shop-card-image" src={"../images/Escultures1.png"} alt={"Auto"} />
                <Card.Body className="px-4">
                    <Card.Text>€ {price}</Card.Text>
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