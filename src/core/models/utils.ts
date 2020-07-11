import { IUIInteractionProvider, ICuiEventBus, ICuiManager, CuiCachable } from "./interfaces";
import { CuiSetup, CuiSetupInit } from "./setup";
import { CuiLightMode } from "../utlis/types";
import { CuiInteractionsFactory } from "../factories/interactions";
import { CuiCacheManager } from "../../app/managers/cache";
import { CuiEventBus } from "../bus/bus";
import { TaskedEventEmitHandler } from "../bus/handlers";
import { CuiCallbackExecutor } from "../bus/executors";
import { getName, replacePrefix } from "../utlis/functions";
import { CLASSES } from "../utlis/statics";
import { ICuiDocumentStyleAppender, CuiDocumentStyleAppender } from "../styles/appender";
import { CuiInstanceColorHandler } from "../../app/handlers/colors";
import { ICuiResizableObserver, CuiResizeObserver } from "../../app/observers/resize";

export class CuiUtils {
    interactions: IUIInteractionProvider;
    bus: ICuiEventBus;
    setup: CuiSetup;
    cache: ICuiManager<CuiCachable>;
    colors: CuiInstanceColorHandler;
    styleAppender: ICuiDocumentStyleAppender;
    #resizeObserver: ICuiResizableObserver;
    constructor(initialSetup: CuiSetupInit) {
        this.setup = new CuiSetup().fromInit(initialSetup);
        this.interactions = CuiInteractionsFactory.get(initialSetup.interaction)
        this.cache = new CuiCacheManager(this.setup.cacheSize);
        this.bus = new CuiEventBus(new TaskedEventEmitHandler(new CuiCallbackExecutor()));
        this.colors = new CuiInstanceColorHandler(this.interactions);
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
        let prop = replacePrefix(name, this.setup.prefix);
        document.documentElement.style.setProperty(prop, value);
    }
}