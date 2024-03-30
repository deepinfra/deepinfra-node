export interface TextToImageRequest {
  prompt: string;
  negative_prompt?: string;
  image?: string;
  mask?: string;
  width?: number;
  height?: number;
  num_outputs?: number;
  scheduler?: 'DDIM' | 'DPMSolverMultistep' | 'HeunDiscrete' | 'KarrasDPM' | 'K_EULER_ANCESTRAL' | 'K_EULER' | 'PNDM';
  num_inference_steps?: number;
  guidance_scale?: number;
  prompt_strength?: number;
  seed?: number;
  refine?: 'no_refiner' | 'expert_ensemble_refiner' | 'base_image_refiner';
  high_noise_frac?: number;
  refine_steps?: number;
  apply_watermark?: boolean;
}
