export function formatTime(allSeconds: number): string {
    const hours = Math.floor(allSeconds / 3600);
    const mins = Math.floor((allSeconds % 3600) / 60);
    const seconds = Math.floor(allSeconds % 60);

    const pad = (n: number) => String(n).padStart(2, '0');

    if (hours > 0) {
        return `${hours}:${pad(mins)}:${pad(seconds)}`;
    }

    return `${mins}:${pad(seconds)}`;
};