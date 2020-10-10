const e = React.createElement
const ErrorBoundary = MITO.MitoReact.install(React)

class LikeButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { liked: false }
  }
  componentDidMount() {}

  render() {
    if (this.state.liked) {
      console.log(a)
      return 'you liked this'
    }
    return e('button', { onClick: () => this.setState({ liked: true }) }, 'Like')
  }
}
const domContainer = document.querySelector('#like_button_container')
ReactDOM.render(e(ErrorBoundary, { children: e(LikeButton) }), domContainer)
