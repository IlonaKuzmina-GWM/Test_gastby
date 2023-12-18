import { HeadFC } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { FC, useEffect, useState } from "react";
import { Card, Carousel, Col, Container, Nav, Row } from "react-bootstrap";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import MainLayout from "../layouts/MainLayout";
import { WpPost } from "../types/allWpPostTypes";
import SimpleHero from "../components/SimpleHeroSection";
import useAllWpPostData from "../queries/useAllWpPostData";


type SinglePostProps = {
    pageContext: WpPost;
};

const SinglePost: FC<SinglePostProps> = ({ pageContext }) => {
    const morePostsForYou = useAllWpPostData();
    const singlePostInformation = pageContext;
    console.log(singlePostInformation);

    return (
        <MainLayout>
            <div className="container single__post-wrapper">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <h1 className="fs-1 fw-bold mb-2">{singlePostInformation.title}</h1>
                        <GatsbyImage image={singlePostInformation.featuredImage.node.gatsbyImage} alt={singlePostInformation.title} />
                        <div className="d-flex gap-4 my-3">
                            <FacebookShareButton
                                url={`https://pirkt-auto.netlify.app/${singlePostInformation.slug}`}
                                quote={'Interesants raskts-izlasi!'}
                                hashtag="#mynewcar"
                            >
                                <FacebookIcon size={30} round />
                            </FacebookShareButton>

                            <WhatsappShareButton url={`https://pirkt-auto.netlify.app/${singlePostInformation.slug}`}>
                                <WhatsappIcon size={30} round />
                            </WhatsappShareButton>

                            <TelegramShareButton url={`https://pirkt-auto.netlify.app/${singlePostInformation.slug}`}>
                                <TelegramIcon size={30} round></TelegramIcon>
                            </TelegramShareButton>

                            <EmailShareButton url={'https://www.example.com'}>
                                <EmailIcon size={30} round />
                            </EmailShareButton>
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="post__content" dangerouslySetInnerHTML={{ __html: singlePostInformation.content }} />
                    </div>
                </div>
            </div>


            <section className="container">
                <div>
                    <h2 className="fs-2">Līdzīgi raksti</h2>
                </div>

                <div className="blog__post--section">
                    {morePostsForYou
                        .filter((post: WpPost) => post.title !== singlePostInformation.title)
                        .slice(0, 3)
                        .map((post: WpPost, index: number) => {
                            return (
                                <Card className="blog__post--card" key={index}>
                                    <Nav.Link href={"/" + post.slug} >
                                        <GatsbyImage
                                            image={post.featuredImage.node.gatsbyImage}
                                            alt={post.title}
                                            loading="lazy"
                                            className="card-img-top"
                                        />
                                        <Card.Body>
                                            <Card.Title>{post.title}</Card.Title>
                                            <div dangerouslySetInnerHTML={{ __html: post.excerpt.slice(0, 100) + "..." }} />
                                            <div className="read__more--wrapper">
                                                <span className="read__more--btn" >Lasīt vairāk...</span>
                                            </div>
                                        </Card.Body>
                                        <Card.Footer>
                                            {post.tags.nodes.map((tag, tagIndex) => (
                                                <React.Fragment key={tagIndex}>
                                                    <p className="tag">{tag.name}</p>
                                                </React.Fragment>
                                            ))}
                                        </Card.Footer>
                                    </Nav.Link>
                                </Card>
                            )
                        })}
                </div>


            </section>
        </MainLayout>
    );
};

export default SinglePost;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;
