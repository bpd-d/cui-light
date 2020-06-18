import { CuiSetupInit } from "../core/models/setup";
import { is } from "../core/utlis/functions";
import { CuiInstance } from "./instance";
import { ICONS } from "../core/utlis/statics";
import { ICuiPlugin, CuiInitData, CuiInitResult, ICuiComponent } from "../core/models/interfaces";
import { CuiAutoLightModePlugin } from "../plugins/light/light";
import { CuiIconComponent } from "../components/icon/icon";
import { CuiCircleComponent } from "../components/circle/circle";
import { CuiSpinnerComponent } from "../components/spinner/spinner";

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
        try {
            this.#window[appPrefix] = new CuiInstance(settings, setup.plugins, setup.components)
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

        const components: ICuiComponent[] = [
            new CuiIconComponent(),
            new CuiCircleComponent(),
            new CuiSpinnerComponent()
        ];

        let result = await initializer.init({
            setup: setup,
            icons: icons,
            plugins: plugins,
            components: components
        })
        if (result.result) {
            this.#isInitialized = true;
            return true;
        } else {
            console.error(`A cUI instance failed to initialize: [${result.message ?? "#"}]`);
        }
        console.log("Cui Light failed to init")
        return false;

    }
}