const h = React.createElement
class CodeErrorBtn extends React.Component {
  render() {
    return h('button', { onClick: () => console.log(1) }, '代码错误')
  }
}
console.log(h('div', null, 12312), document.getElementById('root'))
// ReactDOM.render(h('div', null, 12312), document.getElementById('root'))
