import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

const Header = () => {
    return (
        <div>
            <Link to="/">
                <StaticImage className="header_logo" src="../images/Pirktauto_logo_horizontal_black.png" alt="logo" />
            </Link>
        </div>
    );
}

export default Header;