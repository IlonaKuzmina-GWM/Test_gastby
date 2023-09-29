import { IGatsbyImageData } from "gatsby-plugin-image";

export type CarCategory = {
  name: string;
  databaseId: number;
  parentDatabaseId: number;
}

type FeaturedImage = {
  node: {
    gatsbyImage: IGatsbyImageData;
    sourceUrl: string;
  };
}

export type CarGalleryImage = {
  [x: string]: any;
  gatsbyImage: IGatsbyImageData
}

export type CarInfo = {
  [key: string]: string[] | number | string | CarGalleryImage[];

  atrasanasVieta: string[];
  atrumkarba: string[];
  autoStavoklis: string[];
  carPrice: number;
  virsbuvesTips: string[];
  sedvietuSkaits: number;
  piedzina: string[];
  nobraukums: number;
  motoraTilpums: number;
  modelis: string;
  marka: string[];
  krasa: string;
  jauda: string;
  gads: string;
  dzinejs: string[];
  durvjuSkaits: string[];
  dileris: string[];
  degvielasPaterins: string;
  coIzmesuDaudzums: string;
  carGallery: CarGalleryImage[];
}

export type CarEquipment = {
  [key: string]: string[];

  aizsardziba: string[];
  aprikojums: string[];
  audioVideoAprikojums: string[];
  cits: string[];
  drosiba: string[];
  eksterjers: string[];
  fieldGroupName: string[];
  gaismas: string[];
  hiFi: string[];
  interjers: string[];
  salons: string[];
  sedekli: string[];
  spoguli: string[];
  sture: string[];
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
