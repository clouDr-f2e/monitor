import { resolve } from 'path'

export const port = 2021
const resolveDirname = (target: string) => resolve(__dirname, target)
const JsFilePath = resolveDirname('../JS')
const VueFilePath = resolveDirname('../Vue')
const ReactFilePath = resolveDirname('../React')
const Vue3FilePath = resolveDirname('../Vue3')
const WebPerformancePath = resolveDirname('../WebPerformance')
const distFilePath = resolve('./packages/web/dist')
const wxDistFilePath = resolve('./packages/wx-mini/dist')
const webPerfFilePath = resolve('./packages/web-performance/dist')
console.log(webPerfFilePath, 'webPerfFilePath')
export const FilePaths = {
  '/JS': JsFilePath,
  '/Vue': VueFilePath,
  '/React': ReactFilePath,
  '/Vue3': Vue3FilePath,
  '/WebPerformance': WebPerformancePath,
  '/dist': distFilePath,
  '/wxDist': wxDistFilePath,
  '/wpDist': webPerfFilePath
}

export const ServerUrls = {
  normalGet: '/normal',
  exceptionGet: '/exception',
  normalPost: '/normal/post',
  exceptionPost: '/exception/post',
  errorsUpload: '/errors/upload'
}
