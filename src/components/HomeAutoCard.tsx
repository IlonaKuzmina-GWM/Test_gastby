import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image";
import React, { FC, ReactNode } from "react";
import { Card, CardImg, ListGroup, ListGroupItem, Nav } from "react-bootstrap";

type HomeAutoCardProps = {
    gatsbyImageData: IGatsbyImageData;
    title: string;
    price: number;
    children?: ReactNode;
    labels?: ReactNode;
}

const HomeAutoCard: FC<HomeAutoCardProps> = ({ labels, gatsbyImageData, title, price, children }) => {

    return (
        <div className="home-auto-card-wrapper">
            <Card border="light" style={{ width: '' }}>
                <Nav.Link href="/shop">
                    <GatsbyImage image={gatsbyImageData} alt={title} className="home-auto-card-image" />

                    <Card.Body className="auto-card-content">
                        <Card.Title className="auto-card-title">{title}</Card.Title>
                        <Card.Text className="auto-card-price">€ {price}</Card.Text>
                    </Card.Body>
                    <ListGroup className="label-wrapper">
                        <ListGroupItem>{labels}</ListGroupItem>
                    </ListGroup>
                </Nav.Link>
            </Card>
        </div>


    );
}

export default HomeAutoCard;