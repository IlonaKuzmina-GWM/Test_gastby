import { useLocation } from '@reach/router';
import { graphql, HeadFC, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { useState } from 'react';
import "swiper/css/pagination";
import MainLayout from "../layouts/MainLayout";
import { Car, CarEquipment, CarInfo, MyQueryResult } from "../types/allWpCarTypes";

import AutoSwiperSection from '../components/AutoSwiperSection';
import HeroSection from '../components/HeroSection';
import IntroIconSection from '../components/IntroIconSection';
import SiteVisiteSection from '../components/SiteVisiteSection';
import YourNextAutoSection from '../components/YourNextAutoSection';

type SearchFunction = (
  query: string,
  cars: Car[]
) => Car[];

const searchCars: SearchFunction = (query, cars) => {
  const normalizedQuery = query.toLowerCase().trim();

  return cars.filter((car: Car) => {
    const carInfo = car.carInfo;
    const carEquipment = car.carEquipment;
    const price = String(carInfo.carPrice);

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
        return String(propertyValue).toLowerCase().includes(normalizedQuery);
      }
    })) {
      return true;
    }

    if (searchableEquipmentProperties.some((property) => {
      const propertyValue = carEquipment[property as keyof CarEquipment];
      if (Array.isArray(propertyValue)) {
        return propertyValue.some(value => value.toLowerCase().includes(normalizedQuery));
      } else {
        return String(propertyValue).toLowerCase().includes(normalizedQuery);
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

  const handleNavigateToShopFilteredCar = (type: string) => {
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

      <IntroIconSection />

      <AutoSwiperSection />

      <YourNextAutoSection onClickHandler={handleNavigateToShopFilteredCar} />

      <SiteVisiteSection />
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