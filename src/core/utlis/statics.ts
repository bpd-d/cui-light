import { CuiLogLevel } from "./types";
import { CuiColorPair } from "../models/colors";

export const CLASSES = {
    dark: 'dark',
    animProgress: 'animation-progress',
    print: 'print'
}

export const ICONS: any = {
    close: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 1.9999999,1.9999999 18,18\"></path><path d=\"M 18,1.9999999 1.9999999,18\"></path></svg>",
    accordion: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 5.0000475,7.4490018 10.000024,12.551028 15,7.4490018\"></path></svg>",
    special_menu: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path class=\"menu_handle_2\" d=\"M 1,10 H 19\"></path><path class=\"menu_handle_1\" d=\"M 1,4.8571429 H 19\"></path><path  class=\"menu_handle_3\" d=\"M 1,15.142857 H 19\"></path></svg>",
    special_fail: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"special-fail\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle\" d=\"M 50,7.000001 A 43,43 0 0 1 92.999999,50 43,43 0 0 1 50,92.999999 43,43 0 0 1 7.0000011,50 43,43 0 0 1 50,7.000001 Z\"></path><path class=\"arm_1\" d=\"M 28.536809,28.536809 71.342023,71.342023\"></path><path class=\"arm_2\" d=\"M 71.342023,28.536809 28.536809,71.342023\"></path></svg>",
    special_success: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"special-success\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle\" d=\"M 50,7 A 43,43 0 0 1 93,50 43,43 0 0 1 50,93 43,43 0 0 1 7,50 43,43 0 0 1 50,7 Z\"></path><path class=\"arm\" d=\"M 22.988405,48.234784 36.946233,72.410453 75.516456,33.84023\"></path></svg>",
};

export const COLORS = ['red', 'green', 'blue', 'alpha']

export const CSS_APP_BACKGROUND_COLORS: CuiColorPair = {
    light: '--cui-color-light-app-background',
    dark: '--cui-color-dark-app-background'
}

export const CSS_COMPONENT_BACKGROUND_COLORS: CuiColorPair = {
    light: '--cui-color-light-background',
    dark: '--cui-color-dark-background '
}

export const CSS_COMPONENT_BORDER_COLORS: CuiColorPair = {
    light: '--cui-color-light-border',
    dark: '--cui-color-dark-border'
}

export const CSS_THEMES = {
    light: {
        base: '--cui-color-light-base',
        muted: '--cui-color-light-muted',
        active: '--cui-color-light-active'
    },
    dark: {
        base: '--cui-color-dark-base',
        muted: '--cui-color-dark-muted',
        active: '--cui-color-dark-active'
    },
    accent: {
        base: '--cui-color-primary',
        muted: '--cui-color-primary-muted',
        active: '--cui-color-primary-active'
    },
    secondary: {
        base: '--cui-color-secondary',
        muted: '--cui-color-secondary-muted',
        active: '--cui-color-secondary-active'
    },
    success: {
        base: '--cui-color-success',
        muted: '--cui-color-success-muted',
        active: '--cui-color-success-active'
    },
    warning: {
        base: '--cui-color-warning',
        muted: '--cui-color-warning-muted',
        active: '--cui-color-warning-active'
    },
    error: {
        base: '--cui-color-error',
        muted: '--cui-color-error-muted',
        active: '--cui-color-error-active'
    }
}


export class STATICS {
    static logLevel: CuiLogLevel = 'none';
    static prefix: string = 'cui';
}

export const EVENTS = {
    INSTANCE_INITIALIZED: 'instance-initialized',
    INSTANCE_FINISHED: 'instance=finished'
}