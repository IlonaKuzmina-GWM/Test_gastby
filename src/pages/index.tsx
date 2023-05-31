import * as React from "react";
import { graphql, HeadFC, Link, navigate } from "gatsby";
import { useLocation } from '@reach/router';
import MainLayout from "../layouts/MainLayout";
import Button from "../components/Button";
import { StaticImage } from "gatsby-plugin-image";
import HomeAutoCard from "../components/HomeAutoCard";
import TooltipBoot from "../components/Tooltip";
import CarCarousel from "../components/CarCarousel";
import { Col, Row } from "react-bootstrap";
import ShopAutoCard from "../components/ShopAutoCard";

type Car = {
  id: string;
  title: string;
  slug: string;
  featuredImage: {
    node: {
      gatsbyImage: string;
    };
  };
  carInfo: {
    carPrice: number;
  };
  carCategories: {
    nodes: {
      name: string;
      databaseId: number;
    }[];
  };
};

type HomeProps = {
  data: {
    allWpCar: {
      nodes: Car[];
    };
  };
};

export type SearchResult = Car[];

// Define the type for the search function
type SearchFunction = (
  query: string,
  cars: Car[]
) => SearchResult;

const searchCars: SearchFunction = (query, cars) => {
  const normalizedQuery = query.toLowerCase().trim();

  return cars.filter((car) => {
    // Search by car title
    if (car.title.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Search by car price
    if (car.carInfo.carPrice.toString().includes(normalizedQuery)) {
      return true;
    }

    // Search by car category name
    if (
      car.carCategories.nodes.some(
        (category) => category.name.toLowerCase().includes(normalizedQuery)
      )
    ) {
      return true;
    }

    return false;
  });
};


const IndexPage: React.FC<HomeProps> = ({ data }) => {
  type LocationState = {
    searchResults?: SearchResult;
  };
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<SearchResult>([]);

  const location = useLocation();
  const results = location.state?.searchResults || [];

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const results = searchCars(searchQuery, data.allWpCar.nodes);
    setSearchResults(results);
    // console.log("results", results)
    navigate('/shop', {
      state: { searchResults: results },
    } ); // Redirect to the shop page and pass searchResults as state
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
          <h5 className="review-name">Andris Bērziņš</h5>
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
          <CarCarousel></CarCarousel>
        </div>
      </section>

      <section className="one-more-section container-lg">
        <h2 className="section-title">Interior Plant Reference</h2>
        <p className="section-text">make your home so comfortable with refreshing plants</p>

        <div className="row justify-content-between px-3 mt-5 first-items-container">
          <div className="d-flex item col-md-7 mb-5">
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/1.jpg"}
              alt={"image"}
              className={"item-image"}
            />
            <Link to="/shop" className=""></Link>
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
          <div className="d-flex item col-md-7 mb-5">
            <StaticImage
              style={{ position: "absolute" }}
              src={"../images/4.jpg"}
              alt={"image"}
              className={"item-image"}
            />
            <Link to="/shop"></Link>
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
}`