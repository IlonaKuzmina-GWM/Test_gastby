import { graphql, useStaticQuery } from 'gatsby';
import React, { FC, useState } from 'react';
import { Col, Form, FormControl, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Button from './Button';


type FilterCategoriesProps = {
    subcategries?: string[];
    eventkey: number;
    filteredParamaterCounter: number;
    isCheckedProp?: boolean;
    clearFilteredValues: () => void;
    filteredCategoryHandler: (category: string) => void;
    minPriceRangeChangeHandler: (minPrice: number) => void;
    maxPriceRangeChangeHandler: (maxPrice: number) => void;
}

const FilterCategories: FC<FilterCategoriesProps> = ({ subcategries, eventkey, filteredParamaterCounter, isCheckedProp,
    clearFilteredValues, filteredCategoryHandler, minPriceRangeChangeHandler, maxPriceRangeChangeHandler }) => {
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
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    // const [isChecked, setIsChecked] = useState(isCheckedProp);

    const handleMinPriceChange = (e: { target: { value: string; }; }) => {
        setMinPrice(parseInt(e.target.value));
        // call the handlePriceRangeChange function to send the updated min and max values to the parent component
        minPriceRangeChangeHandler(parseInt(e.target.value));
    };

    const handleMaxPriceChange = (e: { target: { value: string; }; }) => {
        setMaxPrice(parseInt(e.target.value));
        // call the handlePriceRangeChange function to send the updated min and max values to the parent component
        maxPriceRangeChangeHandler(parseInt(e.target.value));
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