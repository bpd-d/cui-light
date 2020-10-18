import { is } from "../utils/functions";
import { OpacityAnimator, TransformAnimator, PropertyAnimator } from "./animators";
import { ICuiPropertyAnimator, AnimationProperty, AnimatorPropertyValue, TransformAnimatorProperty, OnAnimationFinishCallback } from "./interfaces";

export type PropsTypes = AnimatorPropertyValue | TransformAnimatorProperty;

export class CuiAnimation {
    #engine: CuiAnimationEngine;
    #timeout: number;
    #factory: AnimatorFactory;
    constructor(element?: Element) {
        this.#engine = new CuiAnimationEngine(true);
        this.#engine.setElement(element);
        this.#timeout = 0;
        this.#factory = new AnimatorFactory();
    }

    setElement(element: Element) {
        this.#engine.setElement(element);
    }

    setTimeout(timeout: number) {
        this.#timeout = timeout;
    }

    onFinish(callback: OnAnimationFinishCallback) {
        this.#engine.onFinish(callback);
    }

    perform(props: AnimationProperty<PropsTypes>, timeout?: number, factor?: number) {
        if (!is(props)) {
            return;
        }
        let animators = [];
        try {
            for (let prop in props) {
                let animator = this.#factory.get(prop);
                if (!animator) return;
                animator.setProperty(props[prop]);
                animators.push(animator);
                this.#engine.setAnimators(animators);
                this.#engine.animate(timeout ?? this.#timeout)
            }
        } catch (e) {
            console.error(e);
            return;
        }
    }
}



class AnimatorFactory {
    get(id: string): ICuiPropertyAnimator<AnimatorPropertyValue | TransformAnimatorProperty> {
        if (!id) {
            return undefined;
        }
        switch (id) {
            case "opacity":
                return new OpacityAnimator();
            case "transform":
                return new TransformAnimator();
            default:
                return new PropertyAnimator(id);
        }
    }

}

export class CuiAnimationEngine {
    #onFinishCallback: OnAnimationFinishCallback;
    #animators: ICuiPropertyAnimator<PropsTypes>[];
    #lock: boolean;
    #animStartStamp: number;
    #element: Element;
    #cleanOnFinish: boolean;
    #errorOccured: boolean;
    constructor(cleanOnFinish?: boolean) {
        this.#animators = [];
        this.#element = undefined;
        this.#animStartStamp = undefined;
        this.#cleanOnFinish = cleanOnFinish ?? false;
        this.#lock = false;
    }

    onFinish(callback: OnAnimationFinishCallback) {
        this.#onFinishCallback = callback;
    }

    setAnimators(animators: ICuiPropertyAnimator<PropsTypes>[]) {
        this.#animators = animators;
    }

    setElement(element: Element) {
        this.#element = element;
    }

    animate(timeout: number, progress?: number, revert?: boolean): void {
        if (this.#lock) {
            return;
        }
        if (!this.#element || this.#animators.length === 0) {
            throw new Error("Animation cannot be performed: element or animators are not set");
        }
        let animationProgress = progress ?? 0;
        let shouldCalcRevert = revert ? revert : false;
        this.#lock = true;
        requestAnimationFrame(this.animateAsync.bind(this, timeout, animationProgress, shouldCalcRevert))
    }

    isLocked(): boolean {
        return this.#lock;
    }

    private animateAsync(timeout: number, initialProgress: number, revert: boolean, timestamp: number) {
        if (!this.#animStartStamp) {
            this.#animStartStamp = timestamp;
        }
        let pr = timestamp - this.#animStartStamp;
        let animationProgress = pr / timeout;
        let currProgress = 0;
        if (initialProgress === 0) {
            currProgress = animationProgress;
        } else {
            currProgress = revert ? initialProgress - (animationProgress * initialProgress) : initialProgress + (animationProgress * initialProgress)
        }
        this.callUpdate(revert ? Math.max(currProgress, 0) : Math.min(currProgress, 1), 1);
        if (pr < timeout && !this.#errorOccured) {
            requestAnimationFrame(this.animateAsync.bind(this, timeout, initialProgress, revert))
        } else {
            this.endAnimation(revert);
        }
    }

    private endAnimation(reverted: boolean) {
        if (this.#cleanOnFinish) {
            this.#element.removeAttribute("style");
        }
        if (this.#onFinishCallback) {
            this.#onFinishCallback(this.#element, reverted, this.#errorOccured);
        }
        this.#errorOccured = false;
        this.#animStartStamp = undefined;
        this.#lock = false;
    }

    private callUpdate(progress: number, factor: number) {
        try {
            this.#animators.forEach(animator => animator.perform(this.#element, progress, factor));
        } catch (e) {
            console.error(e);
            this.#errorOccured = true;
        }

    }
}



export class CuiSwipeAnimationEngine {
    #element: Element;
    #animators: ICuiPropertyAnimator<PropsTypes>[];
    #animationEngine: CuiAnimationEngine;
    #factory: AnimatorFactory;
    constructor(shouldCleanOnFinish?: boolean) {
        this.#element = undefined;
        this.#animators = [];
        this.#animationEngine = new CuiAnimationEngine(shouldCleanOnFinish);
        this.#factory = new AnimatorFactory();
    }

    setElement(element: Element) {
        this.#element = element;
    }

    setOnFinish(callback: OnAnimationFinishCallback) {
        this.#animationEngine.onFinish(callback);
    }

    setProps(props: AnimationProperty<PropsTypes>) {
        if (!is(props)) {
            return;
        }
        this.#animators = [];
        try {
            for (let prop in props) {
                let animator = this.#factory.get(prop);
                if (!animator) return;
                animator.setProperty(props[prop]);
                this.#animators.push(animator);
            }
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Perform single update on animators
     * @param progress - progress value to be set to animators 0..1
     */
    update(progress: number) {
        if (!this.#element || this.#animators.length === 0) {
            return;
        }
        this.#animators.forEach(animator => animator.perform(this.#element, Math.min(progress, 1), 1))
    }

    /**
     * Perform single update on animators in RAF
     * @param progress - progress value to be set to animators 0..1
     */
    updateAsync(progress: number) {
        requestAnimationFrame(this.update.bind(this, progress));
    }

    /**
     * Finish swipe animation using animation engine
     * @param progress - initial progress value 0..1
     * @param timeout - time for animation to perform
     * @param revert - whether animation should return back to 0 or progress to the end
     */
    finish(progress: number, timeout: number, revert: boolean) {
        this.#animationEngine.setElement(this.#element);
        this.#animationEngine.setAnimators(this.#animators);
        try {
            this.#animationEngine.animate(timeout, progress, revert);
        } catch (e) {
            console.log(e);
        }

    }

}