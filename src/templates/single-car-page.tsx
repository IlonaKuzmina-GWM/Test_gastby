import { HeadFC } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { FC, Suspense, lazy, useEffect, useState } from "react";
import { Carousel, Col, Container, Nav, Row } from "react-bootstrap";
import Button from "../components/Button";
import CheckoutBox from "../components/CheckoutBox";
import ImageGalleryPopUp from "../components/ImageGalleryPopUp";
import ShopAutoCard from "../components/ShopAutoCard";
import AndroidAuto from "../images/audio.svg";
import BluetoothDrive from "../images/Features.svg";
import CarFront from "../images/Equipped.svg";
import MainLayout from "../layouts/MainLayout";
import CaretBottom from "../images/icons/caret-bottom.svg";
import { Car, CarEquipment } from "../types/allWpCarTypes";

import useAllWpCarData from "../queries/useAllWpCarData";

type SingleCarProps = {
    pageContext: Car;
};

const LazyCarSpecificationPopUp = lazy(() => import("../components/CarSpecificationPopUp"));

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
    const [singleCarData, setSibgleCarData] = useState();
    const [transformedCarEquipmentKeys, setTransformedCarEquipmentKeys] = useState({})
    console.log(pageContext)


    useEffect(() => {

        carEquipmentKeysReplacement(carEquipment);

        setTransformedCarEquipmentKeys(carEquipmentKeysReplacement(carEquipment));

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

    const renderMainCarCategory = (title: string, carSpecification: string) => {
        const filteredCarSpecification = singleCarInformation.carInfo;

        const shouldRender = carSpecification in filteredCarSpecification
            ? filteredCarSpecification[carSpecification]
            : null;

        if (!shouldRender || (Array.isArray(shouldRender) && shouldRender.length === 0)) {
            return null;
        }

        const categoriHeading = (title: string) => title === "" ? null : <h5 className="fs-5 fw-semibold mb-0">{title}</h5>;

        const renderedValue = Array.isArray(shouldRender) ? shouldRender.join(", ") : shouldRender.toString();

        return (
            <div>
                {categoriHeading(title)}
                <p className="fs-6 fw-normal">{renderedValue}</p>
            </div>
        )
    }


    const carEquipmentKeysReplacement = (carEquipment: CarEquipment) => {

        type CarInfoProperty = keyof Replacements;

        type Replacements = {
            [key: string]: string;
        };

        const replacements: Replacements = {
            "aizsardziba": "aizsardzība",
            "aprikojums": "aprīkojums",
            "audioVideoAprikojums": "audio/video aprīkojums",
            "cits": "cits",
            "drosiba": "drošība",
            "eksterjers": "eksterjers",
            "gaismas": "gaismas",
            "hiFi": "hiFi",
            "interjers": "interjers",
            "salons": "salons",
            "sedekli": "sēdekļi",
            "spoguli": "spoguļi",
            "sture": "stūre",
        };

        type CarEquipment = {
            [key: string]: string | string[];
        };

        const { aizsardziba, aprikojums, ...restCarEquipment } = carEquipment;

        const transformedCarEquipment: CarEquipment = {};

        for (const [key, value] of Object.entries(restCarEquipment)) {
            const transformedKey = replacements[key as CarInfoProperty] || key;
            transformedCarEquipment[transformedKey] = value;
        }
        return transformedCarEquipment;
    }

    return (
        <MainLayout>
            <Container className="single-car__container position-relative flex-grow-1 ">
                <div className="single-car__wrapper margin-0 gap-3 my-lg-2 d-grid">
                    <div className="left-side__content margin-0 pt-0">

                        <Row className="car-gallery-row pt-4 pb-4">
                            <Carousel>
                                {singleCarGallery.map((image: any, index: number) => (
                                    <Carousel.Item key={index} onClick={() => openPopUp(index)}>
                                        <GatsbyImage className="item rounded-3" image={image.gatsbyImage} alt={"Auto"} />
                                        <Carousel.Caption className="carousel-caption border border-light fs-6 rounded-2 px-1 py-2">
                                            <span className="photo-counter">
                                                {index + 1}/{countImagesInGallery}
                                            </span>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Row>

                        <Row className="way-special-row  pt-3 pb-4 border-bottom border-secondary-subtle">
                            <Col className="">
                                <h3 className="mb-3 fs-3 fw-semibold"> Kāpēc izvēlēties tieši {singleCarInformation.title} </h3>
                                <div className="icon-wrapper d-flex  flex-column flex-md-row gap-3 justify-content-between pt-3 pe-2">

                                    {singleCarInformation.carEquipment.audioVideoAprikojums && singleCarInformation.carEquipment.audioVideoAprikojums.length > 0 && (
                                        <div className="icon-wrapper_item d-flex flex-row gap-2 align-items-center">
                                            <img src={AndroidAuto} alt="AndroidAuto" width={"40px"} height={"40px"} />
                                            <p className="p-0 pe-3 fs-6 d-block m-0">{singleCarInformation.carEquipment.audioVideoAprikojums[0]}</p>
                                        </div>
                                    )}

                                    {singleCarInformation.carEquipment.drosiba && singleCarInformation.carEquipment.drosiba.length > 0 && (
                                        <div className="icon-wrapper_item d-flex flex-row gap-2 align-items-center">
                                            <img src={BluetoothDrive} alt="BluetoothDrive" width={"40px"} height={"40px"} />
                                            <p className="p-0 pe-3 fs-6 d-block m-0"> {singleCarInformation.carEquipment.drosiba[0]}</p>
                                        </div>
                                    )}

                                    {singleCarInformation.carEquipment.aprikojums && singleCarInformation.carEquipment.aprikojums.length > 0 && (
                                        <div className="icon-wrapper_item d-flex flex-row gap-2 align-items-center">
                                            <img src={CarFront} alt="CarFront" width={"40px"} height={"40px"} />
                                            <p className="p-0 pe-3 fs-6 d-block m-0"> {singleCarInformation.carEquipment.aprikojums[0]}</p>
                                        </div>
                                    )}

                                    {/* <div className="icon-wrapper_item">
                                            <img src={CarFront} alt="CarFront" width={"40px"} height={"40px"} />
                                            <p>Labi aprīkots</p>
                                        </div> */}

                                </div>
                            </Col>
                        </Row>

                        <Row className="specification-row  pt-3 pb-4 border-bottom border-secondary-subtle">
                            <Col className="border-dark-subtle">
                                <h3 className="mb-3 fs-3 fw-semibold">{singleCarInformation.title} specifikācija</h3>
                                <Row md={2} className="specification-container flex-md-no-wrap">
                                    {renderMainCarCategory("Gads: ", "gads")}
                                    {renderMainCarCategory('Virsbūves tips: ', "virsbuvesTips")}
                                    {renderMainCarCategory("Durvju skaits: ", "durvjuSkaits")}
                                    {renderMainCarCategory("Sēdvietu skaits: ", "sedvietuSkaits")}
                                    {renderMainCarCategory("Nobraukums: ", "nobraukums")}
                                    {renderMainCarCategory('Ātrumkārba: ', "atrumkarba")}
                                    {renderMainCarCategory("Piedziņa: ", "piedzina")}
                                    {renderMainCarCategory("CO izmeši: ", "coIzmesuDaudzums")}
                                    {renderMainCarCategory("Degvielas tips: ", "dzinejs")}
                                    {renderMainCarCategory("Motora tilpums: ", "motoraTilpums")}
                                    {renderMainCarCategory("Jauda (kw, hp): ", "jauda")}
                                    {renderMainCarCategory("Degvielas patēriņš: ", "degvielasPaterins")}
                                </Row>

                                <Row>
                                    <Nav.Link href="#allFeatures">
                                        <Button
                                            name={"Skatīt aprīkojumu"}
                                            size={"small"}
                                            type={"outline"}
                                            onClickHandler={() => setCarSpecificationPopUp(true)}>
                                            <img className="mx-1 my-auto" src={CaretBottom} alt="Caret" width={"15px"} height={"15px"} />
                                        </Button>
                                    </Nav.Link>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="auto-description-row  pt-3 pb-4 border-bottom border-secondary-subtle">
                            <Col className=" border-dark-subtle">
                                <h3 className="fs-3 fw-semibold">Apraksts</h3>
                                <div className="auto__description" dangerouslySetInnerHTML={{ __html: singleCarInformation.content }} />
                            </Col>
                        </Row>

                        <div className="recommended-for-you-row pt-3 pb-4">
                            <div>
                                <h3 className="mb-3 fs-3 fw-semibold">Rekomendējam tieši Tev</h3>
                            </div>

                            <div className="recommended-auto-cards-container d-flex flex-column py-0 px-0 d-md-grid gap-2 p-md-0 m-0">
                                {recommendedForYou
                                    .filter((car: Car) => car.carInfo.autoStavoklis[0] === singleCarInformation.carInfo.autoStavoklis[0] && car.id !== singleCarInformation.id)
                                    .slice(0, 3)
                                    .map((car: Car, index: number) => (
                                        <div key={index}>
                                            <ShopAutoCard
                                                gatsbyImageData={car.featuredImage.node.gatsbyImage}
                                                slug={car.slug}
                                                title={car.title}
                                                carInfo={car.carInfo} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="right-side__content mx-1 my-auto ">
                        <CheckoutBox
                            title={singleCarInformation.title}
                            mileage={singleCarInformation.carInfo.nobraukums}
                            slug={singleCarInformation.slug}
                            carType={singleCarInformation.carInfo.modelis}
                            price={singleCarInformation.carInfo.carPrice}
                            brokerName={singleCarInformation.carInfo.dileris}
                            carCondition={singleCarInformation.carInfo.autoStavoklis}
                            isElementorLocationFooterVisible={isElementorLocationFooterVisible}
                            PDFFile={singleCarInformation.carInfo.pdfFile}
                            autoLink={singleCarInformation.carInfo.autoLinks}
                        />
                    </div>
                </div>

                {showPopup && (
                    <ImageGalleryPopUp
                        images={singleCarGallery}
                        selectedIndex={selectedImageIndex}
                        onClose={() => setShowPopUp(false)}
                    />
                )}

                {carSpecificationPopUp && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <LazyCarSpecificationPopUp
                            carEquipment={transformedCarEquipmentKeys}
                            onCloseHandler={closeSpecPopup}
                        />
                    </Suspense>
                )}
            </Container>
        </MainLayout>
    );
};

export default SingleCar;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;
