import { Link } from "gatsby";
import React, { FC, useEffect, useState } from "react";
import { Col, Container, Dropdown, Nav, Row } from "react-bootstrap";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import ArrowLeft from "../images/icons/ArrowLeft.svg";
import Envelope from "../images/icons/Envelope.svg";
import Phone from "../images/icons/Phone.svg";
import PinsBroker from "../images/icons/PinsBroker.svg";
import PDF from "../images/icons/file-pdf-solid.svg";
import Questions from "../images/icons/question-circle.svg";
import Share from "../images/icons/share-alt-square-solid.svg";
import Button from "./Button";
import { PDFFile } from "../types/allWpCarTypes";

type CheckoutBoxProps = {
    title: string;
    carType: string;
    price: number;
    brokerName: string[];
    carCondition: string[];
    isElementorLocationFooterVisible: boolean;
    slug: string;
    mileage?: number | undefined;
    PDFFile?: PDFFile;
    autoLink: string;
}

const CheckoutBox: FC<CheckoutBoxProps> = ({ autoLink, title, slug, carType, price, brokerName, carCondition, isElementorLocationFooterVisible, mileage, PDFFile }) => {
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
        <div className="wrapper-checkout d-block m-0">
            <Container className="checkout-container bg-white d-flex flex-column position-fixed p-3" style={{ display: isElementorLocationFooterVisible ? 'none' : 'block' }}>
                <button
                    className="colapse-button my-0 mx-auto d-block d-lg-none rounded-3"
                    onClick={toggleCheckoutIcons} />
                <Row className="checkout-car-title-row mt-2">
                    <Col xs={8} className="mb-2">
                        <h5 className="mb-0 fw-semibold fs-5 lh-base">{title}</h5>
                        <span className="version-type-wrapper">{carType}</span>
                    </Col>
                    <Col xs={4} className="text-end">
                        <h5 className="mb-0 fw-semibold fs-5 lh-base">€ {price}</h5>
                    </Col>
                </Row>

                {smallScreen && (
                    <Row className="row-wrapper mt-3">
                        <Col className="btn-wrapper ">
                            <Button name={"Apskatīt piedāvājumu"} size={"small"} type={"primary"} onClickHandler={() => { }}></Button>
                        </Col>
                    </Row>
                )}

                {!checkoutIconsUseed && (
                    <>
                        <div className="row-wrapper mt-3">
                            {mileage && (
                                <Row className="mileage-row mb-2 ">
                                    <Col xs={8}>
                                        <p className="title mb-0 fw-medium">Nobraukums</p>
                                    </Col>
                                    <Col xs={4}>
                                        <p className="content text-end  mb-0"> {mileage} km</p>
                                    </Col>
                                </Row>)}

                            <Row className="condision-row mb-2">
                                <Col xs={8}>
                                    <p className="title  mb-0 fw-medium">Stāvoklis</p>
                                </Col>
                                <Col xs={4}>
                                    <p className="content text-end  mb-0"> {carCondition}</p>
                                </Col>
                            </Row>
                        </div>


                        <Row className="row-wrapper mt-3">
                            <Col className="btn-wrapper ">
                                {/* <Button name={"Apskatīt piedāvājumu"} size={"small"} type={"primary"} onClickHandler={() => { }} /> */}

                                <Nav.Link href={autoLink} className="">
                                    <Button name={"Apskatīt piedāvājumu"} size={"small"} type={"primary"} onClickHandler={() => { }} />
                                </Nav.Link>

                                <div className="nav-link dealer mt-4 my-auto mb-1 border-bottom">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img className="me-1" src={PinsBroker} width={15} height={15} alt="pin" />
                                        <span className="">{brokerName}</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row className="row-wrapper mt-3">
                            <Dropdown.Divider />
                            <Row md={3} className="checkout-icons-container d-flex justify-content-around flex-colum flex-md-row ">
                                {PDFFile && (<div className="d-flex flex-column align-items-center icon-item mb-2 pointer" >
                                    <a href={PDFFile.mediaItemUrl} download={PDFFile.filename} target="_blank">
                                        <img className="" src={PDF} width={25} height={25} alt="pin" />
                                        <p className="text-center mb-0 mt-1">PDF</p>
                                    </a>
                                </div>)}


                                <div className="d-flex flex-column align-items-center icon-item mb-2 pointer" onClick={() => { setCheckoutIconsUseed(true); setShareBlockShown(true); }}>
                                    <img className="" src={Share} width={25} height={25} alt="pin" />
                                    <p className="text-center mb-0 mt-1">Dalīties</p>
                                </div>

                                <div className="d-flex flex-column align-items-center icon-item mb-2 pointer" onClick={() => { setQuestionsBlockShown(true); setCheckoutIconsUseed(true); }}>
                                    <img className="" src={Questions} width={25} height={25} alt="pin" />
                                    <p className="text-center mb-0 mt-1">Jautājumi</p>
                                </div>
                            </Row>
                        </Row>
                    </>
                )
                }

                {questionsBlockShown && (
                    <div className="questions-block-container">
                        <div className="d-flex align-items-center back-arrow mb-3 py-2 pe-2 pe-auto pointer" onClick={() => { setQuestionsBlockShown(false), setCheckoutIconsUseed(false) }}>
                            <img className="" src={ArrowLeft} width={15} height={15} alt="pin" />
                            <span>Atpakaļ</span>
                        </div>

                        <h5 className="mb-0 fw-semibold fs-5 lh-base">Jautājumi?</h5>

                        <a href="tel:123-456-7890" className="link m-0">
                            <div className="mt-3 p-3 link-wrapper d-flex align-items-center justify-content-center justify-content-lg-start rounded-4 pointer">
                                <img src={Phone} alt="Phone" className="me-2" width={20} height={20} />
                                <span>123-456-7890</span>
                            </div>
                        </a>


                        <a href="mailto:email@example.com" className="link m-0">
                            <div className="mt-3 p-3 link-wrapper d-flex align-items-center justify-content-center justify-content-lg-start rounded-4 pointer">
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
                                url={`https://pirkt-auto.netlify.app/${slug}`}
                                quote={'Ko te es vēlos pateikt?'}
                                hashtag="#mynewcar"
                            >
                                <FacebookIcon size={40} round />
                            </FacebookShareButton>

                            <WhatsappShareButton url={`https://pirkt-auto.netlify.app/${slug}`}>
                                <WhatsappIcon size={40} round />
                            </WhatsappShareButton>

                            <TelegramShareButton url={`https://pirkt-auto.netlify.app/${slug}`}>
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