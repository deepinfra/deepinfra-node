import {config} from 'dotenv';
import {Mixtral} from '@/lib/models/text-generation';
config();
const apiKey = String(process.env.DEEP_INFRA_API_KEY);
const misc = async () => {
  const model = new Mixtral(apiKey);

  const input = 'The quick brown fox jumps over the lazy dog';
  const response = await model.generate(input);
  console.log(response);
};

misc();
