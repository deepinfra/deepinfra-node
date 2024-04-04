export interface TextToImageRequest {
  prompt: string;
  negative_prompt?: string;
  image?: string;
  num_images?: number;
  num_inference_steps?: number;
  guidance_scale?: number;
  strength?: number;
  width?: 128 | 256 | 384 | 448 | 512 | 576 | 640 | 704 | 768 | 832 | 896 | 960 | 1024;
  height?: 128 | 256 | 384 | 448 | 512 | 576 | 640 | 704 | 768 | 832 | 896 | 960 | 1024;
  seed?: number;
  use_compel?: boolean;
  webhook?: string;
}
