import { getBestPodcasts } from '../../api/podcasts';
import type { Podcast } from '../../api/types';
import { navigate } from '../../router/router';

export async function renderLandingPage(container: HTMLElement): Promise<void> {
    container.innerHTML = '<div class="load">Loading...</div>';

    try {
        const data = await getBestPodcasts();
        renderPodcastList(container, data.podcasts);
    } catch (error) {
        container.innerHTML = '<p class="error">Failed to load</p>';
        console.error(error);
    };
};

function renderPodcastList(container: HTMLElement, podcasts: Podcast[]): void {
    container.innerHTML = '';

    const list = document.createElement('div');
    list.className = 'podcast-list';

    podcasts.forEach((podcast) => {
        const card = createPodcastCard(podcast);
        list.appendChild(card);
    });

    container.appendChild(list);
};

function createPodcastCard(podcast: Podcast): HTMLElement {
    const card = document.createElement('div');
    card.className = 'podcast-card';
    card.innerHTML = `
        <img src="${podcast.image}" alt="${podcast.title}" class="podcast-card__image">
        <h3 class="podcast-card__title">${podcast.title}</h3>
        <p class="podcast-card__publisher">${podcast.publisher}</p>
    `;

    card.addEventListener('click', () => {
        navigate(`/podcast/${podcast.id}`);
    });

    return card;
};