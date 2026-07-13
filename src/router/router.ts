import { ROUTES, type RouteParams, type Route } from './routes';

const BASE_PATH = import.meta.env.BASE_URL;

function getRelativePath(pathname: string): string {
  if (BASE_PATH !== '/' && pathname.startsWith(BASE_PATH)) {
    return '/' + pathname.slice(BASE_PATH.length);
  }
  return pathname;
};

let containerElement: HTMLElement;

function matchRoute(pathname: string): { route: Route; params: RouteParams } | null {
    for (const route of ROUTES) {
        const routeParts = route.path.split('/').filter(Boolean);
        const pathParts = pathname.split('/').filter(Boolean);

        if (routeParts.length !== pathParts.length) continue;

        const params: RouteParams = {};

        const isMatch = routeParts.every((part, i) => {
            if (part.startsWith(':')) {
                params[part.slice(1)] = decodeURIComponent(pathParts[i]);
                return true;
            }
            return part === pathParts[i];
        });

        if (isMatch) return {route: route, params: params}
    };

    return null;
};

async function renderCurrentRoute() {
    const relativePath = getRelativePath(location.pathname);
    const match = matchRoute(relativePath);

    if (match) {
        await match.route.render(containerElement, match.params);
    } else {
        containerElement.innerHTML = '<h1>404 - Page Not Found</h1>';
    };
};

export function navigate(path: string): void {
    const fullPath = BASE_PATH !== '/' ? BASE_PATH.slice(0, -1) + path : path;

    if (location.pathname === path) return;

    history.pushState({}, '', fullPath);

    renderCurrentRoute();
};

export function initRouter(container: HTMLElement): void {
    containerElement = container;

    window.addEventListener('popstate', renderCurrentRoute);

    renderCurrentRoute();
};