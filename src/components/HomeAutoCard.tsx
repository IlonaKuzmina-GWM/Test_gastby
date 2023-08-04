import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { FC } from "react";
import { Card, ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import { CarCategory } from "../types/allWpCarTypes";

type HomeAutoCardProps = {
    gatsbyImageData: IGatsbyImageData;
    title: string;
    price: number;
    children?: JSX.Element;
    labels?: CarCategory[];
    slug?: string;
    imagesLink?:string;
}

const HomeAutoCard: FC<HomeAutoCardProps> = React.memo(({ labels, gatsbyImageData, title, price, children, slug,imagesLink }) => {

    return (
        <div className="home-auto-card-wrapper">
            <Card border="light" style={{ width: '' }}>
                <Nav.Link href={"/" + slug} >
                    <GatsbyImage 
                    image={gatsbyImageData} 
                    alt={title} 
                    loading="lazy"
                    className="home-auto-card-image" 
                    />
                    <Card.Body className="auto-card-content">
                        <Card.Title className="auto-card-title">{title}</Card.Title>
                        <Card.Text className="auto-card-price">€ {price}</Card.Text>
                    </Card.Body>
                    <ListGroup className="label-wrapper" horizontal >
                        {labels && labels.map((label: any) => (
                            <ListGroupItem key={label} className="label-item">{label.name}</ListGroupItem>
                        ))}
                    </ListGroup>
                </Nav.Link>
            </Card>
        </div>
    );
})

export default HomeAutoCard;