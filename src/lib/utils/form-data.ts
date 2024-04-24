import FormData from "form-data";
import { ReadStreamInput, ReadStreamUtils } from "@/lib/utils/read-stream";

export const FormDataUtils = {
  /**
   * Prepare form data from the given data object
   * @param data - The data object to be converted to form data.
   * @param blobKeys - The keys of the data object that contain binary data.
   * @returns A FormData object.
   * @throws {Error} If the binary data is invalid.
   *
   */
  async prepareFormData<T extends object>(
    data: T,
    blobKeys: string[],
  ): Promise<FormData> {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (blobKeys.includes(key)) {
        const readStream = await ReadStreamUtils.getReadStream(
          value as ReadStreamInput,
        );
        formData.append(key, readStream);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    }
    return formData;
  },
};
