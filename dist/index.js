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
    if (input === undefined || input === null) {
        return defaultCase();
    }
    else {
        var caseCandidate = cases[input];
        if (caseCandidate) {
            return caseCandidate();
        }
        else {
            return defaultCase();
        }
    }
}
exports.$switchCaseDefault = $switchCaseDefault;
$switchCaseDefault.strict = $switchCaseStrict;
exports.default = $switchCaseDefault;
//# sourceMappingURL=index.js.map