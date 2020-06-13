import { IUIInteractionProvider, ICuiCacheManager, ICuiEventBus } from "./interfaces";
import { CuiSetup, CuiSetupInit } from "./setup";
import { CuiInteractionsType, CuiLightMode } from "../utlis/types";
import { CuiInteractionsFactory } from "../factories/interactions";
import { CuiCacheManager } from "../../app/managers/cache";
import { CuiEventBus } from "../bus/bus";
import { TaskedEventEmitHandler } from "../bus/handlers";
import { CuiCallbackExecutor } from "../bus/executors";
import { getName } from "../utlis/functions";
import { CLASSES } from "../utlis/statics";
import { CuiInstanceColorHandler } from "../../app/handlers/colors";

export class CuiUtils {
    interactions: IUIInteractionProvider;
    bus: ICuiEventBus;
    setup: CuiSetup;
    cache: ICuiCacheManager;
    colors: CuiInstanceColorHandler;

    constructor(initialSetup: CuiSetupInit) {
        this.setup = new CuiSetup().fromInit(initialSetup);
        this.interactions = CuiInteractionsFactory.get(initialSetup.interaction)
        this.cache = new CuiCacheManager(this.setup.cacheSize);
        this.bus = new CuiEventBus(new TaskedEventEmitHandler(new CuiCallbackExecutor()));
        this.colors = new CuiInstanceColorHandler(this.interactions)
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

}