import React, { FC, useState } from "react";
import { Col, Container, Dropdown, Nav, Row } from "react-bootstrap";
import ArrowLeft from "../images/icons/ArrowLeft.svg";
import PinsBroker from "../images/icons/PinsBroker.svg";
import Button from "./Button";
import Share from "../images/icons/Share.svg";
import Questions from "../images/icons/Questions.svg";


type CheckoutBoxProps = {
    title: string;
    carType: React.ReactNode;
    price: number;
    brokerName: React.ReactNode;
    carCondition: React.ReactElement;
    isElementorLocationFooterVisible: boolean;
}

const CheckoutBox: FC<CheckoutBoxProps> = ({ title, carType, price, brokerName, carCondition, isElementorLocationFooterVisible }) => {
    const [moreInformationShow, setMoreInformationShow] = useState(false)

    return (
        <Col md={0} lg={4} xl={4} className="">
            <Container className="checkout-container" style={{ display: isElementorLocationFooterVisible ? 'none' : 'block' }}>
                <Row>
                    <Col>
                        <h4>{title}</h4>
                        <span className="version-type-wrapper">{carType}</span>
                    </Col>
                </Row>

                {moreInformationShow
                    ?
                    <>


                        <div className="d-flex align-items-center back-arrow" onClick={() => { setMoreInformationShow(false) }}>
                            <img className="" src={ArrowLeft} width={15} height={15} alt="pin" />
                            <span>Atpakaļ</span>
                        </div>
                        <div>
                            <a href="tel:123-456-7890">Zvanīt: 123-456-7890</a>
                        </div>

                        <div>
                            <a href="mailto:email@example.com">Sūtīt e-pastu: info@info.lv</a>
                        </div>


                    </>
                    :
                    <>
                        <Row>
                            <Col xs={8}>
                                <p>Cena</p>
                            </Col>
                            <Col xs={4}>
                                <p>€ {price}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={8}>
                                <p>Stāvoklis</p>
                            </Col>
                            <Col xs={4}>
                                {carCondition}
                            </Col>
                        </Row>

                        <Row>
                            <Col className="btn-wrapper mt-4">
                                <Button name={"Esmu ieinteresēts"} size={"small"} type={"primary"} onClickHandler={() => { setMoreInformationShow(true) }}></Button>
                                <Nav.Link href="/">
                                    <div className="d-flex justify-content-center align-items-center mt-2">
                                        <img className="mb-3" src={PinsBroker} width={15} height={15} alt="pin" />
                                        {brokerName}
                                    </div>
                                </Nav.Link>
                            </Col>
                        </Row>

                        <Row className="">
                            <Dropdown.Divider />
                            <Row md={3} className="mt-3">


                                <div className="d-flex flex-column align-items-center">
                                    <img className="" src={Questions} width={25} height={25} alt="pin" />
                                    <p className="mt-2 text-center">PDF??</p>
                                </div>


                                <div className="d-flex flex-column align-items-center">
                                    <img className="" src={Share} width={25} height={25} alt="pin" />
                                    <p className="mt-2 text-center">Dalīties</p>
                                </div>

                                <div className="d-flex flex-column align-items-center" onClick={() => { setMoreInformationShow(true) }}>
                                    <img className="" src={Questions} width={25} height={25} alt="pin" />
                                    <p className="mt-2 text-center">Jautājumi</p>
                                </div>


                            </Row>

                        </Row>
                    </>
                }



            </Container>
        </Col>
    );
}

export default CheckoutBox;