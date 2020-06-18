import { is, getName, createElementFromString, getRangeValue, joinAttributesForQuery, clone, are, getMatchingAttribute } from "../src/core/utlis/functions"
import { MUTATED_ATTRIBUTES } from "../src/core/utlis/statics"

/**
 * Tests check function is
 */

describe("Tests checking method [is]", function () {
    it("Shall return true when object is not empty", function () {
        let obj: any = { a: 1 }
        let emptyobj: any = {}
        let str: string = "dsd"
        let num: number = 10
        let negnum: number = 10
        let arr: string[] = ['aa']

        expect(is(obj)).toEqual(true, "Not empty object")
        expect(is(emptyobj)).toEqual(true, "Empty object")
        expect(is(str)).toEqual(true, "Not empty string")
        expect(is(num)).toEqual(true, "Positive number")
        expect(is(negnum)).toEqual(true, "Negative number")
        expect(is(arr)).toEqual(true, "Not empty array")


    })

    it("Shall return false when object is empty", function () {
        let obj: any = {}
        let str: string = ""
        let someNull: any = null
        let arr: string[] = []

        expect(is(str)).toEqual(false, "Empty string")
        expect(is(someNull)).toEqual(false, "Null object")
        expect(is(arr)).toEqual(false, "Empty array")
    })
})

describe("Tests checking method [getName]", function () {
    it("Shall return concatanated string when arguments are not empty", function () {
        let prefix: string = 'cui'
        let name: string = "name"
        let expected: string = 'cui-name'

        expect(getName(prefix, name)).toEqual(expected, "cui-name")
    })

    it("Shall fail when arguments (or at least one) are empty", function () {
        let prefix: string = null
        let name: string = "name"
        let expected: boolean = false
        try {
            let aa = getName(prefix, name)
        } catch (e) {
            expected = true;
        }
        expect(expected).toBeTruthy("Shall fail on at least empty argument");
    })
})

describe("Tests checking method [createElementFromString]", function () {
    it("Shall return Element created from html string", function () {
        let htmlString: string = `<div class="someClass"></div>`
        let failed: boolean = false;
        let output: Element = null;
        try {
            output = createElementFromString(htmlString)
        } catch (e) {
            failed = true
        }

        expect(failed).toBe(false, "Shall not fail");
        expect(is(output)).toBe(true, "Element shall be created")
        expect(output).toHaveClass("someClass", "Shall contain class");
    })

    it("Shall return null from empty or incorrect html string", function () {
        let commonString: string = `dsadasd`
        let emptyString: string = null
        let failed: boolean = false;
        let output: Element = null;
        let failed2: boolean = false;
        let output2: Element = null;
        try {
            output = createElementFromString(commonString)
        } catch (e) {
            failed = true
        }

        try {
            output2 = createElementFromString(emptyString)
        } catch (e) {
            failed2 = true
        }

        expect(failed).toBe(false, "Shall not fail on not html string");
        expect(is(output)).toBe(false, "Element shall be null");

        expect(failed2).toBe(false, "Shall not fail on empty or null string");
        expect(is(output2)).toBe(false, "Element shall be null when string is null");
    })
})

// describe("Tests checking method [getMutationAttribute]", function () {
//     it("Shall return first attribute matching to mutation attributes ", function () {
//         let attribute: string = MUTATED_ATTRIBUTES[0];
//         let value: string = "xxx";
//         let element: Element = document.createElement('div');
//         element.setAttribute("dummy", "dummy");
//         element.setAttribute("test", "test");
//         element.setAttribute(attribute, value);
//         let failed = false;
//         let output = null;
//         try {
//             output = getMutationAttribute(element);
//         } catch (e) {
//             failed = true
//         }

//         expect(failed).toEqual(false, "Shall not fail")
//         expect(output !== null).toEqual(true, "Output shall be defined")
//         expect(output.name).toEqual(attribute, "Found attribute shall be correct")
//         expect(output.value).toEqual(value, "Found value shall be correct")
//     })

//     it("Shall return null if element doesn't contain mutated attribute", function () {
//         let element: Element = document.createElement('div');
//         element.setAttribute("dummy", "dummy");
//         element.setAttribute("test", "test");
//         let output = null;
//         let failed = false;
//         try {
//             output = getMutationAttribute(element);
//         } catch (e) {
//             failed = true
//         }
//         expect(failed).toEqual(false, "Shall not fail")
//         expect(output).toEqual(null, "Output shall be null")
//     })

//     it("Shall fail if element is empty", function () {
//         let element: Element = null;
//         let output = null;
//         let failed = false;
//         try {
//             output = getMutationAttribute(element);
//         } catch (e) {
//             failed = true
//         }
//         expect(failed).toEqual(true, "Shall fail")
//         expect(output).toEqual(null, "Output shall be null")
//     })
// })

describe("Tests checking method [getMatchingAttribute]", function () {
    let attributes: string[];
    beforeAll(() => {
        attributes = ['xxx', 'yyy', 'zzz']
    })

    it("Shall return first attribute matching to mutation attributes ", function () {
        let attribute: string = attributes[0];
        let value: string = "xxx";
        let element: Element = document.createElement('div');
        element.setAttribute("dummy", "dummy");
        element.setAttribute("test", "test");
        element.setAttribute(attribute, value);
        let failed = false;
        let output = null;
        try {
            output = getMatchingAttribute(element, attributes);
        } catch (e) {
            failed = true
        }

        expect(failed).toEqual(false, "Shall not fail")
        expect(output !== null).toEqual(true, "Output shall be defined")
        expect(output).toEqual(attribute, "Found attribute shall be correct")
    })

    it("Shall return null if element doesn't contain mutated attribute", function () {
        let element: Element = document.createElement('div');
        element.setAttribute("dummy", "dummy");
        element.setAttribute("test", "test");
        let output = null;
        let failed = false;
        try {
            output = getMatchingAttribute(element, attributes);
        } catch (e) {
            failed = true
        }
        expect(failed).toEqual(false, "Shall not fail")
        expect(output).toEqual(null, "Output shall be null")
    })

    it("Shall fail if element is empty", function () {
        let element: Element = null;
        let output = null;
        let failed = false;
        try {
            output = getMatchingAttribute(element, attributes);
        } catch (e) {
            failed = true
        }
        expect(failed).toEqual(true, "Shall fail")
        expect(output).toEqual(null, "Output shall be null")
    })
})


describe("Tests checking method [getRangeValue]", function () {
    it("Shall return value within the range", function () {
        let value: number = 10;
        let min: number = 0;
        let max: number = 15;

        expect(getRangeValue(value, min, max)).toBe(value, "Value shall be the same as input");
    })

    it("Shall return max or min when value is outside of range", function () {
        let value: number = 16;
        let value2: number = -2;
        let min: number = 0;
        let max: number = 15;

        expect(getRangeValue(value, min, max)).toBe(max, "Value shall be the max from range");
        expect(getRangeValue(value2, min, max)).toBe(min, "Value shall be the min from range");
    })
})

describe("Tests checking method [joinAttributesForQuery]", function () {
    it("Shall return query from array of attributes", function () {
        let attributes: string[] = ['test', 'test2'];
        let expected: string = '[test],[test2]'
        expect(joinAttributesForQuery(attributes)).toEqual(expected, "Output shall match to expected")

    })

    it("Shall return empty string from empty array of attributes", function () {
        let attributesEmpty: string[] = [];
        let attributesNull: string[] = null;
        let expected: string = ''
        expect(joinAttributesForQuery(attributesEmpty)).toEqual(expected, "Output shall be an empty string")
        expect(joinAttributesForQuery(attributesNull)).toEqual(expected, "Output shall be an empty string")

    })
})

describe("Tests checking method [clone]", function () {
    it("Shall return cloned object", function () {
        let obj1: any = { a: 1 };
        let obj2: any = { a: 1, b: () => { return true; } };
        let obj3: any = null;

        let out1 = clone(obj1);
        let out2 = clone(obj2);
        let out3 = clone(obj3);

        expect(out1.a).toEqual(obj1.a)
        expect(out2.b()).toEqual(obj2.b())
        expect(out3).toEqual(null)
    })
})

describe("Tests checking method [are]", function () {
    it("Shall return true when all values are proper values", function () {
        let output = are('test', 0, 1, {})
        expect(output).toBeTrue()
    })

    it("Shall return false when at least one value doesn't have proper value", function () {
        let output = are('test', 0, -1, null)
        expect(output).toBeFalse()
    })

    it("Shall return false when at least one value doesn't have proper value 2", function () {
        let output = are('test', 0, '', {})
        expect(output).toBeFalse()
    })

})