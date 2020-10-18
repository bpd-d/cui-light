import { PropsTypes } from "../../../core/animation/engine";
import { AnimationProperty } from "../../../core/animation/interfaces";

export interface AnimationDefinition {
    previous: DefinitionItem;
    current: DefinitionItem;
}

export interface DefinitionItem {
    left: AnimationProperty<PropsTypes>;
    right: AnimationProperty<PropsTypes>
}