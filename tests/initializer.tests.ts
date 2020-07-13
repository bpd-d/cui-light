import { CuiInitializer, CuiInit } from "../src/app/initializer"
import { CuiSetupInit } from "../src/core/models/setup";
import { is } from "../src/core/utils/functions";

describe("Tests checking class [CuiInitializer]", function () {
    let initializer: CuiInitializer;

    beforeEach(async () => {
        initializer = new CuiInitializer();
    })

    afterEach(async () => {
        let w = window as any;
        if (w["$cui"]) {
            delete w["$cui"]
        }
    })

    it("Case checks method [init] ", async function () {
        let setup: CuiSetupInit = new CuiSetupInit();
        let initialized: boolean = false;
        await initializer.init({
            setup: setup
        })
        let w = window as any;
        initialized = is(w.$cui);
        expect(initialized).toBeTrue();
    })

    it("Case checks method [init] - custom app prefix ", async function () {
        let setup: CuiSetupInit = new CuiSetupInit();
        setup.app = "$xxx";
        let initialized: boolean = false;
        await initializer.init({
            setup: setup
        })
        let w = window as any;
        initialized = is(w.$xxx);

        expect(initialized).toBeTrue();
    })
})

describe("Tests checking class [CuiInit]", function () {

    afterEach(async () => {
        let w = window as any;
        if (w["$cui"]) {
            delete w["$cui"]
        }
    })

    it("Case checks method [init] ", async function () {
        let setup: CuiSetupInit = new CuiSetupInit();
        let initializer: CuiInit = new CuiInit();
        let initialized: boolean = false;
        await initializer.init({ setup: setup })

        let w = window as any;

        initialized = is(w.$cui);
        expect(initialized).toBeTrue();
    })

})