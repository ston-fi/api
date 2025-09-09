import { camelizeKeys, decamelizeKeys } from "humps";
import type {
  CamelCasedPropertiesDeep,
  SnakeCasedPropertiesDeep,
} from "type-fest";

export function camelcaseHumps<T extends Record<string, unknown>>(
  val: T,
): CamelCasedPropertiesDeep<T> {
  return camelizeKeys(val) as CamelCasedPropertiesDeep<T>;
}

export function decamelizeHumps<T extends Record<string, unknown>>(
  val: T,
): SnakeCasedPropertiesDeep<T> {
  return decamelizeKeys(val) as SnakeCasedPropertiesDeep<T>;
}
