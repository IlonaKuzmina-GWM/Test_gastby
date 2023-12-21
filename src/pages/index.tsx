import { useLocation } from '@reach/router';

import { graphql, HeadFC, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { useState } from 'react';
import "swiper/css/pagination";
import MainLayout from "../layouts/MainLayout";
import { Car, CarEquipment, CarInfo, MyQueryResult, PDFFile } from "../types/allWpCarTypes";

import AutoSwiperSection from '../components/AutoSwiperSection';
import HeroSection from '../components/HeroSection';
import IntroIconSection from '../components/IntroIconSection';
import SiteVisiteSection from '../components/SiteVisiteSection';
import YourNextAutoSection from '../components/YourNextAutoSection';
import SEO from '../components/SEO';

type SearchFunction = (
  query: string,
  cars: Car[]
) => Car[];

const searchCars: SearchFunction = (query, cars) => {
  // const normalizedQuery = query.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/\s+/);
  const normalizedQuery = query.toLowerCase().trim().split(/\s+/);
  const querySet = new Set(normalizedQuery);

  const stopWords = new Set(["un", "bet", "nav", "km"]);

  const shouldInclude = (value: any) => {
    value = String(value).toLowerCase();
    return normalizedQuery.some(term => value.includes(term));
  };

  const shouldIncludeArray = (values: any[]) => {
    return values.some(value => querySet.has(value.toLowerCase()));
  };

  return cars.filter((car: Car) => {
    const carInfo = car.carInfo;
    const carEquipment = car.carEquipment;

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

    if (shouldInclude(car.title) || shouldInclude(car.carInfo.carPrice)) {
      return true;
    }

    if (searchableCarInfoProperties.some((property) => {
      const propertyValue = carInfo[property as keyof CarInfo];
      return Array.isArray(propertyValue) ? shouldIncludeArray(propertyValue) : shouldInclude(propertyValue);
    })) {
      return true;
    }

    if (searchableEquipmentProperties.some((property) => {
      const propertyValue = carEquipment[property as keyof CarEquipment];
      return Array.isArray(propertyValue) ? shouldIncludeArray(propertyValue) : shouldInclude(propertyValue);
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
  const [searchQuery, setSearchQuery] = useState('');
  const [, setSearchResults] = useState<Car[]>([]);


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

    let newKey = "";
    if (type === "Elektriskais") {
      newKey = "dzinejs"
    } else (
      newKey = "autoStavoklis"
    )

    setSearchResults(results);
    navigate('/shop', {
      state: {
        searchResults: results,
        filterUsed: true,
        newValue: { [newKey]: [type] }
      },
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
            <StaticImage src={"../images/search.png"} alt={"Search"} width={23} height={23} />
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

export const Head: HeadFC = () => (<SEO />);;

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
        pdfFile {
          filename
          mediaItemUrl
        }
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
        autoLinks
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