import React, { useState, FC, useEffect } from 'react';
import { CarEquipment } from '../types/allWpCarTypes';
import { Accordion, Card } from 'react-bootstrap';
import { StaticImage } from 'gatsby-plugin-image';


type carSpecificationPopUpProps = {
    carEquipment: CarEquipment,
    onCloseHandler: (popupStatus: boolean) => void;
}

const CarSpecificationPopUp: FC<carSpecificationPopUpProps> = ({ carEquipment, onCloseHandler }) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleOverlayClick = (e: any) => {
        if (e.target.classList.contains('popup-overlay')) {
            onCloseHandler(false);
        }
    };

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <div className="popup-content">

                <div className='close-filters-btn-wrapper' onClick={() => onCloseHandler(false)}>
                    <StaticImage
                        className='popup-close-button'
                        src={"../images/cancel.svg"}
                        alt={"Cancel"}
                        width={30}
                        height={30}
                    />
                </div>

                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    {Object.entries(carEquipment).map(([header, items], index) => (
                        <Accordion.Item eventKey={index.toString()}>
                            <Accordion.Header>{header.toUpperCase()}</Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    {items.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                    ))}
                                </ul>
                            </Accordion.Body></Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </div>
    )
};

export default CarSpecificationPopUp;
