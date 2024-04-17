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
import { TextGeneration } from "@/index";

describe("TextGeneration", () => {
  const modelName = "microsoft/WizardLM-2-8x22B";
  const apiKey = "your-api-key";
  let model: TextGeneration;

  beforeAll(() => {
    model = new TextGeneration(modelName, apiKey);
  });

  it("should create a new instance", () => {
    expect(model).toBeInstanceOf(TextGeneration);
  });

  it("should send a request to correct URL", async () => {
    const response = await model.generate({
      input: "The quick brown fox jumps over the lazy dog",
    });

    expect(response).toBeDefined();
    expect(postMock).toHaveBeenCalledWith(
      `${ROOT_URL}${modelName}`,
      expect.any(Object),
      expect.any(Object),
    );
  });
});
