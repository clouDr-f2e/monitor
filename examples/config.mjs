import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

export const port = 1233
const __dirname = dirname(fileURLToPath(import.meta.url))
const resolveDirname = (target) => resolve(__dirname, target)
const JsFilePath = resolveDirname('./JS')
const VueFilePath = resolveDirname('./Vue')
const ReactFilePath = resolveDirname('./React')
const Vue3FilePath = resolveDirname('./Vue3')
// dist在外面一层
const distFilePath = resolve('./dist')
export const FilePaths = {
  '/JS': JsFilePath,
  '/Vue': VueFilePath,
  '/React': ReactFilePath,
  '/Vue3': Vue3FilePath,
  '/dist': distFilePath
}
