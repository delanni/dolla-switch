"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function $switchCaseStrict(input, cases) {
    var candidate = cases[input];
    if (candidate) {
        var value = candidate();
        return value;
    }
    else {
        throw new Error("No case handler value found for input \"" + input + "\" in cases: " + Object.keys(cases) + ".");
    }
}
exports.$switchCaseStrict = $switchCaseStrict;
function $switchCaseDefault(input, cases, defaultCase) {
    var candidate = cases[input];
    if (candidate) {
        var value = candidate();
        return value;
    }
    else {
        var value = defaultCase();
        return value;
    }
}
exports.$switchCaseDefault = $switchCaseDefault;
$switchCaseDefault.strict = $switchCaseStrict;
$switchCaseDefault.default = $switchCaseDefault;
exports.default = $switchCaseDefault;
