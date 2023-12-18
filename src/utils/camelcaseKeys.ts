import _camelcaseKeys from "camelcase-keys";

/**
 * Transforms object keys to camel case.
 * Powered by [camelcase-keys](https://github.com/sindresorhus/camelcase-keys)
 *
 * @param obj Object with possible non-camel case keys.
 * @returns Object where all non-camel case keys are transformed to camel case.
 */
export function camelcaseKeys<T extends Record<string, unknown>>(val: T) {
  return _camelcaseKeys(val, { deep: true });
}
