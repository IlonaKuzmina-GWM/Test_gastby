import React, { FC, ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../scss/index.scss";
import "../scss/core/core.scss";

type MainLayoutProps = {
    children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="layout-container">
            <head>
                <link rel="preload" href="../static/fonts/Poppins-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="../static/fonts/Poppins-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="../static/fonts/Poppins-Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="../static/fonts/Poppins-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="../static/fonts/Poppins-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
            </head>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default MainLayout;