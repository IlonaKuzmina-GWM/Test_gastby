import React, { FC, useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { HeadFC, graphql } from "gatsby";
import { AllWpPosts, WpPost } from "../types/allWpPostTypes";
import { Card, Col, Nav, Row } from "react-bootstrap";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import HeroSection from "../components/HeroSection";
import SEO from "../components/SEO";

type BlogPageProps = {
  data: AllWpPosts;
}

const Blog: FC<BlogPageProps> = ({ data }) => {
  const [posts, setPosts] = useState<AllWpPosts>(data);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [filterPostsByTag, setFilterPostsByTag] = useState('');

  useEffect(() => {
    const tags = getUniqueTags(posts);
    setAllTags(tags);
  }, [data])

  const getUniqueTags = (posts: AllWpPosts) => {
    const uniqueTags = new Set<string>();

    posts.allWpPost.edges.forEach((post: WpPost) => {
      if (post.node.tags && post.node.tags.nodes.length > 0) {
        post.node.tags.nodes.forEach((tag: { name: string }) => {
          uniqueTags.add(tag.name);

        })
      }
    });

    return Array.from(uniqueTags);
  }

  const handleTagClick = (tag: string) => {
    setFilterPostsByTag(tag === filterPostsByTag ? '' : tag);
  };

  return (
    <MainLayout>
      <section className="blog__hero--section">
        <div className="banner__text-wrap container">
          <h1 className="banner__title">Jaunumi un <br /> noderīgas auto ziņas</h1>
        </div>

        <div className="white__gradient--bottom"></div>
      </section>

      <section className="blog__tags--section container mb-4">
        <h2 className="tag-title">Rakstu kategorijas:</h2>
        <div className="tags__wrapper">
          <span
            className={`tag-item ${!filterPostsByTag ? 'active' : ''}`}
            onClick={() => { setFilterPostsByTag('') }}>Visas
          </span>
          {allTags && allTags.map((tag, index) => {
            return <span
              className={`tag-item ${tag === filterPostsByTag ? 'active' : ''}`}
              onClick={() => { setFilterPostsByTag(tag); handleTagClick(tag) }}>
              {tag}
            </span>
          })}
        </div>

      </section>

      <section className="blog__post--section container">
        <Row xs={1} md={2} lg={3} className="g-4 mt-4" >
          {posts.allWpPost.edges.filter((post: WpPost) => {
            if (!filterPostsByTag) {
              return true;
            }
            return post.node.tags.nodes.some(tag => tag.name === filterPostsByTag);
          }).map((post: WpPost) => {
            return (
              <Col key="">
                <Card className="blog__post--card">
                  <Nav.Link href={"/" + post.node.slug} >
                    <GatsbyImage
                      image={post.node.featuredImage.node.gatsbyImage}
                      alt={post.node.title}
                      loading="lazy"
                      className="card-img-top"
                    />
                    <Card.Body>
                      <Card.Title>{post.node.title}</Card.Title>
                      <Card.Text>
                        <div dangerouslySetInnerHTML={{ __html: post.node.excerpt.slice(0, 100) + "..." }} />
                        <div className="read__more--wrapper">
                          <span className="read__more--btn" >Lasīt vairāk...</span>
                        </div>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {post.node.tags.nodes.map((tag, index) => (
                        <React.Fragment key={index}>
                          <small className="tag">{tag.name}</small>
                        </React.Fragment>
                      ))}
                    </Card.Footer>
                  </Nav.Link>
                </Card>
              </Col>
            )
          })}
        </Row>
      </section>
    </MainLayout>
  );
};

export default Blog;

export const Head: HeadFC = () => <SEO />;

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
        tags {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            gatsbyImage(
            cropFocus: CENTER
            fit: COVER
            formats: WEBP
            placeholder: BLURRED
            width: 586
            height: 317
          )
          }
        }
      }
    }
  }
}`