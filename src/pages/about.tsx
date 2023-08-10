import React from "react";
import MainLayout from "../layouts/MainLayout";
import { HeadFC } from "gatsby";

const AboutUs = () => {
    return (
        <MainLayout>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                 About page 
            </div>
        </MainLayout>
    );
};

export default AboutUs;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;