import { initRouter } from './router/router';
import { mountPlayer } from './components/player/player';

const app = document.querySelector<HTMLDivElement>('#app')!;

mountPlayer();
initRouter(app);