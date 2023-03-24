import React, { FC, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Button from './Button';


type FilterCategoriesProps = {
    subcategries?: string[];
    eventkey: number;
}

const FilterCategories: FC<FilterCategoriesProps> = ({ subcategries, eventkey }) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(50000);

    const handleMinPriceChange = (e: { target: { value: string; }; }) => {
        setMinPrice(parseInt(e.target.value));
    };

    const handleMaxPriceChange = (e: { target: { value: string; }; }) => {
        setMaxPrice(parseInt(e.target.value));
    };



    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen className='filters-accordion'>
            <Row className=' mb-3 px-3 filter-results justify-content-between align-items-center'>
                <Col className='px-0 '>
                    <span>izvēlēti "10" parametri</span>
                </Col>

                <Col className='px-0  row justify-content-end pe-3'>
                    <Button name={'Notīrīt izvēli'} size={'small'} type={'outline'}></Button>
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

                        <div className="price-stats">
                            <span>Min: ${minPrice}</span>
                            <span>Max: ${maxPrice}</span>
                        </div>
                    </div>
                </Col>
            </Row>


            <Accordion.Item eventKey="0" className=''>
                {/* <p>Cena</p>

       
                <Form>
                    <Form.Group className="" controlId="">
                        <Form.Control
                            type='number'
                            name=''
                            placeholder='' />

                    </Form.Group>
                    <Form.Group className="" controlId="">
                        <Form.Control
                            type='number'
                            name=''
                            placeholder='' />
                    </Form.Group>
                </Form> */}
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header className='accordion-title'>Jauni vai mazlietoti</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"Visi"} value={"new"} />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"Jauni"} value={"new"} />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"Mazlietoti"} value={"new"} />
                        </Form.Group>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header className='accordion-title'>Marka</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"1"} value={"new"} />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"2"} value={"new"} />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"3"} value={"new"} />
                        </Form.Group>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header className='accordion-title'>Atrašanās vieta</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"1"} value={"new"} />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"2"} value={"new"} />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"3"} value={"new"} />
                        </Form.Group>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
                <Accordion.Header className='accordion-title'>Dzinēja tips</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"1"} value={"new"} />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"2"} value={"new"} />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"3"} value={"new"} />
                        </Form.Group>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
                <Accordion.Header className='accordion-title'>Piedziņa</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"1"} value={"new"} />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"2"} value={"new"} />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Check type="checkbox" label={"3"} value={"new"} />
                        </Form.Group>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion >);
}

export default FilterCategories;