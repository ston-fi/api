import humps from "humps";

type CamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<CamelCase<U>>}`
  : S;

export type CamelCaseKeys<T> = T extends readonly any[]
  ? CamelCaseKeys<T[number]>[]
  : T extends object
    ? {
        [K in keyof T as CamelCase<K & string>]: CamelCaseKeys<T[K]>;
      }
    : T;

export function camelcaseHumps<T extends Record<string, unknown>>(
  val: T,
): CamelCaseKeys<T> {
  return humps.camelizeKeys(val) as CamelCaseKeys<T>;
}

type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Uppercase<T> ? "_" : ""}${Lowercase<T>}${SnakeCase<U>}`
  : S;

export type SnakeCaseKeys<T> = T extends readonly any[]
  ? SnakeCaseKeys<T[number]>[]
  : T extends object
    ? {
        [K in keyof T as SnakeCase<K & string>]: SnakeCaseKeys<T[K]>;
      }
    : T;

export function decamelizeHumps<T extends Record<string, unknown>>(
  val: T,
): SnakeCaseKeys<T> {
  return humps.decamelizeKeys(val) as SnakeCaseKeys<T>;
}
