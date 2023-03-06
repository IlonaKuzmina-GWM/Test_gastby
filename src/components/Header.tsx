import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

const Header = () => {
    return (
        <div className="header">
            <div className="container header">
                <Link to="/">
                    <StaticImage className="header_logo" src="../images/Pirktauto_logo_horizontal_invert.png" alt="logo" />
                </Link>
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
            </div>
        </div>

    );
}

export default Header;