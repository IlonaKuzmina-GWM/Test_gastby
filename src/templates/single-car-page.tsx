import { HeadFC, Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { FC } from "react";
import { Carousel, Col, Container, Dropdown, Nav, Row } from "react-bootstrap";
import Button from "../components/Button";
import ShopAutoCard from "../components/ShopAutoCard";
import MainLayout from "../layouts/MainLayout";
import { AllWpCarNode } from "../types/allWpCarTypes";
// import { AiFillCar } from ;
import { AiFillCar } from "@react-icons/all-files/ai/AiFillCar";

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

    const singleCarInformation = pageContext;
    const singleCarGallery = singleCarInformation.carInfo.carGallery;
    const countImagesInGallery = singleCarGallery.length;

    const renderMainCarCategory = (title: string, parentDatabaseId: number) => {
        const categories = singleCarInformation.carCategories.nodes
            .filter((filterdById: { parentDatabaseId: number }) => (filterdById.parentDatabaseId === parentDatabaseId))
            .slice(0, 3);

        const categoriHeading = (title: string) => title === "" ? null : <h5>{title}</h5>;

        // if (title === "") {
        //     return null
        // } return (<h5>{title}</h5>)


        return (
            <div>
                <>{categoriHeading(title)}</>
                {categories.map((specialSubCategory: { name: string }, index: number) => (
                    <span key={index}>{specialSubCategory.name}{index !== categories.length - 1 ? ', ' : ''}</span>
                ))}
            </div>
        )
    }

    return (
        <MainLayout>
            <Container className=" single-car-container">
                <Row>
                    <Col>
                        <h1>{singleCarInformation.title}</h1>
                    </Col>
                </Row>

                <Row>
                    <Col md={12} lg={7} xl={8}>
                        <Row className="mb-2">
                            <Carousel>
                                {singleCarGallery.map((image: { gatsbyImage: IGatsbyImageData }, index: number) => (
                                    <Carousel.Item key={index}>
                                        <GatsbyImage className="item" image={image.gatsbyImage} alt={"Auto"} />
                                        <Carousel.Caption className="">
                                            <h3>{singleCarGallery.lenght}</h3>
                                            <h3 className="photo-counter">
                                                {index + 1}/{countImagesInGallery}
                                            </h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Row>

                        <Row className="mt-5">
                            <Col className="border-top border-dark-subtle">
                                <h3 className=""> Kāpēc izvēlēties tieši {singleCarInformation.title} </h3>
                                <Row md={3}>
                                    {singleCarInformation.carCategories.nodes
                                        .filter((filteredById: { parentDatabaseId: number }) => (filteredById.parentDatabaseId === 316))
                                        .slice(0, 3)
                                        .map((specialSubCategory: { name: string }, index: number) => (<div key={index}>< AiFillCar /><span >{specialSubCategory.name}</span></div>))}
                                </Row>

                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col className="border-top border-dark-subtle">
                                <h3>Vairāk par {singleCarInformation.title} </h3>

                                <Row md={2}>
                                    {renderMainCarCategory("Durvju skaits:", 273)}
                                    {renderMainCarCategory('Ātrumkārba', 199)}
                                    {renderMainCarCategory('Dzinējs', 194)}
                                    {renderMainCarCategory('Gads', 304)}
                                    {renderMainCarCategory('Virsbūves tips', 249)}
                                </Row>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col className="border-top border-dark-subtle">
                                <h3>Apraksts</h3>
                                <div className="blog__text" dangerouslySetInnerHTML={{ __html: singleCarInformation.content }} />
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col className="border-top border-dark-subtle">
                                <h3>Rekomendējam tieši tev</h3>
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

                    <Col md={0} lg={4} xl={4} className="">
                        <Container className="checkout-container">
                            <Row>
                                <Col>
                                    <h3>{singleCarInformation.title}</h3>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={8}>
                                    <h3 className="mb-0"></h3>
                                    <p className="">Cena</p>
                                </Col>
                                <Col xs={4}>
                                    <p>€ {singleCarInformation.carInfo.carPrice.toLocaleString()}</p>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={8}>
                                    <p>Te kaut ko</p>
                                </Col>
                                <Col xs={4}>
                                    <p>kaut kas ir te</p>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={8}>
                                    <p>Dīleris</p>
                                </Col>
                                <Col xs={4}>
                                    <Nav.Link href="/">{renderMainCarCategory('', 357)}</Nav.Link>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="btn-wrapper">
                                    <Button name={"Esmu ieinteresēts"} size={"small"} type={"primary"}></Button>
                                </Col>
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
};

export default SingleCar;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;
