import React from "react";
import HomeAutoCard from "../components/HomeAutoCard";
import MainLayout from "../layouts/MainLayout";

const ShopPage = () => {
    return (
        <MainLayout>
            <div className="shop-page-container">
                <div className="filters-container">
                    <p>filter side</p>
                </div>
                <div className="auto-cards-container">
                    <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard>
                    <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard>
                    <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard>
                </div>
            </div>
        </MainLayout>
    );
}

export default ShopPage;