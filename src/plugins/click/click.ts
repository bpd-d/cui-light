import { ICuiPlugin, ICuiEventBus } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { EVENTS } from "../../core/index";

export class CuiWindowClickPlugin implements ICuiPlugin {
    description: string;
    name: string = 'click-plugin';
    setup: any;
    #bus: ICuiEventBus;

    constructor() {
        this.description = "CuiWindowClickPlugin";
    }

    init(utils: CuiUtils): void {
        this.#bus = utils.bus;
        window.addEventListener('click', this.onWindowClick.bind(this))
    }

    destroy(): void {
        window.removeEventListener('click', this.onWindowClick.bind(this));
    }

    onWindowClick(ev: MouseEvent) {
        this.#bus.emit(EVENTS.WINDOW_CLICK, null, ev)
    }
}