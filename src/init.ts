import { ICuiPlugin, ICuiComponent } from "cui-light-core/dist/esm/models/interfaces";
import { is } from "cui-light-core/dist/esm/utils/functions";
import { CuiInitData, CuiInitializer } from "./initializer";
import { GetComponents } from "cui-light-components/dist/esm/module";
import { GetPlugins } from "cui-light-plugins/dist/esm/module"


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
        const pluginList: ICuiPlugin[] = GetPlugins({
            autoLight: true,
            autoPrint: true
        });

        const componentList: ICuiComponent[] = GetComponents({
            prefix: data.setup?.prefix
        })
        let appPlugins = pluginList;
        if (data.plugins) {
            appPlugins = { ...pluginList, ...data.plugins }
        }

        let result = await initializer.init({
            setup: data.setup,
            icons: data.icons,
            plugins: appPlugins,
            // @ts-ignore already checked
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