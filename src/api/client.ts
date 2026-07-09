const BASE_URL = 'https://listen-api.listennotes.com/api/v2';

const API_KEY = import.meta.env.VITE_LISTEN_NOTES_API_KEY;

export async function apiFetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'X-ListenAPI-Key': API_KEY,
        },
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
};