type CarIdNumbers = {
  databaseId: number;
}

export type CarCategory = {
  name: string;
  slug: string;
  databaseId: number;
  cars: {
    nodes: CarIdNumbers[];
  };
}

export type WpParent = {
  node: {
    name: string;
    wpChildren: {
      nodes: CarCategory[];
    };
    databaseId: number;
  };
}

export type AllWpCarCategoryResult = {
  data: {
    allWpCarCategory: {
      nodes: {
        wpParent: WpParent;
      }[];
    };
  };
}

