import { ICuiEventListener } from "../models/interfaces";
export declare class CuiMediaQueryListener implements ICuiEventListener<MediaQueryListEvent> {
    #private;
    constructor(mediaQuery: string);
    setCallback(callback: (t: MediaQueryListEvent) => void): void;
    isInProgress(): boolean;
    attach(): void;
    detach(): void;
    private event;
}
