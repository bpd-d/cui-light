import { ICuiEventListener } from "../models/interfaces";
export interface CuiScrollEvent {
    base: Event;
    top: number;
    left: number;
}
export declare class CuiScrollListener implements ICuiEventListener<CuiScrollEvent> {
    #private;
    constructor(target: Element, threshold?: number);
    setCallback(callback: (ev: CuiScrollEvent) => void): void;
    attach(): void;
    detach(): void;
    isInProgress(): boolean;
    private listener;
    private passedThreshold;
}
