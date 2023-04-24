import React, { FC } from "react";
import MainLayout from "../layouts/MainLayout";

type BrokerPageProps = {
    pageContext: any;
}

const BrokerPage:FC<BrokerPageProps> = ({ pageContext }) => {
    console.log(pageContext)

    return (
        <MainLayout>

        </MainLayout>);
}

export default BrokerPage;