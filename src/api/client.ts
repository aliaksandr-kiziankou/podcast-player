const BASE_URL = 'https://api.podcastindex.org/api/1.0';
const API_KEY = import.meta.env.VITE_PODCAST_INDEX_API_KEY;
const API_SECRET = import.meta.env.VITE_PODCAST_INDEX_API_SECRET;

async function createAuthHeaders(): Promise<HeadersInit> {
    const apiHeadersTime = Math.floor(Date.now() / 1000);
    const dataToHash = API_KEY + API_SECRET + apiHeadersTime;

    const awadaKedavra = new TextEncoder().encode(dataToHash);
    const hashBuffer = await crypto.subtle.digest('SHA-1', awadaKedavra);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const authorization = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    return {
        'X-Auth-Key': API_KEY,
        'X-Auth-Date': String(apiHeadersTime),
        Authorization: authorization,
        'User-Agent': 'PodcastPlayerApp/1.0',
    };
};

export async function apiFetch<T>(endpoint: string): Promise<T> {
    const headers = await createAuthHeaders();

    const response = await fetch(`${BASE_URL}${endpoint}`, { headers });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
};