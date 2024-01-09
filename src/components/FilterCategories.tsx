import { StaticImage } from 'gatsby-plugin-image';
import React, { FC, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Button from './Button';

import useAllWpCarData from "../queries/useAllWpCarData";

type FilterCategoriesProps = {
    eventkey: number;
    filteredParamaterCounter: number;
    showFilters: boolean;
    filterUsed: boolean;

    onCloseFilters: () => void;
    clearFilteredValues: () => void;
    filteredCategoryHandler: (filteredCategoryKey: string, filteredCategoryValue: string) => void;
    minPriceRangeChangeHandler: (minPrice: number) => void;
    maxPriceRangeChangeHandler: (maxPrice: number) => void;
}

const FilterCategories: FC<FilterCategoriesProps> = ({
    filteredParamaterCounter,
    showFilters,
    filterUsed,
    onCloseFilters,
    clearFilteredValues,
    filteredCategoryHandler,
    minPriceRangeChangeHandler,
    maxPriceRangeChangeHandler }) => {

    const data = useAllWpCarData();

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [inputChanged, setInputChanged] = useState(false);

    const handleMinPriceChange = (e: { target: { value: string; }; }) => {
        setMinPrice(parseInt(e.target.value));
        minPriceRangeChangeHandler(parseInt(e.target.value));
        setInputChanged(true);
    };

    const handleMaxPriceChange = (e: { target: { value: string; }; }) => {
        setMaxPrice(parseInt(e.target.value));
        maxPriceRangeChangeHandler(parseInt(e.target.value));
        setInputChanged(true);
    };

    const uncheckAllCheckboxes = () => {
        const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });

        const minPriceInput = document.getElementById('minPriceInput') as HTMLInputElement | null;
        if (minPriceInput) {
            minPriceInput.value = '';
        }

        const maxPriceInput = document.getElementById('maxPriceInput') as HTMLInputElement | null;
        if (maxPriceInput) {
            maxPriceInput.value = '';
        }
        setInputChanged(false);
    };

    type CarInfoProperty = keyof Replacements;

    type Replacements = {
        [key: string]: string;
    };

    const replacements: Replacements = {
        "atrumkarba": "Ātrumkārba",
        "atrasanasVieta": "Atrašanās vieta",
        "autoStavoklis": "Auto stāvoklis",
        "virsbuvesTips": "Virsbūves tips",
        "sedvietuSkaits": "Sēdvietu skaits",
        "piedzina": "Piedziņa",
        "nobraukums": "Nobraukums",
        "motoraTilpums": "Motora tilpums",
        "modelis": "Modelis",
        "marka": "Marka",
        "krasa": "Krāsa",
        "jauda": "Jauda",
        "gads": "Gads",
        "dzinejs": "Dzinējs",
        "durvjuSkaits": "Durvju skaits",
        "carPrice": "Cena",
        "dileris": "Dīleris",
        "degvielasPaterins": "Degvielas patēriņš",
        "coIzmesuDaudzums": "CO izmeši",
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

    const uniqueCarInfoValues: { [key: string]: (number[] | string[] | []) } = data.reduce((result: { [x: string]: any; }, car: { carInfo: CarInfo; }) => {
        const carInfo = car.carInfo;
        const transformedCarInfo = transformCarInfo(carInfo);

        Object.keys(transformedCarInfo).forEach((key) => {
            if (!result[key]) {
                result[key] = [];
            }

            const valuesArray = result[key];
            const value = transformedCarInfo[key];

            if (value !== null && !valuesArray.some((existingValue: string | number) => JSON.stringify(existingValue) === JSON.stringify(value))) {
                valuesArray.push(value);
            }
        });

        return result;
    }, {});

    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen className={`filters-accordion ${showFilters ? 'show' : ''}`}>
            <div className='filters-accordion-wrapper relative'>

                <div className='close-filters-btn-wrapper d-flex d-md-none justify-content-end d-md-none' onClick={onCloseFilters}>
                    <StaticImage className='close-filters-btn d-block float-end pointer' src={"../images/cancel.svg"} alt={"Cancel"} width={30} height={30} />
                </div>

                <Row className='filter-results mb-3 px-3 pb-2 justify-content-between align-items-center border-bottom flex-column flex-md-row gap-3'>
                    <Col className='px-0 clear_results'>
                        <span className=''>{filteredParamaterCounter === 1 ? 'izvēlēts' : 'izvēlēti'} "{filteredParamaterCounter}" {filteredParamaterCounter === 1 ? 'parametrs' : 'parametri'}</span>
                    </Col>

                    <Col className='px-0 filter_results_btn-wrapper d-flex flex-row justify-content-between gap-3'>
                        <div className='clear-btn d-flex justify-content-end p-0'>
                            {filterUsed && <Button name={'Notīrīt izvēli'} size={'small'} type={'outline'} onClickHandler={() => {
                                clearFilteredValues();
                                uncheckAllCheckboxes();
                            }} />}
                        </div>

                        <div className='show-all-btn d-md-none d-flex '>
                            <Button name={'Apskatīt atlasītos auto'} size={'small'} type={'primary'} onClickHandler={onCloseFilters}></Button>
                        </div>
                    </Col>
                </Row>

                <div className='accordion-wrapper'>
                    <Row className='center-xs price-range-row mb-3'>
                        <Col className='' xs={12}>
                            <div>
                                <h4 className="pe-2 fs-6">Cena</h4>
                                {minPrice > maxPrice && <div className="alert alert-danger" role="alert" style={{ fontSize: "14px" }}>
                                    Minimālā summma nevar būt lielāka par maximālo summmu!
                                </div>}
                            </div>

                            <Form className='d-flex mb-2'>
                                <Form.Group className='d-flex justify-content-between gap-2'>
                                    <Form.Control
                                        id="minPriceInput"
                                        className='rounded-1 p-2'
                                        type='number'
                                        placeholder='Min'
                                        onChange={handleMinPriceChange}
                                    />

                                    <Form.Control
                                        id="maxPriceInput"
                                        className='rounded-1 p-2'
                                        type='number'
                                        placeholder='Max'
                                        onChange={handleMaxPriceChange}
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>

                    <Accordion>
                        {Object.keys(uniqueCarInfoValues)
                            .filter((key) => key !== "pdfFile" && key !== "autoLinks")
                            .map((key, index) => (
                                <Accordion.Item eventKey={index.toString()} key={index}>
                                    <Accordion.Header className='accordion-title lh-1 lw-medium text-secondary'>{key}</Accordion.Header>
                                    <Accordion.Body className='ps-2'>
                                        {uniqueCarInfoValues[key].map((valueName: string | number | string[], valueIndex) => (
                                            <Form className='form-item-wrapper px-2 py-2' key={valueIndex}>
                                                <Form.Group className="" controlId={`${key}-${valueIndex}`}>
                                                    <Form.Check
                                                        type="checkbox"
                                                        className='relative mb-0 pointer'
                                                        id={`${key}-${valueIndex}`}
                                                        label={key === "Krāsa" ?
                                                            <label
                                                                htmlFor={`${key}-${valueIndex}`}
                                                                className='form-check-label pointer'>
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
                                                            </label> : String(valueName)}
                                                        value={valueName}
                                                        name={`${key}-${valueIndex}`}
                                                        onChange={() => {
                                                            filteredCategoryHandler(key, String(valueName));
                                                        }}
                                                    />
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