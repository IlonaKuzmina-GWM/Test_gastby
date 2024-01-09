import React, { FC, useEffect, useMemo, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { StaticImage } from 'gatsby-plugin-image';
import { CarEquipment } from '../types/allWpCarTypes';


type carSpecificationPopUpProps = {
    carEquipment: any,
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
        <div className="popup-overlay position-fixed d-flex align-items-center justify-content-center" onClick={handleOverlayClick}>
            <div className="popup-content bg-white py-5 px-3 rounded-4 position-relative overflow-y-auto">
                <div className='popup-image_wrapper position-absolute' onClick={() => onCloseHandler(false)}>
                    <StaticImage className='popup-close-button d-block float-end pointer' src={"../images/cancel.svg"} alt={"Cancel"} width={20} height={20} />
                </div>

                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    {filteredKeys.map((header, index) => (
                        <Accordion.Item eventKey={index.toString()} key={index} className='border-0 border-bottom'>
                            <Accordion.Header className=''>{header.toUpperCase()}</Accordion.Header>
                            <Accordion.Body className='py-3 px-2'>
                                <ul className='mb-0'>
                                    {carEquipment[header].map((item: string, itemIndex: number) => (
                                        <li className='fs-6' key={itemIndex}>{item}</li>
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
