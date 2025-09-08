import type { FetchOptions } from "ofetch";

import { toUrlSafe } from "../../utils/toUrlSafe";
import { decamelizeHumps } from "../../utils/camelcaseHumps";

/**
 * Apply following transformations to the fetch request:
 * - replace all non-URL-safe characters with their URL-safe counterparts in the path and query.
 * - deep transform all camelCase keys in the query to snake_case.
 */
export function normalizeRequest<T extends FetchOptions>(
  path: string,
  options?: T,
) {
  const pathWithParams = path.replace(/{([a-zA-Z0-9_]+)}/g, (_, key) => {
    const value = options?.query?.[key];

    if (!value) {
      throw new Error(`Missing value for path parameter "${key}"`);
    }

    delete options?.query?.[key];

    return toUrlSafe(value);
  });

  if (options?.query) {
    for (const key in options.query) {
      const value = options.query[key];

      if (typeof value === "string") {
        options.query[key] = toUrlSafe(value);
      }
    }

    options.query = decamelizeHumps(options.query);
  }

  return [pathWithParams, options] as const;
}
