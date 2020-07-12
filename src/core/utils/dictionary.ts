import { ICuiDictionary, ICuiDictionaryItem } from "../models/interfaces";
import { ItemNotFoundError, ArgumentError } from "../models/errors";
import { is } from "./functions";

export class CuiDictionary<T> implements ICuiDictionary<T> {

    #keys: string[];
    #values: T[];

    constructor(init?: ICuiDictionaryItem<T>[]) {
        this.#keys = []
        this.#values = []

        if (init) {
            init.forEach(x => {
                if (!is(x.key)) {
                    this.#keys = []
                    this.#values = []
                    throw new ArgumentError("Key is empty");
                }
                this.add(x.key, x.value)
            })
        }
    }

    add(key: string, value: T): void {
        this.throwOnEmptyKey(key)
        if (this.containsKey(key))
            throw new Error("Key already exists");
        this.#keys.push(key)
        this.#values.push(value)
    }

    remove(key: string): void {
        if (!is(key)) {
            return
        }
        let index = this.#keys.indexOf(key);
        if (index >= 0) {
            this.#keys.splice(index, 1)
            this.#values.splice(index, 1)
        }
    }
    get(key: string): T {
        this.throwOnEmptyKey(key)
        let index = this.indexOf(key)
        if (index < 0) {
            return undefined;
        }
        return this.#values[index];
    }
    containsKey(key: string): boolean {
        return is(key) && this.indexOf(key) >= 0
    }
    keys(): string[] {
        return this.#keys
    }
    values(): T[] {
        return this.#values;
    }

    indexOf(key: string): number {
        return is(key) ? this.#keys.indexOf(key) : -1;
    }

    update(key: string, value: T): void {
        this.throwOnEmptyKey(key)
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

    private throwOnEmptyKey(key: string) {
        if (!is(key)) {
            throw new ArgumentError("Key is empty");
        }
    }
}