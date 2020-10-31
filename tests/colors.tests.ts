import { CuiColor } from "../src/core/models/colors"

describe("Tests checking class [CuiColors]", function () {
    let color: CuiColor;

    beforeEach(() => {
        color = new CuiColor(120, 130, 140, 1);
    })

    it("to String", function () {
        let str = color.toCssString();
        expect(str).toEqual("rgba(120, 130, 140, 1)")
    })

    it("function opacity - too large", function () {
        color.opacity(2);
        expect(color.getColorValue("alpha")).toEqual(1)
    })

    it("function opacity - ", function () {
        color.opacity(0.5);
        expect(color.getColorValue("alpha")).toEqual(0.5)
    })

    it("function opacity ", function () {
        color.opacity(0.5);
        expect(color.getColorValue("alpha")).toEqual(0.5)
    })

    it("function clone ", function () {
        let clone = color.clone();
        let str = clone.toCssString();
        let orgStr = clone.toCssString();
        expect(str).toEqual(orgStr)
    })

    it("function lighten", function () {
        color.lighten(10);

        expect(color.getColorValue("red")).toEqual(132)
        expect(color.getColorValue("green")).toEqual(143)
        expect(color.getColorValue("blue")).toEqual(154)
        expect(color.getColorValue("alpha")).toEqual(1)
    })

    it("function darken", function () {
        color.darken(10);

        expect(color.getColorValue("red")).toEqual(108)
        expect(color.getColorValue("green")).toEqual(117)
        expect(color.getColorValue("blue")).toEqual(126)
        expect(color.getColorValue("alpha")).toEqual(1)
    })

    it("function invert ", function () {
        color.invert();
        expect(color.getColorValue("red")).toEqual(135)
        expect(color.getColorValue("green")).toEqual(125)
        expect(color.getColorValue("blue")).toEqual(115)
    })

}) 