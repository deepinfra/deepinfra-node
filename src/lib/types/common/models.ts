export const enum ModelTypes {
  EMBEDDINGS = 'embeddings',
  FILL_MASK = 'fill-mask',
  TEXT_GENERATION = 'text-generation',
  AUTOMATIC_SPEECH_RECOGNITION = 'automatic-speech-recognition',
  TOKEN_CLASSIFICATION = 'token-classification',
  TEXT2TEXT_GENERATION = 'text2text-generation',
  OBJECT_DETECTION = 'object-detection',
  QUESTION_ANSWERING = 'question-answering',
  IMAGE_CLASSIFICATION = 'image-classification',
  TEXT_TO_IMAGE = 'text-to-image',
  ZERO_SHOT_IMAGE_CLASSIFICATION = 'zero-shot-image-classification',
  CUSTOM = 'custom',
  TEXT_CLASSIFICATION = 'text-classification',
  DREAMBOOTH = 'dreambooth',
}


export interface ModelDefinition {
  model_name: string;
  type: ModelTypes;
  reported_type: ModelTypes;
  description: string;
  cover_img_url: string;
  tags: string[];
  pricing: {
    cents_per_sec: number;
    type: string;
  };
  max_tokens: number | null;
}

export type ModelDefinitionList = ModelDefinition[];
