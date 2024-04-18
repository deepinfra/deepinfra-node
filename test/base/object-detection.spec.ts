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
import { ObjectDetection } from "@/index";

describe("ObjectDetection", () => {
  const modelName = "hustvl/yolos-base";
  const apiKey = "your-api-key";
  let model: ObjectDetection;
  const fakeFileBuffer = Buffer.from("This is a fake MP3 file", "utf8");

  beforeAll(() => {
    model = new ObjectDetection(modelName, apiKey);
  });

  beforeEach(() => {
    jest.spyOn(fs, "readFileSync").mockReturnValue(fakeFileBuffer);
  });

  it("should create a new instance", () => {
    expect(model).toBeInstanceOf(ObjectDetection);
  });

  it("should send a request to correct URL", async () => {
    const response = await model.generate({
      image: "test/assets/image.jpg",
    });

    expect(response).toBeDefined();
    expect(postMock).toHaveBeenCalledWith(
      `${ROOT_URL}${modelName}`,
      expect.any(Object),
      expect.any(Object),
    );
  });
});
