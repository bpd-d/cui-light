import { ICuiMutationHandler } from "../../core/models/interfaces";
import { is, getFirstAttributeStartingWith } from "../../core/utlis/functions";
import { ATTRIBUTES } from "../../core/utlis/statics";
import { CuiIconHandler } from "../handlers/icon";
import { CuiSpinnerHandler } from "../handlers/spinner";

export class CuiAttributeMutationHandler {
    public static get(element: any): ICuiMutationHandler {
        if (!is(element)) {
            return null;
        }
        let attribute = getFirstAttributeStartingWith(element, 'data')
        if (!is(attribute)) {
            return null;
        }
        switch (attribute.name) {
            case ATTRIBUTES.icon:
                return new CuiIconHandler(element);
            case ATTRIBUTES.scale:
                return new CuiIconHandler(element);
            case ATTRIBUTES.spinner:
                return new CuiSpinnerHandler(element);
        }
        return null;
    }
}