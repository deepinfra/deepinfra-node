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

describe('E2E tests', () => {


  let allModels: ModelDefinitionList;

  beforeAll(async () => {
    const response = await axios.get(GET_MODELS);
    allModels = response.data as ModelDefinitionList;
  });

  it('should have at least one model', () => {
    expect(allModels.length).toBeGreaterThan(0);
  });

  describe("Text to image models", () => {
    const textToImageModels = allModels.filter(model => model.reported_type === ModelTypes.TEXT_TO_IMAGE).map(m => m.model_name);
    it('should infer correctly.', () => {
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


  });


});
