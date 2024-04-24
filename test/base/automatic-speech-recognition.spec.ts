const postMock = jest
  .fn()
  .mockResolvedValue({ data: { transcription: "example text" } });

import { ROOT_URL } from "@/lib/constants/client";
import { AutomaticSpeechRecognition } from "@/index";

jest.mock("axios", () => {
  const mockAxiosInstance = {
    post: postMock,
    get: jest.fn().mockResolvedValue({ data: {} }),
  };
  return {
    get: jest.fn(() => mockAxiosInstance),
    create: jest.fn(() => mockAxiosInstance),
  };
});

describe("AutomaticSpeechRecognition", () => {
  const modelName = "openai/whisper-large";
  const apiKey = "your-api-key";
  let model: AutomaticSpeechRecognition;
  const fakeFileBuffer = Buffer.from("This is a fake MP3 file", "utf8");

  beforeAll(() => {
    model = new AutomaticSpeechRecognition(modelName, apiKey);
  });


  it("should create a new instance", () => {
    expect(model).toBeInstanceOf(AutomaticSpeechRecognition);
  });

  it("should send a request to correct URL", async () => {
    const response = await model.generate({
      audio: "test/assets/audio.mp3",
    });

    expect(response).toBeDefined();
    expect(postMock).toHaveBeenCalledWith(
      `${ROOT_URL}${modelName}`,
      expect.any(Object),
      expect.any(Object),
    );
  });

  it("should send a request with base64 audio", async () => {
    const response = await model.generate({
      audio: fakeFileBuffer as Buffer,
    });
    expect(response).toBeDefined();
    expect(postMock).toHaveBeenCalledWith(
      `${ROOT_URL}${modelName}`,
      expect.any(Object),
      expect.any(Object),
    );
  });

});
