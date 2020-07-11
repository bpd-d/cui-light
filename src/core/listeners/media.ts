import { ICuiEventListener } from "../models/interfaces";

export class CuiMediaQueryListener implements ICuiEventListener<MediaQueryListEvent> {

    #mediaQuery: string;
    #callback: (t: MediaQueryListEvent) => void;
    #isInitialized: boolean;
    #inProgress: boolean;
    constructor(mediaQuery: string) {
        this.#mediaQuery = mediaQuery;
        this.#isInitialized = false;
    }
    setCallback(callback: (t: MediaQueryListEvent) => void): void {
        this.#callback = callback;
    }

    isInProgress(): boolean {
        return this.#inProgress;
    }
    attach(): void {
        if (!window.matchMedia || this.#isInitialized || !this.#mediaQuery) {
            return;
        }
        window.matchMedia(this.#mediaQuery)
            .addEventListener('change', this.event.bind(this))
        this.#isInitialized = true
    }

    detach(): void {
        if (this.#isInitialized) {
            window.matchMedia(this.#mediaQuery).removeEventListener('change', this.event.bind(this));
            this.#isInitialized = false
        }
    }


    private event(ev: MediaQueryListEvent): void {
        if (this.#inProgress) {
            return
        }
        this.#inProgress = true;
        try {
            this.#callback(ev);
        } catch (e) {
            console.error(e)
        } finally {
            this.#inProgress = false;
        }
    }
}