import { tagsMatch } from "@/lib/sandbox/tags";

describe("tagsMatch", () => {
  it("is true when every subset key/value is present in tags", () => {
    expect(
      tagsMatch({ job: "etl-42" }, { job: "etl-42", owner: "milos" }),
    ).toBe(true);
  });

  it("is true for an empty subset", () => {
    expect(tagsMatch({}, { job: "etl-42" })).toBe(true);
  });

  it("is false when a value differs", () => {
    expect(tagsMatch({ job: "etl-42" }, { job: "etl-43" })).toBe(false);
  });

  it("is false when a key is missing", () => {
    expect(tagsMatch({ job: "etl-42" }, { owner: "milos" })).toBe(false);
  });
});
