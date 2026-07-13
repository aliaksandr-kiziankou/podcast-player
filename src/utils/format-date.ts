export function formatDate(seconds: number): string {
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};