import { CuiWindowSize } from "../../core/utils/types";
import { calcWindowSize } from "../../core/utils/functions";
import { ICuiEventBus } from "../../core/models/interfaces";
import { EVENTS } from "../../core/utils/statics";

export interface ICuiResizable {
    resize(data: CuiResizeData): Promise<boolean>;
}

export interface ICuiResizableObserver {
    observe(target: ICuiResizable): void;
    unobserve(target: ICuiResizable): void;
    connect(): void;
    disconnect(): void;
}

export interface CuiResizeData {
    current: CuiWindowSize;
    previous: CuiWindowSize;
    width: number;
    height: number;
    timestamp: number;
}

export class CuiResizeObserver implements ICuiResizableObserver {

    #items: ICuiResizable[];
    #promises: Promise<boolean>[];
    #prevYValue: number;
    #inProgress: boolean;
    #previousSize: CuiWindowSize;
    #threshold: number;
    #bus: ICuiEventBus
    constructor(bus: ICuiEventBus, threshold?: number) {
        this.#items = [];
        this.#promises = [];
        this.#prevYValue = window.innerWidth;
        this.#inProgress = false;
        this.#previousSize = calcWindowSize(window.innerWidth)
        this.#threshold = threshold ?? 0;
        this.#bus = bus;
    }

    observe(target: ICuiResizable): void {
        let idx = this.#items.findIndex(x => x === target)
        if (idx < 0) {
            this.#items.push(target);
        }
    }

    unobserve(target: ICuiResizable): void {
        let idx = this.#items.findIndex(x => x === target)
        if (idx >= 0) {
            this.#items.splice(idx, 1)
        }
    }
    connect(): void {
        window.addEventListener('resize', this.listener.bind(this))
    }

    disconnect(): void {
        window.removeEventListener('resize', this.listener.bind(this))
    }

    private listener(ev: UIEvent) {
        if (this.#inProgress) {
            return;
        }
        this.#inProgress = true
        const diff = window.innerWidth - this.#prevYValue;

        if (Math.abs(diff) >= this.#threshold) {
            const currentSize = calcWindowSize(window.innerWidth);
            if (currentSize !== this.#previousSize) {
                const resizeData: CuiResizeData = {
                    current: currentSize,
                    previous: this.#previousSize,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    timestamp: Date.now()
                };
                this.#bus.emit(EVENTS.RESIZE, null, resizeData)
                if (this.#items.length > 0) {
                    this.#promises = [];
                    this.#items.forEach(x => {
                        this.#promises.push(x.resize(resizeData))
                    })
                    Promise.all(this.#promises)
                    this.#promises = [];
                }

                this.#previousSize = currentSize;
            }
        }
        this.#inProgress = false
    }


}