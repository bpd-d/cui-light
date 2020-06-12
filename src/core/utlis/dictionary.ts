import { ICuiDictionary, ICuiDictionaryItem } from "../models/interfaces";
import { ItemNotFoundError } from "../models/errors";

export class CuiDictionary<T> implements ICuiDictionary<T> {

    #keys: string[];
    #values: T[];

    constructor(init?: ICuiDictionaryItem<T>[]) {
        this.#keys = []
        this.#values = []

        if (init) {
            init.forEach(x => {
                this.add(x.key, x.value)
            })
        }
    }

    add(key: string, value: T): void {
        if (this.containsKey(key))
            throw new Error("Key already exists");
        this.#keys.push(key)
        this.#values.push(value)
    }
    remove(key: string): void {
        let index = this.#keys.indexOf(key);
        if (index >= 0) {
            this.#keys.splice(index, 1)
            this.#values.splice(index, 1)
        }
    }
    get(key: string): T {
        let index = this.indexOf(key)
        if (index < 0) {
            return undefined;
        }
        return this.#values[index];
    }
    containsKey(key: string): boolean {
        return this.indexOf(key) >= 0
    }
    keys(): string[] {
        return this.#keys
    }
    values(): T[] {
        return this.#values;
    }

    indexOf(key: string) {
        return this.#keys.indexOf(key)
    }

    update(key: string, value: T): void {
        let index = this.indexOf(key)
        if (index < 0) {
            throw new ItemNotFoundError(`Item with key [${key}] not found`)
        }
        this.#values[index] = value
    }
    clear() {
        this.#values = [];
        this.#keys = [];
    }
}