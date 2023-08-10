import React from "react";
import MainLayout from "../layouts/MainLayout";
import { HeadFC } from "gatsby";

const Contact = () => {
    return (
        <MainLayout>
         <div className="vh-100 d-flex justify-content-center align-items-center">
                 Contact page
            </div>
        </MainLayout>
    );
};

export default Contact;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;