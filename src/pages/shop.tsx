import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FilterCategories from "../components/FilterCategories";
import HomeAutoCard from "../components/HomeAutoCard";
import MainLayout from "../layouts/MainLayout";

const ShopPage = () => {
    return (
        <MainLayout>
            <div className="shop-page-container">
                {/* <div className="filters-container">
                    <p>filter side</p>
                </div> */}

                <div className="filters-container flex-shrink-0 p-3 ">
                    <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                        <svg className="bi pe-none me-2" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
                        <span className="fs-5 fw-semibold">Filters</span>
                    </a>
                    <FilterCategories eventkey={0} />
                    {/* <ul className="list-unstyled ps-0">
                        <li className="mb-1">
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                New or Used
                            </button>
                            <div className="collapse show" id="home-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">New</a></li>
                                    <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Used</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                                Year
                            </button>
                            <div className="collapse" id="dashboard-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">2020</a></li>
                                    <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">2019</a></li>
                                    <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">2018</a></li>
                                    <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">2017</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                                Brand
                            </button>
                            <div className="collapse" id="orders-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">??</a></li>
                                    <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">?</a></li>
                                    <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">!!!</a></li>
                                    <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">!?!</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="border-top my-3"></li>
                    </ul> */}
                </div>

                <Container>
                    <Row>
                        <Col> <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard></Col>
                        <Col> <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard></Col>
                        <Col>  <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard></Col>
                    </Row>
                    <Row>
                        <Col> <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard></Col>
                        <Col> <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard></Col>
                        <Col>  <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard></Col>
                    </Row>
                </Container>


                {/* <div className="auto-cards-container">
                    <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard>
                    <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard>
                    <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard>
                    <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard>
                    <HomeAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto"} price={1500} labels={<><div>Label1</div><div>label2</div></>}></HomeAutoCard>
                </div> */}
            </div>
        </MainLayout>
    );
}

export default ShopPage;