export interface CuiIntersectionResultItem {
    verticalRatio: number;
    horizontalRatio: number;
    element: HTMLElement;
}

export interface CuiIntersectionListenerOptions {
    threshold?: number;
}

export interface CuiIntersectionResult {
    top: number;
    left: number;
    scrolling: boolean;
    initial: boolean;
    items: CuiIntersectionResultItem[];
    source: string;
    ev: Event;
}

export interface CuiIntersectionCallback {
    (ev: CuiIntersectionResult): void;
}

export interface ICuiIntersectionCalculator {
    setParent(element: HTMLElement): void;
    setChildren(children: HTMLElement): void;
    onUpdate(callback: CuiIntersectionCallback): void;
}