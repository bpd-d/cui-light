export interface ICuiElementDetector {
    detect(x: Number, y: Number): [number, Element];
    setElements(elements: Element[]): void;
    setThreshold(value: number): void;
}