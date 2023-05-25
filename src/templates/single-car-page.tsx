
import { HeadFC, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { FC, useEffect, useState } from "react";
import { Carousel, Col, Container, Nav, Row } from "react-bootstrap";
import CheckoutBox from "../components/CheckoutBox";
import ShopAutoCard from "../components/ShopAutoCard";
import AndroidAuto from "../images/icons/AndroidAuto.svg";
import BluetoothDrive from "../images/icons/BluetoothDrive.svg";
import CarFront from "../images/icons/CarFront.svg";
import MainLayout from "../layouts/MainLayout";
import { AllWpCarNode } from "../types/allWpCarTypes";
import Button from "../components/Button";



type SingleCarProps = {
    pageContext: any;
};

const SingleCar: FC<SingleCarProps> = ({ pageContext }) => {
    const recommendedForYou = useStaticQuery(graphql`
    {
      allWpCar {
        nodes {
          slug
          title
          id
          featuredImage {
            node {
              gatsbyImage(cropFocus: CENTER, fit: COVER, formats: WEBP, placeholder: BLURRED, width: 300, height: 200)
            }
          }
          carInfo {
            carPrice
          }
        }
      }
    }
  `);

    const [isElementorLocationFooterVisible, setIsElementorLocationFooterVisible] = useState(false);
    const singleCarInformation = pageContext;
    const singleCarGallery = singleCarInformation.carInfo.carGallery;
    const countImagesInGallery = singleCarGallery.length;

    useEffect(() => {
        const setCheckoutBoxVisibility = () => {
            const availabilityCheckBox = document.querySelector(".checkout-container");
            const elementorLocationFooter = document.querySelector(".footer") as HTMLElement;;

            if (!elementorLocationFooter) return;

            const availabilityCheckoutBoxOffSet = elementorLocationFooter.offsetTop;
            // const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            if (windowWidth <= 768) {
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

    const renderMainCarCategory = (title: string, parentDatabaseId: number) => {
        const categories = singleCarInformation.carCategories.nodes
            .filter((filterdById: { parentDatabaseId: number }) => (filterdById.parentDatabaseId === parentDatabaseId))
            .slice(0, 3);

        const categoriHeading = (title: string) => title === "" ? null : <h5>{title}</h5>;

        const specialSubCategoryIcons = (categoryName: string) => {
            switch (categoryName) {
                case "Bluetooth":
                    return <img src={BluetoothDrive} width={100} height={50}></img>;
                case "Android auto":
                    return <img src={AndroidAuto} width={100} height={40}></img>;
                case "CarPlay":
                    return <img src={CarFront} width={100} height={50}></img>;
                default:
                    return null;
            }
        };

        if (parentDatabaseId !== 316) {
            return (
                <div className="d-flex">
                    <>{categoriHeading(title)}&nbsp;</>
                    {categories.map((specialSubCategory: { name: string }, index: number) => (
                        <span className="mb-3" key={index}>{specialSubCategory.name}{index !== categories.length - 1 ? ', ' : ''}</span>
                    ))}
                </div>
            )
        } return (
            <Row md={3}>
                {categories.map((specialSubCategory: { name: string }, index: number) => (
                    <div className="d-flex align-items-center">
                        {specialSubCategoryIcons(specialSubCategory.name)}
                        <span key={index}>{specialSubCategory.name}</span>
                    </div>
                ))}
            </Row>
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
                                {singleCarGallery.map((image: { gatsbyImage: IGatsbyImageData }, index: number) => (
                                    <Carousel.Item key={index}>
                                        <GatsbyImage className="item" image={image.gatsbyImage} alt={"Auto"} />
                                        <Carousel.Caption className="carousel-caption">
                                            <span>{singleCarGallery.lenght}</span>
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
                                    {renderMainCarCategory("", 316)}
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-5">
                            <Col className="border-top border-dark-subtle">
                                <h3 className="mb-3">Vairāk par {singleCarInformation.title} </h3>

                                <Row md={2}>
                                    {renderMainCarCategory("Durvju skaits: ", 273)}
                                    {renderMainCarCategory('Ātrumkārba: ', 199)}
                                    {renderMainCarCategory('Dzinējs: ', 194)}
                                    {renderMainCarCategory('Gads: ', 304)}
                                    {renderMainCarCategory('Virsbūves tips: ', 249)}
                                </Row>

                                <Row>
                                <Nav.Link href="#allFeatures">
                                      <Button name={"Visas funkcijas un specifikācijas"} size={"small"} type={"outline"}></Button>
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
                        
                        <Row className="mb-5" id="allFeatures">
                            <Col className="border-top border-dark-subtle">
                                <h3 className="mb-3">Visas funkcijas un specifikācijas</h3>
                                <div>
                                    Jādomā vēl ko te saņemsim no WP. 
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col className="border-top border-dark-subtle">
                                <h3 className="mb-3">Rekomendējam tieši tev</h3>
                            </Col>
                            <Row md={3}>
                                {recommendedForYou.allWpCar.nodes.slice(0, 3).map((car: AllWpCarNode) => (
                                    <Col className="mb-3">
                                        <ShopAutoCard
                                            gatsbyImageData={car.featuredImage.node.gatsbyImage}
                                            slug={car.slug} title={car.title}
                                            price={car.carInfo.carPrice}
                                            handleClick={() => { }} />
                                    </Col>
                                ))}
                            </Row>
                        </Row>
                    </Col>

                    <CheckoutBox
                        title={singleCarInformation.title}
                        slug={singleCarInformation.slug}
                        carType={renderMainCarCategory('', 366)}
                        price={singleCarInformation.carInfo.carPrice.toLocaleString()}
                        brokerName={renderMainCarCategory('', 357)}
                        carCondition={renderMainCarCategory('', 202)}
                        isElementorLocationFooterVisible={isElementorLocationFooterVisible} />
                </Row>
            </Container>
        </MainLayout>
    );
};

export default SingleCar;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;
