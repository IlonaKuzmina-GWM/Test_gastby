import { StaticImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
// import OwlCarousel from 'react-owl-carousel';
import HomeAutoCard from "./HomeAutoCard";
import ShopAutoCard from "./ShopAutoCard";

const CarCarousel = () => {
    const [carusel, setCarusel] = useState(false)

    useEffect(() => {
        setCarusel(true)
    }, [carusel]);

    const responsiveOptions = {
        0: {
            items: 1,
            stagePadding: 20,
            dots: true
        },
        768: {
            items: 1,
            stagePadding: 100
        },
        1024: {
            items: 2,
            stagePadding: 100
        },
        1200: {
            items: 3,
            stagePadding: 150
        }
    };

    return (
        <div className="car-carousel-container">
            <div className='container-fluid' >
                {/* {carusel ? <OwlCarousel
                    responsive={responsiveOptions}
                    className="owl-theme"
                    loop
                    margin={8}
                    center
                    dots={false}>

                    <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 1"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                    <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 2"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                    <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 3"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                    <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 4"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                    <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 5"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                    <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 6"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                    <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 7"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                    <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 8"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                    <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 9"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                    <ShopAutoCard imageUrl={"../images/Escultures.png"} title={"Good auto 10"} price={1500} handleClick={() => { console.log("card4") }}></ShopAutoCard>
                </OwlCarousel> : null} */}
            </div>
        </div>
    );
}

export default CarCarousel;