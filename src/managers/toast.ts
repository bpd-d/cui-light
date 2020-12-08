import { IUIInteractionProvider } from "cui-light-core/dist/esm/models/interfaces";
import { is, sleep } from "cui-light-core/dist/esm/utils/functions";
import { CLASSES } from "cui-light-core/dist/esm/utils/statics";

export class CuiToastHandler {
    #interactions: IUIInteractionProvider;
    #selector: string;
    #className: string;
    #activeCls: string;
    #animationTime: number;
    #lock: boolean;
    #animClsIn: string;
    #animClsOut: string;
    constructor(interaction: IUIInteractionProvider, prefix: string, animationTime: number) {
        this.#interactions = interaction;
        this.#selector = `.${prefix}-toast`;
        this.#className = `${prefix}-toast`;
        this.#activeCls = `${prefix}-active`;
        this.#animationTime = animationTime;
        this.#lock = false;
        this.#animClsIn = `${prefix}-toast-animation-in`;
        this.#animClsOut = `${prefix}-toast-animation-out`
    }

    async show(message: string): Promise<boolean> {
        if (this.#lock) {
            return false;
        }
        this.#lock = true;
        let toastElement = document.querySelector(this.#selector);
        if (!is(toastElement)) {
            toastElement = document.createElement('div');
            toastElement.classList.add(this.#className);
            document.body.appendChild(toastElement);
            await sleep(10);
        }

        this.#interactions.mutate(() => {
            //@ts-ignore
            toastElement.textContent = message;
            //@ts-ignore
            toastElement.classList.add(CLASSES.animProgress);
            //@ts-ignore
            toastElement.classList.add(this.#animClsIn);
        }, this);

        await sleep(this.#animationTime);
        this.#interactions.mutate(() => {
            //@ts-ignore
            toastElement.classList.remove(CLASSES.animProgress);
            //@ts-ignore
            toastElement.classList.remove(this.#animClsIn);
            //@ts-ignore
            toastElement.classList.add(this.#activeCls);
        }, this)
        await sleep(3000);
        this.#interactions.mutate(() => {
            //@ts-ignore
            toastElement.classList.add(CLASSES.animProgress);
            //@ts-ignore
            toastElement.classList.add(this.#animClsOut);
        }, this)

        setTimeout(() => {
            this.#interactions.mutate(() => {
                //@ts-ignore
                toastElement.classList.remove(CLASSES.animProgress);
                //@ts-ignore
                toastElement.classList.remove(this.#animClsOut);
                //@ts-ignore
                toastElement.classList.remove(this.#activeCls);
            }, this)
            this.#lock = false;
        }, this.#animationTime);
        return true;
    }
}