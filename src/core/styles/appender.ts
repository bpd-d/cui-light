import { is } from "../utils/functions";
import { CuiUtils } from "../models/utils";
import { IUIInteractionProvider } from "../models/interfaces";

export interface ICuiDocumentStyleAppender {
    append(style: string): boolean;
}

export class CuiDocumentStyleAppender implements ICuiDocumentStyleAppender {
    #interactions: IUIInteractionProvider;
    constructor(interactions: IUIInteractionProvider) {
        this.#interactions = interactions;
    }

    append(style: string): boolean {
        if (is(style)) {
            const head = document.head || document.getElementsByTagName('head')[0]
            const node = document.createElement('style');
            const text = document.createTextNode(style);
            node.type = 'text/css';
            node.appendChild(text);
            head.appendChild(node);
        }
        return true;
    }

}