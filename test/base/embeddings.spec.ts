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
import { Embeddings } from '@/index';

describe('Embeddings', () => {
  const modelName = 'BAAI/bge-large-en-v1.5';
  const apiKey = 'your-api-key';
  let model: Embeddings;

  beforeAll(() => {
    model = new Embeddings(modelName, apiKey);
  });

  it('should create a new instance', () => {
    expect(model).toBeInstanceOf(Embeddings);
  });

  it('should send a request to correct URL', async () => {
    const response = await model.generate({
      inputs: ['Hello world', 'Hallo Wereld'],
    });

    expect(response).toBeDefined();
    expect(postMock).toHaveBeenCalledWith(
      `${ROOT_URL}${modelName}`,
      expect.any(Object),
      expect.any(Object),
    );
  });
});
