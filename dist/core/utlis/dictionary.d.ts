import { ICuiDictionary, ICuiDictionaryItem } from "../models/interfaces";
export declare class CuiDictionary<T> implements ICuiDictionary<T> {
    #private;
    constructor(init?: ICuiDictionaryItem<T>[]);
    add(key: string, value: T): void;
    remove(key: string): void;
    get(key: string): T;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): T[];
    indexOf(key: string): number;
    update(key: string, value: T): void;
    clear(): void;
    private throwOnEmptyKey;
}
