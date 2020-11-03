import { ICuiComponent, ICuiComponentHandler, ICuiParsable, ICuiSwitchable, CuiElement } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiComponentBase, CuiHandler, CuiChildMutation, CuiMutableHandler } from "../../app/handlers/base";
import { ICuiComponentAction, is, getStringOrDefault, CuiActionsFatory, replacePrefix, getIntOrDefault, isInRange, isStringTrue, EVENTS, getChildrenHeight, SCOPE_SELECTOR, calculateNextIndex } from "../../core/index";
import { ICuiTask, CuiTaskRunner } from "../../core/utils/task";

const SWITCH_DEFAULT_ACTION_IN = ".{prefix}-switch-animation-default-in";
const SWITCH_DEFAULT_ACTION_OUT = ".{prefix}-switch-animation-default-out";
const SWITCH_DEFAULT_TARGETS = "> li";

export class CuiSwitchArgs implements ICuiParsable {

    targets: string;
    in: ICuiComponentAction;
    out: ICuiComponentAction;
    timeout: number;
    links: string;
    switch: string;
    autoTimeout: number;
    height: 'auto' | string;

    #prefix: string;
    #defTimeout: number;
    constructor(prefix: string, timeout: number) {
        this.#prefix = prefix;
        this.#defTimeout = timeout;
    }

    parse(args: any): void {
        this.targets = getStringOrDefault(args.targets, SCOPE_SELECTOR + SWITCH_DEFAULT_TARGETS)
        this.in = CuiActionsFatory.get(args.in ?? replacePrefix(SWITCH_DEFAULT_ACTION_IN, this.#prefix))
        this.out = CuiActionsFatory.get(args.out ?? replacePrefix(SWITCH_DEFAULT_ACTION_OUT, this.#prefix))
        this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
        this.links = args.links;
        this.switch = args.switch;
        this.autoTimeout = getIntOrDefault(args.autoTimeout, -1);
        this.height = getStringOrDefault(args.height, 'auto')
    }

}

export class CuiSwitchComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-switch`;
    }

    getStyle(): string {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiSwitchHandler(element, utils, this.attribute);
    }
}

export class CuiSwitchHandler extends CuiMutableHandler<CuiSwitchArgs> implements ICuiSwitchable {
    #targets: Element[];
    #currentIdx: number;
    #links: Element[];
    #switches: CuiElement[];
    #task: ICuiTask;
    #switchEventId: string;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiSwitchHandler", element, attribute, new CuiSwitchArgs(utils.setup.prefix, utils.setup.animationTime), utils);
        this.#targets = [];
        this.#currentIdx = -1;
        this.#links = [];
        this.#switches = [];
        this.#switchEventId = null;

    }

    onInit(): void {
        this.#switchEventId = this.onEvent(EVENTS.SWITCH, this.onPushSwitch.bind(this))
        this.getTargets();
        this.getLinks();
        this.getActiveIndex();
        this.getSwitches();
        this.setSwitchesActive(this.#currentIdx);
        this.setLinkActive(-1, this.#currentIdx);
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(this.#targets[this.#currentIdx]))
        })
        this.#task = new CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next'));
        this.startTask();
    }

    onUpdate(): void {
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(this.#targets[this.#currentIdx]))
        })
        this.startTask();
    }

    onDestroy(): void {
        this.#task.stop();
        this.detachEvent(EVENTS.SWITCH, this.#switchEventId)
    }

    onMutation(record: CuiChildMutation): void {
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(this.#targets[this.#currentIdx]))
        })
    }

    async switch(index: any): Promise<boolean> {
        if (this.isLocked) {
            return false;
        }
        this.getTargets();
        this.getLinks();
        this.getSwitches();
        this.getActiveIndex();
        let nextIdx = calculateNextIndex(index, this.#currentIdx, this.#targets.length);
        if (nextIdx == this.#currentIdx || nextIdx < 0 || nextIdx >= this.#targets.length) {
            this._log.warning(`Index ${index} is not within the suitable range`);
            return false;
        }
        this.isLocked = true;
        this.setSwitchesActive(nextIdx);
        let nextItem = this.#targets[nextIdx];

        await this.actionsHelper.performSwitchAction(nextItem,
            this.#currentIdx > -1 ? this.#targets[this.#currentIdx] : null,
            this.args.in,
            this.args.out,
            () => {
                nextItem.classList.add(this.activeClassName);
                if (this.#currentIdx > -1)
                    this.#targets[this.#currentIdx].classList.remove(this.activeClassName)
                this.setLinkActive(this.#currentIdx, nextIdx);
                this.helper.setStyle(this.element, 'height', this.getElementHeight(nextItem))
                this.startTask();
                this.isLocked = false;
            },
            this.args.timeout,
        )
        this.emitEvent(EVENTS.SWITCHED, {
            timestamp: Date.now(),
            index: nextIdx
        })
        return true;

    }

    onPushSwitch(index: string) {
        this.switch(index);
    }

    getActiveIndex(): void {
        this.#currentIdx = is(this.#targets) ? this.#targets.findIndex(target => this.helper.hasClass(this.activeClassName, target)) : -1;
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

    getLinks() {
        this.#links = is(this.args.links) ? [...document.querySelectorAll(this.args.links)] : []
    }

    getSwitches() {
        let s = is(this.args.switch) ? document.querySelectorAll(this.args.switch) : null;
        this.#switches = [];
        if (s) {
            s.forEach(sw => {
                this.#switches.push(<CuiElement>(sw as any))
            })
        }
    }

    setLinkActive(current: number, next: number) {
        if (!is(this.#links)) {
            return
        }
        if (isInRange(current, 0, this.#links.length - 1)) {
            this.helper.removeClass(this.activeClassName, this.#links[current])
        }
        if (isInRange(next, 0, this.#links.length - 1)) {
            this.helper.setClass(this.activeClassName, this.#links[next])
        }
    }
    /**
     * Sets propers active state on attached switches
     * @param index 
     */

    setSwitchesActive(index: number) {
        this.#switches.forEach(sw => {
            this.setLinkSwitch(sw.$cuid, index)
        })
    }

    /**
     * Emits push event to attached switch to set proper index
     * @param id - cuid of element
     * @param index - index to be set on element
     */
    setLinkSwitch(id: string, index: number) {
        if (is(id))
            this.utils.bus.emit(EVENTS.SWITCH, id, index);
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