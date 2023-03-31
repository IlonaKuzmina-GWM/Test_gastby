import React, { FC } from "react";

type ButtonProps = {
    name: string;
    size: string;
    type: string;
    onClickHandler?: () => void;
}

const Button: FC<ButtonProps> = ({ name, size, type, onClickHandler }) => {
    return (
        <button className={`main-btn ${size} ${type}`} type="submit" onClick={onClickHandler}>
            {name}
        </button>);
}

export default Button;