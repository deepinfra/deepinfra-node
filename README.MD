# simple-deepinfra

Simple DeepInfra API Wrapper - simple interface to use DeepInfra's Inference API.

## Installation

```bash
npm install simple-deepinfra
```

## Usage

```typescript
import {DolphinModelService} from "simple-deepinfra";
const apiKey = "YOUR_DEEPINFRA_API_KEY";
const dolphinModelService = new DolphinModelService(apiKey);
const input = "[INST] Say hi [/INST]";
const output = await dolphinModelService.generate(input);
const text = output.results[0].generated_text; 
console.log(text);
```


## Author

[Oguz Vuruskaner](https://www.oguzvuruskaner.com) - Core Developer


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This is free and unencumbered public domain software. For more info, see https://unlicense.org.
