import { IUIInteractionProvider } from "../../core/models/interfaces";
export declare class CollectionManagerHelper {
    #private;
    constructor(interactions: IUIInteractionProvider);
    setElements(elements: Element[]): void;
    setToggle(className: string): void;
    addAnimationClass(currentElement: Element, nextElement: Element, animIn: string, animOut: string): void;
    setFinalClasses(currentElement: Element, nextElement: Element, animIn: string, animOut: string): void;
    verifyIndex(index: number, current: number, count: number): boolean;
    setCurrent(newIndex: number, current: number): Promise<boolean>;
    setCurrentWithAnimation(newIndex: number, animClassIn: string, animClassOut: string, duration: number, current: number): Promise<boolean>;
    getCurrentIndex(): number;
    elements(): Element[];
    check(): boolean;
    count(): number;
    lock(): void;
    unlock(): void;
}
