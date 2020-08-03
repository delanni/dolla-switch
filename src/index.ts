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
    return defaultCase();
  } else {
    const caseCandidate = cases[input];
    if (caseCandidate) {
      return caseCandidate();
    } else {
      return defaultCase();
    }
  }
}

$switchCaseDefault.strict = $switchCaseStrict;

export default $switchCaseDefault;
