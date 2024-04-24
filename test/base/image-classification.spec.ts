const postMock = jest
  .fn()
  .mockResolvedValue({ data: { transcription: "example text" } });
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
import { ImageClassification } from "@/index";

describe("ImageClassification", () => {
  const modelName = "google/vit-base-patch16-224";
  const apiKey = "your-api-key";
  let model: ImageClassification;
  const fakeFileBuffer = Buffer.from("This is a fake image file", "utf8");

  beforeAll(() => {
    model = new ImageClassification(modelName, apiKey);
  });

  it("should create a new instance", () => {
    expect(model).toBeInstanceOf(ImageClassification);
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
