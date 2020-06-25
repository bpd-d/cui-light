import { CuiCachable, ICuiCacheManager } from "../../core/models/interfaces";
export declare class CuiCacheManager implements ICuiCacheManager {
    #private;
    constructor(maxSize?: number);
    put(key: string, element: CuiCachable): void;
    get(key: string): CuiCachable;
    has(key: string): boolean;
    remove(key: string): boolean;
    clear(): void;
    private clean;
}
