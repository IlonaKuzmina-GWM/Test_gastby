import { Link } from "gatsby";
import React, { FC, useEffect, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import ArrowLeft from "../images/icons/ArrowLeft.svg";
import Envelope from "../images/icons/Envelope.svg";
import Phone from "../images/icons/Phone.svg";
import PinsBroker from "../images/icons/PinsBroker.svg";
import PDF from "../images/icons/file-pdf-solid.svg";
import Questions from "../images/icons/question-circle.svg";
import Share from "../images/icons/share-alt-square-solid.svg";
import Button from "./Button";

type CheckoutBoxProps = {
    title: string;
    carType: string;
    price: number;
    brokerName: string[];
    carCondition: string[];
    isElementorLocationFooterVisible: boolean;
    slug: string;
    mileage?: number | undefined;
}

const CheckoutBox: FC<CheckoutBoxProps> = ({ title, slug, carType, price, brokerName, carCondition, isElementorLocationFooterVisible, mileage }) => {
    const [checkoutIconsUseed, setCheckoutIconsUseed] = useState(false);
    const [shareBlockShown, setShareBlockShown] = useState(false);
    const [questionsBlockShown, setQuestionsBlockShown] = useState(false)
    const [smallScreen, setSmallScreen] = useState(false);

    const toggleCheckoutIcons = () => {
        setCheckoutIconsUseed(!checkoutIconsUseed);
        setSmallScreen(!smallScreen);
    };

    useEffect(() => {
        const windowWidth = window.innerWidth;

        if (windowWidth <= 768) {
            setCheckoutIconsUseed(true);
            setSmallScreen(true);
            return;
        }
    }, []);

    return (
        <div className="wrapper-checkout">
            <Container className="checkout-container" style={{ display: isElementorLocationFooterVisible ? 'none' : 'block' }}>
                <button
                    className="colapse-button"
                    onClick={toggleCheckoutIcons} />
                <Row className="checkout-car-title-row">
                    <Col xs={8} className="mb-2">
                        <h5>{title}</h5>
                        <span className="version-type-wrapper">{carType}</span>
                    </Col>
                    <Col xs={4} className="text-end">
                        <h5>€ {price}</h5>
                    </Col>
                </Row>

                {smallScreen && (
                    <Row className="row-wrapper">
                        <Col className="btn-wrapper ">
                            <Button name={"Esmu ieinteresēts"} size={"small"} type={"primary"} onClickHandler={() => { }}></Button>

                        </Col>
                    </Row>
                )}

                {!checkoutIconsUseed && (
                    <>
                        <div className="row-wrapper">
                            {mileage && (
                                <Row className="mileage-row">
                                    <Col xs={8}>
                                        <p className="title">Nobraukums</p>
                                    </Col>
                                    <Col xs={4}>
                                        <p className="content"> {mileage} km</p>
                                    </Col>
                                </Row>)}

                            <Row className="condision-row">
                                <Col xs={8}>
                                    <p className="title">Stāvoklis</p>
                                </Col>
                                <Col xs={4}>
                                    <p className="content"> {carCondition}</p>
                                </Col>
                            </Row>
                        </div>


                        <Row className="row-wrapper">
                            <Col className="btn-wrapper ">
                                <Button name={"Esmu ieinteresēts"} size={"small"} type={"primary"} onClickHandler={() => { }}></Button>
                                <Link to={`/shop`} className="nav-link dealer">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img className="" src={PinsBroker} width={15} height={15} alt="pin" />
                                        <span className="">{brokerName}</span>
                                    </div>
                                </Link>
                            </Col>
                        </Row>

                        <Row className="row-wrapper">
                            <Dropdown.Divider />
                            <Row md={3} className="checkout-icons-container">
                                <div className="d-flex flex-column align-items-center icon-item" >
                                    <img className="" src={PDF} width={25} height={25} alt="pin" />
                                    <p className="text-center">PDF</p>
                                </div>

                                <div className="d-flex flex-column align-items-center icon-item" onClick={() => { setCheckoutIconsUseed(true); setShareBlockShown(true); }}>
                                    <img className="" src={Share} width={25} height={25} alt="pin" />
                                    <p className="text-center">Dalīties</p>
                                </div>

                                <div className="d-flex flex-column align-items-center icon-item" onClick={() => { setQuestionsBlockShown(true); setCheckoutIconsUseed(true); }}>
                                    <img className="" src={Questions} width={25} height={25} alt="pin" />
                                    <p className="text-center">Jautājumi</p>
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

            </Container></div>
    );
}

export default CheckoutBox;