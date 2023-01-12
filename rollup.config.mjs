import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json' assert { type: 'json' };

const extensions = ['js', 'jsx', 'ts', 'tsx', 'mjs'];

export default {
  input: 'src/index.tsx',
  output: [
    {
      dir: './dist',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'es'
    },
  ],
  external: [/node_modules/],
  plugins: [
    nodeResolve({ extensions }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions,
      include: ['src/**/*'],
    }),
    commonjs({ include: 'node_modules/**' }),
    peerDepsExternal(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({
      extract: false,
      modules: true,
      sourceMap: false,
      use: [ 'sass' ]
    })
  ],
};
