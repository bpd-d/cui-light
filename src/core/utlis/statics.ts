import { CuiColorPair } from "../models/color";

export const CLASSES = {
    dark: 'dark',
    animProgress: 'animation-progress'
}

export const ATTRIBUTES = {
    icon: 'data-icon',
    scale: 'data-scale',
    spinner: 'data-spinner'
}

export const MUTATED_ATTRIBUTES = [ATTRIBUTES.icon, ATTRIBUTES.scale, ATTRIBUTES.spinner]
export const ICONS: any = {
    close: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 1.9999999,1.9999999 18,18\"></path><path d=\"M 18,1.9999999 1.9999999,18\"></path></svg>",
    accordion: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 5.0000475,7.4490018 10.000024,12.551028 15,7.4490018\"></path></svg>",
    special_fail: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"special-fail\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle\" d=\"M 50,7.000001 A 43,43 0 0 1 92.999999,50 43,43 0 0 1 50,92.999999 43,43 0 0 1 7.0000011,50 43,43 0 0 1 50,7.000001 Z\"></path><path class=\"arm_1\" d=\"M 28.536809,28.536809 71.342023,71.342023\"></path><path class=\"arm_2\" d=\"M 71.342023,28.536809 28.536809,71.342023\"></path></svg>",
    special_success: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"special-success\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle\" d=\"M 50,7 A 43,43 0 0 1 93,50 43,43 0 0 1 50,93 43,43 0 0 1 7,50 43,43 0 0 1 50,7 Z\"></path><path class=\"arm\" d=\"M 22.988405,48.234784 36.946233,72.410453 75.516456,33.84023\"></path></svg>",
    special_circle_progress: "<svg xmlns=\"http://www.w3.org/2000/svg\"  class=\"circle-progress\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle-progress-path\" d=\"M 50,5.3660047 A 44.867708,44.633994 0 0 1 94.867709,49.999997 44.867708,44.633994 0 0 1 50,94.633995 44.867708,44.633994 0 0 1 5.1322908,50.000001 44.867708,44.633994 0 0 1 50,5.3660047\"></path></svg>",
    special_circle_double: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"circle-double\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle-double-outer\" d=\"M 50.000002,6.1070619 A 44.867709,44.126654 0 0 1 94.867708,50.233712 44.867709,44.126654 0 0 1 50.000002,94.36037 44.867709,44.126654 0 0 1 5.132292,50.233717 44.867709,44.126654 0 0 1 50.000002,6.1070619\"></path><path class=\"circle-double-inner\" d=\"M 50.000001,15.59972 A 35.383463,34.633995 0 0 1 85.383464,50.233711 35.383463,34.633995 0 0 1 50.000001,84.86771 35.383463,34.633995 0 0 1 14.616536,50.233716 35.383463,34.633995 0 0 1 50.000001,15.59972\"></path></svg>"
};

export const COLORS = ['red', 'green', 'blue', 'alpha']

export const CSS_APP_BACKGROUND_COLORS: CuiColorPair = {
    light: '--color-light-app-background',
    dark: '--color-dark-app-background'
}

export const CSS_COMPONENT_BACKGROUND_COLORS: CuiColorPair = {
    light: '--color-light-background',
    dark: '--color-dark-background '
}

export const CSS_COMPONENT_BORDER_COLORS: CuiColorPair = {
    light: '--color-light-border',
    dark: '--color-dark-border'
}

export const CSS_THEMES = {
    light: {
        base: '--color-light-base',
        muted: '--color-light-muted',
        active: '--color-light-active'
    },
    dark: {
        base: '--color-dark-base',
        muted: '--color-dark-muted',
        active: '--color-dark-active'
    },
    accent: {
        base: '--color-primary',
        muted: '--color-primary-muted',
        active: '--color-primary-active'
    },
    secondary: {
        base: '--color-secondary',
        muted: '--color-secondary-muted',
        active: '--color-secondary-active'
    },
    success: {
        base: '--color-success',
        muted: '--color-success-muted',
        active: '--color-success-active'
    },
    warning: {
        base: '--color-warning',
        muted: '--color-warning-muted',
        active: '--color-warning-active'
    },
    error: {
        base: '--color-error',
        muted: '--color-error-muted',
        active: '--color-error-active'
    }
}
