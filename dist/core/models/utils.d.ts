import { IUIInteractionProvider, ICuiCacheManager, ICuiEventBus } from "./interfaces";
import { CuiSetup, CuiSetupInit } from "./setup";
import { CuiLightMode } from "../utlis/types";
import { ICuiDocumentStyleAppender } from "../styles/appender";
import { CuiInstanceColorHandler } from "../../app/handlers/colors";
export declare class CuiUtils {
    interactions: IUIInteractionProvider;
    bus: ICuiEventBus;
    setup: CuiSetup;
    cache: ICuiCacheManager;
    colors: CuiInstanceColorHandler;
    styleAppender: ICuiDocumentStyleAppender;
    constructor(initialSetup: CuiSetupInit);
    setLightMode(mode: CuiLightMode): void;
    setPrintMode(flag: boolean): void;
}
