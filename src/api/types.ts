export type Podcast = {
    id: number;
    title: string;
    description: string;
    author: string;
    image: string;
};

export type SearchResponse = {
    status: string;
    feeds: Podcast[];
    count: number;
};

export type PodcastDetailsResponse = {
    status: string;
    feed: Podcast;
};

export type Episode = {
    id: number;
    title: string;
    description: string;
    enclosureUrl: string;
    duration: number;
    datePublished: number;
};

export type EpisodesResponse = {
    status: string;
    items: Episode[];
    count: number;
};

export type TrendingResponse = {
  status: string;
  feeds: Podcast[];
  count: number;
};