import { renderLandingPage } from '../pages/landing/landing';
import { renderPodcastDetailsPage } from '../pages/podcast-details/podcast-details';
import { renderPlaylistPage } from '../pages/playlist/playlist';

export type RouteParams = Record <string, string>;

export type Route = {
    path: string;
    render: (container: HTMLElement, params: RouteParams) => void | Promise<void>;
};

export const ROUTES: Route[] = [
    { path: '/', render: renderLandingPage },
    { path: '/podcast/:id', render: renderPodcastDetailsPage },
    { path: '/playlist', render: renderPlaylistPage }
];