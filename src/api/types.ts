export type Podcast = {
    id: string;
    title: string;
    publisher: string;
    image: string;
    description: string;
};

export type BestPodcastsResponse = {
    podcasts: Podcast[];
    page_number: number;
    next_page_number: number | null;
    has_next_page: boolean;
};

export type ApiEpisode = {
    id: string;
    title: string;
    audio: string;
    audio_length_sec: number;
    pub_date_ms: number;
    description: string;
};

export type PodcastDetails = {
    id: string;
    title: string;
    publisher: string;
    image: string;
    description: string;
    episodes: ApiEpisode[];
};