import { ICuiDictionary, CuiCachable, ICui, ICuiCacheManager } from "../../core/models/interfaces";
import { CuiDictionary } from "../../core/utlis/dictionary";

export class CuiCacheManager implements ICuiCacheManager {
    #cache: ICuiDictionary<CuiCachable>;
    #maxSize: number;
    constructor(maxSize?: number) {
        this.#cache = new CuiDictionary<CuiCachable>();
        this.#maxSize = maxSize ?? 500;
    }
    put(key: string, element: CuiCachable): void {
        if (this.has(key)) {
            this.#cache.update(key, element);
        }
        if (this.#cache.keys().length >= this.#maxSize) {
            this.#cache.remove(this.#cache.keys()[0]);
        }
        this.#cache.add(key, element);
    }

    get(key: string): CuiCachable {
        if (this.has(key)) {
            let item = this.#cache.get(key);
            if (item.refresh()) {
                return item;
            }
            this.#cache.remove(key);
        }
        return null;
    }

    has(key: string): boolean {
        return this.#cache.containsKey(key);
    }

    remove(key: string): boolean {
        if (this.has(key)) {
            this.#cache.remove(key);
            return true;
        }
        return false;
    }

    clear(): void {
        this.#cache.clear();
    }
}

