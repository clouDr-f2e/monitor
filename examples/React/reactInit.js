const h = React.createElement
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, errorInfo) {
    MITO.errorBoundaryReport(error)
    if (error) {
      this.setState({
        hasError: true
      })
    }
  }

  render() {
    if (this.state.hasError) {
      return h('div', null, '子组件抛出异常')
    }
    return this.props.children
  }
}
class BuggyCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }))
  }

  render() {
    if (this.state.counter === 3) {
      throw new Error('I crashed!')
    }
    return h('h1', { onClick: this.handleClick, id: 'numException' }, this.state.counter)
  }
}
ReactDOM.render(h(ErrorBoundary, { children: h(BuggyCounter) }), document.getElementById('root'))
