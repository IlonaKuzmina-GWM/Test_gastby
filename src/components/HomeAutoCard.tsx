import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { Card, ListGroup, ListGroupItem, Nav } from "react-bootstrap";

type HomeAutoCardProps = {
    gatsbyImageData: IGatsbyImageData;
    title: string;
    price: number;
    children?: ReactNode;
    labels?: any;
    slug?: string;
}

const HomeAutoCard: FC<HomeAutoCardProps> = ({ labels, gatsbyImageData, title, price, children, slug }) => {
    const [neededLabels, setNeededLabels] = useState<string[]>([])


    console.log("labels", labels)
    console.log("neededLabels", neededLabels)

    useEffect(() => { findLabels() }, [])

    const findLabels = () => {
        const names: string[] = [];

        for (const label of labels) {
            if (label.parentDatabaseId === 304 || label.parentDatabaseId === 202 || label.parentDatabaseId === 211)
                names.push(label.name)
        }

        setNeededLabels(names)
    }

    // {
    //gads
    //   "name": "2019",
    //   "databaseId": 420,
    //   "parentDatabaseId": 304
    // }

    // {
    //   "name": "Mazlietots",
    //   "databaseId": 208,
    //   "parentDatabaseId": 202
    // },

    // {
    //   "name": "Rīga",
    //   "databaseId": 214,
    //   "parentDatabaseId": 211
    // },

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
                        {neededLabels.map((label) => (
                            <span key={label} className="label-item">{label}</span>
                            // <ListGroupItem key={label} className="label-item">{label}</ListGroupItem>
                        ))}
                    </ListGroup>
                </Nav.Link>
            </Card>
        </div>
    );
}

export default HomeAutoCard;