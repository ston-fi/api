type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends Date
    ? T
    : {
        [K in keyof T]: T[K] extends (infer U)[]
          ? RecursivelyReplaceNullWithUndefined<U>[]
          : RecursivelyReplaceNullWithUndefined<T[K]>;
      };

/**
 * Recursively replace all `null` values with `undefined` in the **first level** of the passed object.
 *
 * @see [implementation by jtomaszewski](https://github.com/apollographql/apollo-client/issues/2412#issuecomment-755449680)
 *
 * @param obj Object with possible `null` values.
 * @returns Object where all `null` values are replaced with `undefined`.
 */
export function denullifyValues<T>(
  obj: T,
): RecursivelyReplaceNullWithUndefined<T> {
  // biome-ignore lint/suspicious/noExplicitAny: it's ok here
  const newObj: any = {};

  for (const k in obj) {
    // biome-ignore lint/suspicious/noExplicitAny: it's ok here
    const v: any = obj[k];

    newObj[k] =
      v === null
        ? undefined
        : v && typeof v === "object" && v.__proto__.constructor === Object
          ? denullifyValues(v)
          : v;
  }

  return newObj;
}
