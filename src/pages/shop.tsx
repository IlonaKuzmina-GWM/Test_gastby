import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import FilterCategories from "../components/FilterCategories";
import ShopAutoCard from "../components/ShopAutoCard";
import MainLayout from "../layouts/MainLayout";

const ShopPage = () => {

    return (
        <MainLayout>
            <div className="shop-page-container">
                <div className="filters-container flex-shrink-0 p-3 ">
                    <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                        <svg className="bi pe-none" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
                        <span className="fs-5 fw-semibold">Filtrs</span>
                    </a>
                    <FilterCategories eventkey={0} />
                </div>

                <Container className="auto-cards-container px-1 p-3">
                    <Row className="d-flex align-items-center mt-2 border-bottom">
                        <p className="small-info-text">"7" šitik daudz auto mums ir :D</p>
                    </Row>

                    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                        {Array.from({ length: 7 }).map((_, idx) => (
                            <Col key={idx}>
                                <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </MainLayout>
    );
}

export default ShopPage;