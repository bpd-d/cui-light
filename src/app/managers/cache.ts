import { ICuiDictionary, CuiCachable, ICuiManager } from "../../core/models/interfaces";
import { CuiDictionary } from "../../core/utlis/dictionary";
import { is } from "../../core/utlis/functions";

export class CuiCacheManager implements ICuiManager<CuiCachable> {
    #cache: ICuiDictionary<CuiCachable>;
    #maxSize: number;
    constructor(maxSize?: number) {
        this.#cache = new CuiDictionary<CuiCachable>();
        this.#maxSize = maxSize ?? 500;
    }
    put(key: string, element: CuiCachable): void {
        if (!is(key)) return;
        if (this.has(key)) {
            this.#cache.update(key, element);
            return;
        }
        this.clean();
        this.#cache.add(key, element);
    }

    get(key: string): CuiCachable {
        if (!is(key)) return null;
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
        return is(key) ? this.#cache.containsKey(key) : false;
    }

    remove(key: string): boolean {
        if (!is(key)) return false;
        if (this.has(key)) {
            this.#cache.remove(key);
            return true;
        }
        return false;
    }

    clear(): void {
        this.#cache.clear();
    }

    private clean() {
        if (this.#cache.keys().length >= this.#maxSize) {
            this.#cache.remove(this.#cache.keys()[0]);
        }
    }
}

