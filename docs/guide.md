## 目录
  * [安装](#安装)
      * [使用npm](#使用npm)
      * [使用CDN](#使用CDN)
  * [Vue](#Vue)
      * [Vue2.6NPM包形式](#Vue2.6NPM包形式)
      * [Vue2.6引入CDN](#Vue2.6引入CDN)
      * [Vue3NPM包形式](#Vue3NPM包形式)
      * [Vue3引入CDN](#Vue3引入CDN)
  * [React](#react)
      * [CDN形式](#CDN形式)
      * [NPM包形式](#NPM包形式)
  * [JS项目](#JS项目)
  * [微信小程序](#微信小程序)
      * [NPM包形式](#NPM包形式)
      * [本地文件形式](#本地文件形式)
      * [options配置](#options配置)
  * [手动上报](#手动上报)
      * [MITO.log](#MITO.log)
  * [FAQ](#faq)

## 安装

### 使用npm

`npm i @mitojs/web`

### 使用CDN

`<script src="https://cdn.jsdelivr.net/npm/@mitojs/web/dist/web.min.js"></script>`

## Vue

### Vue2.6NPM包形式

**main.js**

```javascript
import * as MITO from '@mitojs/web'
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
      <script src="https://cdn.jsdelivr.net/npm/@mitojs/web/dist/web.min.js"></script>
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
### Vue3NPM包形式

**main.ts**

```javascript
import App from './App.vue';
import {createApp} from 'vue';
import MITO from '@mitojs/web'
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
      <script src="https://cdn.jsdelivr.net/npm/@mitojs/web/dist/web.min.js"></script>
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
  <script src="https://cdn.jsdelivr.net/npm/@mitojs/web/dist/web.min.js"></script>
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
import * as MITO from '@mitojs/web';
MITO.init({
  // 服务器接口地址
  dsn: 'http://test.com/error',
  // 项目对应apikey
  apikey: '123-2223-123-123',
});


```

**如果你想要使用ErrorBoundary**

```js
import * as MITO from '@mitojs/web';
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
  <script src="https://cdn.jsdelivr.net/npm/@mitojs/browser/dist/browser.min.js"></script>
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



##  微信小程序

### NPM包形式

如果你用类似`uni-app`框架，推荐使用`npm包`的形式来引入（v1.2.4以上支持微信小程序）

`npm i @mitojs/wx-mini @mitojs/vue`

**main.js**

```js
import * as MITO from '@mitojs/wx-mini';
import { MitoVue } from '@mitojs/vue'
import Vue from 'vue';
// 捕捉Vue框架抛出的错误
Vue.use(MitoVue);
MITO.init({
  // 服务器接口地址
  dsn: 'http://test.com/error',
  // 项目对应apikey
  apikey: '123-2223-123-123',
});
```

### 本地文件形式

如果你是开发原生微信小程序的话，推荐将[https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js](https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js)`下载成一个JS文件，然后在`app.js`中引入

![wx-mitojs](https://tva1.sinaimg.cn/large/008eGmZEly1gmtcvfkovkj31du0iqjs6.jpg)



### options配置

[详细配置](https://github.com/clouDr-f2e/mitojs/blob/master/docs/option.md)



## 手动上报
### MITO.log
有时我们需要在某个业务代码中上报业务信息或者是埋点信息，这时可以用到`MITO.log`手动上报，下面这个例子就是在获取支付状态的接口是否异常，如果异常就上报异常信息。
```js
import * as MITO from '@mitojs/web'

$api.getPayStatus().then(res => {
  if (res.success) {
    // 支付正常
  } else {
    // 支付异常 上报异常信息
    MITO.log({
      // 错误信息
      message: res.errMsg,
      // 标签 可以理解为种类
      tag: '支付页面'
      // 错误等级：可选，默认最高等级
      // level: '',
      // 错误信息 Error对象
      // ex: ''
    })
  }
})
```
还可以统计每个功能的浏览次数（PV）、用户量（UV），比如下面代码中在活动页埋点，UV的统计需要依赖`trackerId`，[trackerId详细配置](https://github.com/clouDr-f2e/mitojs/blob/master/docs/option.md#backtrackerid)
```js
import * as MITO from '@mitojs/web'

/**
 * react hook 活动页
 */
function ActivePage() {
  useEffect(() => {
    //可统计PV、UV
    MITO.log({
      message: '活动页',
      // 标签：可选
      // tag: ''
    })
  }, [])
  return <div>这是活动页</div>
}
```



## FAQ
<details>
 <summary>这个SDK具体是怎么使用的？</summary>



该SDK是为了抓取前端页面的错误，然后上报到你所配置的接口。至于服务端和错误可视化界面是需要自己实现，适合给有意向自己研发前端监控系统的开发者使用最佳



</details>

<details>
 <summary>这个SDK的稳定如何？能不能用到正式环境？</summary>



目前本人所在的公司的监控系统也在使用当前SDK，也在迭代中，到目前而言稳定性还是OK的，而且已经有完善的e2e，单测也coding中，感兴趣的可以`Fork`下来，自己定制



</details>

<details>
 <summary>前端平台后端会不会开源出来？有没有免费的saas服务可以直接使用？</summary>



目前后端也在持续迭代中，等迭代稳定后会考虑将`saas`服务开放出来



</details>

