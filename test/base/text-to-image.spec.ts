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
import { TextToImage } from "@/index";

describe("TextToImage", () => {
  const modelName = "runwayml/stable-diffusion-v1-5";
  const apiKey = "your-api-key";
  let model: TextToImage;

  beforeAll(() => {
    model = new TextToImage(modelName, apiKey);
  });

  it("should create a new instance", () => {
    expect(model).toBeInstanceOf(TextToImage);
  });

  it("should send a request to correct URL", async () => {
    const response = await model.generate({
      prompt: "The quick brown fox jumps over the lazy dog",
    });

    expect(response).toBeDefined();
    expect(postMock).toHaveBeenCalledWith(
      `${ROOT_URL}${modelName}`,
      expect.any(Object),
      expect.any(Object),
    );
  });
});
