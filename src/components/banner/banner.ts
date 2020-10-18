import { AnimationDefinition, SWIPE_ANIMATIONS_DEFINITIONS } from "../../app/animation/definitions";
import { CuiHandler } from "../../app/handlers/base";
import { CuiSwipeAnimationEngine } from "../../core/animation/engine";
import { boolStringOrDefault, EVENTS, getIntOrDefault, ICuiClosable } from "../../core/index";
import { CuiMoveEventListener, ICuiMoveEvent } from "../../core/listeners/move";
import { ICuiComponent, CuiUtils, ICuiComponentHandler } from "../../index";


export class CuiBannerArgs {
    timeout: number;
    swipe: boolean;

    #defTimeout: number;
    constructor(timeout: number) {
        this.#defTimeout = timeout;
    }

    parse(args: any) {
        this.swipe = boolStringOrDefault(args.swipe, false);
        this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
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

export class CuiBannerHandler extends CuiHandler<CuiBannerArgs> implements ICuiClosable {

    #eventId: string;
    #moveListener: CuiMoveEventListener;
    #swipeEngine: CuiSwipeAnimationEngine;
    #isTracking: boolean;
    #startX: number;
    #ratio: number;
    #animation: AnimationDefinition;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiBannerHandler", element, attribute, new CuiBannerArgs(utils.setup.animationTime), utils);
        this.#eventId = null;
        this.#moveListener = new CuiMoveEventListener();
        this.#moveListener.setCallback(this.onMove.bind(this));
        this.#swipeEngine = new CuiSwipeAnimationEngine(true);
        this.#swipeEngine.setOnFinish(this.onSwipeFinish.bind(this));
        this.#swipeEngine.setElement(this.element)
        this.#startX = -1;
        this.#ratio = 0;
        this.#animation = SWIPE_ANIMATIONS_DEFINITIONS["slide"];
    }


    onInit(): void {
        this.#eventId = this.onEvent(EVENTS.CLOSE, this.onClose.bind(this));
        if (!this.helper.hasClass(this.activeClassName, this.element)) {
            this.helper.setClassesAs(this.element, this.activeClassName);
        }
        if (this.args.swipe) {
            this.#moveListener.attach();
        }
    }

    onUpdate(): void {
        if (this.args.swipe && !this.#moveListener.isAttached()) {
            this.#moveListener.attach();
        } else if (!this.args.swipe && this.#moveListener.isAttached()) {
            this.#moveListener.detach();
        }
    }

    onDestroy(): void {
        this.detachEvent(EVENTS.CLOSE, this.#eventId);
        if (this.#moveListener.isAttached()) {
            this.#moveListener.detach();
        }
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
                this.#isTracking = false;
                break;
            case "move":
                if (this.#isTracking) {
                    let newRatio = (data.x - this.#startX) / current.offsetWidth;
                    if (this.#ratio >= 0 && newRatio <= 0 || this.#ratio <= 0 && newRatio > 0) {
                        console.log(this.#animation);
                        this.#swipeEngine.setProps(newRatio > 0 ? this.#animation.current.right : this.#animation.current.left);
                    }
                    this.#ratio = newRatio;
                    console.log(this.#ratio);
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
            this.close();
        }
        this.#ratio = 0;
        this.#startX = 0;

    }

    async close(args?: any): Promise<boolean> {
        if (this.isLocked) {
            return false;
        }
        if (this.helper.hasClass(this.activeClassName, this.element)) {
            this.helper.removeClassesAs(this.element, this.activeClassName);
        }
        this.emitEvent(EVENTS.CLOSED, {
            timestamp: Date.now(),
        })
        return true
    }

    onClose(ev: MouseEvent) {
        this.close();
    }
}