import { renderLandingPage } from '../pages/landing/landing';
import { renderPodcastDetailsPage } from '../pages/podcast-details/podcast-details';

export type RouteParams = Record <string, string>;

export type Route = {
    path: string;
    render: (container: HTMLElement, params: RouteParams) => void | Promise<void>;
};



function renderPlaylistPage(container: HTMLElement) {
    container.innerHTML = '<h1>Playlist Page</h1>';
};

export const ROUTES: Route[] = [
    {path: '/', render: renderLandingPage},
    {path: '/podcast/:id', render: renderPodcastDetailsPage},
    {path: '/playlist', render: renderPlaylistPage}
];