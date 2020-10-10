import { setFlag, slientConsoleScope } from 'utils'
import { handleReactError } from './helper'
import { Severity } from '../utils/Severity'
import { EVENTTYPES } from 'common'

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
        /**
         * @result error
         * ReferenceError: a is not defined
         *  at LikeButton.render (index.js:13)
         *  at finishClassComponent (react-dom.development.js:17295)
         *  at updateClassComponent (react-dom.development.js:17245)
         *  at beginWork (react-dom.development.js:18755)
         *  at HTMLUnknownElement.callCallback (react-dom.development.js:182)
         *  at Object.invokeGuardedCallbackDev (react-dom.development.js:231)
         *  at invokeGuardedCallback (react-dom.development.js:286)
         *  at beginWork$1 (react-dom.development.js:23338)
         *  at performUnitOfWork (react-dom.development.js:22289)
         *  at workLoopSync (react-dom.development.js:22265)
         * @result info
         * componentStack: "↵    in LikeButton↵    in ErrorBoundary"
         *  */
        handleReactError(error, this, info.componentStack, Severity.Error, Severity.Error)
        if (hasConsole) {
          slientConsoleScope(() => {
            console.error('error', error)
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
