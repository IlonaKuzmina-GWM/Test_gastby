import { Link } from "gatsby";
import React from "react";
import Button from "../components/Button";
import MainLayout from "../layouts/MainLayout";

const ErrorPage = () => {
    return (
        <MainLayout>
            <div className="container error-page">
                <div className="wrapper">
                    <h1>404</h1>
                    <p>page not found</p>
                    <Link to="/">
                        <Button name={"Back to home page"} size={"medium"} type={"primary"} />
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}

export default ErrorPage;