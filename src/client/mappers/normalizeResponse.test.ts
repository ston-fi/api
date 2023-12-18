import { describe, it, expect } from "vitest";

import { normalizeResponse } from "./normalizeResponse";

describe("normalizeResponse", () => {
  it("should camelcase data in response", () => {
    const response = normalizeResponse({
      foo_bar: "baz",
      bar_baz: "qux",
      child: {
        foo_bar: "baz",
        bar_baz: "qux",
      },
    });

    expect(response).toEqual({
      fooBar: "baz",
      barBaz: "qux",
      child: {
        fooBar: "baz",
        barBaz: "qux",
      },
    });
  });

  it("should replace all potential null values with undefined", () => {
    const response = normalizeResponse({
      foo: null,
      child: {
        foo: null,
      },
    });

    expect(response).toEqual({
      foo: undefined,
      child: {
        foo: undefined,
      },
    });
  });
});
