import { IUIInteractionProvider, ICuiEventBus, ICuiManager, CuiCachable } from "./interfaces";
import { CuiSetup, CuiSetupInit } from "./setup";
import { CuiLightMode } from "../utlis/types";
import { ICuiDocumentStyleAppender } from "../styles/appender";
import { CuiInstanceColorHandler } from "../../app/handlers/colors";
export declare class CuiUtils {
    #private;
    interactions: IUIInteractionProvider;
    bus: ICuiEventBus;
    setup: CuiSetup;
    cache: ICuiManager<CuiCachable>;
    colors: CuiInstanceColorHandler;
    styleAppender: ICuiDocumentStyleAppender;
    constructor(initialSetup: CuiSetupInit);
    setLightMode(mode: CuiLightMode): void;
    getLightMode(): CuiLightMode;
    setPrintMode(flag: boolean): void;
    isPrintMode(): boolean;
    setProperty(name: string, value: string): void;
}
