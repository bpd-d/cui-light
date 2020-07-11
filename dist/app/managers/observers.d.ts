import { ICuiManager, ICuiObserver } from "../../core/models/interfaces";
export declare class CuiObserversManager implements ICuiManager<ICuiObserver> {
    #private;
    constructor();
    connect(): void;
    put(key: string, element: ICuiObserver): void;
    get(key: string): ICuiObserver;
    has(key: string): boolean;
    remove(key: string): boolean;
    clear(): void;
}
