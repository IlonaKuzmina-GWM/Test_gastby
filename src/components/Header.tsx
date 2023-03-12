import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Header = () => {
    return (
        // <nav className="container-lg navbar navbar-expand-lg bg-transparent fixed-top" aria-label="Thirteenth navbar example">
        //     <div className="container-fluid bg-transparent">
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>

        //         <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
        //             <Link to="/" className="navbar-brand col-lg-3 me-0">
        //                 <StaticImage className="header_logo" src="../images/Pirktauto_logo_horizontal_invert.png" alt="logo" />
        //             </Link>
        //             <ul className="navbar-nav col-lg-9 justify-content-lg-end">
        //                 <li className="nav-item">
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="/shop">Shop</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="/shop">About Us</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="/shop">Contact</a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>

        <Navbar bg={"transparent"} expand={"lg"} className="fixed-top container-lg header">
            <Container fluid>
                <Navbar.Brand href="/">
                    <StaticImage className="header_logo" src="../images/Pirktauto_logo_horizontal_invert.png" alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                            <StaticImage className="header_logo" src="../images/Pirktauto_logo_horizontal_black.png" alt="logo" />
                        </Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3 ">
                            <Nav.Link href="/" className="fs-5 px-4 link">Home</Nav.Link>
                            <Nav.Link href="/shop" className="fs-5 px-4 link">Shop</Nav.Link>
                            <Nav.Link href="/about" className="fs-5 px-4 link">About Us</Nav.Link>
                            <Nav.Link href="/contact" className="fs-5 px-4 link">Contact</Nav.Link>
                        </Nav>
                        {/* <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form> */}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;