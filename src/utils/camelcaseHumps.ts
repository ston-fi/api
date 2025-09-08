import humps from "humps";

export function camelcaseHumps<T extends Record<string, unknown>>(val: T) {
  return humps.camelizeKeys(val);
}

export function decamelizeHumps<T extends Record<string, unknown>>(val: T) {
  return humps.decamelizeKeys(val);
}
