# point-cloud-ground-segmentation

## Usage

```ts
import { PatchWorkpp } from './dist/point-cloud-ground-segmentation.esm.js'


async function main() {
  // The point cloud data needs to contain the following fields: x, y, z, and intensity
  const cloudIn = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8]);

  const patchWorkpp = await new PatchWorkpp({
    url: './dist/patchworkpp.wasm'
  });
  patchWorkpp.estimateGround(cloudIn);
  const cloudOut = patchWorkpp.getGround();
  console.log(cloudOut)
}

```
