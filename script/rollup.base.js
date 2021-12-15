import resolve from '@rollup/plugin-node-resolve';
import typescript from'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'

/**
 * @param {object} options
 * @param {object} options.package 当前包package.json 必填
 * @param {string} options.filename 输出包文件名 默认为index
 * @param {object[]} options.plugins 当前包注入的额外插件
 * @param {string} options.input 打包入口 默认 ./src/index.ts
*/
export default (options = {}) => {
  const { input = './src/index.ts', filename = 'index', plugins = [] } = options;
  const cwd = process.cwd()
  const currentPkg = require(`${cwd}/package.json`);

  const presets = () => {
    return [
      typescript({
        tsconfig: './tsconfig.json',
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            module: 'ESNext',
            declarationDir: './dist/',
          },
        },
      }),
      resolve({
        extensions: ['ts', 'tsx']
      }),
      commonjs(),
      json(),
      replace({
        "preventAssignment": true,
        'process.env.__PACKAGE_VERSION__': JSON.stringify(currentPkg.version)
      })
    ]
  }
  // todo external 其他依赖
  const common = {
    input,
    external: [
      'core-js'
    ]
  }

  const outputCommon = {
    name: currentPkg.name,
    sourcemap: true,
    amd: {
      id: currentPkg.name
    }
  }

  const umd = {
    ...common,
    output: {
      format: 'umd',
      file: `dist/${filename}.js`,
      ...outputCommon
    },
    plugins: [...presets(), ...plugins],
  }
  const umdProduction = {
    ...common,
    output: {
      format: 'umd',
      file: `dist/${filename}.production.js`,
      ...outputCommon
    },
    plugins: [...presets(), terser(), ...plugins]
  }
  const esm = {
    ...common,
    output: {
      format: 'es',
      file: `dist/${filename}.esm.js`,
      ...outputCommon
    },
    plugins: [...presets(), ...plugins],
  }
  return [umd, umdProduction, esm]
}
