import { IGatsbyImageData } from "gatsby-plugin-image";

type FeaturedImage = {
    node: {
        gatsbyImage: IGatsbyImageData;
        sourceUrl: string;
    };
}

type PrevNext = {
    slug: string;
    name: string;
}

export type WpPost = {
    featuredImage: FeaturedImage;
    content: string;
    slug: string;
    title: string;
    tags: {
        nodes: [
            { name: string; }
        ]
    };
    date: string;
    author: {
        node: {
            name: string;
        }
    };
    excerpt: string;
    next: PrevNext;
    previous: PrevNext;
}

export type AllWpPosts = {
    allWpPost: {
        nodes: WpPost[];
        totalCount: number;
    }
}