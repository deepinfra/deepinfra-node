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
import { TextClassification } from "@/index";

describe("TextClassification", () => {
  const modelName = "ProsusAI/finbert";
  const apiKey = "your-api-key";
  let model: TextClassification;

  beforeAll(() => {
    model = new TextClassification(modelName, apiKey);
  });

  it("should create a new instance", () => {
    expect(model).toBeInstanceOf(TextClassification);
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
