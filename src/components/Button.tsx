import React, { FC } from "react";

type ButtonProps = {
    name: string;
    size: string;
    type: string;
}

const Button: FC<ButtonProps> = ({name, size, type}) => {
    return ( 
    <button className={`main-btn ${size} ${type}`} type="submit">
        {name}
    </button>);
}
 
export default Button;