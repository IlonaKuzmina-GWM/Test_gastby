import React, { FC, useEffect, useMemo } from 'react';
import { CarEquipment } from '../types/allWpCarTypes';
import { Accordion } from 'react-bootstrap';
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

    const filteredKeys = useMemo(() => Object.keys(carEquipment).filter((header) => carEquipment[header].length > 0), [carEquipment]);

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <div className="popup-content">
                <div className='popup-image_wrapper' onClick={() => onCloseHandler(false)}>
                    <StaticImage
                        className='popup-close-button'
                        src={"../images/cancel.svg"}
                        alt={"Cancel"}
                        width={50}
                        height={50}
                    />
                </div>

                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    {filteredKeys.map((header, index) => (
                        <Accordion.Item eventKey={index.toString()} key={index}>
                            <Accordion.Header>{header.toUpperCase()}</Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    {carEquipment[header].map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                    ))}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </div>
    )
};

export default CarSpecificationPopUp;
