import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import cleanup from 'rollup-plugin-cleanup'
import { green } from 'chalk'
const paths = {
  '@mito/utils': ['../utils/src'],
  '@mito/core': ['../core/src'],
  '@mito/types': ['../types/src'],
  '@mito/shared': ['../shared/src'],
  '@mito/browser': ['../browser/src'],
  '@mito/react': ['../react/src'],
  '@mito/vue': ['../vue/src']
}
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
    }),
    typescript({
      tsconfig: 'tsconfig.build.json',
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationMap: false,
          module: 'ES2015',
          paths
        }
      },
      include: ['*.ts+(|x)', '**/*.ts+(|x)', '../**/*.ts+(|x)']
    })
  ]
}
const esmPackage = {
  input: common.input,
  output: {
    file: 'dist/index.esm.js',
    format: 'esm',
    name: 'MITO',
    sourcemap: false
  },
  plugins: [
    ...common.plugins,
    clear({
      targets: ['dist']
    })
  ]
}
const cjsPackage = {
  input: common.input,
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    name: 'MITO',
    sourcemap: false
  },
  plugins: [...common.plugins]
}

const iifePackage = {
  input: common.input,
  output: {
    file: 'dist/index.min.js',
    format: 'iife',
    name: 'MITO',
    sourcemap: true
  },
  plugins: [...common.plugins, terser()]
}
const total = {
  esmPackage,
  iifePackage,
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
