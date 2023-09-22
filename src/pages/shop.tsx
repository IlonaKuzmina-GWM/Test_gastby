import { HeadFC, graphql, navigate } from "gatsby";
import React, { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FilterCategories from "../components/FilterCategories";
import ShopAutoCard from "../components/ShopAutoCard";
import MainLayout from "../layouts/MainLayout";
import { AllWpCar, Car, MyQueryResult, CarInfo } from "../types/allWpCarTypes";
import slugify from 'slugify';


type ShopProps = {
    data: MyQueryResult;
    location: {
        state: {
            searchResults: Car[];
        };
    };
};


type ReverseReplacements = {
    [key: string]: string;
};

const ShopPage: FC<ShopProps> = ({ location, data }) => {
    const allCars = data.allWpCar.nodes;
    // const [allCars, setAllCars] = useState<Car[]>([]);
    // const [filteredValues, setFilteredValues] = useState<string[]>([])
    // const [filteredCategoriesObject, setFilteredCategoriesObject] = useState<{ [key: string]: string[] }>({});


    const [checkedValues, setCheckedValues] = useState<{ [key: string]: string[] }>({});
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [searchResults, setSearchResults] = useState<Car[]>(location.state?.searchResults || []);
    const [showFilters, setShowFilters] = useState(false);
    const [countedSelectedValues, setCountedSelectedValues] = useState(0);

    useEffect(() => {
        // setAllCars(data.allWpCar.nodes);
        findDefaultMinAndMaxPrice();
    }, []);

    useEffect(() => {
        // updateUrlWithSlugs();
        countValues(checkedValues);
    }, [checkedValues]);

    const findDefaultMinAndMaxPrice = () => {
        const prices = allCars.map((car: Car) => car.carInfo.carPrice);
        const minDefaultPrice = Math.min(...prices);
        const maxDefaultPrice = Math.max(...prices);

        setMinPrice(minDefaultPrice);
        setMaxPrice(maxDefaultPrice);
    };

    const clearFilteredValues = () => {
        // setFilteredValues([]);
        setCheckedValues({});
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

    const filteredCategoryHandler = (filteredKey: string, filteredValue: string) => {
        const replacements: ReverseReplacements = {
            "Atrašanās vieta": "atrasanasVieta",
            "Ātrumkārba": "atrumkarba",
            "Auto stāvoklis": "autoStavoklis",
            "Virsbūves tips": "virsbuvesTips",
            "Piedziņa": "piedzina",
            "Marka": "marka",
            "Krāsa": "krasa",
            "Gads": "gads",
            "Dzinējs": "dzinejs",
            "Durvju skaits": "durvjuSkaits",
            "Cena": "carPrice",
            "Dīleris": "dileris",
        };

        setCheckedValues((prevCheckedValues) => {
            const newCheckedCategory = { ...prevCheckedValues };
            const replacedKey = replacements[filteredKey] || filteredKey;

            if (newCheckedCategory[replacedKey]) {
                if (newCheckedCategory[replacedKey].includes(filteredValue)) {
                    newCheckedCategory[replacedKey] = prevCheckedValues[replacedKey].filter((item) => item !== filteredValue)
                    if (newCheckedCategory[replacedKey].length === 0) {
                        delete newCheckedCategory[replacedKey];
                    }
                } else {
                    newCheckedCategory[replacedKey].push(filteredValue);
                }
            } else {
                newCheckedCategory[replacedKey] = [filteredValue];
            }
            return newCheckedCategory;
        });
    };

    // const updateUrlWithSlugs = () => {
    //     const selectedSlugs: string[] = [];

    //     Object.entries(filteredCategoriesObject).forEach(([key, values]) => {
    //         if (Array.isArray(values)) {
    //             values.forEach((value) => {
    //                 const slug = slugify(value, { lower: true, remove: /[*+~.()'"!:@]/g });
    //                 selectedSlugs.push(`${key}=${slug}`);
    //             });
    //         } else {
    //             const slug = slugify(values, { lower: true, remove: /[*+~.()'"!:@]/g });
    //             selectedSlugs.push(`${key}=${slug}`);
    //         }
    //     });

    //     // Construct the query parameters string
    //     const queryParams = selectedSlugs.join('&');

    //     // Update the URL with query parameters
    //     // navigate(`?${queryParams}`, { replace: true });
    // };




    // const filteredCars = (searchResults.length > 0 ? searchResults : allCars).filter((car: Car) => {
    //     const carInfo = car.carInfo;
    //     const carPrice = carInfo.carPrice;

    //     const keyMatches = Object.keys(checkedValues).every((key) => {
    //         const selectedValues = checkedValues[key];

    //         if (!selectedValues || selectedValues.length === 0) {
    //             return true;
    //         }

    //         const carValues = carInfo[key];

    //         if (!Array.isArray(selectedValues) || !Array.isArray(carValues)) {
    //             return false;
    //         }

    //         return selectedValues.every((selectedValue) => carValues.includes(selectedValue));
    //     });

    //     // return keyMatches && carPrice >= minPrice && carPrice <= maxPrice;
    //     return keyMatches;
    // });


    const filteredCars = (searchResults.length > 0 ? searchResults : allCars).filter((car: Car) => {
        const carInfo = car.carInfo;
        const carPrice = carInfo.carPrice;

        //compare carInfo key and value  with checkedValues anad give back all cars with all values within one checkedValues

        const keysMatches = Object.keys(checkedValues).every((key) => Object.keys(carInfo).includes(key))
        const valuesMatches = Object.keys(checkedValues).every(key =>
            JSON.stringify(checkedValues[key]) === JSON.stringify(carInfo[key as keyof CarInfo])
        );

        return keysMatches && valuesMatches && carPrice >= minPrice && carPrice <= maxPrice
    });

    const countValues = (checkedValues: any) => {
        let totalCount = 0;

        for (const key in checkedValues) {
            if (checkedValues.hasOwnProperty(key)) {
                totalCount += checkedValues[key].length;
            }
        }
        setCountedSelectedValues(totalCount);
    };

    let carsToRender = filteredCars;

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
                        <p className="small-info-text">"{carsToRender && carsToRender.length}" šitik daudz auto mums ir :D</p>
                    </Row>

                    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                        {carsToRender && carsToRender.map((car: Car) => (
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
                        {carsToRender && carsToRender.length === 0 && <div className="d-flex justify-content-center align-items-center">
                            <h3 className="text-center">Diemžēl pēc izvēlētiem kriterijiem nekas nav atrasts</h3>
                        </div>}
                    </Row>
                </Container>
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