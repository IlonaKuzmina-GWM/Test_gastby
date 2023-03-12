import React from "react";
import { Nav } from "react-bootstrap";

const NavLinks = () => {
    return (
        <div className="wrapper">
            <Nav.Link href="/" className="fs-5 px-4">Home</Nav.Link>
            <Nav.Link href="/shop" className="fs-5 px-4">Shop</Nav.Link>
            <Nav.Link href="/about" className="fs-5 px-4">About Us</Nav.Link>
            <Nav.Link href="/contact" className="fs-5 px-4">Contact</Nav.Link>
        </div>
    );
}

export default NavLinks;