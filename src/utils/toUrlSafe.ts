/**
 * Replace non-url-safe characters with safe ones
 *
 * @see [implementation by Whales Corp.](https://github.com/ton-org/ton/blob/master/src/utils/toUrlSafe.ts)
 *
 * @param str String to be converted.
 * @returns Converted string.
 */
export function toUrlSafe(str: string) {
  let safeStr = str;

  while (safeStr.indexOf("/") >= 0) {
    safeStr = safeStr.replace("/", "_");
  }
  while (safeStr.indexOf("+") >= 0) {
    safeStr = safeStr.replace("+", "-");
  }
  while (safeStr.indexOf("=") >= 0) {
    safeStr = safeStr.replace("=", "");
  }

  return safeStr;
}
