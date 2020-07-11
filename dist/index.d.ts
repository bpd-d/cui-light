import { CuiInit } from './app/initializer';
declare global {
    interface Window {
        cuiInit: CuiInit;
    }
}
