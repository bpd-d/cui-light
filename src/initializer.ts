import { CuiSetupInit } from "cui-light-core/dist/esm/models/setup";
import { is } from "cui-light-core/dist/esm/utils/functions";
import { CuiInstance } from "./instance";
import { ICONS } from "cui-light-core/dist/esm/utils/statics";
import { CuiInitData, CuiInitResult } from "cui-light-core/dist/esm/models/interfaces";
import { SWIPE_ANIMATIONS_DEFINITIONS } from "cui-light-core/dist/esm/animation/definitions";

export class CuiInitializer {
    #window: any;
    constructor() {
        this.#window = window;
    }

    async init(setup: CuiInitData): Promise<CuiInitResult> {
        let settings: CuiSetupInit = { ... new CuiSetupInit(), ...setup.setup }
        const appPrefix: string = settings.app;
        const result: CuiInitResult = {
            result: false
        }
        if (is(this.#window[appPrefix])) {
            result.message = "Instance is already initialized";
            return result;
        }
        if (is(setup.icons)) {
            for (let icon in setup.icons) {
                ICONS[icon] = setup.icons[icon];
            }
        }
        if (is(setup.swipeAnimations)) {
            for (let animation in setup.swipeAnimations) {
                SWIPE_ANIMATIONS_DEFINITIONS[animation] = setup.swipeAnimations[animation];
            }

        }
        try {
            this.#window[appPrefix] = new CuiInstance(settings, setup.plugins ?? [], setup.components ?? [])
            this.#window[appPrefix].init();
        } catch (e) {
            console.error(e);
            result.message = "An error occured during initialization";
            return result;
        }
        result.result = true;
        return result;
    }
}