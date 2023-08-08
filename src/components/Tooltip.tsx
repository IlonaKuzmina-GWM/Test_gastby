import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

type TooltipBootProps = {
    text: string;
}

const TooltipBoot: FC<TooltipBootProps> = ({ text }) => {

    const popover = (
        <Popover id="popover-basic" className='popover'>
            <Popover.Body className='text-white'>
                {text}
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