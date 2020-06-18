import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";

export class CuiColorsPlugin implements ICuiPlugin {
    description: string = 'Colors setter for cUI ecosystem'
    name: string = 'colors';
    setup: any;
    #utils: CuiUtils;

    constructor() {

    }

    init(utils: CuiUtils): void {
        this.#utils = utils;
    }
    destroy(): void {
        // Todo
    }

}