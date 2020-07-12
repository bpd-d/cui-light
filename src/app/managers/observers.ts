import { ICuiManager, ICuiDictionary, ICuiObserver } from "../../core/models/interfaces";
import { CuiDictionary } from "../../core/utils/dictionary";


export class CuiObserversManager implements ICuiManager<ICuiObserver> {
    #dict: ICuiDictionary<ICuiObserver>;

    constructor() {
        this.#dict = new CuiDictionary<ICuiObserver>();
    }

    connect() {
        this.#dict.values().forEach(value => {
            value.connect();
        })
    }

    put(key: string, element: ICuiObserver): void {
        this.#dict.add(key, element);
    }

    get(key: string): ICuiObserver {
        return this.#dict.get(key)
    }
    has(key: string): boolean {
        return this.#dict.containsKey(key);
    }
    remove(key: string): boolean {
        if (this.#dict.containsKey(key)) {
            this.#dict.remove(key);
            return true
        }
        return false;

    }
    clear(): void {
        this.#dict.clear();
    }

}