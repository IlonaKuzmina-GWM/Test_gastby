import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

type TooltipBootProps = {
    text: string;
}

const TooltipBoot: FC<TooltipBootProps> = ({ text }) => {

    const popover = (
        <Popover id="popover-basic" className='popover border border-wight text-center text-white fs-4 fs-semibold'>
            <Popover.Body className='text-white'>
                {text}
            </Popover.Body>
        </Popover>
    );

    return (
        <div className='tooltip-wrapper d-none d-sm-block position-absolute'>
            <OverlayTrigger
                placement={"top"}
                overlay={
                    popover}
                trigger={['hover', 'focus']}>
                <Button variant="light"><div className='white-dot bg-white mx-auto my-1 rounded-circle'></div></Button>
            </OverlayTrigger>
        </div>);
}

export default TooltipBoot;