import { useLocation } from '@reach/router';
import { graphql, HeadFC, Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { useState } from 'react';
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';
import Button from "../components/Button";
import MainLayout from "../layouts/MainLayout";
import { Car, CarEquipment, CarInfo, MyQueryResult } from "../types/allWpCarTypes";

import HeroSection from '../components/HeroSection';
import ShopAutoCard from '../components/ShopAutoCard';

type SearchFunction = (
  query: string,
  cars: Car[]
) => Car[];

const searchCars: SearchFunction = (query, cars) => {
  const normalizedQuery = query.toLowerCase().trim();

  return cars.filter((car: Car) => {
    const carInfo: CarInfo = car.carInfo;
    const carEquipment = car.carEquipment;
    const price = carInfo.carPrice.toString();

    if (car.title.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    if (price.includes(normalizedQuery)) {
      return true;
    }

    const searchableCarInfoProperties = [
      'atrasanasVieta',
      'atrumkarba',
      'autoStavoklis',
      'virsbuvesTips',
      'piedzina',
      'marka',
      'krasa',
      'gads',
      'dzinejs',
      'durvjuSkaits',
      'modelis',
      'dileris',
      'degvielasPaterins',
      'coIzmesuDaudzums',
      'jauda',
      'sedvietuSkaits',
      'nobraukums',
      'motoraTilpums',
    ];

    const searchableEquipmentProperties = [
      'drosiba',
      'hiFi',
      'aizsardziba',
      'aprikojums',
      'audioVideoAprikojums',
      'cits',
      'eksterjers',
      'gaismas',
      'interjers',
      'salons',
      'sedekli',
      'spoguli',
      'sture',
    ];


    if (searchableCarInfoProperties.some((property) => {
      const propertyValue = carInfo[property as keyof CarInfo];
      if (Array.isArray(propertyValue)) {
        return propertyValue.some(value => value.toLowerCase().includes(normalizedQuery));
      } else {
        return propertyValue.toString().toLowerCase().includes(normalizedQuery);
      }
    })) {
      return true;
    }

    if (searchableEquipmentProperties.some((property) => {
      const propertyValue = carEquipment[property as keyof CarEquipment];
      if (Array.isArray(propertyValue)) {
        return propertyValue.some(value => value.toLowerCase().includes(normalizedQuery));
      } else {
        return propertyValue.toString().toLowerCase().includes(normalizedQuery);
      }
    })) {
      return true;
    }

    return false;
  });
};

type HomeProps = {
  data: MyQueryResult;
};

const IndexPage: React.FC<HomeProps> = ({ data }) => {
  type LocationState = {
    searchResults?: Car[];
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Car[]>([]);

  const location = useLocation();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const results = searchCars(searchQuery, data.allWpCar.nodes);
    setSearchResults(results);
    navigate('/shop', {
      state: { searchResults: results },
    });
  };

  const handleNavigateToShopFilteredCarNewOrUsed = (type: string) => {
    const results = searchCars(type, data.allWpCar.nodes);
    setSearchResults(results);
    navigate('/shop', {
      state: { searchResults: results },
    });
  };

  return (
    <MainLayout>
      <HeroSection
        autoCounter={data.allWpCar.nodes.length}>
        <form className="hero-search-form" action="" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Meklēt auto"
            className="hero-search-input"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)} />
          <button type="submit">
            <StaticImage src={"../images/search.png"} alt={"Search"} />
          </button>
        </form>
      </HeroSection>

      <section className="item-section ">
        <div className="container-lg wrapper">
          <div className="item">
            <StaticImage
              className="item-image"
              src={"../images/laiks.png"}
              alt={"Icon"}
              placeholder='blurred'
              layout="fixed"
              width={54}
              height={59}
            />

            <div className="item-content">
              <h3>Jauni auto</h3>
              <p>Aktuālie auto piedāvājumi no salona</p>
            </div>
          </div>
          <div className="item">
            <StaticImage
              className="item-image"
              src={"../images/izdevigi.png"}
              alt={"Icon"}
              placeholder='blurred'
              layout="fixed"
              width={56}
              height={64}
            />

            <div className="item-content">
              <h3>Mazlietoti auto</h3>
              <p>Tikai pie dīlera pieejami auto </p>
            </div>
          </div>
          <div className="item">
            <StaticImage
              className="item-image"
              src={"../images/customer-service.svg"}
              alt={"Icon"}
              placeholder='blurred'
              layout="fixed"
              width={56}
              height={56}
            />

            <div className="item-content">
              <h3>Ietaupi laiku</h3>
              <p>Atlasi pēc sev vēlamajām ekstrām </p>
            </div>
          </div>
        </div>
      </section>

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
              <div className="overlay left" />
              {data.allWpCar.nodes.slice(0, 8).map((car: Car, index) =>
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
              <div className="overlay right" />
            </Swiper>
          </div>

        </div>


      </section>

      <section className="one-more-section container-lg">
        <h2 className="section-title">Izvēlies savu nākošo auto</h2>
        <p className="section-text">Jauns, mazlietots, elektrisks vai pilnpiedziņas?</p>
        <p className="section-text">Atrodi aktuālo piedāvājumu pie mums.</p>

        <div className="row justify-content-between px-3 mt-5 first-items-container">
          <div className="d-flex item col-md-7 mb-5 item-link" onClick={() => handleNavigateToShopFilteredCarNewOrUsed("jauns")}>
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/1.jpg"}
              alt={"image"}
              className={"item-image"}
              formats={['auto', 'webp', 'avif']}
              placeholder="blurred"
            />

            <p>Jauni auto</p>
          </div>
          <div className="d-flex item col-md-4 mb-5">
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/2.webp"}
              alt={"image"}
              className={"item-image"}
              formats={['auto', 'webp', 'avif']}
              placeholder="blurred"
            /></div>
        </div>
        <div className="row justify-content-between px-3 second-items-container">
          <div className="d-flex item col-md-4 mb-5">
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/3.jpg"}
              alt={"image"}
              className={"item-image"}
              formats={['auto', 'webp', 'avif']}
              placeholder="blurred"
            /></div>
          <div className="d-flex item col-md-7 mb-5 item-link" onClick={() => handleNavigateToShopFilteredCarNewOrUsed("mazlietots")}>
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/4.jpg"}
              alt={"image"}
              className={"item-image"}
              formats={['auto', 'webp', 'avif']}
              placeholder="blurred"
            />
            <p>Mazlietoti auto</p>
          </div>
        </div>
      </section>

      <section className="site-visite-section">
        <div className="container-lg wrapper">
          <h2>Ready for a <span className="gold-text">Site visit ?</span></h2>
          <p>Lorem ipsum dolo elit Lorem ipsum dolo</p>
          <Button name={"View Now"} size={"medium"} type={"primary"} />
        </div>
      </section>
    </MainLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;

export const query = graphql`
query AllCarsDetails {
  allWpCar {
    nodes {
      slug
      title
      id
      featuredImage {
        node {
          sourceUrl
          gatsbyImage(
            cropFocus: CENTER
            fit: COVER
            formats: WEBP
            placeholder: BLURRED
            width: 386
            height: 217
          )
        }
      }
      carInfo {
        atrumkarba
        atrasanasVieta
        autoStavoklis
        carPrice
        virsbuvesTips
        sedvietuSkaits
        piedzina
        nobraukums
        motoraTilpums
        modelis
        marka
        krasa
        jauda
        gads
        fieldGroupName
        dzinejs
        durvjuSkaits
        dileris
        degvielasPaterins
        coIzmesuDaudzums
      }
      carEquipment {
        aizsardziba
        aprikojums
        audioVideoAprikojums
        cits
        drosiba
        eksterjers
        fieldGroupName
        gaismas
        hiFi
        interjers
        salons
        sedekli
        spoguli
        sture
      }
    }
  }
}`