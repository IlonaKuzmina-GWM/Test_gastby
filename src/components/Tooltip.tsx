import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const TooltipBoot = () => {

    const popover = (
        <Popover id="popover-basic" className='popover'>
            <Popover.Body className='text-white'>
                Labākie piedāvājumi vienuviet
            </Popover.Body>
        </Popover>
    );

    return (
        <div className='tooltip-wrapper'>
            <OverlayTrigger
                placement={"top"}
                overlay={
                    popover}
                trigger={"hover"}>
                <Button variant="light"><div className='white-dot'></div></Button>
            </OverlayTrigger>
        </div>);
}

export default TooltipBoot;