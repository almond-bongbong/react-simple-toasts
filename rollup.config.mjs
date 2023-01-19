import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json' assert { type: 'json' };

const extensions = ['js', 'jsx', 'ts', 'tsx', 'mjs'];

export default {
  input: './src/index.tsx',
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
    peerDepsExternal(),
    nodeResolve({ extensions }),
    typescript({
      clean: true,
      tsconfig: './tsconfig.json',
    }),
    commonjs({ include: 'node_modules/**' }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions,
      include: ['src/**/*'],
    }),
    postcss({
      extract: false,
      modules: true,
      sourceMap: false,
      use: [ 'sass' ]
    })
  ],
};
