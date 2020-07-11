import { CuiLogLevel } from "./types";
import { CuiColorPair } from "../models/colors";
export declare const CLASSES: {
    dark: string;
    animProgress: string;
    print: string;
    active: string;
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
export declare const CSS_VARIABLES: any;
export declare class STATICS {
    static logLevel: CuiLogLevel;
    static prefix: string;
}
export declare const EVENTS: {
    INSTANCE_INITIALIZED: string;
    INSTANCE_FINISHED: string;
    ON_RESIZE: string;
    ON_OPEN: string;
    ON_CLOSE: string;
    ON_TOGGLE: string;
    ON_SCROLL: string;
    ON_TARGET_CHANGE: string;
    ON_INTERSECTION: string;
    ON_KEYDOWN: string;
    ON_SCROLLBY: string;
};
export declare const OBSERVABLE_SCROLL = "SCROLL";
export declare const OBSERVABLE_INTERSECTION = "INTERSECTION";
export declare const COMPONENTS_COUNTER: Generator<number, void, unknown>;
