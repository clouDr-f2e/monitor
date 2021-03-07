# @mitojs/react

### errorBoundaryReport
在`react`的`ErrorBoundary`组件中使用


**如果你想要使用ErrorBoundary**

```js
import MITO from '@mitojs/react';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 将错误日志上报给服务器
    MITO.errorBoundaryReport(err)
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

正常情况下，`React`打包后发到生产环境下的`.js`文件里面全是函数，如果这时某个组件报错，`window.onerror`会捕捉到某个函数(组件)。从react16开始，官方提供了一个[ErrorBoundary](https://zh-hans.reactjs.org/docs/error-boundaries.html#introducing-error-boundaries)类似`trycatch`的作用，被该组件包裹的子组件，`render`函数报错时会触发离当前组件最近的父组件`ErrorBoundary`，但是不会触发`window.onerror`。
