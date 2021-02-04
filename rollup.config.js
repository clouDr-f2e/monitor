import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import cleanup from 'rollup-plugin-cleanup'
import { green } from 'chalk'
const common = {
  input: 'src/index.ts',
  plugins: [
    resolve(),
    commonjs({
      exclude: 'node_modules'
    }),
    json(),
    cleanup({
      comments: 'none'
    })
  ],
  typescript: {
    tsconfig: 'build.tsconfig.json'
  }
}
const esmPackage = {
  input: common.input,
  output: {
    file: 'dist/index.esm.js',
    format: 'esm',
    name: 'MITO',
    sourcemap: true
  },
  plugins: [
    ...common.plugins,
    clear({
      targets: ['dist']
    }),
    typescript({
      ...common.typescript,
      useTsconfigDeclarationDir: true,
      clean: true
    })
  ]
}
const cjsPackage = {
  input: common.input,
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    name: 'MITO',
    sourcemap: true
  },
  plugins: [
    ...common.plugins,
    typescript({
      ...common.typescript,
      tsconfigOverride: { compilerOptions: { declaration: false } }
    })
  ]
}
const localDebug = {
  input: common.input,
  output: {
    file: '/Users/zhangwenliang/work/projects/weappSdk/utils/index.wx.js',
    format: 'esm',
    name: 'MITO'
  },
  plugins: [
    ...common.plugins,
    typescript({
      ...common.typescript,
      tsconfigOverride: { compilerOptions: { declaration: false } }
    })
  ]
}
const iifePackage = {
  input: common.input,
  output: {
    file: 'dist/index.min.js',
    format: 'iife',
    name: 'MITO'
  },
  plugins: [
    ...common.plugins,
    typescript({
      ...common.typescript,
      tsconfigOverride: { compilerOptions: { declaration: false } }
    }),
    terser()
  ]
}
const total = {
  esmPackage,
  iifePackage,
  localDebug,
  cjsPackage
}
let result = total
const ignore = process.env.IGNORE
const include = process.env.INCLUDE
console.log(green(`ignore: ${ignore}, include: ${include}`))
if (ignore) {
  delete total[ignore]
  result = total
}
if (include) {
  result = [total[include]]
}
export default [...Object.values(result)]
