import { StaticImage } from "gatsby-plugin-image";
import React from "react";

const Header = () => {
    return (
        <div>
            <StaticImage className="header_logo" src="../images/Pirktauto_logo_horizontal_black.png" alt="logo" />
        </div>
    );
}

export default Header;