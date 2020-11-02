import { are, CSS_VARIABLES, CuiColor, CuiUtils } from "../../core/index";
import { PropertySet, PropertySetter } from "./setter";

interface BaseColorSet {
    background: string;
    base: string;
    active: string;
    muted: string;
    // border: string;
}

export interface BaseColors {
    background: CuiColor;
    base: CuiColor;
    active: CuiColor;
    muted: CuiColor;
    // border: string;
}

interface ThemeColorSet {
    base: string;
    muted: string;
    active: string;
    shade: string;
    shadeDark: string;
}

interface ThemeColors {
    base: CuiColor;
    muted: CuiColor;
    active: CuiColor;
    shade: CuiColor;
    shadeDark: CuiColor;
}

interface BaseColorSets {
    [id: string]: BaseColorSet;
}

interface ThemeColorSets {
    [id: string]: ThemeColorSet;
}

const baseColorSets: BaseColorSets = {
    "light": {
        background: CSS_VARIABLES.colorLightBackground,
        base: CSS_VARIABLES.colorLightBase,
        active: CSS_VARIABLES.colorLightActive,
        muted: CSS_VARIABLES.colorLightMuted,
        //  border: CSS_VARIABLES.colorLightBorder,
    },
    "dark": {
        background: CSS_VARIABLES.colorDarkBackground,
        base: CSS_VARIABLES.colorDarkBase,
        active: CSS_VARIABLES.colorDarkActive,
        muted: CSS_VARIABLES.colorDarkMuted,
        // border: CSS_VARIABLES.colorLightBorder,
    }
}

const themeColors: ThemeColorSets = {
    'accent': {
        base: CSS_VARIABLES.colorAccent,
        muted: CSS_VARIABLES.colorAccentMuted,
        active: CSS_VARIABLES.colorAccentActive,
        shade: CSS_VARIABLES.colorAccentShade,
        shadeDark: CSS_VARIABLES.colorAccentShadeDark
    },
    'secondary': {
        base: CSS_VARIABLES.colorSecondary,
        muted: CSS_VARIABLES.colorSecondaryMuted,
        active: CSS_VARIABLES.colorSecondaryActive,
        shade: CSS_VARIABLES.colorSecondaryShade,
        shadeDark: CSS_VARIABLES.colorSecondaryShadeDark
    },
    'error': {
        base: CSS_VARIABLES.colorError,
        muted: CSS_VARIABLES.colorErrorMuted,
        active: CSS_VARIABLES.colorErrorActive,
        shade: CSS_VARIABLES.colorErrorShade,
        shadeDark: CSS_VARIABLES.colorErrorShadeDark
    },
    'warning': {
        base: CSS_VARIABLES.colorWarning,
        muted: CSS_VARIABLES.colorWarningMuted,
        active: CSS_VARIABLES.colorWarningActive,
        shade: CSS_VARIABLES.colorWarningShade,
        shadeDark: CSS_VARIABLES.colorWarningShadeDark
    },
    'success': {
        base: CSS_VARIABLES.colorSuccess,
        muted: CSS_VARIABLES.colorSuccessMuted,
        active: CSS_VARIABLES.colorSuccessActive,
        shade: CSS_VARIABLES.colorSuccessShade,
        shadeDark: CSS_VARIABLES.colorSuccessShadeDark
    }
}


export class CuiBaseColorsSetter {
    #set: BaseColorSet;
    #setter: PropertySetter;
    constructor(colorSet: string, setter: PropertySetter) {
        this.#set = baseColorSets[colorSet];
        this.#setter = setter;
    }

    setBackgroundColor(color: CuiColor) {
        this.setColor(this.#set.background, color);
    }

    setBaseColor(color: CuiColor) {
        this.setColor(this.#set.base, color);
    }

    setActiveColor(color: CuiColor) {
        this.setColor(this.#set.active, color);
    }

    setMutedColor(color: CuiColor) {
        this.setColor(this.#set.muted, color);
    }

    setBaseColors(colors: BaseColors) {
        let set: PropertySet = {}
        set[this.#set.background] = colors.background ? colors.background.toCssString() : null;
        set[this.#set.active] = colors.active ? colors.active.toCssString() : null;
        set[this.#set.muted] = colors.muted ? colors.muted.toCssString() : null;
        set[this.#set.base] = colors.base ? colors.base.toCssString() : null;

        this.#setter.setProperties(set);
    }

    private setColor(color: string, value: CuiColor) {
        this.#setter.setProperty(color, value.toCssString());
    }
}


export class CuiThemeColorsSetter {
    #setter: PropertySetter;
    #set: ThemeColorSet;
    constructor(set: string, setter: PropertySetter) {
        this.#setter = setter;
        this.#set = themeColors[set];
    }

    setBaseColor(color: CuiColor) {
        this.setColor(this.#set.base, color);
    }

    setMutedColor(color: CuiColor) {
        this.setColor(this.#set.muted, color);
    }

    setActiveColor(color: CuiColor) {
        this.setColor(this.#set.active, color);
    }

    setShadeColor(color: CuiColor) {
        this.setColor(this.#set.shade, color);
    }

    setShadeDarkColor(color: CuiColor) {
        this.setColor(this.#set.shadeDark, color);
    }

    setColors(colors: ThemeColors) {
        let set: PropertySet = {}
        set[this.#set.shade] = colors.shade ? colors.shade.toCssString() : null;
        set[this.#set.shadeDark] = colors.shadeDark ? colors.shadeDark.toCssString() : null;
        set[this.#set.active] = colors.active ? colors.active.toCssString() : null;
        set[this.#set.muted] = colors.muted ? colors.muted.toCssString() : null;
        set[this.#set.base] = colors.base ? colors.base.toCssString() : null;

        this.#setter.setProperties(set);
    }

    setAutoColors(base: CuiColor) {
        let set: PropertySet = {}
        set[this.#set.base] = base.toCssString();
        set[this.#set.shade] = base.lighten(30).toCssString();
        set[this.#set.shadeDark] = base.darken(30).toCssString();
        set[this.#set.active] = base.darken(10).toCssString();
        set[this.#set.muted] = base.lighten(10).toCssString();
        this.#setter.setProperties(set);
    }

    private setColor(color: string, value: CuiColor) {
        this.#setter.setProperty(color, value.toCssString());
    }

}