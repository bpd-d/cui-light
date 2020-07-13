import { CuiDictionary } from "../src/core/utils/dictionary"
import { ICuiDictionary } from "../src/core/models/interfaces"
import { is } from "../src/core/utils/functions";

describe("Tests checking CuiDictionary", function () {
    it("Shall init dictionary if items are provided", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);


        expect(dict.keys().length).toEqual(2, "Dictionary shall contain two elements");
        expect(dict.values().length).toEqual(2, "Dictionary shall contain two values");
        expect(dict.keys()[0]).toEqual("x", "First key shall match");
        expect(dict.values()[1]).toEqual("y", "Second value shall match");
    })

    it("Shall init dictionary empty if items are not provided", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary();


        expect(dict.keys().length).toEqual(0, "Dictionary shall be empty");
    })

    it("Checking method [clear]", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        dict.clear();

        expect(dict.keys().length).toEqual(0, "Dictionary shall be empty");
        expect(dict.values().length).toEqual(0, "Dictionary shall be empty");
    })

    it("Checking method [add] - new item", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        dict.add('z', 'z');

        expect(dict.keys().length).toEqual(3, "Dictionary shall be updated");
        expect(dict.values().length).toEqual(3, "Dictionary shall be updated");
        expect(dict.values()[2]).toEqual('z', "Dictionary shall be updated");
    })

    it("Checking method [add] - existing item", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        try {
            dict.add('x', 'x');
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(true, "Shall fail");
        expect(dict.keys().length).toEqual(2, "Dictionary shall not be updated");
        expect(dict.values().length).toEqual(2, "Dictionary shall not be updated");
    })

    it("Checking method [add] - null item", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        try {
            dict.add(null, 'x');
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(true, "Shall fail");
        expect(dict.keys().length).toEqual(2, "Dictionary shall not be updated");
        expect(dict.values().length).toEqual(2, "Dictionary shall not be updated");
    })

    it("Checking method [remove] - existing item", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        try {
            dict.remove('x');
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(false, "Shall not fail");
        expect(dict.keys().length).toEqual(1, "Dictionary shall be updated");
        expect(dict.values().length).toEqual(1, "Dictionary shall be updated");
    })

    it("Checking method [remove] - non-existing item", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        try {
            dict.remove('z');
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(false, "Shall not fail");
        expect(dict.keys().length).toEqual(2, "Dictionary shall not be updated");
        expect(dict.values().length).toEqual(2, "Dictionary shall not be updated");
    })

    it("Checking method [remove] - empty key", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        try {
            dict.remove(null);
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(false, "Shall not fail");
        expect(dict.keys().length).toEqual(2, "Dictionary shall not be updated");
        expect(dict.values().length).toEqual(2, "Dictionary shall not be updated");
    })


    it("Checking method [get] - existing key", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        let output: string = null;
        try {
            output = dict.get('x');
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(false, "Shall not fail");
        expect(output).toEqual('x', "Output shall match dict value");
    })

    it("Checking method [get] - non-existing key", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        let output: string = null;
        try {
            output = dict.get('z');
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(false, "Shall not fail");
        expect(is(output)).toEqual(false, "No value shall be obtained");
    })

    it("Checking method [get] - empty key", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        let output: string = null;
        try {
            output = dict.get(null);
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(true, "Shall fail");
        expect(is(output)).toEqual(false, "No value shall be obtained");
    })

    it("Checking method [containsKey] - existing key", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        let output: boolean = false;
        try {
            output = dict.containsKey('x');
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(false, "Shall not fail");
        expect(output).toEqual(true, "Key shall exist");
    })

    it("Checking method [containsKey] - non-existing key", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        let output: boolean = false;
        try {
            output = dict.containsKey('z');
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(false, "Shall not fail");
        expect(output).toEqual(false, "Key shall not exist");
    })

    it("Checking method [containsKey] - empty key", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        let output: boolean = false;
        try {
            output = dict.containsKey(null);
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(false, "Shall not fail");
        expect(output).toEqual(false, "Key shall not exist");
    })

    it("Checking method [indexOf] - existing key", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        let output: number = -1;
        try {
            output = dict.indexOf('x');
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(false, "Shall not fail");
        expect(output).toBeGreaterThan(-1, "Index shall be greater that -1");
    })

    it("Checking method [indexOf] - non-existing key", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        let output: number = -1;
        try {
            output = dict.indexOf('z');
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(false, "Shall not fail");
        expect(output).toEqual(-1, "Index shall equal that -1");
    })

    it("Checking method [indexOf] - empty key", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        let output: number = -1;
        try {
            output = dict.indexOf(null);
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(false, "Shall not fail");
        expect(output).toEqual(-1, "Index shall equal that -1");
    })

    it("Checking method [update] - existing key", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        // let output: number = -1;
        try {
            dict.update('x', 'xx')
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(false, "Shall not fail");
        expect(dict.values()[0]).toEqual('xx', "Value shall be udated");
    })

    it("Checking method [update] - non-existing key", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        // let output: number = -1;
        try {
            dict.update('z', 'xx')
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(true, "Shall fail");
    })

    it("Checking method [update] - empty key", function () {
        let dict: ICuiDictionary<string> = new CuiDictionary([
            { key: "x", value: "x" },
            { key: "y", value: "y" }
        ]);
        let failed: boolean = false;
        // let output: number = -1;
        try {
            dict.update(null, 'xx')
        } catch (e) {
            failed = true;
        }
        expect(failed).toEqual(true, "Shall fail");
    })
})