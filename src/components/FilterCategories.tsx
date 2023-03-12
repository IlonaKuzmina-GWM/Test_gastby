import React, { FC } from 'react';
import { Form } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';


type FilterCategoriesProps = {
    subcategries?: string[];
    eventkey: number;
}

const FilterCategories: FC<FilterCategoriesProps> = ({ subcategries, eventkey }) => {


    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Jauni vai mazlietoti</Accordion.Header>
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
            <Accordion.Item eventKey="1">
                <Accordion.Header>Marka</Accordion.Header>
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
                <Accordion.Header>Atrašanās vieta</Accordion.Header>
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
                <Accordion.Header>Dzinēja tips</Accordion.Header>
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
                <Accordion.Header>Piedziņa</Accordion.Header>
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
            <Accordion.Item eventKey="6">
                <Accordion.Header>Cena</Accordion.Header>
                <Accordion.Body>
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
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion >);
}

export default FilterCategories;