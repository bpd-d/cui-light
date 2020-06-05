import { IUIInteractionProvider } from "../../core/models/interfaces";
import { is, sleep } from "../../core/utlis/functions";
import { DefaultSetup } from "../defaults/setup";
import { CLASSES } from "../../core/utlis/statics";

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
        }

        this.#interactions.mutate(() => {
            toastElement.innerHTML = message;
            toastElement.classList.add(CLASSES.animProgress);
            toastElement.classList.add(this.#animClsIn);
        }, this);

        await sleep(this.#animationTime);
        this.#interactions.mutate(() => {
            toastElement.classList.remove(CLASSES.animProgress);
            toastElement.classList.remove(this.#animClsIn);
            toastElement.classList.add(this.#activeCls);
        }, this)
        await sleep(3000);
        this.#interactions.mutate(() => {
            toastElement.classList.add(CLASSES.animProgress);
            toastElement.classList.add(this.#animClsOut);
        }, this)

        setTimeout(() => {
            this.#interactions.mutate(() => {
                toastElement.classList.remove(CLASSES.animProgress);
                toastElement.classList.remove(this.#animClsOut);
                toastElement.classList.remove(this.#activeCls);
            }, this)
            this.#lock = false;
        }, this.#animationTime);
        return true;
    }
}