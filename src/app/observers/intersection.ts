import { ICuiObserver } from "../../core/models/interfaces";

export interface ICuiIntersectionObserver {
    observe(target: Element): void;
    unobserve(target: Element): void;
    disconnect(): void;
}

export class CuiIntersectionEntry {
    isInView: boolean;
    ratio: number;
}

export interface ICuiIntersectionHandler {
    onIntersection(entry: CuiIntersectionEntry): Promise<boolean>;
}

/**
 * Creates a wrapper for intersection observer
 * Constructor gets a root element for observer and optional array of threshold values [0...1]
 */
export class CuiIntersectionObserver implements ICuiObserver {
    private observer: IntersectionObserver
    #root: Element;
    #threshold: number[];
    #callback: IntersectionObserverCallback;
    constructor(root: Element, threshold?: number[]) {
        this.#root = root;
        this.#threshold = threshold ?? [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    }

    setCallback(callback: IntersectionObserverCallback) {
        this.#callback = callback;
    }

    connect(): void {
        this.observer = new IntersectionObserver(this.#callback, {
            root: this.#root,
            rootMargin: '0px',
            threshold: this.#threshold
        })
    }

    observe(target: Element): void {
        this.observer.observe(target)
    }

    unobserve(target: Element): void {
        this.observer.unobserve(target)
    }

    disconnect() {
        this.observer.disconnect()
    }

}