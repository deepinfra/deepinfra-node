import {config} from 'dotenv';
import {BgeBaseEnV15} from '@/lib/models/embeddings/bge-base-en-v15';
config();
const apiKey = String(process.env.DEEP_INFRA_API_KEY);
const misc = async () => {
  const model = new BgeBaseEnV15(apiKey);

  const input = ['The quick brown fox jumps over the lazy dog'];
  const response = await model.generate(input);
  console.log(response);
};

misc();
