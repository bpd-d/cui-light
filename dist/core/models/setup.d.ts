import { CuiLogLevel, CuiInteractionsType } from "../utlis/types";
export declare class CuiSetup {
    prefix?: string;
    logLevel?: CuiLogLevel;
    cacheSize?: number;
    autoLightMode?: boolean;
    animationTime?: number;
    animationTimeShort?: number;
    animationTimeLong?: number;
    plugins: any;
    constructor();
    fromInit(init: CuiSetupInit): CuiSetup;
}
export declare class CuiSetupInit {
    prefix?: string;
    app?: string;
    interaction?: CuiInteractionsType;
    logLevel?: CuiLogLevel;
    cacheSize?: number;
    autoLightMode?: boolean;
    animationTime?: number;
    animationTimeShort?: number;
    animationTimeLong?: number;
    constructor();
}
