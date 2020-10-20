import { OpacityAnimator } from "../src/core/animation/animators";
import { CuiAnimation, CuiAnimationEngine, CuiSwipeAnimationEngine } from "../src/core/animation/engine";
import { sleep } from "../src/core/utils/functions";

function getAnimators() {
    let animator = new OpacityAnimator();
    animator.setProperty({
        from: 0,
        to: 1
    })
    return [animator];
}

describe("Tests checking class [CuiAnimationEngine]", function () {
    let element: Element;

    beforeEach(() => {
        element = document.createElement("div");
        document.body.appendChild(element);
    })

    afterEach(() => {
        element.remove();

    })

    it("Case no setup", function () {
        let failed = false;
        let reported = false;
        try {
            let engine = new CuiAnimationEngine();
            engine.setOnError(() => {
                reported = true;
            })
            engine.animate(300);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeFalse();
        expect(reported).toBeTrue();
    })

    it("Case normal", async function () {
        let failed = false;
        try {
            let engine = new CuiAnimationEngine();
            engine.setElement(element);
            engine.setAnimators(getAnimators())
            engine.animate(50);
        } catch (e) {
            failed = true;
        }
        await sleep(60);
        expect(failed).toBeFalse();
    })

    it("Case normal with finish", async function () {
        let failed = false;
        let result = false;
        try {
            let engine = new CuiAnimationEngine();
            engine.setElement(element);
            engine.setAnimators(getAnimators())
            engine.onFinish(() => {
                result = true;
            })
            engine.animate(50);
        } catch (e) {
            failed = true;
        }
        await sleep(100);
        expect(failed).toBeFalse();
        expect(result).toBeTrue();
    })

    it("Case normal with finish double call", async function () {
        let failed = false;
        let result = false;
        let counter = 0;
        try {
            let engine = new CuiAnimationEngine();
            engine.setElement(element);
            engine.setAnimators(getAnimators())
            engine.onFinish(() => {
                result = true;
                counter += 1;
            })
            engine.animate(50);
            engine.animate(50);
            engine.animate(50);
        } catch (e) {
            failed = true;
        }
        await sleep(100);
        expect(failed).toBeFalse();
        expect(result).toBeTrue();
        expect(counter).toEqual(1);
    })

    it("Case locked when perfroming", async function () {
        let failed = false;
        let locked = false;
        try {
            let engine = new CuiAnimationEngine();
            engine.setElement(element);
            engine.setAnimators(getAnimators())
            engine.onFinish(() => {

            })
            engine.animate(50);
            locked = engine.isLocked();
        } catch (e) {
            failed = true;
        }
        await sleep(100);
        expect(failed).toBeFalse();
        expect(locked).toBeTrue();
    })

    it("Case not locked after perfroming", async function () {
        let failed = false;
        let locked = false;
        let engine = new CuiAnimationEngine();
        try {

            engine.setElement(element);
            engine.setAnimators(getAnimators())
            engine.animate(50);

        } catch (e) {
            failed = true;
        }
        await sleep(100);
        locked = engine.isLocked();
        expect(failed).toBeFalse();
        expect(locked).toBeFalse();
    })
})


describe("Tests checking class [CuiAnimation]", function () {
    let element: Element;
    let prop = {
        opacity: {
            from: 0,
            to: 1
        }
    }

    beforeEach(() => {
        element = document.createElement("div");
        document.body.appendChild(element);
    })

    afterEach(() => {
        element.remove();

    })

    it("Case normal", async function () {
        let failed = false;
        try {
            let animation = new CuiAnimation();
            animation.setElement(element);
            animation.perform(prop, 50, 1);
        } catch (e) {
            failed = true;
        }
        await sleep(60);
        expect(failed).toBeFalse();
    })

    it("Incorrect animation property", async function () {
        let failed = false;
        let reported = false;
        try {
            let animation = new CuiAnimation();
            animation.setElement(element);
            animation.onError(() => {
                reported = true;
            })
            animation.perform(null, 50, 1);
        } catch (e) {
            failed = true;
        }
        await sleep(60);
        expect(failed).toBeFalse();
        expect(reported).toBeTrue();
    })

    it("Incorrect animation missing element", async function () {
        let failed = false;
        let reported = false;
        try {
            let animation = new CuiAnimation();
            animation.setElement(null);
            animation.onError(() => {
                reported = true;
            })
            animation.perform(prop, 50, 1);
        } catch (e) {
            failed = true;
        }
        await sleep(60);
        expect(failed).toBeFalse();
        expect(reported).toBeTrue();
    })

    it("Case normal with finish", async function () {
        let failed = false;
        let result = false;
        try {
            let animation = new CuiAnimation();
            animation.setElement(element);
            animation.onFinish(() => {
                result = true
            })
            animation.perform(prop, 50, 1);
        } catch (e) {
            failed = true;
        }
        await sleep(100);
        expect(failed).toBeFalse();
        expect(result).toBeTrue();
    })

    it("Case normal with is style - clean after", async function () {
        let failed = false;
        let result = false;
        let style = null;
        try {
            let animation = new CuiAnimation();
            animation.setElement(element);
            animation.onFinish(() => {
                style = element.getAttribute('style');
                result = true
            })
            animation.perform(prop, 50, 1);
        } catch (e) {
            failed = true;
        }
        await sleep(100);
        expect(failed).toBeFalse();
        expect(result).toBeTrue();
        expect(style).toBe("");
    })

})


describe("Tests checking class [CuiSwipeAnimationEngine]", function () {
    let element: Element;
    let prop = {
        opacity: {
            from: 0,
            to: 1
        }
    }

    beforeEach(() => {
        element = document.createElement("div");
        document.body.appendChild(element);

    })

    afterEach(() => {
        element.remove();

    })

    it("Case normal update", function () {
        let failed = false;
        let style = null;
        try {
            let animation = new CuiSwipeAnimationEngine();
            animation.setElement(element);
            animation.setProps(prop);
            animation.update(0.2);
            style = element.getAttribute('style')

        } catch (e) {
            failed = true;
        }
        expect(failed).toBeFalse();
        expect(style).toContain("opacity");
    })

    it("Case normal finish", async function () {
        let failed = false;
        let style = null;
        let result = false;
        try {
            let animation = new CuiSwipeAnimationEngine();
            animation.setElement(element);
            animation.setProps(prop);
            animation.setOnFinish(() => {
                result = true;
                style = element.getAttribute('style')
            })
            animation.finish(0, 50, false);

        } catch (e) {
            failed = true;
        }

        await sleep(100);
        expect(failed).toBeFalse();
        expect(result).toBeTrue();
        expect(style).toContain("opacity");
    })

    it("Case normal finish - clean", async function () {
        let failed = false;
        let style = null;
        let result = false;
        try {
            let animation = new CuiSwipeAnimationEngine(true);
            animation.setElement(element);
            animation.setProps(prop);
            animation.setOnFinish(() => {
                result = true;
                style = element.getAttribute('style')
            })
            animation.finish(0, 50, false);

        } catch (e) {
            failed = true;
        }

        await sleep(100);
        expect(failed).toBeFalse();
        expect(result).toBeTrue();
        expect(style).toEqual("");
    })

    it("Case no element", async function () {
        let failed = false;
        let reported = false;
        let result = false;
        try {
            let animation = new CuiSwipeAnimationEngine(true);
            animation.setElement(null);
            animation.setProps(prop);
            animation.setOnError(() => {
                reported = true;
            })
            animation.setOnFinish(() => {
                result = true;
            })
            animation.finish(0, 50, false);

        } catch (e) {
            failed = true;
        }

        await sleep(100);
        expect(failed).toBeFalse();
        expect(result).toBeFalse();
        expect(reported).toBeTrue();
    })

    it("Case no prop", async function () {
        let failed = false;
        let reported = false;
        let result = false;
        try {
            let animation = new CuiSwipeAnimationEngine(true);
            animation.setElement(element);
            animation.setProps(null);
            animation.setOnError(() => {
                reported = true;
            })
            animation.setOnFinish(() => {
                result = true;
            })
            animation.finish(0, 50, false);

        } catch (e) {
            failed = true;
        }

        await sleep(100);
        expect(failed).toBeFalse();
        expect(result).toBeFalse();
        expect(reported).toBeTrue();
    })

    it("Case update no prop", function () {
        let failed = false;
        try {
            let animation = new CuiSwipeAnimationEngine(true);
            animation.setElement(element);
            animation.setProps(null);
            animation.update(0.2);

        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
    })


    it("Case update no element", function () {
        let failed = false;
        try {
            let animation = new CuiSwipeAnimationEngine(true);
            animation.setElement(null);
            animation.setProps(prop);
            animation.update(0.2);

        } catch (e) {
            failed = true;
        }

        expect(failed).toBeFalse();
    })
})