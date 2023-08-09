import { graphql } from "gatsby";
import React, { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FilterCategories from "../components/FilterCategories";
import ShopAutoCard from "../components/ShopAutoCard";
import MainLayout from "../layouts/MainLayout";
import { Car, MyQueryResult } from "../types/allWpCarTypes";
import slugify from 'slugify';

type ShopProps = {
    data: MyQueryResult;
    location: {
        state: {
            searchResults: Car[];
        };
    };
};

const ShopPage: FC<ShopProps> = ({ location, data }) => {
    const allWpCars = data.allWpCar.nodes;
    const [filteredValues, setFilteredValues] = useState<string[]>([])
    const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: string[] }>({});
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [searchResults, setSearchResults] = useState<Car[]>(location.state?.searchResults || []);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        findDefaultMinAndMaxPrice();
    }, []);



    const findDefaultMinAndMaxPrice = () => {
        const prices = allWpCars.map((car: Car) => car.carInfo.carPrice);
        const minDefaultPrice = Math.min(...prices);
        const maxDefaultPrice = Math.max(...prices);

        setMinPrice(minDefaultPrice);
        setMaxPrice(maxDefaultPrice);
    };


    const clearFilteredValues = () => {
        setFilteredValues([]);
        setSearchResults([]);
        findDefaultMinAndMaxPrice();
    };


    // const filteredCategoryHandler = (categoryId: string) => {
    //     const selectedCategory = allWpCars.find((car) =>
    //         car.carCategories.nodes.some((node: any) => node.databaseId.toString() === categoryId)
    //     );

    //     if (selectedCategory) {
    //         const selectedSubcategory = selectedCategory.carCategories.nodes.find(
    //             (node: any) => node.databaseId.toString() === categoryId
    //         );

    //         if (selectedSubcategory) {
    //             const subcategorySlug = slugify(selectedSubcategory.name, { lower: true });


    //             const isCheckedArray = filteredValues.includes(subcategorySlug);

    //             if (isCheckedArray) {
    //                 const updatedCategories = filteredValues.filter((slug) => slug !== subcategorySlug);
    //                 setFilteredValues(updatedCategories);
    //             } else {
    //                 const updatedCategories = [...filteredValues, subcategorySlug];
    //                 setFilteredValues(updatedCategories);
    //             }
    //         }
    //     }
    // };


    const filteredCategoryHandler = (categoryId: string) => {
        const isCheckedArray = filteredValues.includes(categoryId);

        if (isCheckedArray) {
            const updateCategories = filteredValues.filter((id) => id !== categoryId);
            setFilteredValues(updateCategories)
        } else {
            const updateCategories = [...filteredValues, categoryId];
            setFilteredValues(updateCategories)
        }
    }


    const minPriceRangeChangeHandler = (minPri: number) => {
        setMinPrice(minPri);
    }

    const maxPriceRangeChangeHandler = (maxPri: number) => {
        setMaxPrice(maxPri);
    }

    const filteredCars = allWpCars.filter((car: Car) => {
        if (filteredValues.length === 0 && minPrice === 0 && maxPrice === 0) {
            return true;
        }

        const carCategoryIds = car.carCategories.nodes.map((category) => category.databaseId?.toString());

        const allSelectedCategoriesMatch = filteredValues.every((categoryId) => {
            return carCategoryIds.includes(categoryId);
        });

        return allSelectedCategoriesMatch && car.carInfo.carPrice >= minPrice && car.carInfo.carPrice <= maxPrice;
    });

    const searchResultsFilteredCars = searchResults.filter((car: Car) => {
        if (filteredValues.length === 0 && minPrice === 0 && maxPrice === 0) {
            return true;
        }

        const carCategoryIds = car.carCategories.nodes.map((category) => category.databaseId?.toString());

        const allSelectedCategoriesMatch = filteredValues.every((categoryId) => {
            return carCategoryIds.includes(categoryId);
        });

        return allSelectedCategoriesMatch && car.carInfo.carPrice >= minPrice && car.carInfo.carPrice <= maxPrice;
    });

    const carsToRender = searchResults.length > 1 ? searchResultsFilteredCars : filteredCars;

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const closeFilters = () => {
        setShowFilters(false);
    };

    return (
        <MainLayout>
            <div className="shop-page-container">
                <div className="filters-container flex-shrink-0 p-3 ">
                    <div className="filter-title-line d-flex align-items-center mb-3 link-dark text-decoration-none border-bottom">
                        <span className="fs-5 fw-semibold">Filtrs</span>
                        <button className="show-filters-btn" onClick={toggleFilters}>Show Filter</button>
                    </div>

                    <FilterCategories eventkey={0}
                        clearFilteredValues={clearFilteredValues}
                        filteredCategoryHandler={filteredCategoryHandler}
                        minPriceRangeChangeHandler={minPriceRangeChangeHandler}
                        maxPriceRangeChangeHandler={maxPriceRangeChangeHandler}
                        filteredParamaterCounter={filteredValues.length}
                        showFilters={showFilters}
                        onCloseFilters={closeFilters}
                    />
                </div>

                <Container className="auto-cards-container">
                    <Row className="d-flex align-items-center mt-2 border-bottom">
                        <p className="small-info-text">"{filteredCars.length}" šitik daudz auto mums ir :D</p>
                    </Row>

                    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                        {carsToRender.map((car: Car) => (
                            <Col key={car.id} className="px-1">
                                <ShopAutoCard
                                    gatsbyImageData={car.featuredImage.node.gatsbyImage}
                                    slug={car.slug}
                                    title={car.title}
                                    price={car.carInfo.carPrice} />
                            </Col>
                        ))
                        }
                    </Row>

                    {/* <Row xs={12} className="g-4 mt-5">
                        {filteredCars.length < 1 || carsToRender.length < 1 && <div className="d-flex justify-content-center align-items-center">
                            <h3 className="text-center">Diemžēl pēc izvēlētiem kriterijiem nekas nav atrasts</h3>
                        </div>}
                    </Row> */}
                </Container>
            </div>
        </MainLayout>
    );
}

export default ShopPage;

export const query = graphql`
query AllCarsDetails {
    allWpCar {
    nodes {
      carCategories {
        nodes {
          name
          databaseId
        }
      }
      slug
      title
      id
      featuredImage {
        node {
          gatsbyImage(
            cropFocus: CENTER
            fit: COVER
            formats: WEBP
            placeholder: BLURRED
            width: 302
            height: 172
          )
        }
      }
      carInfo {
        carPrice
      }
    }
  }
}`