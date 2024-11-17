export function loadJwtState<T>(key: string): T | null {
    try {
        const jsonState = localStorage.getItem(key);
        if (!jsonState) {
            return null;
        }
        return JSON.parse(jsonState).jwt;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export function saveJwtState<T>(state: T, key: string) {
    localStorage.setItem(key, JSON.stringify(state));
}
