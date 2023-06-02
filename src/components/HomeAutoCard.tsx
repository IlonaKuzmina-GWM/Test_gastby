import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { FC, ReactNode } from "react";
import { Card, ListGroup, ListGroupItem, Nav } from "react-bootstrap";

type HomeAutoCardProps = {
    gatsbyImageData: IGatsbyImageData;
    title: string;
    price: number;
    children?: ReactNode;
    labels?: ReactNode;
    slug?: string;
}

const HomeAutoCard: FC<HomeAutoCardProps> = ({ labels, gatsbyImageData, title, price, children, slug }) => {

    return (
        <div className="home-auto-card-wrapper">
            <Card border="light" style={{ width: '' }}>
                <Nav.Link href={"/" + slug} >
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