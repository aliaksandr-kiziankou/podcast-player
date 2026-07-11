import { getTrendingPodcasts, searchPodcasts } from '../../api/podcasts';
import type { Podcast } from '../../api/types';
import { navigate } from '../../router/router';
import { debounce } from '../../utils/debounce';

export async function renderLandingPage(container: HTMLElement): Promise<void> {
  container.innerHTML = `
    <input type="text" class="search-input" placeholder="Search podcasts..." />
    <div class="results-container"></div>
  `;

  const searchInput = container.querySelector<HTMLInputElement>('.search-input')!;
  const resultsContainer = container.querySelector<HTMLDivElement>('.results-container')!;

  await loadTrendingPodcasts(resultsContainer);

  const debouncedSearch = debounce((query: string) => {
    handleSearchInput(query, resultsContainer);
  }, 700);

  searchInput.addEventListener('input', () => {
    debouncedSearch(searchInput.value.trim());
  });
};

async function loadTrendingPodcasts(container: HTMLElement): Promise<void> {
  container.innerHTML = '<div class="loader">Loading...</div>';

  try {
    const data = await getTrendingPodcasts();
    renderPodcastList(container, data.feeds);
  } catch (error) {
    container.innerHTML = '<p class="error">Failed to load podcasts.</p>';
    console.error(error);
  };
};

async function handleSearchInput(query: string, container: HTMLElement): Promise<void> {
  if (query === '') {
    await loadTrendingPodcasts(container);
    return;
  };

  container.innerHTML = '<div class="loader">Loading...</div>';

  try {
    const data = await searchPodcasts(query);
    renderPodcastList(container, data.feeds);
  } catch (error) {
    container.innerHTML = '<p class="error">Search failed.</p>';
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
    <img src="${podcast.image}" alt="${podcast.title}" class="podcast-card__image" />
    <h3 class="podcast-card__title">${podcast.title}</h3>
    <p class="podcast-card__publisher">${podcast.author}</p>
  `;

  card.addEventListener('click', () => {
    navigate(`/podcast/${podcast.id}`);
  });

  return card;
};