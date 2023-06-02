import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Carousel, Col } from "react-bootstrap";
import { Car } from "../types/allWpCarTypes";
import ShopAutoCard from "./ShopAutoCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

const CarCarousel = () => {
    const carouselCardsData = useStaticQuery(graphql`
    {
      allWpCar {
        nodes {
          slug
          title
          id
          featuredImage {
            node {
              gatsbyImage(
                cropFocus: CENTER
                fit: COVER
                formats: WEBP
                placeholder: BLURRED
                width: 300
                height: 200
              )
            }
          }
          carInfo {
            carPrice
          }
        }
      }
    }
  `);


    return (
        // <div className="car-carousel-container">
        //     <Carousel>
        //         {carouselCardsData.allWpCar.nodes.map((car: Car) => (
        //             <Carousel.Item key={car.id}>
        //                 <Col>
        //                     <ShopAutoCard
        //                         slug={car.slug}
        //                         gatsbyImageData={car.featuredImage.node.gatsbyImage}
        //                         title={car.title}
        //                         price={car.carInfo.carPrice}
        //                     />
        //                 </Col>
        //             </Carousel.Item>
        //         ))}
        //     </Carousel>
        // </div>
        //     <>
        //     <Swiper
        //       slidesPerView={1}
        //       spaceBetween={10}
        //       pagination={{
        //         clickable: true,
        //       }}
        //       breakpoints={{
        //         "@0.00": {
        //           slidesPerView: 1,
        //           spaceBetween: 10,
        //         },
        //         "@0.75": {
        //           slidesPerView: 2,
        //           spaceBetween: 20,
        //         },
        //         "@1.00": {
        //           slidesPerView: 3,
        //           spaceBetween: 40,
        //         },
        //         "@1.50": {
        //           slidesPerView: 4,
        //           spaceBetween: 50,
        //         },
        //       }}
        //       modules={[Pagination]}
        //       className="mySwiper"
        //     >
        //       <SwiperSlide>Slide 1</SwiperSlide>
        //       <SwiperSlide>Slide 2</SwiperSlide>
        //       <SwiperSlide>Slide 3</SwiperSlide>
        //       <SwiperSlide>Slide 4</SwiperSlide>
        //       <SwiperSlide>Slide 5</SwiperSlide>
        //       <SwiperSlide>Slide 6</SwiperSlide>
        //       <SwiperSlide>Slide 7</SwiperSlide>
        //       <SwiperSlide>Slide 8</SwiperSlide>
        //       <SwiperSlide>Slide 9</SwiperSlide>
        //     </Swiper>
        //   </>

        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {carouselCardsData.allWpCar.nodes.map((car: Car) => (
                <SwiperSlide key={car.id}>
                    <Col>
                        <ShopAutoCard
                            slug={car.slug}
                            gatsbyImageData={car.featuredImage.node.gatsbyImage}
                            title={car.title}
                            price={car.carInfo.carPrice}
                        />
                    </Col>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default CarCarousel;