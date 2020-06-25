import { CuiLogLevel } from "./types";
import { CuiColorPair } from "../models/colors";
export declare const CLASSES: {
    dark: string;
    animProgress: string;
    print: string;
};
export declare const ICONS: any;
export declare const COLORS: string[];
export declare const CSS_APP_BACKGROUND_COLORS: CuiColorPair;
export declare const CSS_COMPONENT_BACKGROUND_COLORS: CuiColorPair;
export declare const CSS_COMPONENT_BORDER_COLORS: CuiColorPair;
export declare const CSS_THEMES: {
    light: {
        base: string;
        muted: string;
        active: string;
    };
    dark: {
        base: string;
        muted: string;
        active: string;
    };
    accent: {
        base: string;
        muted: string;
        active: string;
    };
    secondary: {
        base: string;
        muted: string;
        active: string;
    };
    success: {
        base: string;
        muted: string;
        active: string;
    };
    warning: {
        base: string;
        muted: string;
        active: string;
    };
    error: {
        base: string;
        muted: string;
        active: string;
    };
};
export declare class STATICS {
    static logLevel: CuiLogLevel;
    static prefix: string;
}
export declare const EVENTS: {
    INSTANCE_INITIALIZED: string;
    INSTANCE_FINISHED: string;
};
