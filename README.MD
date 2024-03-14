![npm](https://img.shields.io/npm/v/deepinfra-api)
![npm](https://img.shields.io/npm/dt/deepinfra-api)

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
const mixtral = new Mixtral(apiKey);
const body = {
  input: "What is the capital of France?"
}
const output = await mixtral.generate(body);
const text = output.results[0].generated_text;
console.log(text);
```

### Use gte-base

```typescript
import {GteBase} from "deepinfra-api";

const apiKey = "YOUR_DEEP_INFRA_API_KEY";
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

```

### Use SDXL to generate images

```typescript
import {Sdxl} from "deepinfra-api";
import axios from "axios";
import fs from "fs";

const apiKey = "YOUR_DEEP_INFRA_API_KEY";
const misc = async () => {
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

};
```

## Author

[Oguz Vuruskaner](https://www.oguzvuruskaner.com) - Core Developer

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

## License

This is free and unencumbered public domain software. For more info, see https://unlicense.org.
