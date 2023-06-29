import { graphql, useStaticQuery } from 'gatsby';
import React, { FC, useState } from 'react';
import { Col, Form, FormControl, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { CarCategory } from '../types/allWpCategoryTypes';
import Button from './Button';
import { StaticImage } from 'gatsby-plugin-image';


type FilterCategoriesProps = {
    subcategries?: string[];
    eventkey: number;
    filteredParamaterCounter: number;
    isCheckedProp?: boolean;
    showFilters: boolean;
    clearFilteredValues: () => void;
    filteredCategoryHandler: (category: string) => void;
    minPriceRangeChangeHandler: (minPrice: number) => void;
    maxPriceRangeChangeHandler: (maxPrice: number) => void;

}

const FilterCategories: FC<FilterCategoriesProps> = ({
    subcategries, eventkey, filteredParamaterCounter, isCheckedProp, showFilters,
    clearFilteredValues, filteredCategoryHandler, minPriceRangeChangeHandler,
    maxPriceRangeChangeHandler }) => {
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
    // const [showFilter, setShowFilter] = useState(showFilters);

    const handleMinPriceChange = (e: { target: { value: string; }; }) => {
        setMinPrice(parseInt(e.target.value));
        minPriceRangeChangeHandler(parseInt(e.target.value));
    };

    const handleMaxPriceChange = (e: { target: { value: string; }; }) => {
        setMaxPrice(parseInt(e.target.value));
        maxPriceRangeChangeHandler(parseInt(e.target.value));
    };

    // const toggleFilters = () => {
    //     setShowFilter(!showFilter);
    //   };


    const uniqueCategories = filters.reduce((unique: { [x: string]: any; }, category: {
        wpParent: {
            node: {
                [x: string]: any; databaseId: string | number;
            }; wpChildren: { nodes: CarCategory[]; };
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
                            nodes: category.wpParent.node.wpChildren.nodes.map((node: CarCategory) => ({
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
        <Accordion defaultActiveKey={['0']} alwaysOpen className={`filters-accordion ${showFilters ? 'show' : ''}`}>
            <div className='filters-accordion-wrapper'>

                <div className='close-filters-btn-wrapper'>
                    <StaticImage className='close-filters-btn' src={"../images/cancel.svg"} alt={"Cancel"} width={30} height={30} />
                </div>

                <Row className='filter-results mb-3 px-3 justify-content-between align-items-center'>
                    <Col className='px-0 clear_results'>
                        <span>izvēlēti "{filteredParamaterCounter}" parametri</span>
                    </Col>

                    <Col className='px-0  row filter_results_btn-wrapper'>
                        <div className='clear-btn'>
                            <Button name={'Notīrīt izvēli'} size={'small'} type={'outline'} onClickHandler={clearFilteredValues}></Button>
                        </div>

                        <div className='show-all-btn'>
                            <Button name={'Apskatīt atlasītos auto'} size={'small'} type={'primary'} onClickHandler={() => { }}></Button>
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

                    {Object.values(uniqueCategories).map((category: any, index: number) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header className='accordion-title'>{category.wpParent.node.name}</Accordion.Header>
                            <Accordion.Body>
                                {category.wpParent.node.wpChildren.nodes.map((subcategory: CarCategory, index: number) => (
                                    <Form key={index}>
                                        <Form.Group className="" controlId="formBasicEmail">
                                            <Form.Check
                                                type="checkbox"
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
                    ))}
                </div>
            </div>
        </Accordion >);
}

export default FilterCategories;