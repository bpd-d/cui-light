import { CuiSetup } from "../core/models/setup";
import { DefaultSetup } from "./defaults/setup";
import { is } from "../core/utlis/functions";
import { CuiInstance } from "./instance";
import { ICONS } from "../core/utlis/statics";

export class CuiInitializer {
    #window: any;
    constructor() {
        this.#window = window;
    }

    async init(setup?: CuiSetup): Promise<boolean> {
        const appPrefix: string = setup?.app ?? DefaultSetup.app;
        if (is(this.#window[appPrefix])) {
            return false;
        }
        this.#window[appPrefix] = new CuiInstance(setup)
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

    async init(setup: CuiSetup, icons: any): Promise<boolean> {
        if (this.#isInitialized) {
            console.log("Module is already initialized")
            return false;
        }
        const initializer = new CuiInitializer();
        const settings: CuiSetup = setup ?? {
            logLevel: 'debug',
            prefix: 'cui',
            app: '$cui'
        }
        if (is(icons)) {
            initializer.setIcons(icons)
        }
        if (initializer.init(settings)) {
            this.#isInitialized = true;
            return true;
        }
        console.log("Cui Light failed to init")
        return false;

    }
}