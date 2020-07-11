import { is, getName, createElementFromString, getRangeValue, joinAttributesForQuery, clone, are, getMatchingAttribute, getRangeValueOrDefault, getStyleValue, getOffsetTop, getOffsetLeft, parseJsonString, parseAttributeString, prepLogString, jsonify, isInRange, getIntOrDefault, isString, replacePrefix, parseAttribute, isStringTrue, boolStringOrDefault, getStringOrDefault, generateCUID, generateRandomString, getRandomInt } from "../src/core/utlis/functions"

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
        //let undef: any;

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

describe("Tests checking method [parseIntOrDefault]", function () {
    it("Returns number when string number is passed", function () {
        let output = getIntOrDefault('0', 1)
        expect(output).toEqual(0)
    })

    it("Returns default when string is not a number", function () {
        let output = getIntOrDefault('xxx', 1)
        expect(output).toEqual(1)
    })

    it("Returns default when string is not a value", function () {
        let val: any = undefined;
        let output = getIntOrDefault(val, 1)
        expect(output).toEqual(1)
    })
})

describe("Tests checking method [getRangeValueOrDefault]", function () {
    it("Returns number when string number is passed", function () {
        let output = getRangeValueOrDefault(parseInt('0'), -2, 2, 10);
        expect(output).toEqual(0)
    })

    it("Returns default when string is not a number", function () {
        let output = getRangeValueOrDefault(parseInt('sss'), -1, 1, 0.5)
        expect(output).toEqual(0.5)
    })

    it("Returns default when string is not a value", function () {
        let val: any = null;
        let output = getRangeValueOrDefault(val, -1, 1, 0.5)
        expect(output).toEqual(0.5)
    })

})

describe("Tests checking method [getStyleValue]", function () {
    it("Returns computed style value", function () {
        let div = document.createElement('div');
        div.innerHTML = "SSS";
        div.style.margin = "1rem";
        document.body.appendChild(div);
        let top = getStyleValue(div, 'margin-top');
        let left = getStyleValue(div, 'margin-left');
        div.remove();
        expect(top).toEqual("16px");
        expect(left).toEqual("16px");
    })

    it("Returns null when one of arguments is not a value", function () {
        let div = document.createElement('div');
        div.innerHTML = "SSS";
        div.style.margin = "16px";
        document.body.appendChild(div);
        let top = getStyleValue(null, 'margin-top');
        let left = getStyleValue(div, undefined);
        div.remove();
        expect(top).toEqual(null);
        expect(left).toEqual(null);
    })
})

describe("Tests checking method [getOffsetTop]", function () {
    it("Offset value is calculated on proper node", function () {
        let div = document.createElement('div');
        div.innerHTML = "SSS";
        div.style.padding = "20px";
        div.style.height = "100px";
        document.body.appendChild(div);
        let out = getOffsetTop(div);
        div.remove();

        expect(out).toBeGreaterThan(-1);

    })

    it("Offset value is negative calculated on inproper node", function () {
        let out = getOffsetTop(null);
        expect(out).toEqual(-1);

    })
})

describe("Tests checking method [getOffsetLeft]", function () {
    it("Offset value is calculated on proper node", function () {
        let div = document.createElement('div');
        div.innerHTML = "SSS";
        div.style.padding = "20px";
        div.style.height = "100px";
        document.body.appendChild(div);

        let out = getOffsetLeft(div);
        div.remove();

        expect(out).toBeGreaterThan(-1);

    })

    it("Offset value is negative calculated on inproper node", function () {
        let out = getOffsetLeft(null);
        expect(out).toEqual(-1);

    })
})


describe("Tests checking method [parseAttibuteJSON]", function () {
    it("Parses proper JSON string", function () {
        let str = `{"a":"-1", "b": "-2"}`
        let out = parseJsonString(str);
        expect(out.a).toEqual("-1");
        expect(out.b).toEqual("-2");

    })

    it("Parses inproper JSON string", function () {
        let str = `{"a":"-1"; "b": "-2"}`; // colon instead of semi-colon
        let out = parseJsonString(str);
        expect(out).toEqual(null);
    })
})

describe("Tests checking method [parseAttributeString]", function () {
    it("Parses proper string", function () {
        let str = `a:-1`
        let out = parseAttributeString(str);
        expect(out.a).toEqual("-1");
    })

    it("Parses proper string", function () {
        let str = `a:-1; b: -2`
        let out = parseAttributeString(str);
        expect(out.a).toEqual("-1");
        expect(out.b).toEqual("-2");

    })

    it("Parses inproper string", function () {
        let str = `a:-1 b: -2`;
        let out = parseAttributeString(str);
        expect(out.a).toEqual(undefined);
        expect(out.b).toEqual(undefined);
    })

    it("Parses string only", function () {
        let str = `xxx`;
        let out = parseAttributeString(str);
        expect(out).toEqual('xxx');
    })

    it("Parses object single", function () {
        let str = `xxx: -1`;
        let out = parseAttributeString(str);
        expect(out.xxx).toEqual('-1');
    })
})

describe("Tests checking method [prepLogString]", function () {
    it("Outputs a proper string", function () {
        let out = prepLogString("X", "Y", "Z");
        expect(out).toContain("[Y][Z][X]");

    })

    it("Outputs proper string when not all argument are passed", function () {
        let out = prepLogString("X", null);
        expect(out).toContain("[-][-][X]");
    })
})

describe("Tests checking method [jsonify]", function () {
    it("Outputs a proper string", function () {
        let str = `{"a":"-1", "b": "-2"}`;
        let out = jsonify(str);
        expect(out.a).toContain("-1");
        expect(out.b).toEqual("-2");
    })

    it("Outputs proper string when not all argument are passed", function () {
        let str = `{"a":"-1"; "b": "-2"}`;
        let out = null;
        let failed = false;
        try {
            let out = jsonify(str);
        } catch (e) {
            failed = true;
        }
        expect(out).toBe(null);
        expect(failed).toBeTrue();
    })
})

describe("Tests checking method [isInRange]", function () {
    it("Returns true when value is in range", function () {
        let out = isInRange(1, 0, 10);
        expect(out).toBeTrue();
    })

    it("Returns false when value is in range", function () {
        let out = isInRange(-2, 0, 10);
        expect(out).toBeFalse();
    })
})

describe("Tests checking method [isString]", function () {
    it("Returns true when value string", function () {
        let out = isString("XXX");
        expect(out).toBeTrue();
    })

    it("Returns false when value is not a string", function () {
        let out = isString(-1);
        expect(out).toBeFalse();
    })

    it("Returns false when value is null", function () {
        let out = isString(null);
        expect(out).toBeFalse();
    })

    it("Returns false when value is undefined", function () {
        let out = isString(null);
        expect(out).toBeFalse();
    })
})

describe("Tests checking method [parseAttribute]", function () {
    let div: Element;
    beforeEach(() => {
        div = document.createElement('div');
        div.setAttribute("attr", "val")
        document.body.appendChild(div);
    })

    afterEach(() => {
        div.remove();
    })

    it("Returns proper value of an attribute", function () {
        let out = parseAttribute(div, 'attr');
        expect(out).toEqual("val");
    })

    it("Returns the same value when there's no prefix", function () {
        let out = parseAttribute(div, null);
        expect(out).toEqual(null);
    })

    it("Returns value when is not value", function () {
        let out = parseAttribute(null, 'attr');
        expect(out).toEqual(null);
    })
})

describe("Tests checking method [replacePrefix]", function () {
    it("Returns true when value string", function () {
        let out = replacePrefix("-{prefix}-value", 'cui');
        expect(out).toEqual("-cui-value");
    })

    it("Returns the same value when there's no prefix", function () {
        let out = replacePrefix("-xxx-value", 'cui');
        expect(out).toEqual("-xxx-value");
    })

    it("Returns value when is not value", function () {
        let out = replacePrefix(null, 'cui');
        expect(out).toEqual(null);
    })

    it("Replaces prefix with empty string when prefix isn't provided", function () {
        let out = replacePrefix("-{prefix}-value", null);
        expect(out).toEqual("--value");
    })
})

describe("Tests checking method [isStringTrue]", function () {
    it("Returns true when value string is true", function () {
        let out = isStringTrue("TRUE");
        expect(out).toBeTrue();
    })

    it("Returns false when value string is falsy", function () {
        let out = isStringTrue("FALSE");
        expect(out).toBeFalse();
    })

    it("Returns false when is not value", function () {
        let out = isStringTrue(null);
        expect(out).toBeFalse();
    })
})

describe("Tests checking method [boolStringOrDefault]", function () {
    it("Returns true when value string is true", function () {
        let out = boolStringOrDefault("TRUE", true);
        expect(out).toBeTrue();
    })

    it("Returns false when value string is falsy", function () {
        let out = boolStringOrDefault("FALSE", true);
        expect(out).toBeFalse();
    })

    it("Returns default when is not value", function () {
        let out = boolStringOrDefault(null, true);
        expect(out).toBeTrue();
    })
})

describe("Tests checking method [getStringOrDefault]", function () {
    it("Returns lower casesd value", function () {
        let out = getStringOrDefault("TRUE", "xxx");
        expect(out).toEqual('true');
    })

    it("Returns default value when value is empty", function () {
        let out = getStringOrDefault("", 'xxx');
        expect(out).toEqual('xxx');
    })

    it("Returns default when is not value", function () {
        let out = getStringOrDefault(null, 'xxx');
        expect(out).toEqual('xxx');
    })

    it("Returns default when is not value", function () {
        let out = getStringOrDefault(null, null);
        expect(out).toEqual(null);
    })
})

describe("Tests checking method [generateCUID]", function () {
    it("Randomized string with element name", function () {
        let out = generateCUID("xxx");
        expect(out).toContain('xxx');
    })

    it("Randomized string with default name when no name is passed", function () {
        let out = generateCUID();
        expect(out).toContain('cui-element');
    })
})

describe("Tests checking method [generateRandomString]", function () {
    it("Randomized string ", function () {
        let out = generateRandomString();
        expect(out.length).toBeGreaterThan(2);
    })
})

describe("Tests checking method [getRandomInt]", function () {
    it("Randomized string ", function () {
        let out = getRandomInt(0, 100);
        let out2 = getRandomInt(0, 1000);
        expect(out).toBeGreaterThanOrEqual(0);
        expect(out).toBeLessThanOrEqual(100);
        expect(out2).toBeGreaterThanOrEqual(0);
        expect(out2).toBeLessThanOrEqual(1000);
        expect(out !== out2).toBeTrue();
    })
})