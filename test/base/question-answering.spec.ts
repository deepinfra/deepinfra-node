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
import { QuestionAnswering } from '@/index';

describe('QuestionAnswering', () => {
  const modelName = 'bert-large-uncased-whole-word-masking-finetuned-squad';
  const apiKey = 'your-api-key';
  let model: QuestionAnswering;

  beforeAll(() => {
    model = new QuestionAnswering(modelName, apiKey);
  });

  it('should create a new instance', () => {
    expect(model).toBeInstanceOf(QuestionAnswering);
  });

  it('should send a request to correct URL', async () => {
    const response = await model.generate({
      question: 'What is the capital of France?',
      context: 'France is a country in Europe.',
    });

    expect(response).toBeDefined();
    expect(postMock).toHaveBeenCalledWith(
      `${ROOT_URL}${modelName}`,
      expect.any(Object),
      expect.any(Object),
    );
  });
});
