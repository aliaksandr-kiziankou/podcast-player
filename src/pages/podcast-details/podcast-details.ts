import { getPodcastById, getEpisodesByFeedId } from '../../api/podcasts';
import type { Episode as ApiEpisode } from '../../api/types';
import { navigate } from '../../router/router';
import { setEpisode } from '../../store/player-store';
import { formatDate } from '../../utils/format-date';
import { formatTime } from '../../utils/format-time';
import { addToPlaylist, removeFromPlaylist, alreadyInPlaylist } from '../../store/playlist-store';

export async function renderPodcastDetailsPage(container: HTMLElement, params: Record<string, string>): Promise<void> {
    const feedId = Number(params.id);

    container.innerHTML = '<div class="loader">Loading...</div>';

    try {
        const [podcastData, episodesData] = await Promise.all([
            getPodcastById(feedId),
            getEpisodesByFeedId(feedId),
        ]);

        renderDetails(container, podcastData.feed, episodesData.items);
    } catch (error) {
        container.innerHTML = '<p class="error">Failed to load podcast details.</p>';
        console.error(error);
    };
};

function renderDetails(container: HTMLElement, podcast: { title: string; description: string; author: string; image: string }, episodes: ApiEpisode[]): void {
    container.innerHTML = `
        <button class="back-btn">← Back</button>
        <div class="podcast-header">
            <img src="${podcast.image}" alt="${podcast.title}" class="podcast-header__image" />
            <h1>${podcast.title}</h1>
            <p>${podcast.author}</p>
        </div>
        <div class="episode-list"></div>
    `;

    const backBtn = container.querySelector<HTMLButtonElement>('.back-btn')!;
    backBtn?.addEventListener('click' , () => navigate('/'));

    const episodeList = container.querySelector<HTMLDivElement>('.episode-list')!;
    episodes.forEach((episode) => {
        const item = createEpisodeItem(episode);
        episodeList.appendChild(item);
    })
};

function createEpisodeItem(episode: ApiEpisode): HTMLElement {
    const item = document.createElement('div');
    item.className = 'episode-item';
    item.innerHTML = `
        <h3 class="episode-item__title">${episode.title}</h3>
        <p class="episode-item__meta">${formatDate(episode.datePublished)} · ${formatTime(episode.duration)} </p>
        <button class="episode-item__playlist-btn">${alreadyInPlaylist(String(episode.id)) ? '✓ In Playlist' : '+ Playlist'}</button>
    `;

    const title = item.querySelector<HTMLElement>('.episode-item__title')!;
    title.addEventListener('click', () => {
        setEpisode({
            id: String(episode.id),
            title: episode.title,
            URL: episode.enclosureUrl,
        });
    });

    const playlistBtn = item.querySelector<HTMLButtonElement>('.episode-item__playlist-btn')!;
    playlistBtn.addEventListener('click', (event) => {
        event.stopPropagation();

        const episodeId = String(episode.id);
        if (alreadyInPlaylist(episodeId)) {
            removeFromPlaylist(episodeId);
            playlistBtn.textContent = '+ Playlist';
        } else {
            addToPlaylist({
                id: episodeId,
                title: episode.title,
                URL: episode.enclosureUrl,
            });
            playlistBtn.textContent = '✓ In Playlist';
        }
    });

    return item;
};