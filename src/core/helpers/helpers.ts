import { IUIInteractionProvider } from "../models/interfaces";
import { ICuiComponentAction } from "../utils/actions";
import { CLASSES } from "../utils/statics";

export class CuiActionsHelper {
    #interactions: IUIInteractionProvider;
    constructor(interactions: IUIInteractionProvider) {
        this.#interactions = interactions;
    }

    async performAction(target: Element, action: ICuiComponentAction, timeout: number): Promise<boolean> {
        return new Promise((resolve) => {
            this.#interactions.mutate(() => {
                action.add(target);
                target.classList.add(CLASSES.animProgress);
                setTimeout(() => {
                    this.#interactions.mutate(() => {
                        action.remove(target);
                        target.classList.remove(CLASSES.animProgress);
                        resolve(true)
                    }, null)
                }, timeout)
            }, null)
        })
    }
}