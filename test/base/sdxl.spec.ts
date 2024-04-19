const postMock = jest
  .fn()
  .mockResolvedValue({ data: { transcription: 'example text' } });

jest.mock('axios', () => {
  const mockAxiosInstance = {
    post: postMock,
  };
  return {
    create: jest.fn(() => mockAxiosInstance),
  };
});
import { ROOT_URL } from '@/lib/constants/client';
import { Sdxl } from '@/index';

describe('Sdxl', () => {
  const modelName = 'stability-ai/sdxl';
  const apiKey = 'your-api-key';
  let model: Sdxl;

  beforeAll(() => {
    model = new Sdxl(apiKey);
  });

  it('should create a new instance', () => {
    expect(model).toBeInstanceOf(Sdxl);
  });

  it('should send a request to correct URL', async () => {
    const response = await model.generate({
      input: { prompt: 'The quick brown fox jumps over the lazy dog' },
    });

    expect(response).toBeDefined();
    expect(postMock).toHaveBeenCalledWith(
      `${ROOT_URL}${modelName}`,
      expect.any(Object),
      expect.any(Object),
    );
  });
});
