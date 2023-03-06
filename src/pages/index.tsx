import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/Button";


const IndexPage = () => {
  return (
    <MainLayout>
      <section className="hero-section container">
        <div> Pirkt Auto home page</div>
      </section>

      <section className="site-visite">
        <div className="container wrapper">
          <h2>Ready for a <span className="gold-text">Site visit ?</span></h2>
          <p>Lorem ipsum dolo elit Lorem ipsum dolo</p>
          <Button name={"View New"} size={"medium"} type={"primary"} />
        </div>
      </section>
    </MainLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
