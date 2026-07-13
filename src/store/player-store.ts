export type Episode = {
    id: string;
    title: string;
    URL: string;
};

let currentEpisode: Episode | null = null;
let isPlaying = false;
let isLoading = false;

type Listener = () => void;
const LISTENERS: Listener[] = [];

export function updChanger(listener: Listener) : void {
    LISTENERS.push(listener);
};

function notifyChanges(): void {
    LISTENERS.forEach((listener) => listener());
};

export function setEpisode(episode: Episode): void {
    currentEpisode = episode;
    isPlaying = true;
    notifyChanges();
};

export function togglePlay(): void {
    isPlaying = !isPlaying;
    notifyChanges();
};

export function setLoading(value: boolean): void {
    isLoading = value;
    notifyChanges();
};

export function getCurrentEpisode(): Episode | null {
    return currentEpisode;
};

export function getIsPlaying(): boolean {
    return isPlaying;
};

export function getIsLoading(): boolean {
    return isLoading;
};