import { CuiDevelopmentStateType, is } from "../../core/index";
import { CuiDevelopmentElement, ICuiDevelopmentTool } from "../../core/models/interfaces";

export class CuiDevelopmentToolManager implements ICuiDevelopmentTool {

    #tool: ICuiDevelopmentTool;
    constructor(tool?: ICuiDevelopmentTool) {
        this.#tool = tool;
    }

    pushState(cuid: string, component: string, type: CuiDevelopmentStateType, message: string, functionName?: string): void {
        if (!is(this.#tool)) {
            return;
        }
        this.#tool.pushState(cuid, component, type, message, functionName);
    }

    registerElement(element: HTMLElement, cuid: string, component: string): void {
        if (!is(this.#tool)) {
            return;
        }
        this.#tool.registerElement(element, cuid, component);
    }
    unregisterElement(cuid: string, component: string): void {
        if (!is(this.#tool)) {
            return;
        }
        this.#tool.unregisterElement(cuid, component);
    }

    setProperty<T>(cuid: string, component: string, name: string, t: T): void {
        if (!is(this.#tool)) {
            return;
        }
        this.#tool.setProperty(cuid, component, name, t);
    }
}