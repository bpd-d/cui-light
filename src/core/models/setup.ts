import { CuiLogLevel, CuiInteractionsType } from "../utlis/types";
import { CuiColorSet } from "./color";

export class CuiSetup {
    prefix?: string;
    logLevel?: CuiLogLevel;
    cacheSize?: number;
    autoLightMode?: boolean;
    animationTime?: number;
    animationTimeShort?: number;
    animationTimeLong?: number;
    colorLight?: CuiColorSet;
    colorDark?: CuiColorSet;
    colorAccent?: CuiColorSet;
    colorSecondary?: CuiColorSet;
    colorSuccess?: CuiColorSet;
    colorError?: CuiColorSet;
    colorWarning?: CuiColorSet;
    plugins: any;

    constructor() {
        this.autoLightMode = false;
        this.plugins = {};
    }

    fromInit(init: CuiSetupInit): CuiSetup {
        this.prefix = init.prefix;
        this.logLevel = init.logLevel;
        this.cacheSize = init.cacheSize;
        this.autoLightMode = init.autoLightMode;
        this.animationTime = init.animationTime;
        this.animationTimeShort = init.animationTimeShort;
        this.animationTimeLong = init.animationTimeLong;
        this.colorLight = init.colorLight;
        this.colorDark = init.colorDark;
        this.colorAccent = init.colorAccent;
        this.colorSecondary = init.colorSecondary;
        this.colorSuccess = init.colorSuccess;
        this.colorError = init.colorError;
        this.colorWarning = init.colorWarning;
        return this;
    }
}


export class CuiSetupInit {
    prefix?: string;
    app?: string;
    interaction?: CuiInteractionsType;
    logLevel?: CuiLogLevel;
    cacheSize?: number;
    autoLightMode?: boolean;
    animationTime?: number;
    animationTimeShort?: number;
    animationTimeLong?: number;
    colorLight?: CuiColorSet;
    colorDark?: CuiColorSet;
    colorAccent?: CuiColorSet;
    colorSecondary?: CuiColorSet;
    colorSuccess?: CuiColorSet;
    colorError?: CuiColorSet;
    colorWarning?: CuiColorSet;

    constructor() {
        this.prefix = 'cui';
        this.app = '$cui';
        this.logLevel = 'warning';
        this.interaction = 'async';
        this.animationTime = 300;
        this.animationTimeShort = 150;
        this.animationTimeLong = 500;
        this.cacheSize = 500;
        this.autoLightMode = false;
    }
}