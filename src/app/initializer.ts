import { CuiSetupInit } from "../core/models/setup";
import { is } from "../core/utlis/functions";
import { CuiInstance } from "./instance";
import { ICONS } from "../core/utlis/statics";
import { ICuiPlugin } from "../core/models/interfaces";
import { CuiAutoLightModePlugin } from "./plugins/light/light";

export class CuiInitializer {
    #window: any;
    constructor() {
        this.#window = window;
    }

    async init(plugins: ICuiPlugin[], setup?: CuiSetupInit): Promise<boolean> {
        const settings: CuiSetupInit = { ... new CuiSetupInit(), ...setup }
        const appPrefix: string = settings.app;
        if (is(this.#window[appPrefix])) {
            return false;
        }
        this.#window[appPrefix] = new CuiInstance(settings, plugins)
        this.#window[appPrefix].init();
        return true;
    }

    async setIcons(icons: any): Promise<boolean> {
        for (let icon in icons) {
            ICONS[icon] = icons[icon];
        }
        return true;
    }
}

export class CuiInit {
    #isInitialized: boolean;
    constructor() {
        this.#isInitialized = false;
    }

    async init(setup: CuiSetupInit, icons: any): Promise<boolean> {
        if (this.#isInitialized) {
            console.log("Module is already initialized")
            return false;
        }
        const initializer = new CuiInitializer();
        const plugins: ICuiPlugin[] = [
            new CuiAutoLightModePlugin({ autoLight: true })
        ];

        if (is(icons)) {
            initializer.setIcons(icons)
        }
        if (initializer.init(plugins, setup)) {
            this.#isInitialized = true;
            return true;
        }
        console.log("Cui Light failed to init")
        return false;

    }
}