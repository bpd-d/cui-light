import { CuiInit } from './init';
import { CUI_LIGHT_COMPONENTS_VERSION } from "cui-light-components/dist/esm/index";
import { CUI_LIGHT_PLUGINS_VERSION } from "cui-light-plugins/dist/esm/index";
import { CUI_CORE_VERSION } from "cui-light-core/dist/esm/index";

export const CUI_LIGHT_VERSION = "0.2.0";
export const CUI_LIGHT_CORE_VER = CUI_CORE_VERSION;
export const CUI_LIGHT_COMPONENTS_VER = CUI_LIGHT_COMPONENTS_VERSION;
export const CUI_LIGHT_PLUGINS_VER = CUI_LIGHT_PLUGINS_VERSION;

declare global {
    interface Window {
        cuiInit: CuiInit;
    }
}

export { CuiInstance } from './instance';
window.cuiInit = new CuiInit();