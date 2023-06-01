
export type CarCategory = {
  name: string;
  databaseId: number;
  parentDatabaseId: number;
}

type FeaturedImage = {
  node: {
    gatsbyImage: {
      src: string;
    };
  };
}

export type CarGalleryImage = {
  gatsbyImage: {
    src: string;
  };
}

type CarInfo = {
  carPrice: number;
  carGallery: CarGalleryImage[];
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
}

export type AllWpCar = {
  nodes: Car[];
}

export type MyQueryResult = {
  allWpCar: AllWpCar;
}
