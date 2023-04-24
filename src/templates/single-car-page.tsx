import { HeadFC, graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image";
import React, { FC } from "react";
import { Carousel, Col, Container, Dropdown, Row } from "react-bootstrap";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/Button";
import { AllWpCarNode } from "../types/allWpCarTypes";

type SingleCarProps = {
    pageContext: any;
}

const SingleCar: FC<SingleCarProps> = ({ pageContext }) => {

    const singleCarInformation = pageContext
    const singleCarGallery = singleCarInformation.carInfo.carGallery

    const countImagesInGallery = singleCarGallery.length;

    console.log(singleCarInformation)

    // uzrakstīt kodu, kur nokļūst līdz categorijai ar databaseId:316 un izmapo kādas pirmās 5 vai trīs lietas. un tās trīs lietas 

    // const wayThisCarSpecial = pageContext.carCategories.nodes.find((cat: any) => (
    //     cat.wpParent.node.databasedId === 316
    // ))

    // console.log(wayThisCarSpecial)

    return (
        <MainLayout>
            <Container className=" single-car-container">
                <Row>
                    <Col md={12} lg={8}>
                        <Row className="mb-2">
                            <Carousel>
                                {singleCarGallery.map((image: { gatsbyImage: IGatsbyImageData }, index: number) => (
                                    <Carousel.Item key={index}>
                                        <GatsbyImage className="item" image={image.gatsbyImage} alt={"Auto"} />
                                        <Carousel.Caption>
                                            <h3>{singleCarGallery.lenght}</h3>
                                            <h3>{index + 1} of {countImagesInGallery}</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Row>

                        <Row className="mt-5">
                            <Col className="border-top border-dark-subtle">
                                <h3 className=""> Kāpēc izvēlēties tieši {singleCarInformation.title} </h3>

                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col className="border-top border-dark-subtle">
                                <h3>Vairāk par {singleCarInformation.title} </h3>
                                
                                <div className="">
                                    <h6>Durvju skaits:</h6>
                                    <p></p>
                                </div>
                                <div className="">
                                    <h6>Ātrumkārba:</h6>
                                    <p></p>
                                </div>
                                <div className="">
                                    <h6>Dzinējs:</h6>
                                    <p></p>
                                </div>
                                <div className="">
                                    <h6>Gads:</h6>
                                    {/* {singleCarInformation.carCategories.nodes.map((categori)=>(
                                        if(categori.wpParent.node.databasedId === 304) {
                                            categori.wpParent.node.wpChildren
                                        }
                                        
                                    ))} */}
                                    <p></p>
                                </div>
                                <div className="">
                                    <h6>Virsbūves tips:</h6>
                                    <p></p>
                                </div>
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
                                <h3> Recommended for you</h3>
                            </Col>
                            <Row md={3}>
                                {/* <Col>
                                <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 10"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                            </Col>
                            <Col>
                                <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 10"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                            </Col>
                            <Col>
                                <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 10"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                            </Col> */}
                            </Row>
                        </Row>
                    </Col>

                    <Col md={0} lg={4} className="">
                        <Container className="checkout-container p-4">
                            <Row>
                                <Col xs={8}>
                                    <h3 className="mb-0"></h3>
                                    <p className="">Versija</p>
                                </Col>
                                <Col xs={4}>
                                    <p>$ 15000</p>
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

export default SingleCar;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;

// export const query = graphql`
// query CarDetails($slug: String){
//   wpCar(slug: {eq:$slug}) {
//     title
//     carInfo {
//       carGallery {
//         gatsbyImage(
//           cropFocus: CENTER
//           fit: COVER
//           formats: WEBP
//           placeholder: BLURRED
//           width: 500
//         )
//       }
//       carPrice
//     }
//     databaseId
//     slug
//     carCategories {
//       nodes {
//         name
//         databaseId
//       }
//     }
//   }
// }
// `