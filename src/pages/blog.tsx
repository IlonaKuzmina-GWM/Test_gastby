import React, { FC, useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { HeadFC, graphql } from "gatsby";
import { AllWpPosts, WpPost } from "../types/allWpPostTypes";
import { Card, Col, Nav, Row } from "react-bootstrap";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import HeroSection from "../components/HeroSection";
import SEO from "../components/SEO";
import SiteVisiteSection from "../components/SiteVisiteSection";
import SimpleHero from "../components/SimpleHeroSection";

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

    posts.allWpPost.nodes.forEach((post: WpPost) => {
      if (post.tags && post.tags.nodes.length > 0) {
        post.tags.nodes.forEach((tag: { name: string }) => {
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
      <SimpleHero heroTitleFirstLine={"Jaunumi un"} heroTitleSecondLine={"noderīgas auto ziņas"} />

      <section className="blog__tags--section container">
        <h2 className="fs-2">Rakstu kategorijas:</h2>

        <div className="mb-5 d-flex flex-wrap gap-2">
          <span
            className={`tag-item fs-6 fw-semibold  py-2 px-4 ${!filterPostsByTag ? 'active' : ''}`}
            onClick={() => { setFilterPostsByTag('') }}>Visas
          </span>
          {allTags && allTags.map((tag, index) => {
            return <span
              key={index}
              className={`tag-item fs-6 fw-semibold py-2 px-4 ${tag === filterPostsByTag ? 'active' : ''}`}
              onClick={() => { setFilterPostsByTag(tag); handleTagClick(tag) }}>
              {tag}
            </span>
          })}
        </div>

      </section>

      <section className="blog__post--section container d-grid gap-4 mt-4 mb-5">
        {posts.allWpPost.nodes.filter((post: WpPost) => {
          if (!filterPostsByTag) {
            return true;
          }
          return post.tags.nodes.some(tag => tag.name === filterPostsByTag);
        }).map((post: WpPost, index: number) => {
          return (
            <Card className="blog__post--card border border-0 rounded-5" key={index}>
              <Nav.Link href={"/" + post.slug} className="rounded-5 d-flex flex-column">
                <GatsbyImage
                  image={post.featuredImage.node.gatsbyImage}
                  alt={post.title}
                  loading="lazy"
                  className="card-img-top"
                />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <div dangerouslySetInnerHTML={{ __html: post.excerpt.slice(0, 100) + "..." }} />
                  <div className="read__more--wrapper d-flex justify-content-end">
                    <span className="read__more--btn" >Lasīt vairāk...</span>
                  </div>
                </Card.Body>
                <Card.Footer className="d-flex gap-3 mt-auto py-3 ps-4 border border-0 bg-white">
                  {post.tags.nodes.map((tag, tagIndex) => (
                    <React.Fragment key={tagIndex}>
                      <p className="tag mb-0 fs-6 text-uppercase">{tag.name}</p>
                    </React.Fragment>
                  ))}
                </Card.Footer>
              </Nav.Link>
            </Card>
          )
        })}
      </section>

      <SiteVisiteSection />
    </MainLayout>
  );
};

export default Blog;

export const Head: HeadFC = () => <SEO title={"Pirkt auto-blogs"} description={"Visi aktuālie jaunumi vienuviet."} />;

export const query = graphql`
query AllCarsDetails {
    allWpPost {
    totalCount
    nodes {
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
}`