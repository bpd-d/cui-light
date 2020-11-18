import { IUIInteractionProvider, ICuiEventBus, ICuiManager, CuiCachable } from "./interfaces";
import { CuiSetup, CuiSetupInit } from "./setup";
import { CuiLightMode } from "../utils/types";
import { CuiInteractionsFactory } from "../factories/interactions";
import { CuiCacheManager } from "../../app/managers/cache";
import { CuiEventBusFactory } from "../bus/bus";
import { are, getName, replacePrefix } from "../utils/functions";
import { CLASSES } from "../utils/statics";
import { ICuiDocumentStyleAppender, CuiDocumentStyleAppender } from "../styles/appender";
import { CuiInstanceColorHandler } from "../../app/handlers/colors";
import { ICuiResizableObserver, CuiResizeObserver } from "../../app/observers/resize";
import { CSSVariableError } from "./errors";
import { CuiDevelopmentToolManager } from "../../app/managers/development";

export class CuiUtils {
    interactions: IUIInteractionProvider;
    bus: ICuiEventBus;
    setup: CuiSetup;
    cache: ICuiManager<CuiCachable>;
    colors: CuiInstanceColorHandler;
    styleAppender: ICuiDocumentStyleAppender;
    #resizeObserver: ICuiResizableObserver;
    development: CuiDevelopmentToolManager;
    constructor(initialSetup: CuiSetupInit) {
        this.setup = new CuiSetup().fromInit(initialSetup);
        this.interactions = CuiInteractionsFactory.get(initialSetup.interaction)
        this.cache = new CuiCacheManager(this.setup.cacheSize);
        this.bus = CuiEventBusFactory.get(initialSetup.busSetup);
        this.colors = new CuiInstanceColorHandler(this.interactions);
        this.development = new CuiDevelopmentToolManager(initialSetup.development);
        this.styleAppender = new CuiDocumentStyleAppender(this.interactions);
        this.#resizeObserver = new CuiResizeObserver(this.bus, this.setup.resizeThreshold);
        this.#resizeObserver.connect();
    }

    setLightMode(mode: CuiLightMode) {
        const name: string = getName(this.setup.prefix, CLASSES.dark);
        const classes = document.body.classList;
        if (mode === 'dark' && !classes.contains(name)) {
            this.interactions.mutate(() => {
                classes.add(name);
            }, this)

        } else if (mode === 'light' && classes.contains(name)) {
            this.interactions.mutate(() => {
                classes.remove(name);
            }, this)
        }
    }

    getLightMode(): CuiLightMode {
        const name: string = getName(this.setup.prefix, CLASSES.dark);
        return document.body.classList.contains(name) ? 'dark' : 'light';
    }

    setPrintMode(flag: boolean) {
        const name: string = getName(this.setup.prefix, CLASSES.print);
        const classes = document.body.classList;
        if (flag && !classes.contains(name)) {
            classes.add(name);

        } else if (!flag && classes.contains(name)) {
            classes.remove(name);
        }
    }

    isPrintMode(): boolean {
        const name: string = getName(this.setup.prefix, CLASSES.print);
        return document.body.classList.contains(name);
    }

    setProperty(name: string, value: string) {
        if (!are(name, value)) {
            throw new CSSVariableError("Property or value was not provided");
        }
        let prop = replacePrefix(name, this.setup.prefix);
        document.documentElement.style.setProperty(prop, value);
    }
}