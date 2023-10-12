import React, { FC } from "react";

type ButtonProps = {
    name: string;
    size: string;
    type: string;
    onClickHandler?: () => void;
    children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ name, size, type, onClickHandler, children }) => {
    return (
        <button className={`main-btn ${size} ${type}`} type="submit" onClick={onClickHandler}>
            {children}
            {name}
        </button>);
}

export default Button;