import { CuiInit } from './init';
export declare const CUI_LIGHT_VERSION = "0.2.5";
export declare const CUI_LIGHT_CORE_VER: string;
export declare const CUI_LIGHT_COMPONENTS_VER = "0.2.7";
export declare const CUI_LIGHT_PLUGINS_VER = "0.2.6";
declare global {
    interface Window {
        cuiInit: CuiInit;
    }
}
export { CuiInstance } from './instance';
