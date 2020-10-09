/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, '../examples')))

app.listen(8000, () => {
  console.log(`example run at port 8080`)
  console.log('http://localhost:8000')
})
