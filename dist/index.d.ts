export declare function $switchCaseStrict<K extends string | number, V>(input: K, cases: {
    [k in K]: () => V;
}): V;
export declare function $switchCaseDefault<K extends string | number, V>(input: K, cases: {
    [k in K]?: () => V;
}, defaultCase: () => V): V;
export declare namespace $switchCaseDefault {
    var strict: typeof $switchCaseStrict;
    var default: typeof $switchCaseDefault;
}
export default $switchCaseDefault;
