import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
const common = {
  plugins: [
    resolve(),
    commonjs({
      exclude: 'node_modules'
    }),
    json(),
    typescript({
      tsconfig: 'build.tsconfig.json',
      tsconfigOverride: { compilerOptions: { declaration: false } }
    }),
    terser(),
    cleanup({
      comments: 'none'
    })
  ]
}
const prod = {
  input: 'src/wx-mini/index.ts',
  output: {
    file: 'dist/index.wx.js',
    format: 'cjs',
    name: 'MITO'
    // context: 'window'
  },
  ...common
}
export default [prod]
