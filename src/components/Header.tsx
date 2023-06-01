import { StaticImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        }

        window.addEventListener('scroll', handleScroll);
        return () => { window.removeEventListener('scroll', handleScroll) };
    }, [])

    return (
        <div>
         <Navbar
            expand={"lg"}
            className={`fixed-top header ${scrolled ? "scrolled" : ""}`}>
            <Container fluid>
                <Navbar.Brand href="/">
                    <StaticImage className="header_logo" src="../images/Pirktauto_logo_horizontal_color.png" alt="logo" />
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
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>   
        </div>
        
    );
}

export default Header;