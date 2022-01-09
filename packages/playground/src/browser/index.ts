import './index.css'
import { init } from '@zyf2e/monitor-web-exception'

declare global {
  interface Window {
    Monitor: any
  }
}

window.Monitor = init({
  dns: 'http://monitor/error',
  apikey: 'xxx'
})

const append = (el: Element) => {
  document.body.append(el)
}

const $ = (s: string) => document.querySelector(s);

$('.syntaxError').addEventListener('click', () => {
  new Function(`var 1`)()
})


$('.img-load').addEventListener('click', () => {
  const img = document.createElement('img')
  img.setAttribute('src', 'https://static.91jkys.com/f2e/lemon-admin/1.0.17/static/img/loginBg.dbb9ee1123.png')
  document.body.appendChild(img)
})


$('.unhandledrejection').addEventListener('click', () => {
  return Promise.reject()
})

$('.script-load').addEventListener('click', () => {
  const script = document.createElement('script')
  script.setAttribute('src', 'https://static.91jkys.com/f2e/lemon-admin/1.0.17/static/js/3.1b0b422cf22421b4749.js')
  append(script)
})

$('.uncaught-referenceError').addEventListener('click', () => {
  // @ts-ignore
  console.log(a);
})

$('.rangeError').addEventListener('click', () => {
  [].length = -5
})

$('.typeError').addEventListener('click', () => {
  const o = {}
  o.run()
})

$('.URIError').addEventListener('click', () => {
  decodeURI("%")
})

$('.EvalError').addEventListener('click', () => {
  eval('console.log(a)')
})
