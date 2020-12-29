import express from 'express'
import http from 'http'
import { port, FilePaths } from './config'
import opn from 'open'
import { worker } from './mocks/browser'
const app = express()
const server = http.createServer(app)

const url = `http://localhost:${port}/JS/index.html`
Object.entries(FilePaths).forEach(([path, resolvePath]) => {
  app.use(path, express.static(resolvePath))
})

server.listen(port, () => {
  // worker.start()
})
// server.close(() => {
//   console.log('node server stop')
//   // worker.stop()
// })
if (process.env.NODE_ENV === 'demo') {
  console.log('examples is available at: http://localhost:' + port)
  opn(url)
}
