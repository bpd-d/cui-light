import { CuiInit } from './app/initializer';
//import "../node_modules/cui-styles/styles/style.scss";
declare global {
    interface Window {
        cuiInit: CuiInit;
    }
}

window.cuiInit = new CuiInit();