const postMock = jest
  .fn()
  .mockResolvedValue({ status: 200, data: { transcription: 'example text' } });
jest.mock('axios', () => {
  const mockAxiosInstance = {
    post: postMock,
  };
  return {
    create: jest.fn(() => mockAxiosInstance),
  };
});
import { ROOT_URL } from '@/lib/constants/client';
import { FillMask } from '@/index';

describe('FillMask', () => {
  const modelName = 'GroNLP/bert-base-dutch-cased';
  const apiKey = 'your-api-key';
  let model: FillMask;

  beforeAll(() => {
    model = new FillMask(modelName, apiKey);
  });

  it('should create a new instance', () => {
    expect(model).toBeInstanceOf(FillMask);
  });

  it('should send a request to correct URL', async () => {
    const response = await model.generate({
      input: 'Hello [MASK]',
    });

    expect(response).toBeDefined();
    expect(postMock).toHaveBeenCalledWith(
      `${ROOT_URL}${modelName}`,
      expect.any(Object),
      expect.any(Object),
    );
  });
});
