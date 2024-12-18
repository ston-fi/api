import { describe, expect, it } from "vitest";

import { normalizeDate } from "./normalizeDate";

describe("normalizeDate", () => {
  it("should return timestamp in 'YYYY-MM-DDTHH:MM:SS' format from given Date", () => {
    const timestampString = normalizeDate(
      new Date("01/19/2024 12:00:00 UTC+0"),
    );

    expect(timestampString).toBe("2024-01-19T12:00:00");
  });
});
