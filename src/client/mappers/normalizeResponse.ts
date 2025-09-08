import { camelcaseHumps } from "../../utils/camelcaseHumps";
import { denullifyValues } from "../../utils/denullifyValues";

/**
 * Apply following transformations to the response:
 * - convert `null` and `undefined` falsy fields to `undefined` for consistency.
 * - deep transform all snake_case keys to camelCase.
 */
export function normalizeResponse<T extends Record<string, unknown>>(
  response: T,
) {
  return denullifyValues(camelcaseHumps(response));
}
