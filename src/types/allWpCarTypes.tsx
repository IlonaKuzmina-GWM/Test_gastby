import { IGatsbyImageData } from "gatsby-plugin-image";

export type CarCategory = {
  name: string;
  databaseId: number;
  parentDatabaseId: number;
}

type FeaturedImage = {
  node: {
    gatsbyImage: IGatsbyImageData;
    sourceUrl:string;
  };
}

export type CarGalleryImage = {
  gatsbyImage: IGatsbyImageData
}

type CarInfo = {
  carPrice: number;
  carGallery: CarGalleryImage[];
}

export type CarEquipment = {
  drosiba: string[];
  elektronika: string[];
  hiFi: string[];
  papildaprikojums: string[];
}

export type Car = {
  content: string;
  carCategories: {
    nodes: CarCategory[];
  };
  slug: string;
  title: string;
  featuredImage: FeaturedImage;
  carInfo: CarInfo;
  id: string;
  carEquipment: CarEquipment;
}

export type AllWpCar = {
  nodes: Car[];
}

export type MyQueryResult = {
  allWpCar: AllWpCar;
}
