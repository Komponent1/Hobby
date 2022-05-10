import * as file from '../lib/file';
import { Writable } from 'stream'

describe('File Test', () => {
  test('File load Test', async () => {
    const path = 'test/test.md';
    let result = '';
    const stream = new Writable({
      write(chunk, encoding, callback) {
        result += chunk.toString();
        callback();
      }
    });

    await file.load(path, stream);
    expect(result).toMatch('asd');
  });
})