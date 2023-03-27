import * as React from "react";
import { graphql, HeadFC, Link } from "gatsby";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/Button";
import { StaticImage } from "gatsby-plugin-image";
import HomeAutoCard from "../components/HomeAutoCard";
import TooltipBoot from "../components/Tooltip";
import CarCarousel from "../components/CarCarousel";

type HomeProps = {
  data: any;
};

const IndexPage: React.FC<HomeProps> = ({ data }) => {
  const postTitle = data.allWpPost.nodes[0].title;

  return (
    <MainLayout>
      <section className="hero-section">
        <StaticImage
          style={{ position: "absolute" }}
          src={"../images/hero_image.png"}
          alt={"Hero image"}
          className={"hero-background-image"}
        />
        <div className="hero-content">
          <h1 className="hero-title">Tavs ’vietējais’ jaunu auto
            piedāvājuma portāls</h1>
          <p>atrodi sev piemērotu auto ātri, vienkārši un
            vēl papildus bla bla bla :D </p>
          <form className="hero-search-form" action="">
            <input type="search" placeholder="Meklēt auto" className="hero-search-input" />
            <button type="submit">
              <StaticImage src={"../images/search.png"} alt={"Search"} />
            </button>
          </form>

          <div className="review-pop-up">
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/review-img.png"}
              alt={"Avatar"}
              className={"review-avatar"}
            />
            <h5 className="review-name">Andris Bērziņš</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum.</p>
          </div>

          <TooltipBoot></TooltipBoot>

        </div>
        <div className="white-gradient"></div>
      </section>

      <section className="item-section ">
        <div className="container-lg wrapper">
          <div className="item">
            <StaticImage className="item-image" src={"../images/laiks.png"} alt={"Icon"} objectFit="contain"></StaticImage>
            <div className="item-content">
              <h5>Laiks ir nauda</h5>
              <p>Laika nav.. naudas arī nav..</p>
            </div>
          </div>
          <div className="item">
            <StaticImage className="item-image" src={"../images/izdevigi.png"} alt={"Icon"} objectFit="contain"></StaticImage>
            <div className="item-content">
              <h5>Izvēlies izdevīgāko</h5>
              <p>Atrodi sev izdevīgāko auto</p>
            </div>
          </div>
          <div className="item">
            <StaticImage className="item-image" src={"../images/ask-me.png"} alt={"Icon"} objectFit="contain"></StaticImage>
            <div className="item-content">
              <h5>Vēl kaut kas</h5>
              <p>Lorem Ipsums</p>
            </div>
          </div>
        </div>
      </section>

      <section className="latest-auto-section">
        <div className="container-lg">
          <h2>Jaunākie auto
            piedāvājumi</h2>
          <div className="arrow-wrapper">
            <Link to="/shop"><p>Skatīt visus auto</p></Link>
            <StaticImage className="arrow" src={"../images/arrow-right.png"} alt={"Arrow"} width={25}></StaticImage>
          </div>
        </div>

        <div className="auto-card-container">
          <CarCarousel></CarCarousel>
        </div>
      </section>

      <section className="one-more-section container-lg">
        <h2 className="section-title">Interior Plant Reference</h2>
        <p className="section-text">make your home so comfortable with refreshing plants</p>

        <div className="row justify-content-between px-3 mt-5 first-items-container">
          <div className="d-flex item col-md-7 mb-5">
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/1.jpg"}
              alt={"image"}
              className={"item-image"}
            />
            <Link to="/shop" className=""></Link>
            <p>Jauni auto</p>
          </div>
          <div className="d-flex item col-md-4 mb-5">
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/2.webp"}
              alt={"image"}
              className={"item-image"}
            /></div>
        </div>
        <div className="row justify-content-between px-3 second-items-container">
          <div className="d-flex item col-md-4 mb-5">
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/3.jpg"}
              alt={"image"}
              className={"item-image"}
            /></div>
          <div className="d-flex item col-md-7 mb-5">
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/4.jpg"}
              alt={"image"}
              className={"item-image"}
            />
            <Link to="/shop"></Link>
            <p>Mazlietoti auto</p>
          </div>
        </div>
      </section>

      <section className="site-visite-section">
        <div className="container-lg wrapper">
          <h2>Ready for a <span className="gold-text">Site visit ?</span></h2>
          <p>Lorem ipsum dolo elit Lorem ipsum dolo</p>
          <Button name={"View Now"} size={"medium"} type={"primary"} />
        </div>
      </section>
    </MainLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;

export const query = graphql`
query MyQuery {
  allWpPost {
    nodes {
      title
    }
  }
}
`
