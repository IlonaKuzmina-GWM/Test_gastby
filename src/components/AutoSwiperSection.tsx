import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { FC } from "react";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import useAllWpCarData from "../queries/useAllWpCarData";
import { Car } from "../types/allWpCarTypes";
import ShopAutoCard from "./ShopAutoCard";
import ArrowRight from "../images/arrow-right.png";

type AutoSwiperSectionProps = {
    onClickHandler?: () => void;
}

const AutoSwiperSection: FC<AutoSwiperSectionProps> = ({ onClickHandler }) => {
    const newestAutoData = useAllWpCarData();

    return (
        <section className="auto-swiper-section">
            <div className="container-lg latest-auto-title">
                <h2>Nezini ko izvēlēties?</h2>
                <p>Apskati visus pieejamos auto vai izmanto filtru un atlasi tikai sev interesējošos auto.</p>
                <div className="arrow-wrapper">
                    <Link to="/shop">
                        <p>Skatīt visus auto</p>
                        <StaticImage className="arrow" src={"../images/bi_arrow-right-short.svg"} alt={"Arrow"} width={50} />
                    </Link>
                </div>
            </div>

            <div className="auto-card-container">
                <div className="swiper-container">
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={1}
                        className='pb-5'
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        breakpoints={{
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                        }}
                    >

                        <button className="swiper-button-prev custom">
                            <img src={ArrowRight} width={"28px"} height={"23px"} alt="arrow" /></button>
                        <div className="overlay left" />

                        {newestAutoData
                            .sort((a: Car, b: Car) => new Date(a.date).getDate() - new Date(b.date).getDate())
                            .slice(0, 8)
                            .map((car: Car, index: number) =>
                                <SwiperSlide
                                    className={''}
                                    key={index}>
                                    <ShopAutoCard
                                        title={car.title}
                                        gatsbyImageData={car.featuredImage.node.gatsbyImage}
                                        carInfo={car.carInfo}
                                        slug={car.slug}
                                    />
                                </SwiperSlide>
                            )}

                        <button className="swiper-button-next custom">
                            <img src={ArrowRight} width={"28px"} height={"23px"} alt="arrow" /></button>
                        <div className="overlay right" />
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default AutoSwiperSection;