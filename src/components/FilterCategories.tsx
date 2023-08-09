import { StaticImage } from 'gatsby-plugin-image';
import React, { FC, useState } from 'react';
import { Col, Form, FormControl, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Button from './Button';

import useAllWpCarData from "../queries/useAllWpCarData";
import { Replacements } from '../types/allWpCarTypes';

type FilterCategoriesProps = {
    eventkey: number;
    filteredParamaterCounter: number;
    showFilters: boolean;
    onCloseFilters: () => void;
    clearFilteredValues: () => void;
    filteredCategoryHandler: (category: string) => void;
    minPriceRangeChangeHandler: (minPrice: number) => void;
    maxPriceRangeChangeHandler: (maxPrice: number) => void;
}

const FilterCategories: FC<FilterCategoriesProps> = ({
    filteredParamaterCounter,
    showFilters,
    onCloseFilters,
    clearFilteredValues,
    filteredCategoryHandler,
    minPriceRangeChangeHandler,
    maxPriceRangeChangeHandler }) => {

    const data = useAllWpCarData();

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const handleMinPriceChange = (e: { target: { value: string; }; }) => {
        setMinPrice(parseInt(e.target.value));
        minPriceRangeChangeHandler(parseInt(e.target.value));
    };

    const handleMaxPriceChange = (e: { target: { value: string; }; }) => {
        setMaxPrice(parseInt(e.target.value));
        maxPriceRangeChangeHandler(parseInt(e.target.value));
    };

    const uncheckAllCheckboxes = () => {
        const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    };

    type CarInfoProperty = keyof Replacements;

    const replacements: Replacements = {
        "atrasanasVieta": "Atrašanās vieta",
        "atrumkarba": "Ātrumkārba",
        "autoStavoklis": "Auto stāvoklis",
        "virsbuvesTips": "Virsbūves tips",
        "piedzina": "Piedziņa",
        "marka": "Marka",
        "krasa": "Krāsa",
        "gads": "Gads",
        "dzinejs": "Dzinējs",
        "durvjuSkaits": "Durvju skaits",
        "carPrice": "Cena",
        "dileris": "Dīleris",
    };

    type CarInfo = {
        [key: string]: string | number;
    };

    const transformCarInfo = (carInfo: CarInfo): CarInfo => {
        const { carPrice, versija, ...restCarInfo } = carInfo;

        const transformedCarInfo: CarInfo = {};

        for (const [key, value] of Object.entries(restCarInfo)) {
            const transformedKey = replacements[key as CarInfoProperty] || key;
            transformedCarInfo[transformedKey] = value;
        }

        return transformedCarInfo;
    };

    const uniqueCarInfoValues = data.reduce((result: { [x: string]: any; }, car: { carInfo: any; }) => {
        const carInfo = car.carInfo;
        const transformedCarInfo = transformCarInfo(carInfo);

        Object.keys(transformedCarInfo).forEach((key) => {
            if (!result[key]) {
                result[key] = [];
            }

            const valuesArray = result[key];
            const value = transformedCarInfo[key];

            if (!valuesArray.some((existingValue: any) => JSON.stringify(existingValue) === JSON.stringify(value))) {
                valuesArray.push(value);
            }
        });

        return result;
    }, {});

    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen className={`filters-accordion ${showFilters ? 'show' : ''}`}>
            <div className='filters-accordion-wrapper'>

                <div className='close-filters-btn-wrapper' onClick={onCloseFilters}>
                    <StaticImage className='close-filters-btn' src={"../images/cancel.svg"} alt={"Cancel"} width={30} height={30} />
                </div>

                <Row className='filter-results mb-3 px-3 justify-content-between align-items-center'>
                    <Col className='px-0 clear_results'>
                        <span>izvēlēti "{filteredParamaterCounter}" parametri</span>
                    </Col>

                    <Col className='px-0  row filter_results_btn-wrapper'>
                        <div className='clear-btn'>
                            <Button name={'Notīrīt izvēli'} size={'small'} type={'outline'} onClickHandler={() => {
                                clearFilteredValues();
                                uncheckAllCheckboxes();
                            }}></Button>
                        </div>

                        <div className='show-all-btn'>
                            <Button name={'Apskatīt atlasītos auto'} size={'small'} type={'primary'} onClickHandler={onCloseFilters}></Button>
                        </div>
                    </Col>
                </Row>

                <div className='accordion-wrapper'>
                    <Row className='center-xs'>
                        <Col className='' xs={12}>
                            <h4 className="price__block--title">Cena</h4>
                            <Form className='d-flex justify-content-between main__range--wrapper'>
                                <FormControl
                                    className='main__price--input'
                                    type='number'
                                    placeholder='Min'
                                    onChange={handleMinPriceChange} />

                                <FormControl
                                    className='main__price--input'
                                    type='number'
                                    placeholder='Max'
                                    onChange={handleMaxPriceChange} />
                            </Form>
                        </Col>
                    </Row>

                    {/* {Object.values(uniqueCategories).map((category: any, index: number) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header className='accordion-title'>{category.wpParent.node.name}</Accordion.Header>
                            <Accordion.Body>
                                {category.wpParent.node.wpChildren.nodes.map((subcategory: CarCategory, index: number) => (
                                    <Form key={index}>
                                        <Form.Group className="" controlId={subcategory.databaseId.toString()}>
                                            <Form.Check
                                                type="checkbox"
                                                id={subcategory.databaseId.toString()}
                                                label={subcategory.name}
                                                value={subcategory.databaseId}
                                                name={subcategory.databaseId.toString()}
                                                onChange={(e) => { filteredCategoryHandler(e.target.value); }}
                                            />
                                        </Form.Group>
                                    </Form>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))} */}

                    <Accordion>
                        {Object.keys(uniqueCarInfoValues).map((key, index) => (
                            <Accordion.Item key={index} eventKey={index.toString()}>
                                <Accordion.Header className='accordion-title'>{key}</Accordion.Header>
                                <Accordion.Body>
                                    {uniqueCarInfoValues[key].map((valueName: string | number, valueIndex: number) => (
                                        <Form key={valueIndex}>
                                            <Form.Group className="" controlId={valueName.toString()}>
                                                {key === "Krāsa"
                                                    ? (
                                                        <div className='form-check'>
                                                            <input
                                                                type="checkbox"
                                                                id={valueName.toString()}
                                                                // label={valueName}
                                                                value={valueName}
                                                                name={valueName.toString()}
                                                                className='form-check-input color-checkbox'
                                                                onChange={(e) => { filteredCategoryHandler(e.target.value) }}
                                                            />
                                                            <label
                                                                htmlFor={valueName.toString()}
                                                                className='form-check-label'>
                                                                <span
                                                                    style={{
                                                                        display: "inline-block",
                                                                        width: "90%",
                                                                        height: "20px",
                                                                        backgroundColor: valueName.toString(),
                                                                        marginLeft: "10px",
                                                                        marginTop: "3px",
                                                                        borderRadius: "8px"
                                                                    }} />
                                                            </label>
                                                        </div>
                                                    ) : (
                                                        <Form.Check
                                                            type="checkbox"
                                                            id={valueName.toString()}
                                                            label={valueName}
                                                            value={valueName}
                                                            name={valueName.toString()}
                                                            onChange={(e) => {
                                                                filteredCategoryHandler(e.target.value)
                                                            }}
                                                        />
                                                    )}
                                            </Form.Group>
                                        </Form>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            </div>
        </Accordion >);
}

export default FilterCategories;