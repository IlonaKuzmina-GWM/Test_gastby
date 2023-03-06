import { Link } from "gatsby";
// import { StaticImage } from "gatsby-plugin-image";
import React from "react";

const Header = () => {
    return (
        <div className="container">
            <Link to="/">
                {/* <StaticImage className="header_logo" src="../images/Pirktauto_logo_horizontal_black.png" alt="logo" /> */}
            </Link>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
        </div>
    );
}

export default Header;