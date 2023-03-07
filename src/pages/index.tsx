import * as React from "react";
import { HeadFC, Link, PageProps } from "gatsby";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/Button";
import { StaticImage } from "gatsby-plugin-image";


const IndexPage = () => {
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
            <button type="submit"> <StaticImage src={"../images/search.png"} alt={"Search"} /></button>
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


        </div>
        <div className="white-gradient"></div>
      </section>

      <section className="item-section ">
        <div className="container wrapper">
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
        <div className="container">
          <h2>Jaunākie auto
            piedāvājumi</h2>
          <Link to="/shop"><p>Skatīt visus auto</p></Link>
        </div>
        <div className="auto-card-container">
          <div className="auto-card"></div>
        </div>
      </section>

      <section className="site-visite-section">
        <div className="container wrapper">
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
