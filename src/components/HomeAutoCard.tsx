import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import React, { FC, ReactNode } from "react";
import { Card, CardImg, ListGroup, ListGroupItem, Nav } from "react-bootstrap";

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
        // <div className="auto-card-wrapper">
        //     {/* <GatsbyImage alt={""} image={imageUrl}></GatsbyImage> */}
        //     <StaticImage className="auto-card-image" src={"../images/Escultures.png"} alt={""} />
        // </div>
        <>
            <Card border="light" style={{ width: '18rem' }}>
                <Nav.Link href="/shop">
                    <StaticImage className="auto-card-image" src={"../images/Escultures.png"} alt={""} />
                    {/* <Card.Img variant="top"> <StaticImage className="auto-card-image" src={"../images/Esculturesa.png"} alt={""} /></Card.Img> */}
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>€ {price}</Card.Text>
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{labels}</ListGroupItem>
                    </ListGroup>
                </Nav.Link>
            </Card>
        </>
    );
}

export default HomeAutoCard;