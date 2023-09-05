import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import eslint from '@rollup/plugin-eslint';
import json from '@rollup/plugin-json';
import autoprefixer from 'autoprefixer';
import terser from "@rollup/plugin-terser";

import pkg from './package.json' assert { type: 'json' };

const extensions = ['js', 'jsx', 'ts', 'tsx', 'mjs'];

export default {
  input: './src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    eslint({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    }),
    peerDepsExternal(),
    nodeResolve({ extensions }),
    typescript({
      clean: true,
      tsconfig: './tsconfig.json',
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions,
      include: ['src/**/*'],
    }),
    commonjs({ include: 'node_modules/**' }),
    json(),
    postcss({
      extract: false,
      modules: true,
      sourceMap: false,
      use: ['sass'],
      plugins: [autoprefixer()],
    }),
    terser(),
  ],
};
