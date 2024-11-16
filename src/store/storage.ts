export function loadJwtState<T>(key: string): T | undefined {
    try {
        const jsonState = localStorage.getItem(key);
        if (!jsonState) {
            return undefined;
        }
        return JSON.parse(jsonState);
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export function saveJwtState<T>(state: T, key: string) {
    localStorage.setItem(key, JSON.stringify(state));
}
