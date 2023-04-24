import { useStaticQuery, graphql } from 'gatsby';
import React, { FC, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Button from './Button';


type FilterCategoriesProps = {
    subcategries?: string[];
    eventkey: number;
    filteredParamaterCounter: number;
    isChecked: boolean;
    clearFilteredValues: () => void;
    filteredCategoryHandler: (category: string) => void;
}

const FilterCategories: FC<FilterCategoriesProps> = ({ subcategries, eventkey, filteredParamaterCounter, isChecked, clearFilteredValues, filteredCategoryHandler }) => {
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

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(50000);
    const filters = data.allWpCarCategory.nodes;

    const handleMinPriceChange = (e: { target: { value: string; }; }) => {
        setMinPrice(parseInt(e.target.value));
    };

    const handleMaxPriceChange = (e: { target: { value: string; }; }) => {
        setMaxPrice(parseInt(e.target.value));
    };

    const uniqueCategories = filters.reduce((unique: { [x: string]: any; }, category: { wpParent: { node: { databaseId: string | number; }; }; }) => {
        if (category.wpParent && !unique[category.wpParent.node.databaseId]) {
            unique[category.wpParent.node.databaseId] = category;
        }
        return unique;
    }, {});

    // const getUniqueCategories = (filters: any[]) => {
    //     const uniqueCategories = filters.reduce((unique: { [x: string]: any; }, category: { wpParent: { node: { databaseId: string | number; wpChildren: { nodes: any[]; }; name: string; }; }; }) => {
    //         if (category.wpParent && !unique[category.wpParent.node.databaseId]) {
    //             unique[category.wpParent.node.databaseId] = category;
    //         }

    //         return unique;
    //     }, {});

    //     const jaunsMazlietotsCategory = Object.values(uniqueCategories).find((category: any) => category.wpParent.node.name === "Jauns/mazlietots");

    //     if (jaunsMazlietotsCategory) {
    //         const hasVisasSubcategory = jaunsMazlietotsCategory.wpParent.node.wpChildren.nodes.some((node: any) => node.name === "visas");
    //         if (!hasVisasSubcategory) {
    //             const visasSubcategory = {
    //                 name: "visas",
    //                 databaseId: "new_subcategory_id"
    //             };
    //             jaunsMazlietotsCategory.wpParent.node.wpChildren.nodes.push(visasSubcategory);
    //         }
    //     }

    //     return uniqueCategories;
    // }


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
                        <input type="range" id="minPrice" name="minPrice" min="0" max="100000" step="500" value={minPrice} onChange={handleMinPriceChange} />
                        <br />
                        <label htmlFor="maxPrice">Max:</label>
                        <input type="range" id="maxPrice" name="maxPrice" min="0" max="100000" step="500" value={maxPrice} onChange={handleMaxPriceChange} />

                        <div className="price-stats mb-3">
                            <span>Min: ${minPrice}</span>
                            <span>Max: ${maxPrice}</span>
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
                                        onChange={(e) => { filteredCategoryHandler(e.target.value); }}
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