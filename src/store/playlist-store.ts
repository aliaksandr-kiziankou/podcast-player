import { setItem, getItem } from '../utils/local-storage';

export type PlaylistEpisode = {
    id: string;
    title: string;
    URL: string;
};

const STORAGE_KEY = 'playlist';

let playlist: PlaylistEpisode[] = getItem<PlaylistEpisode[]>(STORAGE_KEY) ?? [];

type Listener = () => void;
const LISTENERS: Listener[] = [];

function notifyChanges(): void {
    LISTENERS.forEach((listener) => listener());
};

export function subscribe(listener: Listener): void {
    LISTENERS.push(listener);
};

export function addToPlaylist(episode: PlaylistEpisode): void {
    const alreadyAdded = playlist.some((item) => item.id === episode.id);
    if (alreadyAdded) return;

    playlist = [...playlist, episode];
    setItem(STORAGE_KEY, playlist);
    notifyChanges();
};

export function removeFromPlaylist(episodeId: string): void {
    playlist = playlist.filter((item) => item.id !== episodeId);

    setItem(STORAGE_KEY, playlist);
    notifyChanges();
};

export function getPlaylist(): PlaylistEpisode[] {
    return playlist;
};

export function alreadyInPlaylist(episodeId: string): boolean {
    return playlist.some((item) => item.id === episodeId);
};