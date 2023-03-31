import React, { FC, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import FilterCategories from "../components/FilterCategories";
import ShopAutoCard from "../components/ShopAutoCard";
import MainLayout from "../layouts/MainLayout";
import { graphql } from "gatsby";

type ShopProps = {
    data?: any;
}

const ShopPage: FC<ShopProps> = ({ data }) => {
    const allWpCars = data.allWpCar.nodes
    const [filter, setFilter] = useState<string[]>([])

    const clearFilteredValues = () => {
        setFilter([])
    }

    const filteredCategoryHandler = (categoryId: string) => {
        if (filter.includes(categoryId)) {
            setFilter(filter.filter(id => id !== categoryId));
        } else {
            setFilter([...filter, categoryId]);
        }
    }

    const filteredCars = allWpCars.filter((car: any) => {
        if (filter.length === 0) {
            return true
        }

        for (let category of car.carCategories.nodes) {
            if (filter.includes(category.parentDatabaseId)) {
                return true
            }
        }
        return false;
    });

    return (
        <MainLayout>
            <div className="shop-page-container">
                <div className="filters-container flex-shrink-0 p-3 ">
                    <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                        <svg className="bi pe-none" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
                        <span className="fs-5 fw-semibold">Filtrs</span>
                    </a>
                    <FilterCategories eventkey={0} clearFilteredValues={clearFilteredValues} filteredCategoryHandler={filteredCategoryHandler} filteredParamaterCounter={filter.length} />
                </div>

                <Container className="auto-cards-container px-1 p-3">
                    <Row className="d-flex align-items-center mt-2 border-bottom">
                        <p className="small-info-text">"{filteredCars.length}" šitik daudz auto mums ir :D</p>
                    </Row>

                    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                        {filteredCars.map((car: any) => (
                            <Col>
                                <ShopAutoCard
                                    gatsbyImageData={car.featuredImage.node.gatsbyImage}
                                    title={car.title}
                                    price={1500}
                                    handleClick={() => { }} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </MainLayout>
    );
}

export default ShopPage;

export const query = graphql`
query MyQuery {
    allWpCar {
    nodes {
      carCategories {
        nodes {
          name
          parentDatabaseId
        }
      }
      slug
      title
      featuredImage {
        node {
          gatsbyImage(
            cropFocus: CENTER
            fit: COVER
            formats: WEBP
            placeholder: BLURRED
            width: 300
            height: 200
          )
        }
      }
    }}
}`