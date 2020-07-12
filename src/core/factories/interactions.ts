import { IUIInteractionProvider } from "../models/interfaces";
import { CuiInteractionsType } from "../utils/types";
import { FastDom, SyncInteractions } from "../utils/interactions";

export class CuiInteractionsFactory {
    /**
     * Gets new instance of component focused logger
     * @param type - Interactions type
     */
    public static get(type: CuiInteractionsType): IUIInteractionProvider {
        const interactionType = type;
        switch (interactionType) {
            case 'async':
                return new FastDom();
            default:
                return new SyncInteractions();
        }
    }
}