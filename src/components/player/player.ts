import { updChanger, togglePlay, getCurrentEpisode, getIsPlaying } from '../../store/player-store';
import { formatTime } from '../../utils/format-time';

function createPlayer(): HTMLElement {
    const player = document.createElement('div');
    player.className = 'player';
    player.innerHTML = `
        <button class="player__toggle-btn">▶</button>
        <span class="player__title">Select Episode</span>
        <span class="player__current-time">0:00</span>
        <div class="player__progress-bar">
            <div class="player__progress-fill"></div>
        </div>
        <span class="player__duration">0:00</span>
        <audio class="player__audio"></audio>
    `;
    return player;
};

export function mountPlayer(): void {
    const player = createPlayer();
    document.body.appendChild(player);

    const toggleBtn = player.querySelector<HTMLButtonElement>('.player__toggle-btn')!;
    const title = player.querySelector<HTMLSpanElement>('.player__title')!;
    const audio = player.querySelector<HTMLAudioElement>('.player__audio')!;
    const currentTime = player.querySelector<HTMLSpanElement>('.player__current-time')!;
    const durationEl = player.querySelector<HTMLSpanElement>('.player__duration')!;
    const progressBar = player.querySelector<HTMLDivElement>('.player__progress-bar')!;
    const progressFill = player.querySelector<HTMLDivElement>('.player__progress-fill')!;

    function updatePlayerUI(): void {
        const episode = getCurrentEpisode();
        const isPLaying = getIsPlaying();

        title.textContent = episode ? episode.title : 'No episode selected';
        toggleBtn.textContent = isPLaying ? '⏸' : '▶';

        if (episode && audio.src !== episode.URL) {
            audio.src = episode.URL;
        };

        if(isPLaying) {
            audio.play();
        } else {
            audio.pause();
        };
    };

    function updateProgress(): void {
        const current = audio.currentTime;
        const duration = audio.duration || 0;

        currentTime.textContent = formatTime(current);
        durationEl.textContent = formatTime(current);

        const percent = duration > 0 ? (current / duration) * 100 : 0;
        progressFill.style.width = `${percent}%`;
    };

    updChanger(updatePlayerUI);
    updatePlayerUI();

    toggleBtn.addEventListener('click', () => {
       togglePlay();
    });

    audio.addEventListener('timeupdate', updateProgress);

    progressBar.addEventListener('click' , (event) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const percent = clickX / rect.width;

        audio.currentTime = percent * audio.duration;
    });
};