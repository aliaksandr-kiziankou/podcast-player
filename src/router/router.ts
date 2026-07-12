import { ROUTES, type RouteParams, type Route } from './routes';

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
    const match = matchRoute(location.pathname);

    if (match) {
        await match.route.render(containerElement, match.params);
    } else {
        containerElement.innerHTML = '<h1>404 - Page Not Found</h1>';
    };
};

export function navigate(path: string): void {

    if (location.pathname === path) return;

    history.pushState({}, '', path);

    renderCurrentRoute();
};

export function initRouter(container: HTMLElement): void {
    containerElement = container;

    window.addEventListener('popstate', renderCurrentRoute);

    renderCurrentRoute();
};