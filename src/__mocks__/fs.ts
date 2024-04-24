import * as originalFs from 'fs';

type MockFiles = Record<string, string>;

interface CustomFs extends Omit<typeof originalFs, 'readFileSync' | 'createReadStream'> {
  __setMockFiles: (newMockFiles: MockFiles) => void;
  readFileSync: (filePath: string, options?: object) => string;
  createReadStream: (filePath: string, options?: object) => any;
}

const fs: CustomFs = jest.createMockFromModule<CustomFs>('fs');
jest.mock('node:fs', () => fs);

let mockFiles: MockFiles = Object.create(null);

function __setMockFiles(newMockFiles: MockFiles): void {
  mockFiles = newMockFiles;
}

function readFileSync(filePath: string): string {
  return mockFiles[filePath] || "";
}

function createReadStream(filePath: string): any {
  return filePath;
}

fs.__setMockFiles = __setMockFiles;
fs.readFileSync = readFileSync;
fs.createReadStream = createReadStream;

module.exports = fs;
