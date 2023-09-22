import { HeadFC } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { FC, useEffect, useState } from "react";
import { Carousel, Col, Container, Nav, Row } from "react-bootstrap";

import MainLayout from "../layouts/MainLayout";
import { Car } from "../types/allWpCarTypes";


type SinglePostProps = {
    pageContext: any;
};

const SinglePost: FC<SinglePostProps> = ({ pageContext }) => {

    const singlePostInformation = pageContext;


    return (
        <MainLayout>
            <Container className="single-post-container">


            </Container>
        </MainLayout>
    );
};

export default SinglePost;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;
