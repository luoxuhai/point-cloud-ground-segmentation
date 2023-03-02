# point-cloud-ground-segmentation ｜点云地面分割

## 使用

```ts
import { PatchWorkpp } from './dist/ground-segmentation.esm.js'


async function main() {
  // 点云数据需要包含 x、y、z、intensity 字段
  const cloudIn = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8]);

  const patchWorkpp = await new PatchWorkpp({
    url: './dist/patchworkpp.wasm'
  });
  patchWorkpp.estimateGround(cloudIn);
  const cloudOut = patchWorkpp.getGround();
  console.log(cloudOut)
}

```
