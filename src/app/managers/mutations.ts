import { ICuiMutationHandler, IUIInteractionProvider } from "../../core/models/interfaces";
import { is, getFirstAttributeStartingWith, getMutationAttribute } from "../../core/utlis/functions";
import { ATTRIBUTES } from "../../core/utlis/statics";
import { CuiIconHandler } from "../handlers/icon";
import { CuiSpinnerHandler } from "../handlers/spinner";
import { CuiCircleHandler } from "../handlers/circle";

export class CuiAttributeMutationHandler {
    public static get(element: any, interactions?: IUIInteractionProvider): ICuiMutationHandler {
        if (!is(element)) {
            return null;
        }
        let attribute = getMutationAttribute(element)?.name
        if (!is(attribute)) {
            return null;
        }
        switch (attribute) {
            case ATTRIBUTES.icon:
                return new CuiIconHandler(element, interactions);
            case ATTRIBUTES.spinner:
                return new CuiSpinnerHandler(element, interactions);
            case ATTRIBUTES.circle:
                return new CuiCircleHandler(element, interactions);
        }
        return null;
    }
}