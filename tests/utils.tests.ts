import { CuiUtils } from "../src/core/models/utils"
import { CuiSetupInit } from "../src/core/models/setup";
import { sleep } from "../src/core/utlis/functions";

describe("Tests checking method [getRangeValue]", function () {
    let utils: CuiUtils;
    let lightClass: string = 'cui-dark';
    let printClass: string = 'cui-print';
    beforeEach(() => {
        utils = new CuiUtils(new CuiSetupInit());
    })

    it("Checking method [setLightMode] - normal case", async function () {
        let hasToggledDark: boolean = false;
        let hasUnToggledDark: boolean = false;
        const classes = document.body.classList;
        utils.setLightMode('dark');
        await sleep(100);
        hasToggledDark = classes.contains(lightClass);
        utils.setLightMode('light');
        await sleep(100);
        hasUnToggledDark = classes.contains(lightClass);

        expect(hasToggledDark).toBeTrue();
        expect(hasUnToggledDark).toBeFalse();

    })

    it("Checking method [setLightMode] - the same twice case", async function () {
        let hasToggledDark: boolean = false;
        let hasToggledDarkSecond: boolean = false;
        const classes = document.body.classList;
        utils.setLightMode('dark');
        await sleep(100);
        hasToggledDark = classes.contains(lightClass);
        utils.setLightMode('dark');
        await sleep(100);
        hasToggledDarkSecond = classes.contains(lightClass);

        expect(hasToggledDark).toBeTrue();
        expect(hasToggledDarkSecond).toBeTrue();

    })


    it("Checking method [setPrintMode] - normal case", async function () {
        let hasPrint: boolean = false;
        let hasPrintAfter: boolean = false;
        const classes = document.body.classList;
        utils.setPrintMode(true);
        await sleep(100);
        hasPrint = classes.contains(printClass);
        utils.setPrintMode(false);
        await sleep(100);
        hasPrintAfter = classes.contains(printClass);

        expect(hasPrint).toBeTrue();
        expect(hasPrintAfter).toBeFalse();

    })

    it("Checking method [setPrintMode] - twice the same case", async function () {
        let hasPrint: boolean = false;
        let hasPrintAfter: boolean = false;
        const classes = document.body.classList;
        utils.setPrintMode(true);
        await sleep(100);
        hasPrint = classes.contains(printClass);
        utils.setPrintMode(true);
        await sleep(100);
        hasPrintAfter = classes.contains(printClass);

        expect(hasPrint).toBeTrue();
        expect(hasPrintAfter).toBeTrue();

    })
})