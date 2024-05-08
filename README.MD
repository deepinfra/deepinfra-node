# DeepInfra Node API Library
![npm](https://img.shields.io/npm/v/deepinfra)
![npm](https://img.shields.io/npm/dt/deepinfra)<br>


This library provides a simple way to interact with the DeepInfra API. 
<br>
<br>
Check out our docs [here.](https://deepinfra.github.io/deepinfra-node/)

## Installation

```bash
npm install deepinfra
```

## Usage

### Use [text generation models](https://deepinfra.com/models/text-generation)

The Mixtral mixture of expert model, developed by Mistral AI, is an innovative experimental machine learning model that
leverages a mixture of 8 experts (MoE) within 7b models. Its release was facilitated via a torrent, and the model's
implementation remains in the experimental phase.\_

```typescript
import { Mixtral } from "deepinfra";
const modelName = "mistralai/Mixtral-8x22B-Instruct-v0.1";
const apiKey = "YOUR_DEEPINFRA_API_KEY";
const main = async () => {
  const mixtral = new Mixtral(Mixtral, apiKey);
  const body = {
    input: "What is the capital of France?",
  };
  const output = await mixtral.generate(body);
  const text = output.results[0].generated_text;
  console.log(text);
};

main();
```

### Use [text embedding models](https://deepinfra.com/models/embeddings)

Gte Base is an text embedding model that generates embeddings for the input text. The model is trained by Alibaba DAMO Academy.

```typescript
import { GteBase } from "deepinfra";

const apiKey = "YOUR_DEEPINFRA_API_KEY";
const modelName = "thenlper/gte-base";
const main = async () => {
  const gteBase = new Embeddings(modelName, apiKey);
  const body = {
    inputs: [
      "What is the capital of France?",
      "What is the capital of Germany?",
      "What is the capital of Italy?",
    ],
  };
  const output = await gteBase.generate(body);
  const embeddings = output.embeddings[0];
  console.log(embeddings);
};

main();
```

### Use [SDXL](https://deepinfra.com/stability-ai/sdxl) to generate images

SDXL requires unique parameters, therefore it requires different initialization.

```typescript
import { Sdxl } from "deepinfra";
import axios from "axios";
import fs from "fs";

const apiKey = "YOUR_DEEPINFRA_API_KEY";

const main = async () => {
  const model = new Sdxl(apiKey);

  const input = {
    prompt: "The quick brown fox jumps over the lazy dog with",
  };
  const response = await model.generate({ input });
  const { output } = response;
  const image = output[0];

  await axios.get(image, { responseType: "arraybuffer" }).then((response) => {
    fs.writeFileSync("image.png", response.data);
  });
};

main();
```

### Use [other text to image models](https://deepinfra.com/models/text-to-image)

```typescript
import { TextToImage } from "deepinfra";
import axios from "axios";
import fs from "fs";

const apiKey = "YOUR_DEEPINFRA_API_KEY";
const modelName = "stabilityai/stable-diffusion-2-1";
const main = async () => {
  const model = new TextToImage(modelName, apiKey);
  const input = {
    prompt: "The quick brown fox jumps over the lazy dog with",
  };

  const response = await model.generate(input);
  const { output } = response;
  const image = output[0];

  await axios.get(image, { responseType: "arraybuffer" }).then((response) => {
    fs.writeFileSync("image.png", response.data);
  });
};
main();
```

### Use [automatic speech recognition models](https://deepinfra.com/models/automatic-speech-recognition)

```typescript
import { AutomaticSpeechRecognition } from "deepinfra";

const apiKey = "YOUR_DEEPINFRA_API_KEY";
const modelName = "openai/whisper-base";

const main = async () => {
  const model = new AutomaticSpeechRecognition(modelName, apiKey);

  const input = {
    audio: path.join(__dirname, "audio.mp3"),
  };
  const response = await model.generate(input);
  const { text } = response;
  console.log(text);
};

main();
```

### Use [object detection models](https://deepinfra.com/models/object-detection)

```typescript
import { ObjectDetection } from "deepinfra";

const apiKey = "YOUR_DEEPINFRA_API_KEY";
const modelName = "hustvl/yolos-tiny";
const main = async () => {
  const model = new ObjectDetection(modelName, apiKey);

  const input = {
    image: path.join(__dirname, "image.jpg"),
  };
  const response = await model.generate(input);
  const { results } = response;
  console.log(results);
};
```

### Use [token classification models](https://deepinfra.com/models/token-classification)

```typescript
import { TokenClassification } from "deepinfra";

const apiKey = "YOUR_DEEPINFRA_API_KEY";
const modelName = "Davlan/bert-base-multilingual-cased-ner-hrl";

const main = async () => {
  const model = new TokenClassification(modelName, apiKey);

  const input = {
    text: "The quick brown fox jumps over the lazy dog",
  };
  const response = await model.generate(input);
  const { results } = response;
  console.log(results);
};
```

### Use [fill mask models](https://deepinfra.com/models/fill-mask)

```typescript
import { FillMask } from "deepinfra";

const apiKey = "YOUR_DEEPINFRA_API_KEY";
const modelName = "GroNLP/bert-base-dutch-cased";

const main = async () => {
  const model = new FillMask(modelName, apiKey);

  const body = {
    input: "Ik heb een [MASK] gekocht.",
  };

  const { results } = await model.generate(body);
  console.log(results);
};
```

### Use [image classification models](https://deepinfra.com/models/image-classification)

```typescript
import { ImageClassification } from "deepinfra";

const apiKey = "YOUR_DEEPINFRA_API_KEY";
const modelName = "google/vit-base-patch16-224";

const main = async () => {
  const model = new ImageClassification(modelName, apiKey);

  const body = {
    image: path.join(__dirname, "image.jpg"),
  };

  const { results } = await model.generate(body);
  console.log(results);
};
```

### Use [zero-shot image classification models](https://deepinfra.com/models/zero-shot-image-classification)

```typescript
import { ZeroShotImageClassification } from "deepinfra";

const apiKey = "YOUR_DEEPINFRA_API_KEY";
const modelName = "openai/clip-vit-base-patch32";

const main = async () => {
  const model = new ZeroShotImageClassification(modelName, apiKey);

  const body = {
    image: path.join(__dirname, "image.jpg"),
    candidate_labels: ["dog", "cat", "car"],
  };

  const { results } = await model.generate(body);
  console.log(results);
};
```

### Use [text classification models](https://deepinfra.com/models/text-classification)

```typescript
import { TextClassification } from "deepinfra";

const apiKey = "YOUR_DEEPINFRA_API_KEY";
const modelName = "ProsusAI/finbert";

const misc = async () => {
  const model = new TextClassification(apiKey);

  const body = {
    input:
      "DeepInfra emerges from stealth with $8M to make running AI inferences more affordable",
  };

  const { results } = await model.generate(body);
  console.log(results);
};
```

## Contributors

[Oguz Vuruskaner](https://github.com/ovuruska)

[Iskren Ivov Chernev](https://github.com/ichernev)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
