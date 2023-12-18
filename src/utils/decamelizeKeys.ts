import _decamelizeKeys from "decamelize-keys";

/**
 * Transforms object keys from camel case to snake case.
 * Powered by [decamelize-keys](https://github.com/sindresorhus/decamelize-keys)
 *
 * @param obj Object with possible camel case keys.
 * @returns Object where all camel case keys are transformed to snake case.
 */
export function decamelizeKeys<T extends Record<string, unknown>>(val: T) {
  return _decamelizeKeys(val, { deep: true });
}
