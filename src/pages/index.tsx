import { useLocation } from '@reach/router';
import { graphql, HeadFC, Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { useState } from 'react';
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../components/Button";
import TooltipBoot from "../components/Tooltip";
import MainLayout from "../layouts/MainLayout";
import { Car, CarInfo, MyQueryResult, Replacements } from "../types/allWpCarTypes";

import HomeAutoCard from '../components/HomeAutoCard';
import HeroSection from '../components/HeroSection';

type SearchFunction = (
  query: string,
  cars: Car[]
) => Car[];

const searchCars: SearchFunction = (query, cars) => {
  // Normalize the query and store it in a variable
  const normalizedQuery = query.toLowerCase().trim();

  // Filter the cars array based on the search query
  return cars.filter((car: Car) => {
    const carInfo: CarInfo = car.carInfo;
    const carEquipment = car.carEquipment;
    const price = carInfo.carPrice.toString();

    // Search in the car title
    if (car.title.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Search in the car price
    if (price.includes(normalizedQuery)) {
      return true;
    }

    // type CarInfoProperty = keyof Replacements;



    // Search in specific properties using Array.some
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
      'versija',
      'dileris',
    ];


    type CarEquipmentType = {
      drosiba: string[] | string,
      elektronika: string[] | string,
      hiFi: string[] | string,
      papildaprikojums: string[] | string,
    };

    const searchableEquipmentProperties = [
      'drosiba',
      'elektronika',
      'hiFi',
      'papildaprikojums',
    ];



    if (searchableCarInfoProperties.some((property) => {
      const propertyValue = carInfo[property as keyof Replacements];
      if (Array.isArray(propertyValue)) {
        return propertyValue.some(value => value.toLowerCase().includes(normalizedQuery));
      } else {
        return propertyValue.toString().toLowerCase().includes(normalizedQuery);
      }
    })) {
      return true;
    }

    if (searchableEquipmentProperties.some((property) => {
      const propertyValue = carEquipment[property as keyof CarEquipmentType];
      if (Array.isArray(propertyValue)) {
        return propertyValue.some(value => value.toLowerCase().includes(normalizedQuery));
      } else {
        return propertyValue.toLowerCase().includes(normalizedQuery);
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

  const handleNavigateToShopFilteredCarNewOrUsed = (type: number) => {
    const results = searchCars(type.toString(), data.allWpCar.nodes);
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
              <h3>Laiks ir nauda</h3>
              <p>Laika nav.. naudas arī nav..</p>
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
              <h3>Izvēlies izdevīgāko</h3>
              <p>Atrodi sev izdevīgāko auto</p>
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
              <h3>Vēl kaut kas</h3>
              <p>Lorem Ipsums</p>
            </div>
          </div>
        </div>
      </section>

      <section className="latest-auto-section">
        <div className="container-lg latest-auto-title">
          <h2>Jaunākie auto
            piedāvājumi</h2>
          <div className="arrow-wrapper">
            <Link to="/shop"><p>Skatīt visus auto</p></Link>
            <StaticImage className="arrow" src={"../images/arrow-right.png"} alt={"Arrow"} width={25}></StaticImage>
          </div>
        </div>

        <div className="auto-card-container">
          <Swiper
            spaceBetween={30}
            slidesPerView={"auto"}
            className='pb-5'
          >
            {data.allWpCar.nodes.slice(0, 8).map((car: Car) => {
              const carInfo = car.carInfo;

              const filteredLabels = Object.keys(carInfo)
                .filter((key) => {
                  return (
                    key === 'atrasanasVieta' ||
                    key === 'autoStavoklis' ||
                    key === 'gads'
                  );
                })
                .reduce((acc:any, key:any) => {
                  acc[key] = carInfo[key];
                  return acc;
                }, {});

              return (
                <SwiperSlide key={car.id}>
                  <HomeAutoCard
                    gatsbyImageData={car.featuredImage.node.gatsbyImage}
                    title={car.title}
                    price={carInfo.carPrice}
                    slug={car.slug}
                    labels={filteredLabels}
                    imagesLink={car.featuredImage.node.sourceUrl}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

        </div>


      </section>

      <section className="one-more-section container-lg">
        <h2 className="section-title">Interior Plant Reference</h2>
        <p className="section-text">make your home so comfortable with refreshing plants</p>

        <div className="row justify-content-between px-3 mt-5 first-items-container">
          <div className="d-flex item col-md-7 mb-5 item-link" onClick={() => handleNavigateToShopFilteredCarNewOrUsed(205)}>
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
          <div className="d-flex item col-md-7 mb-5 item-link" onClick={() => handleNavigateToShopFilteredCarNewOrUsed(208)}>
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
      # carCategories {
      #   nodes {
      #     name
      #     databaseId
      #     parentDatabaseId
      #   }
      # }
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
        carPrice
        atrasanasVieta
        atrumkarba
        autoStavoklis
        virsbuvesTips
        piedzina
        marka
        krasa
        gads
        dzinejs
        durvjuSkaits
        versija
        dileris
      }
      carEquipment {
        drosiba
        elektronika
        hiFi
        papildaprikojums
      }
    }
  }
}`