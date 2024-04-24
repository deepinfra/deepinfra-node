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
import { ObjectDetection } from "@/index";
import FormData from "form-data";

describe("ObjectDetection", () => {
  const modelName = "hustvl/yolos-base";
  const apiKey = "your-api-key";
  let model: ObjectDetection;

  beforeAll(() => {
    model = new ObjectDetection(modelName, apiKey);
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
      expect.any(FormData),
      expect.objectContaining({
        headers: expect.objectContaining({
          "content-type": expect.stringMatching(/multipart\/form-data/),
        }),
      }),
    );
  });
});
