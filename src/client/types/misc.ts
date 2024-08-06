type Separator = "_";

export type SimpleUpperCase<T extends string> =
  T extends `${infer Prefix}${Separator}${infer Suffix}`
    ? SimpleUpperCase<`${Capitalize<Prefix>}${Capitalize<Suffix>}`>
    : Capitalize<T>;
