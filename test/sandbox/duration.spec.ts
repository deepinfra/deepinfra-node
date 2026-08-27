import { parseDuration } from "@/lib/sandbox/duration";

describe("parseDuration", () => {
  it("accepts plain numbers as seconds, rounding fractions up", () => {
    expect(parseDuration(90)).toBe(90);
    expect(parseDuration(0.5)).toBe(1);
    expect(parseDuration(0)).toBe(0);
  });

  it("accepts a bare digit string as seconds", () => {
    expect(parseDuration("90")).toBe(90);
  });

  it("accepts single-unit duration strings", () => {
    expect(parseDuration("90s")).toBe(90);
    expect(parseDuration("10m")).toBe(600);
    expect(parseDuration("2h")).toBe(7200);
  });

  it("accepts compound duration strings", () => {
    expect(parseDuration("1h30m")).toBe(5400);
  });

  it("is case-insensitive and trims whitespace", () => {
    expect(parseDuration(" 10M ")).toBe(600);
  });

  it("throws on a negative number", () => {
    expect(() => parseDuration(-1)).toThrow(/non-negative/);
  });

  it("throws on an empty string", () => {
    expect(() => parseDuration("")).toThrow(/empty/);
  });

  it("throws on an invalid string", () => {
    expect(() => parseDuration("soon")).toThrow(/Invalid duration/);
    expect(() => parseDuration("10x")).toThrow(/Invalid duration/);
    expect(() => parseDuration("10m garbage")).toThrow(/Invalid duration/);
  });
});
