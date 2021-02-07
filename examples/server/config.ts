import { resolve } from 'path'

export const port = 2021
const resolveDirname = (target: string) => resolve(__dirname, target)
const JsFilePath = resolveDirname('../JS')
const VueFilePath = resolveDirname('../Vue')
const ReactFilePath = resolveDirname('../React')
const Vue3FilePath = resolveDirname('../Vue3')
// dist在外面一层
const distFilePath = resolve('./dist')
export const FilePaths = {
  '/JS': JsFilePath,
  '/Vue': VueFilePath,
  '/React': ReactFilePath,
  '/Vue3': Vue3FilePath,
  '/dist': distFilePath
}

export const ServerUrls = {
  normalGet: '/normal',
  exceptionGet: '/exception',
  normalPost: '/normal/post',
  exceptionPost: '/exception/post',
  errorsUpload: '/errors/upload'
}
