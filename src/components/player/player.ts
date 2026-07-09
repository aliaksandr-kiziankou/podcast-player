import { updChanger, togglePlay, getCurrentEpisode, getIsPlaying } from '../../store/player-store';

function createPlayer(): HTMLElement {
    const player = document.createElement('div');
    player.className = 'player';
    player.innerHTML = `
        <button class="player__toggle-btn">▶</button>
        <span class="player__title">Select Episode</span>
        <audio class="player__audio"></audio>
    `;
    return player;
};

export function mountPlayer(): void {
    const player = createPlayer();
    document.body.appendChild(player);

    const toggleBtn = document.querySelector<HTMLButtonElement>('.player__toggle-btn')!;
    const title = document.querySelector<HTMLSpanElement>('.player__title')!;
    const audio = document.querySelector<HTMLAudioElement>('.player__audio')!;

    function updatePlayerUI(): void {
        const episode = getCurrentEpisode();
        const isPLaying = getIsPlaying();

        title.textContent = episode ? episode.title : 'No episode selected';
        toggleBtn.textContent = isPLaying ? '⏸' : '▶';

        if (episode && audio.src !== episode.audioUrl) {
            audio.src = episode.audioUrl;
        };

        if(isPLaying) {
            audio.play();
        } else {
            audio.pause();
        };
    };

    updChanger(updatePlayerUI);
    updatePlayerUI();

    toggleBtn.addEventListener('click', () => {
       togglePlay();
    });
};