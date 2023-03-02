import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';

import pkg from './package.json';

function banner() {
  return {
    renderChunk(code) {
      return `/**
 * point-cloud-ground-segmentation - v${pkg.version}
 *
 * SPDX-License-Identifier: GPL-3.0
 */

${code}`;
    },
  };
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'esm',
      },
      {
        file: 'dist/point-cloud-ground-segmentation.js',
        format: 'iife',
        name: 'PointCloudGroundSegmentation',
      },
    ],
    plugins: [
      banner(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      copy({
        targets: [
          {
            src: 'libs/patchworkpp/build/patchworkpp.wasm',
            dest: 'dist',
          },
        ],
      }),
      process.env.ENV === 'development' &&
        serve({
          contentBase: './',
          port: 4321,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }),
    ],
  },
];
