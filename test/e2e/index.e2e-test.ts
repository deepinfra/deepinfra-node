import axios from 'axios';
import {ModelDefinition, ModelDefinitionList, ModelTypes} from "@/lib/types/common/models";
import {
  AutomaticSpeechRecognition,
  Embeddings,
  FillMask,
  ObjectDetection,
  QuestionAnswering,
  Sdxl,
  TextClassification,
  TextGeneration,
  TextToImage,
  TokenClassification
} from "@/index";

const GET_MODELS = "https://api.deepinfra.com/models/list";
const SDXL_MODEL = "stability-ai/sdxl";
const TEXT_TO_IMAGE_PROMPT = "The quick brown fox jumps over the lazy dog.";
const TEXT_INPUT = "This is a test.";

/*
TODO: Add mock audio file for ASR.
TODO: Add mock image file for object detection.
TODO: Implement p-limit
 */


describe('E2E tests', () => {

  let allModels: ModelDefinitionList;

  beforeAll(async () => {
    const response = await axios.get(GET_MODELS);
    allModels = response.data as ModelDefinitionList;
  });

  it('should have at least one model', () => {
    expect(allModels.length).toBeGreaterThan(0);
  });
  it('Text to image models should infer correctly.', () => {
    const textToImageModels = allModels.filter(model => model.reported_type === ModelTypes.TEXT_TO_IMAGE).map(m => m.model_name);
    textToImageModels.forEach(async (modelName) => {

      if (modelName === SDXL_MODEL) {
        const model = new Sdxl();
        expect(model).toBeDefined();
        await model.generate({input: {prompt: TEXT_TO_IMAGE_PROMPT}}).then(response => {
          expect(response).toBeDefined();
        });
      } else {
        const model = new TextToImage(modelName);
        expect(model).toBeDefined();

        await model.generate({prompt: TEXT_TO_IMAGE_PROMPT}).then(response => {
          expect(response).toBeDefined();
        });
      }

    });
  });

  it('Text classification models should infer correctly.', () => {
    const textClassificationModels = allModels.filter(model => model.reported_type === ModelTypes.TEXT_CLASSIFICATION).map(m => m.model_name);
    textClassificationModels.forEach(async (modelName) => {
      const model = new TextClassification(modelName);
      expect(model).toBeDefined();

      await model.generate({input: TEXT_INPUT}).then(response => {
        expect(response).toBeDefined();
      });
    });
  });

  it('Text generation models should infer correctly.', () => {
    const textGenerationModels = allModels.filter(model => model.reported_type === ModelTypes.TEXT_GENERATION).map(m => m.model_name);
    textGenerationModels.forEach(async (modelName) => {
      const model = new TextGeneration(modelName);
      expect(model).toBeDefined();

      await model.generate({input: TEXT_INPUT}).then(response => {
        expect(response).toBeDefined();
      });
    });
  });

  it('Fill mask models should infer correctly.', () => {
    const fillMaskModels = allModels.filter(model => model.reported_type === ModelTypes.FILL_MASK).map(m => m.model_name);
    fillMaskModels.forEach(async (modelName) => {
      const model = new FillMask(modelName);
      expect(model).toBeDefined();

      await model.generate({input: "This is a [MASK]"})
        .then(response => {
          expect(response).toBeDefined();
        });
    });
  });

  it('Embeddings models should infer correctly.', () => {
    const embeddingsModels = allModels.filter(model => model.reported_type === ModelTypes.EMBEDDINGS).map(m => m.model_name);
    embeddingsModels.forEach(async (modelName) => {
      const model = new Embeddings(modelName);
      expect(model).toBeDefined();

      await model.generate({inputs: [TEXT_INPUT]}).then(response => {
        expect(response).toBeDefined();
      });
    });
  });



  it('Question answering models should infer correctly.', () => {
    const questionAnsweringModels = allModels.filter(model => model.reported_type === ModelTypes.QUESTION_ANSWERING).map(m => m.model_name);
    questionAnsweringModels.forEach(async (modelName) => {
      const model = new QuestionAnswering(modelName);
      expect(model).toBeDefined();

      await model.generate({question: TEXT_INPUT, context: TEXT_INPUT})
        .then(response => {
          expect(response).toBeDefined();
        });
    });
  });

  it('Token classification models should infer correctly.', () => {
    const tokenClassificationModels = allModels.filter(model => model.reported_type === ModelTypes.TOKEN_CLASSIFICATION).map(m => m.model_name);
    tokenClassificationModels.forEach(async (modelName) => {
      const model = new TokenClassification(modelName);
      expect(model).toBeDefined();

      await model.generate({input: TEXT_INPUT}).then(response => {
        expect(response).toBeDefined();
      });
    });
  });

  it('Text2Text generation models should infer correctly.', () => {
    const text2TextGenerationModels = allModels.filter(model => model.reported_type === ModelTypes.TEXT2TEXT_GENERATION).map(m => m.model_name);
    text2TextGenerationModels.forEach(async (modelName) => {
      const model = new TextGeneration(modelName);
      expect(model).toBeDefined();

      await model.generate({input: TEXT_INPUT}).then(response => {
        expect(response).toBeDefined();
      });
    });
  });

  it('Object detection models should infer correctly.', () => {
    const objectDetectionModels = allModels.filter(model => model.reported_type === ModelTypes.OBJECT_DETECTION).map(m => m.model_name);
    objectDetectionModels.forEach(async (modelName) => {
      const model = new ObjectDetection(modelName);
      expect(model).toBeDefined();

      await model.generate({input: TEXT_INPUT}).then(response => {
        expect(response).toBeDefined();
      });
    });
  });

  it('Automatic speech recognition models should infer correctly.', () => {
    const automaticSpeechRecognitionModels = allModels.filter(model => model.reported_type === ModelTypes.AUTOMATIC_SPEECH_RECOGNITION).map(m => m.model_name);
    automaticSpeechRecognitionModels.forEach(async (modelName) => {
      const model = new AutomaticSpeechRecognition(modelName);
      expect(model).toBeDefined();

      await model.generate({input: TEXT_INPUT}).then(response => {
        expect(response).toBeDefined();
      });
    });
  });

});
