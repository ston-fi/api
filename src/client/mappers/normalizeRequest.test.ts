import { describe, it, expect } from "vitest";

import { normalizeRequest } from "./normalizeRequest";

describe("normalizeRequest", () => {
  it("should insert path parameters and remove them from query", () => {
    const [path, options] = normalizeRequest("/v1/{foo}", {
      query: { foo: "bar", baz: "qux" },
    });

    expect(path).toEqual("/v1/bar");
    expect(options?.query).toEqual({ baz: "qux" });
  });

  it("should throw an error if path parameter is missing in query", () => {
    expect(() =>
      normalizeRequest("/v1/{foo}", {
        query: { baz: "qux" },
      }),
    ).toThrowError();
  });

  it("should transform path parameters to URL-safe strings", () => {
    const [path, options] = normalizeRequest("/v1/{foo}", {
      query: {
        foo: "bar/A+B=C",
      },
    });

    expect(path).toEqual("/v1/bar_A-BC");
    expect(options?.query).toEqual({});
  });

  it("should transform query parameters to URL-safe strings", () => {
    const [path, options] = normalizeRequest("/v1/{foo}", {
      query: { foo: "bar", baz: "qux/A+B=C" },
    });

    expect(path).toEqual("/v1/bar");
    expect(options?.query).toEqual({ baz: "qux_A-BC" });
  });

  it("should decamelize data in query parameters", () => {
    const [path, options] = normalizeRequest("/v1/{foo}", {
      query: { foo: "0x123", barBaz: "qux" },
    });

    expect(path).toEqual("/v1/0x123");
    expect(options?.query).toEqual({ bar_baz: "qux" });
  });
});
