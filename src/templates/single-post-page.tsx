import { HeadFC } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { FC, useEffect, useState } from "react";
import { Carousel, Col, Container, Nav, Row } from "react-bootstrap";

import MainLayout from "../layouts/MainLayout";
import { WpPost } from "../types/allWpPostTypes";


type SinglePostProps = {
    pageContext: WpPost;
};

const SinglePost: FC<SinglePostProps> = ({ pageContext }) => {

    const singlePostInformation = pageContext;
    console.log(singlePostInformation);


    return (
        <MainLayout>
            <Container className="single-post-container">
            <Row>
                    <Col>
                        <h1>{singlePostInformation.title}</h1>
                    </Col>
                </Row>
                <p>single post page</p>

            </Container>
        </MainLayout>
    );
};

export default SinglePost;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;
