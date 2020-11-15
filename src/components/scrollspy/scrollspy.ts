import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../app/handlers/base";
import { ICuiComponentAction, CuiActionsListFactory } from "../../core/utils/actions";
import { getRangeValueOrDefault, getStringOrDefault, isStringTrue, getIntOrDefault } from "../../core/utils/functions";
import { EVENTS, SCOPE_SELECTOR } from "../../core/utils/statics";
import { CuiIntersectionListener } from "../../core/intersection/intersection";
import { CuiIntersectionResult } from "../../core/intersection/interfaces";
import { CuiElementBoxFactory, CuiElementBoxType, ICuiElementBox } from "../../core/models/elements";
import { CuiScrollSpyModeHandlerFactory, CuiScrollspyUpdateResult, ICuiScrollspyModeHandler } from "./mode";

const DEFAULT_SELECTOR = "> *";

export interface CuiScrollspyScrollEvent {
    top: number;
    left: number;
    scrolling: boolean;
    initial: boolean;
    source: string;
    timestamp: number;
}

export interface CuiScrollspyTargetChangeEvent {
    intersecting: HTMLElement[];
    timestamp: number;
}

export interface CuiScrollSpyAttribute {
    selector?: string;
    action?: string;
    link?: string;
    linkAction?: string;
    ratio: number;
    threshold: number;
}


export class CuiScrollSpyArgs {
    selector: string; // Child selector
    action: string; // Action to be performed on intersecting elements
    link?: string; // Link selector
    linkAction?: string; //Actions to be triggered on link
    ratio: number; // Value 0..1 telling how much of a child view must be in view to be added to intersecting items
    isRoot: boolean; // Attach to window or element
    mode: "single" | "multi"; // Action is triggered on single (last) intersecting item or all intersecting items
    threshold: number; // Threshold value (in px) for scroll listener

    constructor() {
        this.ratio = 0;
        this.mode = "single";
        this.threshold = -1
    }
    parse(args: any) {
        this.selector = `${SCOPE_SELECTOR}${args.selector ?? DEFAULT_SELECTOR}`;
        this.action = getStringOrDefault(args.action, null);
        this.link = getStringOrDefault(args.link, null);
        this.linkAction = getStringOrDefault(args.linkAction, null);
        this.ratio = getRangeValueOrDefault(parseFloat(args.ratio), 0, 1, 0);
        this.isRoot = isStringTrue(args.isRoot);
        this.mode = args?.mode === 'multi' ? "multi" : "single";
        this.threshold = getIntOrDefault(args.threshold, -1);
    }
}
export class CuiScrollspyComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-scrollspy`;
    }

    getStyle(): string {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiScrollspyHandler(element, utils, this.attribute);
    }
}

export class CuiScrollspyHandler extends CuiHandler<CuiScrollSpyArgs> {
    #listener: CuiIntersectionListener;
    #links: HTMLElement[];
    #actions: ICuiComponentAction[];
    #linkActions: ICuiComponentAction[];
    #root: CuiElementBoxType;
    #rootBox: ICuiElementBox;
    #modeHandler: ICuiScrollspyModeHandler;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiScrollspyHandler", element, attribute, new CuiScrollSpyArgs(), utils);
        this.element = element as HTMLElement;
        this.#listener = new CuiIntersectionListener(this.element, { threshold: this.utils.setup.scrollThreshold });
        this.#links = [];
        this.#actions = [];
        this.#linkActions = [];
        this.#root = null;
    }

    onInit(): void {
        this.parseAttribute();
        this.#listener.setCallback(this.onIntersection.bind(this));
        this.#listener.attach();
    }

    onUpdate(): void {
        this.updateAttributes();
    }

    onDestroy(): void {
        this.#listener.detach();
    }

    private onIntersection(ev: CuiIntersectionResult): void {
        let timestamp = Date.now();
        this.mutate(() => {
            let updateResult: CuiScrollspyUpdateResult = this.#modeHandler.update(ev.items, this.args.ratio, this.#actions, this.#links, this.#linkActions)
            if (updateResult.changed) {
                this.emitEvent(EVENTS.TARGET_CHANGE, {
                    intersecting: updateResult.intersecting,
                    timestamp: timestamp
                })
            }
        })
        this.emitEvent(EVENTS.ON_SCROLL, {
            top: ev.top,
            left: ev.left,
            scrolling: ev.scrolling,
            initial: ev.initial,
            source: ev.source,
            timestamp: timestamp,
        })
    }

    private parseAttribute() {
        this.#root = this.args.isRoot ? window : this.element;
        this.#rootBox = CuiElementBoxFactory.get(this.#root);
        let targets = this.args.selector ? this.#rootBox.queryAll(this.args.selector) : [];
        this.#listener.setChildren(targets);
        this.#listener.setThreshold(this.args.threshold);
        this.#links = this.args.link ? [...document.querySelectorAll<HTMLElement>(this.args.link)] : [];
        this.#actions = CuiActionsListFactory.get(this.args.action);
        this.#linkActions = CuiActionsListFactory.get(this.args.linkAction);
        this.#modeHandler = CuiScrollSpyModeHandlerFactory.get(this.args.mode);

    }

    private updateAttributes() {
        if (this.args.isRoot !== this.prevArgs.isRoot) {
            this.#root = this.args.isRoot ? window : this.element;
            this.#rootBox = CuiElementBoxFactory.get(this.#root);
            this.#listener.setParent(this.#root);
        }
        if (this.args.selector !== this.prevArgs.selector) {
            let targets = this.args.selector ? this.#rootBox.queryAll(this.args.selector) : [];
            this.#listener.setChildren(targets);
        }
        this.#listener.setThreshold(this.args.threshold);
        this.#links = this.args.link ? [...document.querySelectorAll<HTMLElement>(this.args.link)] : [];
        this.#actions = CuiActionsListFactory.get(this.args.action);
        this.#linkActions = CuiActionsListFactory.get(this.args.linkAction);
        this.#modeHandler = CuiScrollSpyModeHandlerFactory.get(this.args.mode);

    }
}