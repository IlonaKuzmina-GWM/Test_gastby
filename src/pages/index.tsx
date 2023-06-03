import { useLocation } from '@reach/router';
import { graphql, HeadFC, Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import Button from "../components/Button";
import TooltipBoot from "../components/Tooltip";
import MainLayout from "../layouts/MainLayout";
import { Car, MyQueryResult } from "../types/allWpCarTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
// import "swiper/css";
// import "swiper/css/pagination";

import HomeAutoCard from '../components/HomeAutoCard';


// export type SearchResult = Car[];

type SearchFunction = (
  query: string,
  cars: Car[]
) => Car[];

const searchCars: SearchFunction = (query, cars) => {
  const normalizedQuery = query.toLowerCase().trim();

  return cars.filter((car) => {

    if (car.title.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    if (car.carInfo.carPrice.toString().includes(normalizedQuery)) {
      return true;
    }

    if (
      car.carCategories.nodes.some(
        (category) => {
          const categoryName = category.name.toLowerCase();

          return categoryName.includes(normalizedQuery) && categoryName !== "jauns/mazlietots";
        }
      )
    ) {
      return true;
    }

    if (
      car.carCategories.nodes.some(
        (category) => category.databaseId.toString().includes(normalizedQuery)
      )
    ) {
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
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Car[]>([]);

  const location = useLocation();
  // const results = location.state?.searchResults || [];

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
      <section className="hero-section">
        <StaticImage
          style={{ position: "absolute" }}
          src={"../images/hero_image.png"}
          alt={"Hero image"}
          className={"hero-background-image"}
        />
        <div className="hero-content">
          <h1 className="hero-title">Tavs ’vietējais’ jaunu auto
            piedāvājuma portāls</h1>
          <p>atrodi sev piemērotu auto ātri, vienkārši un
            vēl papildus bla bla bla :D </p>
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

          <TooltipBoot text="Labākie piedāvājumi vienuviet" />
        </div>

        <div className="review-pop-up">
          <StaticImage
            style={{ position: "absolute" }}
            src={"../images/review-img.png"}
            alt={"Avatar"}
            className={"review-avatar"}
          />
          <h3 className="review-name">Andris Bērziņš</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum.</p>
        </div>

        <div className="car-counter d-flex align-items-center justify-content-center">
          <h3>  {data.allWpCar.nodes.length} </h3>
          <p>auto tavai <br /> izvēlei</p>
        </div>

        <div className="white-gradient"></div>
      </section>

      <section className="item-section ">
        <div className="container-lg wrapper">
          <div className="item">
            <StaticImage className="item-image" src={"../images/laiks.png"} alt={"Icon"} objectFit="contain"></StaticImage>
            <div className="item-content">
              <h5>Laiks ir nauda</h5>
              <p>Laika nav.. naudas arī nav..</p>
            </div>
          </div>
          <div className="item">
            <StaticImage className="item-image" src={"../images/izdevigi.png"} alt={"Icon"} objectFit="contain"></StaticImage>
            <div className="item-content">
              <h5>Izvēlies izdevīgāko</h5>
              <p>Atrodi sev izdevīgāko auto</p>
            </div>
          </div>
          <div className="item">
            <StaticImage className="item-image" src={"../images/ask-me.png"} alt={"Icon"} objectFit="contain"></StaticImage>
            <div className="item-content">
              <h5>Vēl kaut kas</h5>
              <p>Lorem Ipsums</p>
            </div>
          </div>
        </div>
      </section>

      <section className="latest-auto-section">
        <div className="container-lg">
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
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}

            modules={[Pagination]}
          >
            {data.allWpCar.nodes.slice(0,8).map((car: Car) => (
              <SwiperSlide key={car.id}>
                <HomeAutoCard
                  gatsbyImageData={car.featuredImage?.node?.gatsbyImage ?? null}
                  title={car.title}
                  price={car.carInfo.carPrice}
                  slug={car.slug}
                ></HomeAutoCard>
              </SwiperSlide>
            ))}
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
            />

            <p>Jauni auto</p>
          </div>
          <div className="d-flex item col-md-4 mb-5">
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/2.webp"}
              alt={"image"}
              className={"item-image"}
            /></div>
        </div>
        <div className="row justify-content-between px-3 second-items-container">
          <div className="d-flex item col-md-4 mb-5">
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/3.jpg"}
              alt={"image"}
              className={"item-image"}
            /></div>
          <div className="d-flex item col-md-7 mb-5 item-link" onClick={() => handleNavigateToShopFilteredCarNewOrUsed(208)}>
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/4.jpg"}
              alt={"image"}
              className={"item-image"}
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
      carCategories {
        nodes {
          name
          databaseId
        }
      }
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
            width: 800
            height: 500
          )
        }
      }
      carInfo {
        carPrice
      }
    }
  }
}`