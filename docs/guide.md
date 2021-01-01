## 安装

### 使用npm

`npm i @zyf2e/mitojs`

### 使用CDN

`<script src="https://cdn.jsdelivr.net/npm/@zyf2e/mitojs/dist/mito.min.js"></script>`

## 使用环境

### Vue2.6 NPM包形式

**main.js**

```javascript
import MITO from '@zyf2e/mitojs'
import Vue from 'vue'
Vue.use(MITO.MitoVue)
MITO.init({
  dsn: 'http://test.com/error',
  apikey: '123-2223-123-123',
})
```

### Vue2.6引入CDN

需要在main.js中暴露出Vue

**main.js**

```
import Vue from 'vue'
window.Vue = Vue
```

**index.html**

```js
    <header>
      <script src="https://cdn.jsdelivr.net/npm/@zyf2e/mitojs/dist/mito.min.js"></script>
      <script>
        Vue.use(MITO.MitoVue)
        MITO.init({
          // 服务器地址
          dsn: 'http://test.com/error',
          // 项目对应apikey
          apikey: '123-2223-123-123',
        });
      </script>
    </header>
```
### Vue3 NPM包形式

**main.ts**

```javascript
import App from './App.vue';
import {createApp} from 'vue';
import MITO from '@zyf2e/mitojs'
const app = createApp(App);
app.use(MITO.MitoVue)
MITO.init({
  dsn: 'http://test.com/error',
  apikey: '123-2223-123-123',
})
app.mount('#app');

```

### Vue3引入CDN

需要在main.ts中暴露出根示例app

**main.ts**

```
import {createApp} from 'vue';
import App from './App.vue';
const app = createApp(App);
window.Vue = app
app.mount('#app');
```

**index.html**

```js
    <header>
      <script src="https://cdn.jsdelivr.net/npm/@zyf2e/mitojs/dist/mito.min.js"></script>
      <script>
        Vue.use(MITO.MitoVue)
        MITO.init({
          // 服务器地址
          dsn: 'http://test.com/error',
          // 项目对应apikey
          apikey: '123-2223-123-123',
        });
      </script>
    </header>
```



## React

### CDN形式

**index.html**

```html
<header>
  <script src="https://cdn.jsdelivr.net/npm/@zyf2e/mitojs/dist/mito.min.js"></script>
  <script>
    MITO.init({
      // 服务器地址
      dsn: 'http://test.com/error',
      // 项目对应apikey
      apikey: '123-2223-123-123',
    });
  </script>
</header>
```

### NPM包形式

```js
import MITO from '@zyf2e/mitojs';
MITO.init({
  // 服务器接口地址
  dsn: 'http://test.com/error',
  // 项目对应apikey
  apikey: '123-2223-123-123',
});


```

**如果你想要使用ErrorBoundary**

```js
import MITO from '@zyf2e/mitojs';
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

## JS项目

```html
<header>
  <script src="https://cdn.jsdelivr.net/npm/@zyf2e/mitojs/dist/mito.min.js"></script>
  <script>
    MITO.init({
      // 服务器地址
      dsn: 'http://test.com/error',
      // 项目对应apikey
      apikey: '123-2223-123-123',
    });
  </script>
</header>
```

[详细配置](https://github.com/clouDr-f2e/mitojs/blob/master/docs/option.md)




