![npm](https://img.shields.io/npm/v/simple-deepinfra)
![npm](https://img.shields.io/npm/dt/simple-deepinfra)
# simple-deepinfra

Simple DeepInfra API Wrapper - simple interface to use DeepInfra's Inference API.

## Installation

```bash
npm install simple-deepinfra
```

## Usage

### Use dolphin-2.6-mixtral-8x7b

The Dolphin 2.6 Mixtral 8x7b model, uncensored and trained on diverse datasets including coding, excels at programming tasks and general conversation.
```typescript
import {DolphinModelService} from "simple-deepinfra";
const apiKey = "YOUR_DEEP_INFRA_API_KEY";
const dolphinModelService = new DolphinModelService(apiKey);
const input = "[INST] Say hi [/INST]";
const output = await dolphinModelService.generate(input);
const text = output.results[0].generated_text; 
console.log(text);
```

### Use Mixtral-8x7B-Instruct-v0.1

The Mixtral mixture of expert model, developed by Mistral AI, is an innovative experimental machine learning model that leverages a mixture of 8 experts (MoE) within 7b models. Its release was facilitated via a torrent, and the model's implementation remains in the experimental phase.

```typescript
import {MixtralModelService} from "simple-deepinfra";
const apiKey = "YOUR_DEEP_INFRA_API_KEY";
const mixtralModelService = new MixtralModelService(apiKey);
const input = "[INST] Say hi [/INST]";
const output = await mixtralModelService.generate(input);
const text = output.results[0].generated_text;
console.log(text);
```




## Author

[Oguz Vuruskaner](https://www.oguzvuruskaner.com) - Core Developer


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This is free and unencumbered public domain software. For more info, see https://unlicense.org.
