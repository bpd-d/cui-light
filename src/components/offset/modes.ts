export interface ICuiOffsetMode {
    matches(top: number, left: number, offsetX: number, offsetY: number): boolean;
}

export class CuiOffsetStaticMode implements ICuiOffsetMode {

    matches(top: number, left: number, offsetX: number, offsetY: number): boolean {
        return (offsetX > 0 && left >= offsetX) ||
            (offsetY > 0 && top >= offsetY)
    }

}

/**
 * Dynamically calculates whether to trigger or untrigger an action.
 * If current value exceedes offset and threshold action is triggered.
 * If action was triggered and current move is lower than threshold action is untriggered
 * 
 * Example: If offsetY is 100, then first after 100 action is set on. It is kept when scrolling down.
 * If user decides to scroll up and difference between turning point and current is bigger than threshold then action is set off.
 *  
 * Example usage is with navbar - it shall disappear after offset and return back when user scrolls up. 
 */
export class CuiOffsetDynamicMode implements ICuiOffsetMode {
    #pointLeft: number;
    #pointTop: number;
    #prevDiffY: number;
    #prevDiffX: number;
    #wasTriggeredX: boolean;
    #wasTriggeredY: boolean;
    #threshold: number;
    constructor() {
        this.#pointLeft = 0;
        this.#pointTop = 0;
        this.#prevDiffX = 0;
        this.#prevDiffY = 0;
        this.#threshold = 100;
    }
    matches(top: number, left: number, offsetX: number, offsetY: number): boolean {
        return this.fitsOffsetY(top, offsetY) || this.fitsOffsetX(left, offsetX);
    }


    private fitsOffsetX(left: number, offsetX: number) {
        if (offsetX <= 0)
            return false;
        let diffX = left - this.#pointLeft;
        if (left >= offsetX && diffX > this.#threshold) {
            this.#wasTriggeredX = true;
        } else if (this.#wasTriggeredX && diffX < -this.#threshold) {
            this.#wasTriggeredX = false;
        }
        if (diffX < 0 && this.#prevDiffX < diffX || diffX >= 0 && this.#prevDiffX > diffX) {
            this.#pointLeft = left;
        }
        this.#prevDiffX = diffX;
        return this.#wasTriggeredX;
    }

    private fitsOffsetY(top: number, offsetY: number) {
        if (offsetY <= 0) {
            return false;
        }
        let diffY = top - this.#pointTop;
        if (top >= offsetY && diffY > this.#threshold) {
            this.#wasTriggeredY = true;
        } else if (this.#wasTriggeredY && diffY < -this.#threshold) {
            this.#wasTriggeredY = false;
        }
        if (diffY < 0 && this.#prevDiffY < diffY || diffY >= 0 && this.#prevDiffY > diffY) {
            this.#pointTop = top;
        }
        this.#prevDiffY = diffY;
        return this.#wasTriggeredY;
    }
}


export class CuiOffsetModeFactory {
    static get(mode: string) {
        if (mode === 'dynamic') {
            return new CuiOffsetDynamicMode();
        }
        return new CuiOffsetStaticMode();
    }
}