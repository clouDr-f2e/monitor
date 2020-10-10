import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
const esmPackage = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.esm.js',
    format: 'esm',
    //iife/umd  包，同一页上的其他脚本可以访问它 生成var MyBundle = (function(){})()
    name: 'MITO',
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs({
      exclude: 'node_modules'
    }),
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
      declarationDir: 'dist/types/'
    })
  ]
}
const cjsPackage = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    name: 'MITO',
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs({
      exclude: 'node_modules'
    }),
    json(),
    typescript({
      tsconfigOverride: { compilerOptions: { declaration: false } }
    })
  ]
}
const localDebug = {
  input: 'src/index.ts',
  output: {
    file: '/Users/ks/Desktop/tryCatch/github/mito-vue-demo/src/bundle.js',
    format: 'esm',
    name: 'MITO',
    context: 'window'
  },
  plugins: [
    resolve(),
    commonjs({
      exclude: 'node_modules'
    }),
    json(),
    typescript({
      tsconfigOverride: { compilerOptions: { declaration: false } }
    })
  ]
}
const iifePackage = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.min.js',
    format: 'iife',
    name: 'MITO',
    context: 'window'
  },
  plugins: [
    resolve(),
    commonjs({
      exclude: 'node_modules'
    }),
    json(),
    typescript({
      tsconfigOverride: { compilerOptions: { declaration: false } }
    }),
    terser()
  ]
}
const examplePackage = {
  input: 'src/index.ts',
  output: {
    file: 'examples/index.js',
    format: 'iife',
    name: 'MITO'
  },
  plugins: [
    resolve(),
    commonjs({
      exclude: 'node_modules'
    }),
    json(),
    typescript({
      tsconfigOverride: { compilerOptions: { declaration: false } }
    })
  ]
}
const total = {
  esmPackage,
  iifePackage,
  examplePackage,
  localDebug,
  cjsPackage
}
let result = total
const ignore = process.env.IGNORE
const include = process.env.INCLUDE
console.log(`ignore: ${ignore}, include: ${include}`)
if (ignore) {
  delete total[ignore]
  result = total
}
if (include) {
  result = [total[include]]
}
export default [...Object.values(result)]
