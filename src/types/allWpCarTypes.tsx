export type FetchingData = {
    allWpCar: {
        nodes: AllWpCarNode[];
    };
}

export type AllWpCarNode = {
    carCategories: CarCategories;
    slug: string;
    title: string;
    featuredImage: FeaturedImage;
    carInfo: CarInfo;
}

type CarCategories = {
    nodes: CarCategoriesNode[];
}

type CarCategoriesNode = {
    name: string;
    // databaseId: number | null;
    databaseId?: any;
    parentDatabaseId: number | null;
}

type CarInfo = {
    carPrice: number;
    carGallery: CarGalleryElement[];
    fieldGroupName: string;
}

type CarGalleryElement = {
    gatsbyImage: GatsbyImage;
}

type GatsbyImage = {
    images: Images;
    width: number;
    height: number;
    placeholder: Placeholder;
}

type Images = {
    sources: any[];
    fallback: Fallback;
}

type Fallback = {
    src: string;
    srcSet: string;
}
type Placeholder = {
    fallback: string;
}

type FeaturedImage = {
    node: CarGalleryElement;
}