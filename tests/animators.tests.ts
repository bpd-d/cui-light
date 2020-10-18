import { OpacityAnimator, PropertyAnimator, TransformAnimator } from "../src/core/animation/animators";

describe("Tests checking class [OpacityAnimator]", function () {
    it("Normal case", function () {
        let failed = false;
        let animator = new OpacityAnimator();
        try {
            animator.setProperty({
                from: 0,
                to: 1
            })
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
            console.log(e)
        }
        expect(failed).toBeFalse();
    })

    it("Incorrect property", function () {
        let failed = false;
        let animator = new OpacityAnimator();
        try {
            animator.setProperty(null)
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeTrue();
    })

    it("Missing property", function () {
        let failed = false;
        let animator = new OpacityAnimator();
        try {
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;

        }
        expect(failed).toBeFalse();
    })
})

describe("Tests checking class [PropertyAnimator]", function () {
    it("Normal case", function () {
        let failed = false;
        try {
            let animator = new PropertyAnimator("aaaa");
            animator.setProperty({
                from: 0,
                to: 1
            })
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeFalse();
    })

    it("Empty property case", function () {
        let failed = false;
        try {
            let animator = new PropertyAnimator("");
            animator.setProperty({
                from: 0,
                to: 1
            })
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeTrue();
    })


    it("Incorrect property", function () {
        let failed = false;
        try {
            let animator = new PropertyAnimator("aaaa");
            animator.setProperty(null)
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeTrue();
    })

    it("Missing property", function () {
        let failed = false;
        try {
            let animator = new PropertyAnimator("aaaa");
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeFalse();
    })
})

describe("Tests checking class [TransformAnimator]", function () {
    it("Normal case", function () {
        let failed = false;
        try {
            let animator = new TransformAnimator();
            animator.setProperty({
                "rotateX": {
                    from: 0,
                    to: 90,
                    unit: "deg"
                }
            })
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeFalse();
    })

    it("Incorrect property", function () {
        let failed = false;
        try {
            let animator = new TransformAnimator();
            animator.setProperty(null);
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeTrue();
    })

    it("Missing property", function () {
        let failed = false;
        try {
            let animator = new TransformAnimator();
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeFalse();
    })
})