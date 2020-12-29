import express from 'express'
import http from 'http'
import { port, FilePaths } from './config'
import opn from 'open'
// import { mswServer } from './mocks/node'
//   mswServer.listen()
//   mswServer.printHandlers()
const app = express()

const url = `http://localhost:${port}/JS/index.html`
Object.entries(FilePaths).forEach(([path, resolvePath]) => {
  app.use(path, express.static(resolvePath))
})

// mock
app.get('/normal', (req, res) => {
  res.send('get 正常请求响应体')
})

app.get('/exception', (req, res) => {
  res.status(500).send('get 异常响应体!!!')
})

app.post('/normal/post', (req, res) => {
  res.send('post 正常请求响应体')
})

app.post('/exception/post', (req, res) => {
  res.status(500).send('post 异常响应体!!!')
})

app.post('/errors/upload', (req, res) => {
  res.send('错误上报成功')
})

const server = http.createServer(app)

server.listen(port, () => {})
if (process.env.NODE_ENV === 'demo') {
  console.log('examples is available at: http://localhost:' + port)
  opn(url)
}
