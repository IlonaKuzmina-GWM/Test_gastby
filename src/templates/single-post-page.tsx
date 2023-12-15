import { HeadFC } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { FC, useEffect, useState } from "react";
import { Carousel, Col, Container, Nav, Row } from "react-bootstrap";

import MainLayout from "../layouts/MainLayout";
import { WpPost } from "../types/allWpPostTypes";
import SimpleHero from "../components/SimpleHeroSection";


type SinglePostProps = {
    pageContext: WpPost;
};

const SinglePost: FC<SinglePostProps> = ({ pageContext }) => {

    const singlePostInformation = pageContext;
    console.log(singlePostInformation);

    return (
        <MainLayout>
            <div className="container single__post-wrapper">
                <div className="row">
                    <div className="col-4">
                        <h1 className="fs-1 fw-bold">{singlePostInformation.title}</h1>
                        {/* <GatsbyImage image={singlePostInformation.featuredImage.node.gatsbyImage} alt={singlePostInformation.title} /> */}
                    </div>
                    <div className="col-8">
                      <div className="post__content" dangerouslySetInnerHTML={{ __html: singlePostInformation.content }} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default SinglePost;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;
