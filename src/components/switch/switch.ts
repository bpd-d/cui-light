import { ICuiComponent, ICuiComponentHandler, ICuiParsable, ICuiSwitchable, CuiElement } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiComponentBase, CuiHandler, CuiChildMutation, CuiMutableHandler } from "../../app/handlers/base";
import { ICuiComponentAction, is, getStringOrDefault, CuiActionsFatory, replacePrefix, getIntOrDefault, isInRange, isStringTrue, EVENTS } from "../../core/index";
import { ICuiTask, CuiTaskRunner } from "../../core/utils/task";

const SWITCH_DEFAULT_ACTION_IN = ".{prefix}-switch-animation-default-in";
const SWITCH_DEFAULT_ACTION_OUT = ".{prefix}-switch-animation-default-out";
const SWITCH_DEFAULT_TARGETS = "li";

export class CuiSwitchArgs implements ICuiParsable {

    targets: string;
    in: ICuiComponentAction;
    out: ICuiComponentAction;
    timeout: number;
    links: string;
    switch: string;
    auto: boolean;
    autoTimeout: number;

    #prefix: string;
    #defTimeout: number;
    constructor(prefix: string, timeout: number) {
        this.#prefix = prefix;
        this.#defTimeout = timeout;
    }

    parse(args: any): void {
        this.targets = getStringOrDefault(args.targets, SWITCH_DEFAULT_TARGETS)
        this.in = CuiActionsFatory.get(args.in ?? replacePrefix(SWITCH_DEFAULT_ACTION_IN, this.#prefix))
        this.out = CuiActionsFatory.get(args.out ?? replacePrefix(SWITCH_DEFAULT_ACTION_OUT, this.#prefix))
        this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
        this.links = args.links;
        this.switch = args.switch;
        this.auto = isStringTrue(args.auto)
        this.autoTimeout = getIntOrDefault(args.autoTimeout, 5000);
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

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiSwitchHandler(element, utils, this.attribute);
    }
}

export class CuiSwitchHandler extends CuiMutableHandler<CuiSwitchArgs> implements ICuiSwitchable {
    #targets: Element[];
    #currentIdx: number;
    #links: Element[];
    #switches: CuiElement[];
    #task: ICuiTask;
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiSwitchHandler", element, new CuiSwitchArgs(utils.setup.prefix, utils.setup.animationTime), utils);
        this.#targets = [];
        this.#currentIdx = -1;
        this.#links = [];
        this.#switches = [];

    }

    onInit(): void {
        this.onEvent(EVENTS.SWITCH, this.onPushSwitch)
        this.getTargets();
        this.getLinks();
        this.getActiveIndex();
        this.getSwitches();
        this.setSwitchesActive(this.#currentIdx);
        this.setLinkActive(-1, this.#currentIdx);
        this.#task = new CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next'));
        this.startTask();
    }

    onUpdate(): void {
        this.startTask();
    }

    onDestroy(): void {
        this.#task.stop();
        this.detachEvent(EVENTS.SWITCH)
    }

    onMutation(record: CuiChildMutation): void {

    }

    async switch(index: any): Promise<boolean> {
        if (this.isLocked) {
            return false;
        }
        this.getTargets();
        this.getLinks();
        this.getSwitches();
        this.getActiveIndex();
        let nextIdx = this.getNextIndex(index);
        if (nextIdx == this.#currentIdx || nextIdx < 0 || nextIdx >= this.#targets.length) {
            this._log.warning(`Index ${index} is not within the suitable range`);
            return false;
        }
        this.isLocked = true;
        this.setSwitchesActive(nextIdx);
        await this.actionsHelper.performSwitchAction(this.#targets[nextIdx],
            this.#currentIdx > -1 ? this.#targets[this.#currentIdx] : null,
            this.args.in,
            this.args.out,
            () => {
                this.#targets[nextIdx].classList.add(this.activeClassName);
                if (this.#currentIdx > -1)
                    this.#targets[this.#currentIdx].classList.remove(this.activeClassName)
                this.setLinkActive(this.#currentIdx, nextIdx);
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
        this._log.debug("Intercepted event");
        this.switch(index);
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
        if (this.args.auto) {
            this.#task.start();
        }
    }

}