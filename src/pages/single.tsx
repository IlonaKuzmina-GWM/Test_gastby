import React from "react";
import MainLayout from "../layouts/MainLayout";
import { StaticImage } from "gatsby-plugin-image";
import { Carousel, Col, Container, Dropdown, Row } from "react-bootstrap";
import ShopAutoCard from "../components/ShopAutoCard";
import Button from "../components/Button";
import { HeadFC } from "gatsby";

const SingleCarPage = () => {
    return (
        <MainLayout>
            <Container className=" single-car-container">
                <Row>
                    <Col md={12} lg={8}>
                        <Row className="mb-2">
                            <Carousel>
                                <Carousel.Item>
                                    <StaticImage className="item" src={"../images/Escultures1.png"} alt={"Auto"} />
                                    <Carousel.Caption>
                                        <h3>Pirmā bilde</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <StaticImage className="item" src={"../images/Escultures1.png"} alt={"Auto"} />
                                    <Carousel.Caption>
                                        <h3>Otrā bilde</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <StaticImage className="item" src={"../images/Escultures1.png"} alt={"Auto"} />
                                    <Carousel.Caption>
                                        <h3>Trešā bilde</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </Row>

                        <Row className="mt-2">
                            <Col className="border-top border-dark-subtle">
                                <h3 className=""> Reason to love this "CAR"</h3>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col className="border-top border-dark-subtle">
                                <h3>About this new 2024 Gmc Pickup Truck</h3>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col className="border-top border-dark-subtle">
                                <h3>Pricing Disclaimer</h3>
                                <p>We make every effort to provide accurate information, but please verify options and price with us before purchasing.
                                    What is included:
                                    All prices of new GMC vehicles include freight.
                                    All prices include applicable rebates and incentives. Additional rebates and incentives may also apply to those who qualify. Any incentives or prices may depend on manufacturer incentive program time periods, which can vary or expire.
                                    What is not included:
                                    Prices do not include tax, tags, title, registration, electronic filing fee and processing fee of $899 in Virginia, $500 in Maryland, and $699 in Delaware.
                                    Other considerations
                                    Due to supply chain and factory production issues, we may not know when some vehicles will be in stock. Vehicles advertised online, if reserved, may be cancelled and have any deposit fully refunded if the customer chooses not to lease or purchase the vehicle.
                                    Prices may not be compatible with "special factory financing" from the manufacturer. MSRP is the Manufacturer's Suggested Retail Price only. Actual dealer pricing may vary.
                                    Due to availability, some images and options shown may be stock images or examples and may not reflect exact vehicle color, trim, options, or other specifications.
                                    All vehicles are subject to prior sale.
                                    All financing is subject to approved credit.</p>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col className="border-top border-dark-subtle">
                                <h3>Recommended for you</h3>
                            </Col>
                            <Row md={3}>
                                <Col>
                                    <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 10"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                                </Col>
                                <Col>
                                    <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 10"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                                </Col>
                                <Col>
                                    <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 10"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                                </Col>
                            </Row>
                        </Row>
                    </Col>

                    <Col md={0} lg={4} className="">
                        <Container className="checkout-container p-4">
                            <Row>
                                <Col xs={8}>
                                    <h3 className="mb-0">Super car title</h3>
                                    <p className="">Versija</p>
                                </Col>
                                <Col xs={4}>
                                    <p>$ 15 000</p>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={8}>
                                    <p>Kā šo aprakstīt</p>
                                </Col>
                                <Col xs={4}>
                                    <p>Mazlietota</p>
                                </Col>
                            </Row>

                            <Row>
                                <Button name={"Esmu ieinteresēts"} size={"small"} type={"primary"}></Button>
                            </Row>

                            <Row>
                                <p>Dīleris</p>
                            </Row>

                            <Row>
                                <Dropdown.Divider />
                                <p>Kas te paredzēts?</p>
                            </Row>
                        </Container>

                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
}

export default SingleCarPage;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;