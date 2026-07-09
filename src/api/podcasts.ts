import { apiFetch } from './client';
import type { BestPodcastsResponse, PodcastDetails } from './types';

export async function getBestPodcasts(page = 1): Promise<BestPodcastsResponse> {
    return apiFetch<BestPodcastsResponse>(`best_podcasts?page=${page}`);
};

export async function getPodcastById(id: string): Promise<PodcastDetails> {
    return apiFetch<PodcastDetails>(`/podcasts/${id}`)
};