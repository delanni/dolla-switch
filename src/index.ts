export function $switchCaseStrict<K extends string | number, V>(
  input: K,
  cases: { [k in K]: () => V }
): V {
  const candidate = cases[input];
  if (candidate) {
    const value = candidate();
    return value;
  } else {
    throw new Error(
      `No case handler value found for input "${input}" in cases: ${Object.keys(
        cases
      )}.`
    );
  }
}

export function $switchCaseDefault<K extends string | number, V>(
  input: K | null | undefined,
  cases: { [k in K]?: () => V },
  defaultCase: () => V
): V {
  if (input === undefined || input === null) {
    const value = defaultCase();
    return value;
  } else {
    const candidate = cases[input];
    return candidate 
      ? candidate()
      : defaultCase();
  }
}

$switchCaseDefault.strict = $switchCaseStrict;
$switchCaseDefault.default = $switchCaseDefault;

export default $switchCaseDefault;
