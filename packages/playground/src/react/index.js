import './index.css'
import ReactDOM from 'react-dom'
import { WebVitals } from '@zyf2e/monitor-web-performance'

const wv = new WebVitals({
  appId: 'monitor-demo',
  version: '1.0.0',
  immediately: true,
  reportCallback: (metrics) => {
    console.log('metrics = ', metrics)
  }
})

const App = () => <div className='flex'>Hello World</div>

const container = document.querySelector('#app')

ReactDOM.render(<App />, container)
