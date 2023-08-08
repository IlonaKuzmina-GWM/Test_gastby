import { Link } from "gatsby";
import React, { FC, useEffect, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import ArrowLeft from "../images/icons/ArrowLeft.svg";
import Envelope from "../images/icons/Envelope.svg";
import Phone from "../images/icons/Phone.svg";
import PinsBroker from "../images/icons/PinsBroker.svg";
import Questions from "../images/icons/Questions.svg";
import Share from "../images/icons/Share.svg";
import Button from "./Button";



type CheckoutBoxProps = {
    title: string;
    carType: string;
    price: number;
    brokerName: string;
    carCondition: string;
    isElementorLocationFooterVisible: boolean;
    slug: string;
}

const CheckoutBox: FC<CheckoutBoxProps> = ({ title, slug, carType, price, brokerName, carCondition, isElementorLocationFooterVisible }) => {
    const [checkoutIconsUseed, setCheckoutIconsUseed] = useState(false);
    const [shareBlockShown, setShareBlockShown] = useState(false);
    const [questionsBlockShown, setQuestionsBlockShown] = useState(false)

    const toggleCheckoutIcons = () => {
        setCheckoutIconsUseed(!checkoutIconsUseed);
    };

    useEffect(() => {
        const windowWidth = window.innerWidth;

        if (windowWidth <= 768) {
            setCheckoutIconsUseed(true);
            return;
        }
    }, []);

    return (
        <Col md={0} lg={4} xl={4} className="">
            <Container className="checkout-container" style={{ display: isElementorLocationFooterVisible ? 'none' : 'block' }}>
                <button
                    className="colapse-button mb-3"
                    onClick={toggleCheckoutIcons}></button>
                <Row>
                    <Col xs={8} className="mb-2">
                        <h5>{title}</h5>
                        <span className="version-type-wrapper">{carType}</span>
                    </Col>
                    <Col xs={4} className="text-end">
                        <h5>€ {price}</h5>
                    </Col>
                </Row>

                {!checkoutIconsUseed && (
                    <>
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
                                <Button name={"Esmu ieinteresēts"} size={"small"} type={"primary"} onClickHandler={() => { }}></Button>
                                <Link to={`/shop`} className="nav-link">
                                    <div className="d-flex justify-content-center align-items-center mt-2">
                                        <img className="mb-3" src={PinsBroker} width={15} height={15} alt="pin" />
                                       <span className="mb-3">{brokerName}</span>
                                    </div>
                                </Link>
                            </Col>
                        </Row>

                        <Row className="">
                            <Dropdown.Divider />
                            <Row md={3} className="mt-4 checkout-icons-container">
                                <div className="d-flex flex-column align-items-center icon-item">
                                    <img className="" src={Questions} width={25} height={25} alt="pin" />
                                    <p className="mt-2 text-center">PDF??</p>
                                </div>

                                <div className="d-flex flex-column align-items-center icon-item" onClick={() => { setCheckoutIconsUseed(true); setShareBlockShown(true); }}>
                                    <img className="" src={Share} width={25} height={25} alt="pin" />
                                    <p className="mt-2 text-center">Dalīties</p>
                                </div>

                                <div className="d-flex flex-column align-items-center icon-item" onClick={() => { setQuestionsBlockShown(true); setCheckoutIconsUseed(true); }}>
                                    <img className="" src={Questions} width={25} height={25} alt="pin" />
                                    <p className="mt-2 text-center">Jautājumi</p>
                                </div>
                            </Row>
                        </Row>
                    </>
                )
                }

                {questionsBlockShown && (
                    <div className="questions-block-container">
                        <div className="d-flex align-items-center back-arrow mb-3" onClick={() => { setQuestionsBlockShown(false), setCheckoutIconsUseed(false) }}>
                            <img className="" src={ArrowLeft} width={15} height={15} alt="pin" />
                            <span>Atpakaļ</span>
                        </div>

                        <h5>Jautājumi?</h5>

                        <a href="tel:123-456-7890" className="link ">
                            <div className="mt-3 link-wrapper d-flex align-items-center">
                                <img src={Phone} alt="Phone" className="me-2" width={20} height={20} />
                                <span>123-456-7890</span>
                            </div>
                        </a>


                        <a href="mailto:email@example.com" className="link">
                            <div className="mt-3 link-wrapper d-flex align-items-center">
                                <img src={Envelope} alt="Mail" className="me-2" width={20} height={20} />
                                <span>info@info.lv</span>
                            </div>
                        </a>

                    </div>
                )}

                {shareBlockShown && (
                    <div className="share-block-container">
                        <div className="d-flex align-items-center back-arrow mb-3" onClick={() => { setShareBlockShown(false), setCheckoutIconsUseed(false) }}>
                            <img className="" src={ArrowLeft} width={15} height={15} alt="pin" />
                            <span>Atpakaļ</span>
                        </div>

                        <div className="share-icons-container d-flex justify-content-around">
                            <FacebookShareButton
                                url={`https://pirktautomain.gatsbyjs.io/${slug}`}
                                quote={'Ko te es vēlos pateikt?'}
                                hashtag="#mynewcar"
                            >
                                <FacebookIcon size={40} round />
                            </FacebookShareButton>

                            <WhatsappShareButton url={`https://pirktautomain.gatsbyjs.io/${slug}`}>
                                <WhatsappIcon size={40} round />
                            </WhatsappShareButton>

                            <TelegramShareButton url={`https://pirktautomain.gatsbyjs.io/${slug}`}>
                                <TelegramIcon size={40} round></TelegramIcon>
                            </TelegramShareButton>

                            <EmailShareButton url={'https://www.example.com'}>
                                <EmailIcon size={40} round />
                            </EmailShareButton>
                        </div>
                    </div>
                )}

            </Container>
        </Col>
    );
}

export default CheckoutBox;