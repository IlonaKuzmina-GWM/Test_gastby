import { HeadFC } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { FC, useEffect, useState } from "react";
import { Carousel, Col, Container, Nav, Row } from "react-bootstrap";
import Button from "../components/Button";
import CheckoutBox from "../components/CheckoutBox";
import ImageGalleryPopUp from "../components/ImageGalleryPopUp";
import ShopAutoCard from "../components/ShopAutoCard";
import AndroidAuto from "../images/icons/AndroidAuto.svg";
import BluetoothDrive from "../images/icons/BluetoothDrive.svg";
import CarFront from "../images/icons/CarFront.svg";
import MainLayout from "../layouts/MainLayout";
import { Car, Replacements } from "../types/allWpCarTypes";
import CarSpecificationPopUp from "../components/CarSpecificationPopUp";

import useAllWpCarData from "../queries/useAllWpCarData";

type SingleCarProps = {
    pageContext: Car;
};

const SingleCar: FC<SingleCarProps> = ({ pageContext }) => {
    const recommendedForYou = useAllWpCarData();
    const [isElementorLocationFooterVisible, setIsElementorLocationFooterVisible] = useState(false);
    const singleCarInformation = pageContext;
    const carEquipment = singleCarInformation.carEquipment;
    const singleCarGallery = singleCarInformation.carInfo.carGallery;
    const countImagesInGallery = singleCarGallery.length;
    const [showPopup, setShowPopUp] = useState(false);
    const [carSpecificationPopUp, setCarSpecificationPopUp] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const setCheckoutBoxVisibility = () => {
            const availabilityCheckBox = document.querySelector(".checkout-container");
            const elementorLocationFooter = document.querySelector(".footer") as HTMLElement;;

            if (!elementorLocationFooter) return;

            const availabilityCheckoutBoxOffSet = elementorLocationFooter.offsetTop;
            // const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            if (windowWidth <= 990) {
                setIsElementorLocationFooterVisible(false);
                return;
            }

            setIsElementorLocationFooterVisible(window.pageYOffset > availabilityCheckoutBoxOffSet - 210);
        }

        window.addEventListener('scroll', setCheckoutBoxVisibility);
        window.addEventListener('resize', setCheckoutBoxVisibility);

        return () => {
            window.removeEventListener('scroll', setCheckoutBoxVisibility);
            window.removeEventListener('resize', setCheckoutBoxVisibility);
        };
    }, []);

    const openPopUp = (index: number) => {
        setSelectedImageIndex(index);
        setShowPopUp(true);
    }

    const closeSpecPopup = (closeSpecPopup: boolean) => {
        setCarSpecificationPopUp(closeSpecPopup)
    };

    type CarInfoProperty = keyof Replacements;

    const renderMainCarCategory = (title: string, carSpecification: string) => {
        const filteredCarSpecification = singleCarInformation.carInfo;

        const shouldRender = carSpecification in filteredCarSpecification
            ? filteredCarSpecification[carSpecification as CarInfoProperty]
            : null;

        const categoriHeading = (title: string) => title === "" ? null : <h5>{title}</h5>;

        return (
            <div className="d-flex">
                {categoriHeading(title)}&nbsp;
                <span className="mb-3">
                    {Array.isArray(shouldRender)
                        ? shouldRender.join(', ')
                        : shouldRender}
                </span>
            </div>
        )
    }

    return (
        <MainLayout>
            <Container className="single-car-container">
                <Row>
                    <Col>
                        <h1>{singleCarInformation.title}</h1>
                    </Col>
                </Row>

                <Row className="justify-content-space-evenly">
                    <Col md={12} lg={7} xl={8}>
                        <Row className="mb-4">
                            <Carousel>
                                {singleCarGallery.map((image: any, index: number) => (
                                    <Carousel.Item key={index} onClick={() => openPopUp(index)}>
                                        <GatsbyImage className="item" image={image.gatsbyImage} alt={"Auto"} />
                                        <Carousel.Caption className="carousel-caption">
                                            <span className="photo-counter">
                                                {index + 1}/{countImagesInGallery}
                                            </span>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Row>

                        <Row className=" mb-5">
                            <Col className="border-top border-dark-subtle">
                                <h3 className="mb-3"> Kāpēc izvēlēties tieši {singleCarInformation.title} </h3>
                                <div className="icon-wrapper">
                                    <div className="icon-wrapper_item">
                                        <img src={AndroidAuto} alt="AndroidAuto" width={"40px"} />
                                        <p>{singleCarInformation.carEquipment.hiFi[0]}</p>
                                    </div>
                                    <div className="icon-wrapper_item">
                                        <img src={BluetoothDrive} alt="BluetoothDrive" width={"40px"} />
                                        <p> {singleCarInformation.carEquipment.drosiba[0]}</p>
                                    </div>
                                    <div className="icon-wrapper_item">
                                        <img src={CarFront} alt="CarFront" width={"40px"} />
                                        <p> {singleCarInformation.carEquipment.papildaprikojums[0]}</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-5">
                            <Col className="border-top border-dark-subtle">
                                <h3 className="mb-3">{singleCarInformation.title} specifikācija</h3>
                                <Row md={2}>
                                    {renderMainCarCategory("Durvju skaits: ", "durvjuSkaits")}
                                    {renderMainCarCategory('Ātrumkārba: ', "atrumkarba")}
                                    {renderMainCarCategory('Dzinējs: ', "dzinejs")}
                                    {renderMainCarCategory('Gads: ', "gads")}
                                    {renderMainCarCategory('Virsbūves tips: ', "virsbuvesTips")}
                                </Row>

                                <Row>
                                    <Nav.Link href="#allFeatures">
                                        <Button
                                            name={"Skatīt aprīkojumu"}
                                            size={"small"}
                                            type={"outline"}
                                            onClickHandler={() => setCarSpecificationPopUp(true)} />
                                    </Nav.Link>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="mb-5">
                            <Col className="border-top border-dark-subtle">
                                <h3 className="mb-3">Apraksts</h3>
                                <div className="auto__description" dangerouslySetInnerHTML={{ __html: singleCarInformation.content }} />
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col className="border-top border-dark-subtle">
                                <h3 className="mb-3">Rekomendējam tieši tev</h3>
                            </Col>
                            <Row md={3}>
                                {recommendedForYou.slice(0, 3).map((car: Car, index: number) => (
                                    <Col className="mb-3" key={index}>
                                        <ShopAutoCard
                                            gatsbyImageData={car.featuredImage.node.gatsbyImage}
                                            slug={car.slug}
                                            title={car.title}
                                            price={car.carInfo.carPrice} />
                                    </Col>
                                ))}
                            </Row>
                        </Row>
                    </Col>

                    <CheckoutBox
                        title={singleCarInformation.title}
                        slug={singleCarInformation.slug}
                        carType={singleCarInformation.carInfo.versija}
                        price={singleCarInformation.carInfo.carPrice}
                        brokerName={singleCarInformation.carInfo.dileris}
                        carCondition={singleCarInformation.carInfo.autoStavoklis}
                        isElementorLocationFooterVisible={isElementorLocationFooterVisible} />
                </Row>

                {showPopup && (
                    <ImageGalleryPopUp
                        images={singleCarGallery}
                        selectedIndex={selectedImageIndex}
                        onClose={() => setShowPopUp(false)}
                    />
                )}

                {carSpecificationPopUp && (
                    <CarSpecificationPopUp
                        carEquipment={carEquipment}
                        onCloseHandler={closeSpecPopup}
                    />
                )}
            </Container>
        </MainLayout>
    );
};

export default SingleCar;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;
