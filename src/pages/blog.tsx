import React, { FC, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { HeadFC, graphql } from "gatsby";
import { AllWpPosts, WpPost } from "../types/allWpPostTypes";
import { Card, Nav } from "react-bootstrap";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import HeroSection from "../components/HeroSection";

type BlogPageProps = {
    data: AllWpPosts;
}

const Blog: FC<BlogPageProps> = ({ data }) => {
    const [posts, setPosts] = useState<AllWpPosts>(data);

    return (
        <MainLayout>
            <section className="blog-hero-section">
            <div className="white-gradient-top"/>
                <StaticImage
                    src="../images/Blog_intro-image.jpg"
                    alt="Hero Background"
                    layout="fullWidth"
                    placeholder="blurred"
                    className="banner-background "
                    loading="lazy"
                    height={250}
                    width={1000}
                    quality={95}
                />
                <div className="banner__text-wrap container">
                    <h1 className="banner__title">Jaunumi un noderīgas auto ziņas</h1>
                </div>

                <div className="black-gradient"></div>
            </section>

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1">
                            {posts.allWpPost.edges.map((post: WpPost) => (
                                <Card border="light" style={{ width: '' }}>
                                    <Nav.Link href={"/" + post.node.slug} >
                                        <GatsbyImage
                                            image={post.node.featuredImage.node.gatsbyImage}
                                            alt={post.node.title}
                                            loading="lazy"
                                            className="card-img-top"
                                        />
                                        <Card.Body className="post-card-content">
                                            <Card.Text className="post-date">{post.node.date}</Card.Text>
                                            <Card.Text className="post-author">{post.node.author.node.name}</Card.Text>

                                            <Card.Title className="post-title">{post.node.title}</Card.Title>
                                            <Card.Text className="post-description">{post.node.excerpt}</Card.Text>
                                        </Card.Body>
                                    </Nav.Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Blog;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;

export const query = graphql`
query AllCarsDetails {
    allWpPost {
    totalCount
    edges {
      next {
        title
        slug
      }
      previous {
        slug
        title
      }
      node {
        title
        slug
        author {
          node {
            name
          }
        }
        content
        date(formatString: "DD.MM.Y")
        excerpt
        featuredImage {
          node {
            gatsbyImage(fit: COVER, formats: WEBP, placeholder: BLURRED)
          }
        }
      }
    }
  }
}`