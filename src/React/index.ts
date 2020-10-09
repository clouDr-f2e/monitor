import { getFlag, setFlag, slientConsoleScope } from 'utils'
import { handleReactError } from './helper'
import { Severity } from '@/utils/Severity'
import { EVENTTYPES } from '@/common'

// ErrorBoundary
// React

const hasConsole = typeof console !== 'undefined'

export const MitoReact = {
  install(React): any {
    // if (getFlag(EVENTTYPES.REACT) || !React) return
    setFlag(EVENTTYPES.REACT, true)
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          hasError: false
        }
      }
      static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return error
      }

      componentDidCatch(error, info) {
        /* Example stack information:
          in ComponentThatThrows (created by App)
          in ErrorBoundary (created by App)
          in div (created by App)
          in App
        */
        handleReactError(error, this, info, Severity.Normal, Severity.Error)
        if (hasConsole) {
          slientConsoleScope(() => {
            console.error('Error in' + info + ': ' + Error.toString() + '"', this)
            console.error('stack', info.componentStack)
          })
        }
      }
      render() {
        if (this.state.hasError) {
          return React.createElement('h1', null, 'Something went wrong')
        }
        return this.props.children
      }
    }
    return ErrorBoundary
  }
}
