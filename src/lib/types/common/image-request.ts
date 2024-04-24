import {ReadStreamInput} from "@/lib/utils/read-stream";

export interface ImageRequest {
  image: ReadStreamInput;
  webhook?: string;
}
