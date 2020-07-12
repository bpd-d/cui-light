import { ICuiComponentAction } from "../utils/actions";

export interface CuiTargetChangeEvent {
    top: number;
    left: number;
    target: Element;
    timestamp: number;
}

export interface CuiToggleEvent {
    action: ICuiComponentAction;
    target: Element;
    timestamp: number;
}

export interface CuiScrollByEvent {
    to: number;
    by: number;
    target: Element;
    parent: Element;
    timestamp: number;
}