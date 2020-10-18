import { ICuiComponent, ICuiComponentHandler, ICuiParsable, ICuiSwitchable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiChildMutation, CuiMutableHandler } from "../../app/handlers/base";
import { is, getStringOrDefault, getIntOrDefault, isInRange, EVENTS, getChildrenHeight, SCOPE_SELECTOR, CLASSES } from "../../core/index";
import { ICuiTask, CuiTaskRunner } from "../../core/utils/task";
import { CuiMoveEventListener, ICuiMoveEvent } from "../../core/listeners/move";
import { CuiSwipeAnimationEngine } from "../../core/animation/engine";
import { AnimationDefinition, SWIPE_ANIMATIONS_DEFINITIONS } from "../../app/animation/definitions";

/**
 * 
 *   targets: string - slider elements
 *   timeout: number - animation timeout
 *   links: string; - link to switcher (indicator, tab, etc)
 *   autoTimeout: number - if defined, slider will switch item automatically
 *   height: 'auto' | string - element height
 *      animation: string - animation name
 */
const SWITCH_DEFAULT_TARGETS = "> li";

export class CuiSliderArgs implements ICuiParsable {
    targets: string;
    timeout: number;
    links: string;
    autoTimeout: number;
    height: 'auto' | string;
    animation: string;

    #prefix: string;
    #defTimeout: number;
    constructor(prefix: string, timeout: number) {
        this.#prefix = prefix;
        this.#defTimeout = timeout;
    }

    parse(args: any): void {
        this.targets = getStringOrDefault(args.targets, SCOPE_SELECTOR + SWITCH_DEFAULT_TARGETS)
        this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
        this.links = args.links;
        this.autoTimeout = getIntOrDefault(args.autoTimeout, -1);
        this.height = getStringOrDefault(args.height, 'auto')
        this.animation = getStringOrDefault(args.animation, 'slide');
    }

}

export class CuiSliderComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-slider`;
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiSliderHandler(element, utils, this.attribute);
    }
}

export class CuiSliderHandler extends CuiMutableHandler<CuiSliderArgs> implements ICuiSwitchable {
    #targets: Element[];
    #currentIdx: number;
    #links: Element[];
    #task: ICuiTask;
    #switchEventId: string;
    #moveListener: CuiMoveEventListener;
    #isTracking: boolean;
    #startX: number;
    #ratio: number;
    #nextIdx: number;
    #nextElement: HTMLElement;
    #ratioThreshold: number;
    #currSlider: CuiSwipeAnimationEngine;
    #nextSlider: CuiSwipeAnimationEngine;
    #animationDef: AnimationDefinition;
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiSliderHandler", element, attribute, new CuiSliderArgs(utils.setup.prefix, utils.setup.animationTime), utils);
        this.#targets = [];
        this.#currentIdx = -1;
        this.#nextIdx = -1;
        this.#links = [];
        this.#switchEventId = null;
        this.#isTracking = false;
        this.#startX = -1;
        this.#moveListener = new CuiMoveEventListener();
        this.#ratio = 0;
        this.#nextElement = null;
        this.#ratioThreshold = 0.5;
        this.#currSlider = new CuiSwipeAnimationEngine();
        this.#nextSlider = new CuiSwipeAnimationEngine();
        this.#currSlider.setOnFinish(this.onAnimationFinish.bind(this));
    }

    onInit(): void {
        this.#switchEventId = this.onEvent(EVENTS.SWITCH, this.onPushSwitch.bind(this))
        this.getTargets();
        this.getLinks();
        this.getActiveIndex();
        this.setLinkActive(-1, this.#currentIdx);
        this.#moveListener.setCallback(this.onMove.bind(this));
        this.#moveListener.preventDefault(true);
        this.#moveListener.attach();
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(this.#targets[this.#currentIdx]))
        })
        this.#task = new CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next'));
        this.#animationDef = SWIPE_ANIMATIONS_DEFINITIONS[this.args.animation];
        this.startTask();
    }

    onUpdate(): void {
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(this.#targets[this.#currentIdx]))
        })
        this.#animationDef = SWIPE_ANIMATIONS_DEFINITIONS[this.args.animation];
        this.startTask();
    }

    onDestroy(): void {
        this.#task.stop();
        this.#moveListener.detach();
        this.detachEvent(EVENTS.SWITCH, this.#switchEventId)
    }

    onMutation(record: CuiChildMutation): void {

    }
    /**
     * Move listener callback
     * @param data move listener data
     */
    onMove(data: ICuiMoveEvent) {
        if (this.isLocked || !this.#animationDef) {
            return;
        }
        let current = this.#targets[this.#currentIdx] as HTMLElement;
        switch (data.type) {
            case "down":
                if (this.#isTracking || !current.contains((data.target as Node))) {
                    return;
                }
                this.#isTracking = true;
                this.#startX = data.x;
                this.#currSlider.setElement(current);
                break;
            case "up":
                if (!this.#isTracking) {
                    break;
                }
                // Lock component until animation is finished
                this.isLocked = true;
                let absRatio = Math.abs(this.#ratio);
                let timeout = absRatio * this.args.timeout;
                let back = absRatio <= this.#ratioThreshold;
                this.#currSlider.finish(absRatio, timeout, back);
                this.#nextSlider.finish(absRatio, timeout, back);
                this.#isTracking = false;
                break;
            case "move":
                if (this.#isTracking) {
                    this.#ratio = (data.x - this.#startX) / current.offsetWidth;
                    let nextIdx = this.getNextIndex(this.#ratio > 0 ? "next" : "prev");
                    if (nextIdx !== this.#nextIdx) {
                        this.#nextElement && this.helper.removeClass(CLASSES.animProgress, this.#nextElement);
                        this.#nextElement = this.#targets[nextIdx] as HTMLElement;
                        this.#nextIdx = nextIdx;

                        this.#nextSlider.setElement(this.#nextElement)
                        this.#nextSlider.setProps(this.#ratio > 0 ? this.#animationDef.previous.right : this.#animationDef.previous.left);
                        this.#currSlider.setProps(this.#ratio > 0 ? this.#animationDef.current.right : this.#animationDef.current.left);
                        this.mutate(() => {
                            this.helper.setClass(CLASSES.animProgress, this.#nextElement);
                        })
                    }
                    this.mutate(() => {
                        this.#currSlider.update(Math.abs(this.#ratio));
                        this.#nextSlider.update(Math.abs(this.#ratio));
                    })
                }
                break;
            default:
                break;
        }

    }

    async switch(index: any): Promise<boolean> {
        if (this.isLocked) {
            return false;
        }
        this.onPushSwitch(index);
        return true;
    }

    /**
     * 
     * @param element element this animation was perfromed on
     * @param reverted - flag inidicating whether animation was performed to the end or reverted back to start
     * @param errorOccured - tells whether animation was finished with error
     */
    onAnimationFinish(element: Element, reverted: boolean, errorOccured: boolean) {
        this.isLocked = false;
        // If not go back or from push then switch, else was go back
        let next = this.#targets[this.#nextIdx];
        let current = this.#targets[this.#currentIdx];
        if (!reverted) {
            if (this.#nextIdx > -1) {
                this.mutate(() => {
                    this.helper.removeClass(CLASSES.animProgress, next);
                    this.helper.setClass(this.activeClassName, next);
                    this.helper.removeClass(this.activeClassName, current);
                    this.helper.removeAttribute("style", current);
                    this.helper.removeAttribute("style", next);
                    this.setLinkActive(this.#currentIdx, this.#nextIdx);
                    this.emitEvent(EVENTS.SWITCHED, {
                        timestamp: Date.now(),
                        index: this.#nextIdx
                    })
                    this.#currentIdx = this.#nextIdx;
                    this.#nextIdx = -1;

                })
            }
        } else {
            this.helper.removeClass(CLASSES.animProgress, this.#nextElement);
            this.helper.removeAttribute("style", current);
            this.helper.removeAttribute("style", this.#nextElement);
            this.#nextIdx = -1;
        }
        this.#nextElement = null;
        this.#startX = -1;
        this.#ratio = 0;

    }

    onPushSwitch(index: string) {
        if (this.isLocked || !this.#animationDef) {
            return;
        }
        this.isLocked = true;
        let nextIdx = this.getNextIndex(index);
        if (nextIdx == this.#currentIdx || nextIdx < 0 || nextIdx >= this.#targets.length) {
            this._log.warning(`Index ${index} is not within the suitable range`);
            return false;
        }
        this.#nextIdx = nextIdx;
        let current = this.#targets[this.#currentIdx];
        let next = this.#targets[this.#nextIdx];
        this.#currSlider.setElement(current);
        this.#nextSlider.setElement(next);
        this.#currSlider.setProps(this.#animationDef.current.right);
        this.#nextSlider.setProps(this.#animationDef.previous.right);
        this.mutate(() => {
            this.#currSlider.finish(0, this.args.timeout, false);
            this.#nextSlider.finish(0, this.args.timeout, false);
            this.helper.setClass(CLASSES.animProgress, next);
        })

    }

    getActiveIndex(): void {
        this.#currentIdx = is(this.#targets) ? this.#targets.findIndex(target => this.helper.hasClass(this.activeClassName, target)) : -1;
    }

    getNextIndex(val: any): number {
        let idx = -1;
        switch (val) {
            case 'prev':
                idx = this.#currentIdx <= 0 ? this.#targets.length - 1 : this.#currentIdx - 1;
                break;
            case 'next':
                idx = this.#currentIdx < this.#targets.length - 1 ? this.#currentIdx + 1 : 0
                break;
            case 'first':
                idx = 0;
                break;
            case 'last':
                idx = this.#targets.length - 1;
            default:
                idx = getIntOrDefault(val, -1);
                break;
        }
        return idx;
    }

    getElementHeight(current: Element): string {
        if (!is(this.args.height) || this.args.height === 'auto') {
            return getChildrenHeight(current) + "px";
        } else {
            return this.args.height;
        }
    }

    getTargets() {
        let t = this.element.querySelectorAll(this.args.targets);
        this.#targets = t.length > 0 ? [...t] : [];
    }

    /**
     * Get linked switcher elements
     */
    getLinks() {
        this.#links = is(this.args.links) ? [...document.querySelectorAll(this.args.links)] : []
    }

    /**
     * Set active class on linked switcher if set
     * @param current - current index (to remove active from)
     * @param next - next index (to set action on)
     */
    setLinkActive(current: number, next: number) {
        if (!is(this.#links)) {
            return
        }
        this.mutate(() => {
            if (isInRange(current, 0, this.#links.length - 1)) {
                this.helper.removeClass(this.activeClassName, this.#links[current])
            }
            if (isInRange(next, 0, this.#links.length - 1)) {
                this.helper.setClass(this.activeClassName, this.#links[next])
            }
        })

    }

    /**
     * Runs task if arguments setup allows for it - auto flag must be set to true 
     */
    startTask() {
        this.#task.stop();
        if (this.args.autoTimeout) {
            this.#task.start();
        }
    }
}
