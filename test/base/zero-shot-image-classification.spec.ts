const postMock = jest
  .fn()
  .mockResolvedValue({ data: { transcription: "example text" } });
jest.mock("node:fs", () => ({
  readFileSync: jest.fn(),
}));
jest.mock("axios", () => {
  const mockAxiosInstance = {
    post: postMock,
  };
  return {
    create: jest.fn(() => mockAxiosInstance),
  };
});
import * as fs from "node:fs";
import { ROOT_URL } from "@/lib/constants/client";
import { ZeroShotImageClassification } from "@/index";

describe("ZeroShotImageClassification", () => {
  const modelName = "openai/clip-vit-base-patch32";
  const apiKey = "your-api-key";
  let model: ZeroShotImageClassification;
  const fakeFileBuffer = Buffer.from("This is a fake image file", "utf8");

  beforeAll(() => {
    model = new ZeroShotImageClassification(modelName, apiKey);
  });

  beforeEach(() => {
    jest.spyOn(fs, "readFileSync").mockReturnValue(fakeFileBuffer);
  });

  it("should create a new instance", () => {
    expect(model).toBeInstanceOf(ZeroShotImageClassification);
  });

  it("should send a request to correct URL", async () => {
    const response = await model.generate({
      image: "test/assets/image.jpg",
      candidate_labels: ["dog", "cat"],
    });

    expect(response).toBeDefined();
    expect(postMock).toHaveBeenCalledWith(
      `${ROOT_URL}${modelName}`,
      expect.any(Object),
      expect.any(Object),
    );
  });
});
