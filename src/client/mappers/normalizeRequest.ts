import type { FetchOptions } from "ofetch";

import { decamelizeKeys } from "../../utils/decamelizeKeys";
import { toUrlSafe } from "../../utils/toUrlSafe";

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

    options.query = decamelizeKeys(options.query);
  }

  if (options?.body && typeof options.body === "object") {
    options.body = decamelizeKeys(options.body as Record<string, unknown>);
  }

  return [pathWithParams, options] as const;
}
