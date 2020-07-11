import { ICuiObserver } from "../../core/models/interfaces";
export interface ICuiIntersectionObserver {
    observe(target: Element): void;
    unobserve(target: Element): void;
    disconnect(): void;
}
export declare class CuiIntersectionEntry {
    isInView: boolean;
    ratio: number;
}
export interface ICuiIntersectionHandler {
    onIntersection(entry: CuiIntersectionEntry): Promise<boolean>;
}
export declare class CuiIntersectionObserver implements ICuiObserver {
    #private;
    private observer;
    constructor(root: Element, threshold?: number[]);
    setCallback(callback: IntersectionObserverCallback): void;
    connect(): void;
    observe(target: Element): void;
    unobserve(target: Element): void;
    disconnect(): void;
}
