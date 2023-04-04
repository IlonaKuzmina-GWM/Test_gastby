export type AllWpCarCategory = {
    nodes: AllWpCarCategoryNode[];
}

type AllWpCarCategoryNode = {
    wpParent: WpParent | null;
}

type WpParent = {
    node: WpParentNode;
}

type WpParentNode = {
    name:       string;
    wpChildren: WpChildren;
    databaseId: number;
}

type WpChildren = {
    nodes: WpChildrenNode[];
}

type WpChildrenNode = {
    name:       string;
    slug:       string;
    databaseId: number;
    cars:       Cars;
}

type Cars = {
    nodes: CarsNode[];
}

type CarsNode = {
    databaseId: number;
}

