import { Link } from "gatsby";
import React from "react";

const NavLinks = () => {
    return (  
    <div className="wrapper">
    <Link to="/about">About Us</Link>
    <Link to="/news">Jaunumi</Link>
    <Link to="/blog">Blog</Link>
    </div>
    );
}
 
export default NavLinks;