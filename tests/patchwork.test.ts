import fs from 'fs';
import path from 'path';
import { PatchWork } from '../';

describe('PatchWork', () => {
  it('should initialize PatchWork via ArrayBuffer', async () => {
    const wasm = fs.readFileSync(path.join(__dirname, '../dist/patchworkpp.wasm'));

    const patchwork = await new PatchWork({
      arrayBuffer: wasm,
    });

    console.log(patchwork);
  });
});
