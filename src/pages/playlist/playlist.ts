import { getPlaylist, removeFromPlaylist, subscribe } from '../../store/playlist-store';
import { setEpisode } from '../../store/player-store';
import { navigate } from '../../router/router';

export function renderPlaylistPage(container: HTMLElement): void {
    function render(): void {
        const playlist = getPlaylist();

        if (playlist.length === 0) {
            container.innerHTML = `
                <button class="back-btn">← Back</button>
                <p class="empty-message">Your playlist is empty.</p>
            `;
        } else {
            container.innerHTML = `
                <button class="back-btn">← Back</button>
                <div class="playlist-list"></div>
            `;
        };

        const list = container.querySelector<HTMLDivElement>('.playlist-list')!;
        playlist.forEach((episode) => {
            const item = createPlaylistItem(episode);
            list.appendChild(item);
        });

        const backBtn = container.querySelector<HTMLButtonElement>('.back-btn')!;
        backBtn.addEventListener('click' , () => navigate('/'));
    };

    subscribe(render);
    render();
};

function createPlaylistItem(episode: { id: string; title: string; URL: string }): HTMLElement {
    const item = document.createElement('div');
    item.className = 'playlist-item';
    item.innerHTML = `
        <h3 class="playlist-item__title">${episode.title}</h3>
        <button class="playlist-item__remove-btn">Remove</button>
    `;

    const title = item.querySelector<HTMLElement>('.playlist-item__title')!;
    title.addEventListener('click', () => {
        setEpisode(episode);
    });

    const removeBtn = item.querySelector<HTMLButtonElement>('.playlist-item__remove-btn')!;
    removeBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        removeFromPlaylist(episode.id);
    });

    return item;
};