import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import MainLayout from "../layouts/MainLayout";


const IndexPage = () => {
  return (
    <MainLayout>
      <div> Pirkt Auto home page</div>
    </MainLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
