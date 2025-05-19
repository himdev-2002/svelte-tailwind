import { tick } from 'svelte';
import { writable } from 'svelte/store';
export const isBrowser = typeof document !== 'undefined';

export function localStorageStore(key: string, initial: any) {
    if (!isBrowser) return;
    const stored = localStorage.getItem(key);
    const store = writable(stored ? JSON.parse(stored) : initial);

    store.subscribe(value => {
        localStorage.setItem(key, JSON.stringify(value));
        if(key === 'color-scheme') {
            // console.log(`Setting ${value} mode`);
            tick().then(() => {
                document.documentElement.style.colorScheme = value;
            });
        }
    });

    return store;
}

localStorageStore('color-scheme', 'light');