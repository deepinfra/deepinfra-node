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
import { ROOT_URL } from "@/lib/constants/client";
import { ZeroShotImageClassification } from "@/index";
import FormData from "form-data";

describe("ZeroShotImageClassification", () => {
  const modelName = "openai/clip-vit-base-patch32";
  const apiKey = "your-api-key";
  let model: ZeroShotImageClassification;

  beforeAll(() => {
    model = new ZeroShotImageClassification(modelName, apiKey);
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
      expect.any(FormData),
      expect.objectContaining({
        headers: expect.objectContaining({
          "content-type": expect.stringMatching(/multipart\/form-data/),
        }),
      }),
    );
  });
});
