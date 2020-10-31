import { are, CuiUtils, is } from "../../core/index";
export interface PropertySet {
    [property: string]: string;
}
export class PropertySetter {
    #utils: CuiUtils;
    constructor(utils: CuiUtils) {
        this.#utils = utils;
    }

    setProperty(property: string, value: string) {
        if (!are(property, value)) {
            return;
        }
        this.#utils.interactions.mutate(() => {
            this.#utils.setProperty(name, value)
        }, null)
    }

    setProperties(set: PropertySet) {
        if (!is(set)) {
            return;
        }
        this.#utils.interactions.mutate(() => {
            for (let property in set) {
                if (is(set[property]))
                    this.#utils.setProperty(property, set[property])
            }
        }, null)
    }
}