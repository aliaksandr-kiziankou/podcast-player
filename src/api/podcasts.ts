import { apiFetch } from './client';
import type { SearchResponse, PodcastDetailsResponse, EpisodesResponse, TrendingResponse } from './types';

export async function searchPodcasts(query: string): Promise<SearchResponse> {
    const params = new URLSearchParams({ q: query });
    return apiFetch<SearchResponse>(`/search/byterm?${params.toString()}`);
};

export async function getPodcastById(id: number): Promise<PodcastDetailsResponse> {
    return apiFetch<PodcastDetailsResponse>(`/podcasts/byfeedid?id=${id}`)
};

export async function getEpisodesByFeedId(id: number): Promise<EpisodesResponse> {
  return apiFetch<EpisodesResponse>(`/episodes/byfeedid?id=${id}`);
};

export async function getTrendingPodcasts(): Promise<TrendingResponse> {
  return apiFetch<TrendingResponse>('/podcasts/trending');
};