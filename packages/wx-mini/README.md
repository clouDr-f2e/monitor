# @mitojs/wx-mini

## 微信小程序

### NPM包形式

如果你用类似`uni-app`框架，推荐使用`npm包`的形式来引入（v1.2.4以上支持微信小程序）

`npm i @mitojs/wx-mini`

**main.js**

```js
import {init, MitoVue} from '@mitojs/wx-mini';
import Vue from 'vue';
// 捕捉Vue框架抛出的错误
Vue.use(MitoVue);
init({
  // 服务器接口地址
  dsn: 'http://test.com/error',
  // 项目对应apikey
  apikey: '123-2223-123-123',
});
```


### 本地文件形式

如果你是开发原生微信小程序的话，推荐将[https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js](https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js)`下载成一个JS文件，然后在`app.js`中引入

![wx-mitojs](https://tva1.sinaimg.cn/large/008eGmZEly1gmtcvfkovkj31du0iqjs6.jpg)
