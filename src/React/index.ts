// ErrorBoundary
// React
export const MitoReact = {
  install(React): void {
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props)
      }
      componentDidCatch(error, info) {
        /* Example stack information:
          in ComponentThatThrows (created by App)
          in ErrorBoundary (created by App)
          in div (created by App)
          in App
        */
        console.error(error)
        console.error('stack', info.componentStack)
      }
      render() {
        return null
      }
    }
  }
}
