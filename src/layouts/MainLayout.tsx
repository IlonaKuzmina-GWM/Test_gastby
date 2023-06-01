import React, { FC, ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../scss/index.scss";

type MainLayoutProps = {
    children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="layout-container">
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;