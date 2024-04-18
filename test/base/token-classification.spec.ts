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
import { TokenClassification } from "@/index";

describe("TokenClassification", () => {
  const modelName = "Davlan/bert-base-multilingual-cased-ner-hrl";
  const apiKey = "your-api-key";
  let model: TokenClassification;

  beforeAll(() => {
    model = new TokenClassification(modelName, apiKey);
  });

  it("should create a new instance", () => {
    expect(model).toBeInstanceOf(TokenClassification);
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

  it("should throw error if DEEPINFRA_API_KEY is not set", () => {
    expect(() => new TokenClassification(modelName)).toThrow();
  });

  it("should be constructed with an API key", () => {
    process.env.DEEPINFRA_API_KEY = apiKey
    const model = new TokenClassification(modelName);
    expect(model).toBeDefined();
    process.env.DEEPINFRA_API_KEY = ""
  });
});
