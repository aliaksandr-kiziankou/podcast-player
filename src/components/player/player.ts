import { updChanger, togglePlay, getCurrentEpisode, getIsPlaying } from '../../store/player-store';
import { formatTime } from '../../utils/format-time';
import { addToPlaylist, removeFromPlaylist, alreadyInPlaylist } from '../../store/playlist-store';
import { navigate } from '../../router/router';
import {getItem, setItem} from '../../utils/local-storage';

function createPlayer(): HTMLElement {
    const player = document.createElement('div');
    player.className = 'player';
    player.innerHTML = `
        <button class="player__toggle-btn">▶</button>
        <button class="player__playlist-btn">+ Playlist</button>
        <span class="player__title">Select Episode</span>
        <span class="player__current-time">0:00</span>
        <div class="player__progress-bar">
            <div class="player__progress-fill"></div>
        </div>
        <span class="player__duration">0:00</span>
        <audio class="player__audio"></audio>
        <button class="player__go-to-playlist-btn">Playlist</button>

    `;
    /*
    const goToPlaylistBtn = document.createElement('button');
    goToPlaylistBtn.textContent = 'Playlist';
    goToPlaylistBtn.addEventListener('click', () => navigate('/playlist'));
    player.appendChild(goToPlaylistBtn);
    */

    const goToPlaylistBtn = player.querySelector<HTMLButtonElement>('.player__go-to-playlist-btn')!;
    goToPlaylistBtn.addEventListener('click', () => {
        navigate('/playlist')
    });
    
    return player;
};

export function mountPlayer(): void {
    const player = createPlayer();
    document.body.appendChild(player);

    const toggleBtn = player.querySelector<HTMLButtonElement>('.player__toggle-btn')!;
    const playlistBtn = player.querySelector<HTMLButtonElement>('.player__playlist-btn')!;
    const title = player.querySelector<HTMLSpanElement>('.player__title')!;
    const audio = player.querySelector<HTMLAudioElement>('.player__audio')!;
    const currentTime = player.querySelector<HTMLSpanElement>('.player__current-time')!;
    const durationEl = player.querySelector<HTMLSpanElement>('.player__duration')!;
    const progressBar = player.querySelector<HTMLDivElement>('.player__progress-bar')!;
    const progressFill = player.querySelector<HTMLDivElement>('.player__progress-fill')!;
    const positionPLay = 'playback-positions';
    let positions: Record<string, number> = getItem(positionPLay) ?? {};

    function updatePlayerUI(): void {
        const episode = getCurrentEpisode();
        const isPLaying = getIsPlaying();

        title.textContent = episode ? episode.title : 'No episode selected';
        toggleBtn.textContent = isPLaying ? '⏸' : '▶';

        if (episode && audio.src !== episode.URL) {
            audio.src = episode.URL;

            const savedPosition = positions[episode.id];
            if (savedPosition) {
                audio.currentTime = Math.max(savedPosition - 10, 0);
            };
        };

        if(isPLaying) {
            audio.play();
        } else {
            audio.pause();
        };

        if (episode) {
            playlistBtn.style.display = 'inline-block';
            playlistBtn.textContent = alreadyInPlaylist(episode.id) ? '✓ In Playlist' : '+ Playlist';
        } else {
            playlistBtn.style.display = 'none';
        };
    };

    function updateProgress(): void {
        const current = audio.currentTime;
        const duration = audio.duration || 0;

        currentTime.textContent = formatTime(current);
        durationEl.textContent = formatTime(current);

        const percent = duration > 0 ? (current / duration) * 100 : 0;
        progressFill.style.width = `${percent}%`;

        const episode = getCurrentEpisode();
        if (episode) {
            positions[episode.id] = current;
            setItem(positionPLay, positions);
        };
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

    playlistBtn.addEventListener('click' , () => {
        const episode = getCurrentEpisode();
        if (!episode) return;

        if (alreadyInPlaylist(episode.id)) {
            removeFromPlaylist(episode.id);
        } else {
            addToPlaylist(episode);
        };

        updatePlayerUI();
    });
};