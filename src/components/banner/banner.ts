import { AnimationDefinition, SWIPE_ANIMATIONS_DEFINITIONS } from "../../app/animation/definitions";
import { CuiInteractableArgs, CuiInteractableHandler } from "../../app/handlers/base";
import { CuiSwipeAnimationEngine } from "../../core/animation/engine";
import { boolStringOrDefault, CLASSES, EVENTS, getIntOrDefault, getStringOrDefault, ICuiParsable, replacePrefix } from "../../core/index";
import { CuiMoveEventListener, ICuiMoveEvent } from "../../core/listeners/move";
import { AriaAttributes } from "../../core/utils/aria";
import { ICuiComponent, CuiUtils, ICuiComponentHandler } from "../../index";

const BANNER_OPEN_ANIMATION: string = ".{prefix}-animation-fade-in";
const BANNER_CLOSE_ANIMATION: string = ".{prefix}-animation-fade-out";

export class CuiBannerArgs implements ICuiParsable, CuiInteractableArgs {
    timeout: number;
    swipe: boolean;

    openAct: string;
    closeAct: string;
    // Not in use
    escClose: boolean;
    keyClose: string;

    #defTimeout: number;
    #prefix: string;
    constructor(prefix: string, timeout: number) {
        this.#defTimeout = timeout;
        this.#prefix = prefix;

        this.escClose = false;
        this.keyClose = undefined;
    }


    parse(args: any) {
        this.swipe = boolStringOrDefault(args.swipe, false);
        this.escClose = false;
        this.keyClose = undefined;
        this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
        this.openAct = getStringOrDefault(args.openAct, replacePrefix(BANNER_OPEN_ANIMATION, this.#prefix))
        this.closeAct = getStringOrDefault(args.closeAct, replacePrefix(BANNER_CLOSE_ANIMATION, this.#prefix))
    }
}

export class CuiBanerComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;

    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-banner`;

    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiBannerHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiBannerHandler extends CuiInteractableHandler<CuiBannerArgs> {

    //  #moveListener: CuiMoveEventListener;
    #swipeEngine: CuiSwipeAnimationEngine;
    #isTracking: boolean;
    #startX: number;
    #ratio: number;
    #swipeAnimation: AnimationDefinition;
    #moveEventId: string;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiBannerHandler", element, attribute, new CuiBannerArgs(prefix, utils.setup.animationTime), utils);
        // this.#moveListener = new CuiMoveEventListener();
        // this.#moveListener.setCallback(this.onMove.bind(this));
        this.#swipeEngine = new CuiSwipeAnimationEngine(true);
        this.#swipeEngine.setOnFinish(this.onSwipeFinish.bind(this));
        this.#swipeEngine.setElement(this.element)
        this.#startX = -1;
        this.#ratio = 0;
        this.#swipeAnimation = SWIPE_ANIMATIONS_DEFINITIONS["fade"];
        this.#moveEventId = null;
    }

    onInit(): void {
        this.#moveEventId = this.onEvent(EVENTS.GLOBAL_MOVE, this.onMove.bind(this));
        if (this.isActive) {
            this.open();
        }
    }
    onUpdate(): void {

    }

    onDestroy(): void {
        this.detachEvent(EVENTS.GLOBAL_MOVE, this.#moveEventId);
    }

    onBeforeOpen(): boolean {
        return true;
    }
    onAfterOpen(): void {
        if (this.args.swipe) {
            this.#moveEventId = this.onEvent(EVENTS.GLOBAL_MOVE, this.onMove.bind(this));
        }
    }
    onAfterClose(): void {
        this.detachEvent(EVENTS.GLOBAL_MOVE, this.#moveEventId);
    }

    onBeforeClose(): boolean {
        return true;
    }

    onMove(data: ICuiMoveEvent) {
        if (this.isLocked) {
            return;
        }
        let current = this.element as HTMLElement;
        switch (data.type) {
            case "down":
                if (this.#isTracking || !current.contains((data.target as Node))) {
                    return;
                }
                this.#isTracking = true;
                this.#startX = data.x;
                this.helper.setClassesAs(document.body, CLASSES.swipingOn);
                break;
            case "up":
                if (!this.#isTracking && this.#ratio == 0) {
                    break;
                }
                // Lock component until animation is finished
                this.isLocked = true;
                let absRatio = Math.abs(this.#ratio);
                let timeout = absRatio * this.args.timeout;
                let back = absRatio <= 0.4;
                this.#swipeEngine.finish(absRatio, timeout, back);
                this.helper.removeClassesAs(document.body, CLASSES.swipingOn);
                this.#isTracking = false;
                break;
            case "move":
                if (this.#isTracking) {
                    let newRatio = (data.x - this.#startX) / current.offsetWidth;
                    if (this.#ratio >= 0 && newRatio <= 0 || this.#ratio <= 0 && newRatio > 0) {
                        this.#swipeEngine.setProps(newRatio > 0 ? this.#swipeAnimation.current.right : this.#swipeAnimation.current.left);
                    }
                    this.#ratio = newRatio;
                    this.mutate(() => {
                        this.#swipeEngine.update(Math.abs(this.#ratio));
                    })
                }
                break;
            default:
                break;
        }
    }

    onSwipeFinish(element: Element, reverted: boolean, error: boolean) {
        this.isLocked = false;
        if (!reverted) {
            this.helper.removeClass(this.activeClassName, this.element)
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
        }
        this.#ratio = 0;
        this.#startX = 0;

    }
}