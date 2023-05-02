import { graphql, useStaticQuery } from 'gatsby';
import React, { FC, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Button from './Button';


type FilterCategoriesProps = {
    subcategries?: string[];
    eventkey: number;
    filteredParamaterCounter: number;
    isChecked: boolean;
    defaultMinPrice: number;
    defaultMaxPrice: number;
    clearFilteredValues: () => void;
    filteredCategoryHandler: (category: string) => void;
    priceRangeChangeHandler: (minPrice: number, maxPrice: number) => void;
}

const FilterCategories: FC<FilterCategoriesProps> = ({ subcategries, eventkey, filteredParamaterCounter, isChecked, defaultMinPrice, defaultMaxPrice,
    clearFilteredValues, filteredCategoryHandler, priceRangeChangeHandler }) => {
    const data = useStaticQuery(graphql`
     {
      allWpCarCategory {
        nodes {
          wpParent {
            node {
              name
              wpChildren {
                nodes {
                  name
                  slug
                  databaseId
                  cars {
                    nodes {
                      databaseId
                    }
                  }
                }
              }
              databaseId
            }
          }
        }
      }
    }`)

    const filters = data.allWpCarCategory.nodes;
    const [minPrice, setMinPrice] = useState(defaultMinPrice);
    const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);

    const handleMinPriceChange = (e: { target: { value: string; }; }) => {
        setMinPrice(parseInt(e.target.value));
        // call the handlePriceRangeChange function to send the updated min and max values to the parent component
        priceRangeChangeHandler(parseInt(e.target.value), maxPrice);
    };

    const handleMaxPriceChange = (e: { target: { value: string; }; }) => {
        setMaxPrice(parseInt(e.target.value));
        // call the handlePriceRangeChange function to send the updated min and max values to the parent component
        priceRangeChangeHandler(minPrice, parseInt(e.target.value));
    };

    // const uniqueCategories = filters.reduce((unique: { [x: string]: any; }, category: { wpParent: { node: { databaseId: string | number; }; }; }) => {
    //     if (category.wpParent && !unique[category.wpParent.node.databaseId]) {
    //         unique[category.wpParent.node.databaseId] = category
    //     }
    //     return unique;
    // }, {});


    const uniqueCategories = filters.reduce((unique: { [x: string]: any; }, category: {
        wpParent: {
            node: {
                [x: string]: any; databaseId: string | number;
            }; wpChildren: { nodes: any[]; };
        };
    }) => {
        if (category.wpParent && !unique[category.wpParent.node.databaseId]) {
            unique[category.wpParent.node.databaseId] = {
                ...category,
                wpParent: {
                    ...category.wpParent,
                    node: {
                        ...category.wpParent.node,
                        wpChildren: {
                            ...category.wpParent.node.wpChildren,
                            nodes: category.wpParent.node.wpChildren.nodes.map((node: any) => ({
                                ...node,
                                isChecked: false
                            }))
                        }
                    }
                }
            };
        }
        return unique;
    }, {});


    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen className='filters-accordion'>
            <Row className=' mb-3 px-3 filter-results justify-content-between align-items-center'>
                <Col className='px-0 '>
                    <span>izvēlēti "{filteredParamaterCounter}" parametri</span>
                </Col>

                <Col className='px-0  row justify-content-end pe-3'>
                    <Button name={'Notīrīt izvēli'} size={'small'} type={'outline'} onClickHandler={clearFilteredValues}></Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    {/* <label htmlFor="customRange3" className="form-label">Cena</label>
                    <input type="range" className="form-range" min="0" max="30000" step="100" id="customRange3"></input> */}
                    <div className="price-range-selector">
                        <label htmlFor="minPrice">Min:</label>
                        <input type="range" id="minPrice" name="minPrice" min={defaultMinPrice} max={defaultMaxPrice/2} step="500" value={minPrice} onChange={handleMinPriceChange} />
                        <br />
                        <label htmlFor="maxPrice">Max:</label>
                        <input type="range" id="maxPrice" name="maxPrice" min={defaultMinPrice/2} max={defaultMaxPrice} step="500" value={maxPrice} onChange={handleMaxPriceChange} />

                        <div className="price-stats mb-3">
                            <span>Min: ${defaultMinPrice}</span>
                            <span>Max: ${defaultMaxPrice}</span>
                        </div>
                    </div>
                </Col>
            </Row>
            {Object.values(uniqueCategories).map((category: any, index: any) => (
                <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header className='accordion-title'>{category.wpParent.node.name}</Accordion.Header>
                    <Accordion.Body>
                        {category.wpParent.node.wpChildren.nodes.map((subcategory: any, index: any) => (
                            <Form key={index}>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Check
                                        type="checkbox"
                                        label={subcategory.name}
                                        value={subcategory.databaseId}
                                        onChange={(e) => { filteredCategoryHandler(e.target.value);}}
                                    />
                                </Form.Group>
                            </Form>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion >);
}

export default FilterCategories;