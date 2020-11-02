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

    it("create from [hex short]", function () {
        let c = CuiColor.create("#fff");
        expect(c.getColorValue("red")).toEqual(255)
        expect(c.getColorValue("green")).toEqual(255)
        expect(c.getColorValue("blue")).toEqual(255)
    })

    it("create from [hex]", function () {
        let c = CuiColor.create("#626364");
        expect(c.getColorValue("red")).toEqual(98)
        expect(c.getColorValue("green")).toEqual(99)
        expect(c.getColorValue("blue")).toEqual(100)
    })

    it("create from [hex alpha]", function () {
        let c = CuiColor.create("#626364FA");
        expect(c.getColorValue("red")).toEqual(98)
        expect(c.getColorValue("green")).toEqual(99)
        expect(c.getColorValue("blue")).toEqual(100)
        expect(c.getColorValue("alpha")).toEqual(0.98)

    })

    it("create from [rgb]", function () {
        let c = CuiColor.create("rgb(98, 99, 100)");
        expect(c.getColorValue("red")).toEqual(98)
        expect(c.getColorValue("green")).toEqual(99)
        expect(c.getColorValue("blue")).toEqual(100)
        expect(c.getColorValue("alpha")).toEqual(1)
    })

    it("create from [rgba]", function () {
        let c = CuiColor.create("rgba(98, 99, 100, 0.9)");
        expect(c.getColorValue("red")).toEqual(98)
        expect(c.getColorValue("green")).toEqual(99)
        expect(c.getColorValue("blue")).toEqual(100)
        expect(c.getColorValue("alpha")).toEqual(0.9)
    })

}) 