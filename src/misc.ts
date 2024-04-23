import {config} from 'dotenv';
config();
import * as path from 'path';
import {ImageClassification, ZeroShotImageClassification} from "./lib/models/base";

const apiKey = String(process.env.DEEPINFRA_API_KEY);
const modelName = "microsoft/resnet-50";
const main = async () => {
  const model = new ImageClassification(modelName, apiKey);

  const input = {
    image: path.join(__dirname, 'image.jpg'),
  };
  const response = await model.generate(input);
  const {results} = response;
  console.log(results);
}

main();
