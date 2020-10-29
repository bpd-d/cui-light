import { CuiSetupInit } from "../core/models/setup";
import { is } from "../core/utils/functions";
import { CuiInstance } from "./instance";
import { ICONS } from "../core/utils/statics";
import { ICuiPlugin, CuiInitData, CuiInitResult, ICuiComponent } from "../core/models/interfaces";
import { CuiAutoLightModePlugin } from "../plugins/light/light";
import { CuiIconComponent } from "../components/icon/icon";
import { CuiCircleComponent } from "../components/circle/circle";
import { CuiSpinnerComponent } from "../components/spinner/spinner";
import { CuiDummyComponent } from "../components/dummy/dummy";
import { CuiScrollComponent } from "../components/scroll/scroll";
import { CuiScrollspyComponent } from "../components/scrollspy/scrollspy";
import { CuiAutoPrintModePlugin } from "../plugins/print/print";
import { CuiIntersectionComponent } from "../components/intersection/intersection";
import { CuiOpenComponent } from "../components/open/open";
import { CuiCloseComponent } from "../components/close/close";
import { CuiToggleComponent } from "../components/toggle/toggle";
import { CuiResizeComponent } from "../components/resize/resize";
import { CuiKeysObserverPlugin } from "../plugins/keys/keys";
import { CuiDialogComponent } from "../components/dialog/dialog";
import { CuiOffCanvasArgs, CuiOffCanvasComponent } from "../components/offcanvas/offcanvas";
import { CuiAccordionComponent } from "../components/accordion/accordion";
import { CuiDropComponenet } from "../components/drop/drop";
import { CuiWindowClickPlugin } from "../plugins/click/click";
import { CuiOffsetComponent } from "../components/offset/offset";
import { CuiSwitchArgs, CuiSwitchComponent } from "../components/switch/switch";
import { CuiSwitcherComponent } from "../components/switch/switcher";
import { CuiFloatComponent } from "../components/float/float";
import { CuiSliderComponent } from "../components/switch/slider";
import { SWIPE_ANIMATIONS_DEFINITIONS } from "./animation/definitions";
import { CuiBanerComponent } from "../components/banner/banner";
import { CuiCoverComponent } from "../components/cover/cover";
import { CuiSortableComponent } from "../components/sortable/sortable";

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

    async init(data: CuiInitData): Promise<boolean> {
        if (this.#isInitialized) {
            console.log("Module is already initialized")
            return false;
        }
        const initializer = new CuiInitializer();
        const pluginList: ICuiPlugin[] = [
            new CuiAutoLightModePlugin({ autoLight: true }),
            new CuiAutoPrintModePlugin({ autoPrint: true }),
            new CuiKeysObserverPlugin(null),
            new CuiWindowClickPlugin()
        ];

        const componentList: ICuiComponent[] = [
            new CuiIconComponent(),
            new CuiCircleComponent(),
            new CuiSpinnerComponent(),
            new CuiDummyComponent(),
            new CuiScrollComponent(),
            new CuiScrollspyComponent(),
            new CuiIntersectionComponent(),
            new CuiOpenComponent(),
            new CuiCloseComponent(),
            new CuiToggleComponent(),
            new CuiResizeComponent(),
            new CuiDialogComponent(),
            new CuiOffCanvasComponent(),
            new CuiAccordionComponent(),
            new CuiDropComponenet(),
            new CuiOffsetComponent(),
            new CuiSwitchComponent(),
            new CuiSwitcherComponent(),
            new CuiFloatComponent(),
            new CuiSliderComponent(),
            new CuiBanerComponent(),
            new CuiCoverComponent(),
            new CuiSortableComponent()
        ];

        let result = await initializer.init({
            setup: data.setup,
            icons: data.icons,
            plugins: is(data.plugins) ? [...pluginList, ...data.plugins] : pluginList,
            components: is(data.components) ? [...componentList, ...data.components] : componentList,
            swipeAnimations: data.swipeAnimations
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