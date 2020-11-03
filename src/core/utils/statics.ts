import { CuiLogLevel } from "./types";
import { CuiColorPair } from "../models/colors";
import { counter } from "./functions";
export const CUID_ATTRIBUTE = "cuid";

export const CLASSES = {
    dark: 'dark',
    animProgress: 'animation-progress',
    print: 'print',
    active: 'active',
    swipingOn: "swiping-on",
    selectionOff: "selection-off",
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

export const SCOPE_SELECTOR = ":scope ";

export const CSS_VARIABLES: any = {
    fontSize: "--{prefix}-font-size",
    lineHeight: "--{prefix}-line-height",
    animationTime: "--{prefix}-animation-time",
    animationTimeLong: "--{prefix}-animation-time-long",
    animationTimeShort: "--{prefix}-animation-time-short",
    colorLightAppBackground: "--{prefix}-color-light-app-background",
    colorLightBackground: "--{prefix}-color-light-background",
    colorLightBorder: "--{prefix}-color-light-border",
    colorLightBase: "--{prefix}-color-light-base",
    colorLightActive: "--{prefix}-color-light-active",
    colorLightMuted: "--{prefix}-color-light-muted",
    colorDarkAppBackground: "--{prefix}-color-dark-app-background",
    colorDarkBackground: "--{prefix}-color-dark-background",
    colorDarkBorder: "--{prefix}-color-dark-border",
    colorDarkBase: "--{prefix}-color-dark-base",
    colorDarkActive: "--{prefix}-color-dark-active",
    colorDarkMuted: "--{prefix}-color-dark-muted",
    colorAccent: "--{prefix}-color-primary",
    colorAccentActive: "--{prefix}-color-primary-active",
    colorAccentMuted: "--{prefix}-color-primary-muted",
    colorAccentShade: "--{prefix}-color-primary-shade",
    colorAccentShadeDark: "--{prefix}-color-primary-shade-dark",
    colorSecondary: "--{prefix}-color-secondary",
    colorSecondaryActive: "--{prefix}-color-secondary-active",
    colorSecondaryMuted: "--{prefix}-color-secondary-muted",
    colorSecondaryShade: "--{prefix}-color-secondary-shade",
    colorSecondaryShadeDark: "--{prefix}-color-secondary-shade-dark",
    colorWarning: "--{prefix}-color-warning",
    colorWarningActive: "--{prefix}-color-warning-active",
    colorWarningMuted: "--{prefix}-color-warning-muted",
    colorWarningShade: "--{prefix}-color-warning-shade",
    colorWarningShadeDark: "--{prefix}-color-warning-shade-dark",
    colorSuccess: "--{prefix}-color-success",
    colorSuccessActive: "--{prefix}-color-success-active",
    colorSuccessMuted: "--{prefix}-color-success-muted",
    colorSuccessShade: "--{prefix}-color-success-shade",
    colorSuccessShadeDark: "--{prefix}-color-success-shade-dark",
    colorError: "--{prefix}-color-error",
    colorErrorActive: "--{prefix}-color-error-active",
    colorErrorMuted: "--{prefix}-color-error-muted",
    colorErrorShade: "--{prefix}-color-error-shade",
    colorErrorShadeDark: "--{prefix}-color-error-shade-dark",
    inputBackground: "--{prefix}-input-background-color",
    colorShade: "--{prefix}-color-shade",
    colorShadeDarker: "--{prefix}-color-shade-darker",
    colorShadeLight: "--{prefix}-color-shade-light",
    colorShadeLighter: "--{prefix}-color-shade-light-lighter",
    outline: "--{prefix}-outline",
    borderRadius: "--{prefix}-border-radius",
    padding: "--{prefix}-padding",
    margin: "--{prefix}-margin",
    scrollbarWidth: "--{prefix}-scrollbar-width",
    componentSpace: "--{prefix}-component-space",
    accordionIcon: "--{prefix}-accordion-icon"
}


export class STATICS {
    static logLevel: CuiLogLevel = 'none';
    static prefix: string = 'cui';
}

export const EVENTS = {
    INSTANCE_INITIALIZED: 'instance-initialized',
    INSTANCE_FINISHED: 'instance-finished',
    RESIZE: "resize",
    OPEN: "open",
    OPENED: "opened",
    CLOSE: "close",
    CLOSED: "closed",
    TOGGLE: "toggle",
    TOGGLED: 'toggled',
    SWITCH: "switch",
    SWITCHED: "switched",
    ON_SCROLL: "scroll",
    TARGET_CHANGE: 'targetchange',
    INTERSECTION: 'intersection',
    KEYDOWN: 'keydown',
    SCROLLBY: 'scrollby',
    WINDOW_CLICK: 'windowclick',
    OFFSET: 'offset',
    PROGRESS_CHANGE: "progresschange",
    PROGRESS_CHANGED: "progresschanged",
    CHANGE: "change",
    CHANGED: "changed",
    GLOBAL_MOVE: "globalmove",
    MOVE_LOCK: "movelock",
    PAUSE: "pause",
    PAUSED: "paused",
    SORTED: "sorted",
    SORT_START: "sortstart"
}

export const OBSERVABLE_SCROLL = "SCROLL";
export const OBSERVABLE_INTERSECTION = "INTERSECTION";
export const COMPONENTS_COUNTER = counter();