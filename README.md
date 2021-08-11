<div align="center">
    <a href="#" target="_blank">
    <img src="https://tva1.sinaimg.cn/large/008i3skNly1gql8asit7qj30de05c3yg.jpg" alt="mito-logo" height="90">
    </a>
    <p>一款轻量级的收集页面的用户点击行为、路由跳转、接口报错、代码报错、并上报服务端的SDK</p>

[![npm version](https://img.shields.io/npm/v/@mitojs/web.svg?style=flat-square)](https://www.npmjs.com/package/@zyf2e/monitor-web)
[![license](https://img.shields.io/github/license/clouDr-f2e/mitojs)](https://github.com/clouDr-f2e/mitojs/blob/dev/LICENSE)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GitHub last commit](https://img.shields.io/github/last-commit/clouDr-f2e/mitojs.svg?style=flat-square)](https://github.com/clouDr-f2e/mitojs/commits/master)
[![build status](https://img.shields.io/travis/clouDr-f2e/mitojs/master.svg?style=flat-square)](https://travis-ci.com/github/clouDr-f2e/mitojs)
[![codecov](https://codecov.io/gh/clouDr-f2e/mitojs/branch/master/graph/badge.svg?token=W7JP5GDOM7)](https://codecov.io/gh/clouDr-f2e/mitojs)

<!-- [![npm downloads](https://img.shields.io/npm/dm/@zyf2e/mitojs.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@zyf2e/mitojs) -->


</div>

## 功能

- [x] 🔨监听请求错误
- [x] 🔨console
- [x] 🔨路由跳转
- [x] 🔨代码报错
- [x] 🔨click、wx:tab、touchmove
- [x] 🔨资源加载错误
- [x] 🏅自定义上报错误
- [x] 🚀丰富的hooks与配置项支持可高定制化
- [x] 🌝支持IE8和安卓5以上
- [x] 👌持续迭代与更新
- [x] 完善的浏览器e2e和微信小程序e2e
- [x] 完善的单元测试（77%~coding）
- [x] 支持原生Web [@zyf2e/monitor-browser](https://github.com/clouDr-f2e/mitojs/tree/master/packages/browser)
- [x] 支持Web框架（Vue3、Vue2、React@Next） [@zyf2e/monitor-web](https://github.com/clouDr-f2e/mitojs/tree/master/packages/web)
- [x] 支持原生微信小程序、支持uni-app等微信小程序框架 [@zyf2e/monitor-wx-mini](https://github.com/clouDr-f2e/mitojs/tree/master/packages/wx-mini)
- [x] 支持Web性能监控 [@zyf2e/monitor-web-performance](https://github.com/clouDr-f2e/mitojs/tree/master/packages/web-performance)
- [x] 支持微信小程序性能监控 [@zyf2e/monitor-wx-mini-performance](https://github.com/clouDr-f2e/mitojs/tree/master/packages/wx-mini-performance)

## 安装

### web

#### 使用npm

```bash
$ npm i @zyf2e/monitor-web
```

### 使用yarn

```bash
$ yarn add @zyf2e/monitor-web
```

#### 使用CDN

```javascript
<script src="https://cdn.jsdelivr.net/npm/@mitojs/web/dist/web.min.js"></script>
```

### wx-mini

#### 使用npm

```bash
$ npm i @zyf2e/monitor-wx-mini
```

### 使用yarn

```bash
$ yarn add @zyf2e/monitor-wx-mini
```

#### 使用CDN

```javascript
<script src="https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js"></script>
```

## 使用指南

[使用指南](https://github.com/clouDr-f2e/mitojs/blob/master/docs/guide.md)

* [vue接入指南](https://github.com/clouDr-f2e/mitojs/blob/master/docs/guide.md#Vue)
* [react接入指南](https://github.com/clouDr-f2e/mitojs/blob/master/docs/guide.md#react)
* [wx-mini接入指南](https://github.com/clouDr-f2e/mitojs/blob/master/docs/guide.md#微信小程序)
* [performance接入指南](https://github.com/clouDr-f2e/mitojs/blob/dev/docs/performance.md)
* [wx-mini-performance接入指南](https://github.com/clouDr-f2e/mitojs/blob/dev/docs/wx-mini-performance.md)


## hooks与配置项

[hooks与配置项](https://github.com/clouDr-f2e/mitojs/blob/master/docs/option.md)



### 示例
[mitojs-在线demo](https://static.91jkys.com/web/mito-vue-demo/#/demo/one)

![mito-在线demo](https://tva1.sinaimg.cn/large/008eGmZEly1gmxgn4y1sag315g0m2hdt.gif)


## 收集信息平台展示

**该SDK能收集哪些信息：下面这些例子给你一一展示：**

![react-example](https://tva1.sinaimg.cn/large/008eGmZEly1gmxggqptzwg30u00hoe84.gif)

[vue-在线示例](https://static.91jkys.com/f2e/mito-error-example/#/errors/1/info)

[react-在线示例](https://static.91jkys.com/f2e/mito-error-example/#/errors/2/info)

[js-在线示例](https://static.91jkys.com/f2e/mito-error-example/#/errors/3/info)

[wx-mini-在线示例](https://static.91jkys.com/f2e/mito-error-example/#/errors/4/info)

## issue

欢迎所有人提`issue`，如果有什么好的建议和问题可以直接联系本人微信（备注mitojs）：

<img src="https://tva1.sinaimg.cn/large/008eGmZEly1gmtfid3hrfj30kw0r2wfk.jpg" width="240px" />



