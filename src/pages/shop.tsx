import { HeadFC, graphql, navigate } from "gatsby";
import React, { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FilterCategories from "../components/FilterCategories";
import ShopAutoCard from "../components/ShopAutoCard";
import MainLayout from "../layouts/MainLayout";
import { AllWpCar, Car, MyQueryResult } from "../types/allWpCarTypes";
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
    // const allWpCars = data.allWpCar.nodes;
    const [allCars, setAllCars] = useState<Car[]>([]);
    const [filteredValues, setFilteredValues] = useState<string[]>([])
    const [filteredCategoriesObject, setFilteredCategoriesObject] = useState<{ [key: string]: string[] }>({});
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [searchResults, setSearchResults] = useState<Car[]>(location.state?.searchResults || []);
    const [showFilters, setShowFilters] = useState(false);
    const [countedSelectedValues, setCountedSelectedValues] = useState(0);

    useEffect(() => {
        setAllCars(data.allWpCar.nodes);
        findDefaultMinAndMaxPrice();
    }, [data.allWpCar.nodes]);

    useEffect(() => {
        updateUrlWithSlugs();
        countValues(filteredCategoriesObject);
    }, [filteredCategoriesObject]);

    const findDefaultMinAndMaxPrice = () => {
        const prices = allCars.map((car: Car) => car.carInfo.carPrice);
        const minDefaultPrice = Math.min(...prices);
        const maxDefaultPrice = Math.max(...prices);

        setMinPrice(minDefaultPrice);
        setMaxPrice(maxDefaultPrice);
    };

    const clearFilteredValues = () => {
        setFilteredValues([]);
        setFilteredCategoriesObject({});
        setSearchResults([]);
        findDefaultMinAndMaxPrice();

        // Update the URL with query parameters
        // navigate(``, { replace: true });
    };

    const minPriceRangeChangeHandler = (minPri: number) => {
        setMinPrice(minPri);
    }

    const maxPriceRangeChangeHandler = (maxPri: number) => {
        setMaxPrice(maxPri);
    }

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const closeFilters = () => {
        setShowFilters(false);
    };

    const filteredCategoryHandler = (filteredCategoryKey: string, filteredCategoryValue: string) => {
        const isCheckedArray = filteredValues.includes(filteredCategoryValue);

        if (isCheckedArray) {
            const updateCategories = filteredValues.filter((category) => category !== filteredCategoryValue);
            setFilteredValues(updateCategories);
        } else {
            const updateCategories = [...filteredValues, filteredCategoryValue];
            setFilteredValues(updateCategories);
        }

        // Update the filteredCategoriesObject
        if (isCheckedArray) {
            const updatedObject: { [key: string]: string[] } = { ...filteredCategoriesObject };
            updatedObject[filteredCategoryKey] = updatedObject[filteredCategoryKey].filter((value) => value !== filteredCategoryValue);
            setFilteredCategoriesObject(updatedObject);
        } else {
            setFilteredCategoriesObject((prevObject) => ({
                ...prevObject,
                [filteredCategoryKey]: [...(prevObject[filteredCategoryKey] || []), filteredCategoryValue],
            }));
        }
    };

    const updateUrlWithSlugs = () => {
        const selectedSlugs: string[] = [];

        // Loop through each key-value pair in the filteredValues object
        Object.entries(filteredCategoriesObject).forEach(([key, values]) => {
            // If the value is an array, create slugs for each value within the array
            if (Array.isArray(values)) {
                values.forEach((value) => {
                    const slug = slugify(value, { lower: true, remove: /[*+~.()'"!:@]/g });
                    selectedSlugs.push(`${key}=${slug}`);
                });
            } else {
                // If the value is not an array, create a slug for the value
                const slug = slugify(values, { lower: true, remove: /[*+~.()'"!:@]/g });
                selectedSlugs.push(`${key}=${slug}`);
            }
        });

        // Construct the query parameters string
        const queryParams = selectedSlugs.join('&');

        // Update the URL with query parameters
        // navigate(`?${queryParams}`, { replace: true });
    };

    console.log("filteredCategoriesObject", filteredCategoriesObject)
    console.log("filteredValues", filteredValues)


    const filteredCars = (searchResults.length > 0 ? searchResults : allCars).filter((car: Car) => {

        if (filteredValues.length === 0 && minPrice === 0 && maxPrice === 0) {
            return true;
        }

        const carInfo = car.carInfo;
        const carPrice = carInfo.carPrice;

        const attributeMatches = Object.keys(carInfo).some((attributeName) => {
            const attributeValues = carInfo[attributeName];

            if (!Array.isArray(attributeValues)) {
                return false;
            }

            return attributeValues.some((attributeValue) => filteredValues.includes(attributeValue));
        });

        return attributeMatches && carPrice >= minPrice && carPrice <= maxPrice;
    });

    const countValues = (filteredCategoriesObject: any) => {
        let totalCount = 0;

        for (const key in filteredCategoriesObject) {
            if (filteredCategoriesObject.hasOwnProperty(key)) {
                totalCount += filteredCategoriesObject[key].length;
            }
        }

        setCountedSelectedValues(totalCount);
    };

    let carsToRender;

    if (filteredCars.length >= 1 || searchResults.length >= 1) {
        carsToRender = filteredCars.length >= 1 ? filteredCars : searchResults;
    } else {
        carsToRender = allCars;
    }

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
                        filteredParamaterCounter={countedSelectedValues}
                        showFilters={showFilters}
                        onCloseFilters={closeFilters}
                    />
                </div>

                <Container className="auto-cards-container">
                    <Row className="d-flex align-items-center mt-2 border-bottom">
                        <p className="small-info-text">"{carsToRender.length}" šitik daudz auto mums ir :D</p>
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

                    <Row xs={12} className="g-4 mt-5">
                        {/* {filteredCars.length >= 1 && searchResults.length >= 1 && <div className="d-flex justify-content-center align-items-center">
                            <h3 className="text-center">Diemžēl pēc izvēlētiem kriterijiem nekas nav atrasts</h3>
                        </div>} */}
                    </Row>
                </Container>
                <div>
                </div>
            </div>
        </MainLayout>
    );
}

export default ShopPage;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;

export const query = graphql`
query AllCarsDetails {
    allWpCar {
    nodes {
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
        atrasanasVieta
        atrumkarba
        autoStavoklis
        virsbuvesTips
        piedzina
        marka
        krasa
        gads
        dzinejs
        durvjuSkaits
        versija
        dileris
      }
      carEquipment {
        drosiba
        elektronika
        hiFi
        papildaprikojums
      }
    }
  }
}`