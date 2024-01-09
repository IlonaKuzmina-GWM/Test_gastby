import { Link } from "gatsby";
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
                className={`fixed-top header bg-white ${scrolled ? "scrolled" : ""}`}>
                <Container fluid>
                    <Navbar.Brand href="/">
                        <StaticImage className="header__logo align-middle" src="../images/Pirktauto_logo_horizontal_color.png" alt="logo" width={200} height={25} placeholder="blurred" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} className="header_toggle-btn border-0" />

                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-lg`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton closeVariant="white">
                            {/* <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                <StaticImage className="header_logo" src="../images/Pirktauto_logo_horizontal_black.png" alt="logo" width={200} height={25} placeholder="blurred" />
                            </Offcanvas.Title> */}
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-2">
                                <Link to="/" activeClassName="current" className="fs-5 px-4 link">Sākums</Link>
                                <Link to="/shop" activeClassName="current" className="fs-5 px-4 link">Veikals</Link>
                                <Link to="/about" activeClassName="current" className="fs-5 px-4 link">Par Mums</Link>
                                <Link to="/blog" activeClassName="current" className="fs-5 px-4 link">Jaunumi</Link>
                                {/* <Nav.Link href="/" className={`fs-5 px-4 link ${location.pathname === '/' ? 'active' : ''}`}>Sākums</Nav.Link>
                                <Nav.Link href="/shop" className="fs-5 px-4 link">Veikals</Nav.Link>
                                <Nav.Link href="/about" className="fs-5 px-4 link">Par Mums</Nav.Link>
                                <Nav.Link href="/blog" className="fs-5 px-4 link">Jaunumi</Nav.Link> */}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>

    );
}

export default Header;