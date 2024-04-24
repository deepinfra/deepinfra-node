import fs from "node:fs";
import axios from "axios";
import { Readable } from "stream";

/**
 * The input types that can be converted to a ReadableStream.
 * @alias ReadStreamInput
 */
export type ReadStreamInput = Buffer | string;

/**
 * Utility class for working with images.
 * @class
 * @category Utils
 * @hideconstructor
 */

export const ReadStreamUtils = {

  /**
   * Creates a ReadableStream from a Buffer.
   * @param buffer - The Buffer to be streamed.
   * @returns A ReadableStream.
   */
  bufferToStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Signifies the end of the stream.
    return stream;
  },

  /**
   * Creates a ReadableStream from a file path.
   * @param filePath - The path to the image file.
   * @returns A ReadableStream of the file contents.
   */
  fileToStream(filePath: string): Readable {
    return fs.createReadStream(filePath);
  },

  /**
   * Downloads an image from a URL and returns it as a ReadableStream.
   * @param url - The URL of the image.
   * @returns A ReadableStream containing the image data.
   */
  async urlToStream(url: string): Promise<Readable> {
    const response = await axios.get(url, { responseType: 'stream' });
    return response.data;
  },

  /**
   * Converts a Base64 string to a ReadableStream.
   * @param base64 - The Base64 string to be converted.
   * @returns A ReadableStream of the image data.
   * @throws {Error} If the Base64 string is invalid.
   */
  base64ToStream(base64: string): Readable {
    const buffer = Buffer.from(base64, 'base64');
    return this.bufferToStream(buffer);
  },

  /**
   * Returns a ReadableStream from an object.
   * The object can be a Buffer, a file path, or a URL.
   * @param input
   * @returns A ReadableStream of the image data.
   * @throws {Error} If the input type is invalid.
   */
  async getReadStream(input: ReadStreamInput): Promise<Readable> {
    if (Buffer.isBuffer(input)) {
      return this.bufferToStream(input);
    } else if (typeof input === 'string') {
      if (input.startsWith('http')) {
        return this.urlToStream(input);
      } else if (input.match(/^data:image\/[a-zA-Z]+;base64,/)) {
        const base64Data = input.split(',')[1];
        return this.base64ToStream(base64Data);
      } else {
        return this.fileToStream(input);
      }
    } else {
      throw new Error('Invalid input type');
    }
  }
}
