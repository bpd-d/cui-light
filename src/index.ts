import { CuiInit } from './app/initializer';


declare global {
    interface Window {
        cuiInit: CuiInit;
    }
}

export * from "./core/models/interfaces";
export * from './core/models/events';
export * from './core/models/setup';
export * from './core/models/utils';
export * from './app/initializer'
export { CuiInstance } from './app/instance';

window.cuiInit = new CuiInit();