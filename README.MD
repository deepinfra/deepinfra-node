
![npm](https://img.shields.io/npm/v/deepinfra-api)
![npm](https://img.shields.io/npm/dt/deepinfra-api)<br>
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ovuruska_deepinfra-api&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=ovuruska_deepinfra-api)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=ovuruska_deepinfra-api&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=ovuruska_deepinfra-api)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ovuruska_deepinfra-api&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=ovuruska_deepinfra-api)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ovuruska_deepinfra-api&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=ovuruska_deepinfra-api)



# deepinfra-api
Simple DeepInfra API Wrapper - simple interface to use DeepInfra's Inference API.


## Installation

```bash
npm install deepinfra-api
```

## Usage

### Use dolphin-2.6-mixtral-8x7b

The Dolphin 2.6 Mixtral 8x7b model, uncensored and trained on diverse datasets including coding, excels at programming
tasks and general conversation.

```typescript
import {Dolphin} from "deepinfra-api";

const apiKey = "YOUR_DEEP_INFRA_API_KEY";
const dolphin = new Dolphin(apiKey);
const body = {
  input: "[INST] Say hi [/INST]"
}
const output = await dolphin.generate(body);
const text = output.results[0].generated_text;
console.log(text);
```

### Use Mixtral-8x7B-Instruct-v0.1

The Mixtral mixture of expert model, developed by Mistral AI, is an innovative experimental machine learning model that
leverages a mixture of 8 experts (MoE) within 7b models. Its release was facilitated via a torrent, and the model's
implementation remains in the experimental phase.

```typescript
import {Mixtral} from "deepinfra-api";

const apiKey = "YOUR_DEEP_INFRA_API_KEY";
const main = async () => {
  const mixtral = new Mixtral(apiKey);
  const body = {
    input: "What is the capital of France?"
  }
  const output = await mixtral.generate(body);
  const text = output.results[0].generated_text;
  console.log(text);
}

main();
```

### Use gte-base

```typescript
import {GteBase} from "deepinfra-api";

const apiKey = "YOUR_DEEP_INFRA_API_KEY";
const main = async () => {
  const gteBase = new GteBase(apiKey);
  const body = {
    inputs: [
      "What is the capital of France?",
      "What is the capital of Germany?",
      "What is the capital of Italy?"
    ]
  }
  const output = await gteBase.generate(body);
  const embeddings = output.embeddings[0];
  console.log(embeddings);
}

main();
```

### Use SDXL to generate images

```typescript
import {Sdxl} from "deepinfra-api";
import axios from "axios";
import fs from "fs";

const apiKey = "YOUR_DEEP_INFRA_API_KEY";

const main = async () => {
  const model = new Sdxl(apiKey);

  const input = {
    prompt: 'The quick brown fox jumps over the lazy dog with'
  };
  const response = await model.generate(input);
  const {output} = response;
  const image = output[0];

  await axios.get(image, {responseType: 'arraybuffer'}).then((response) => {
    fs.writeFileSync('image.png', response.data);
  });
}

main();
```

### Use Whisper Large to generate captions from audios

```typescript
import {WhisperLarge} from "deepinfra-api";

const apiKey = "YOUR_DEEP_INFRA_API_KEY";
const main = async () => {
  const model = new WhisperLarge(apiKey);

  const input = {
    audio: path.join(__dirname, 'audio.mp3')
  };
  const response = await model.generate(input);
  const {text} = response;
  console.log(text);
}

main();
```

### Use Yolos Base to generate object detection results

```typescript
import {YolosBase} from "deepinfra-api";

const apiKey = "YOUR_DEEP_INFRA_API_KEY";
const main = async () => {
  const model = new YolosBase(apiKey);

  const input = {
    image: path.join(__dirname, 'image.jpg')
  };
  const response = await model.generate(input);
  const {results} = response;
  console.log(results);
}

```

### Generate token classification results using a BERT model

```typescript
import {BertBaseNer} from "deepinfra-api";

const apiKey = "YOUR_DEEP_INFRA_API_KEY";

const main = async () => {
  const model = new BertBaseNer(apiKey);

  const input = {
    text: 'The quick brown fox jumps over the lazy dog'
  };
  const response = await model.generate(input);
  const {results} = response;
  console.log(results);
}
```

## Author

[Oguz Vuruskaner](https://www.oguzvuruskaner.com) - Core Developer

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

## License

This is free and unencumbered public domain software. For more info, see https://unlicense.org.
