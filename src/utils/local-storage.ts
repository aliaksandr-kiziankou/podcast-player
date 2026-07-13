export function setItem<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Failed to write "${key}" to localStorage`, error);
    };
};

export function getItem<T>(key: string): T | null {
    try {
        const a = localStorage.getItem(key);
        if (a === null) return null;
        return JSON.parse(a) as T;
    } catch (error) {
        console.error(`Failed to load "${key}" to localStorage`, error);
        return null;
    };
};