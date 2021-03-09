<div align="center">
    <a href="#" target="_blank">
    <img src="https://i.loli.net/2020/08/21/87uCfjsrWwhA5YL.jpg" alt="Ohbug" height="90">
    </a>
    <p>一款轻量级的收集页面的用户点击行为、路由跳转、接口报错、代码报错、并上报服务端的SDK</p>

[![npm version](https://img.shields.io/npm/v/@zyf2e/mitojs.svg?style=flat-square)](https://www.npmjs.org/package/@zyf2e/mitojs)
[![install size](https://packagephobia.now.sh/badge?p=@zyf2e/mitojs)](https://packagephobia.now.sh/result?p=@zyf2e/mitojs)
[![npm downloads](https://img.shields.io/npm/dm/@zyf2e/mitojs.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@zyf2e/mitojs)
[![build status](https://img.shields.io/travis/clouDr-f2e/mitojs/master.svg?style=flat-square)](https://travis-ci.com/github/clouDr-f2e/mitojs)
[![license](https://img.shields.io/github/license/clouDr-f2e/mitojs)](https://github.com/clouDr-f2e/mitojs/blob/dev/LICENSE)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![codecov](https://codecov.io/gh/clouDr-f2e/mitojs/branch/master/graph/badge.svg?token=W7JP5GDOM7)](https://codecov.io/gh/clouDr-f2e/mitojs)

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
- [x] 完善的e2e测试
- [x] 完善的单元测试（77%~coding）
- [x] 支持原生Web [@mitojs/browser](https://github.com/clouDr-f2e/mitojs/tree/master/packages/browser)
- [x] 支持Web框架（Vue3、Vue2、React@Next） [@mitojs/web](https://github.com/clouDr-f2e/mitojs/tree/master/packages/web)
- [x] 支持原生微信小程序、支持uni-app等微信小程序框架 [@mitojs/wx-mini](https://github.com/clouDr-f2e/mitojs/tree/master/packages/wx-mini)



## 安装

### web

#### 使用npm

```bash
$ npm i @mitojs/web
```

### 使用yarn

```bash
$ yarn add @mitojs/web
```

#### 使用CDN

```javascript
<script src="https://cdn.jsdelivr.net/npm/@mitojs/web/dist/web.min.js"></script>
```

### wx-mini

#### 使用npm

```bash
$ npm i @mitojs/wx-mini
```

### 使用yarn

```bash
$ yarn add @mitojs/wx-mini
```

#### 使用CDN

```javascript
<script src="https://cdn.jsdelivr.net/npm/@mitojs/wx-mini/dist/wx-mini.js"></script>
```

## 迁移指南
### 改造原因
一开始只有`@zyf2e/mitojs`一个包，里面包含了原生浏览器、Vue、React、微信小程序的所有监控代码，使用起来比较简单，但是微信小程序的包是有大小限制，所以想要尽量限制`mitojs`的大小，所以花了点时间分包，分成：

* `@mitojs/core`
* ``@mitojs/shared`
* `@mitojs/browser`
* ``@mitojs/vue`
* `@mitojs/react`
* ``@mitojs/wx-mini`
* `@mitojs/web`

优势：

1. 为了减少包大小
2. 后续好维护，方便添加新功能：埋点SDK

### 迁移

* [vue接入指南](https://github.com/clouDr-f2e/mitojs/blob/master/docs/guide.md#Vue)
* [react接入指南](https://github.com/clouDr-f2e/mitojs/blob/master/docs/guide.md#react)
* [wx-mini接入指南](https://github.com/clouDr-f2e/mitojs/blob/master/docs/guide.md#微信小程序)

## 使用指南

[使用指南](https://github.com/clouDr-f2e/mitojs/blob/master/docs/guide.md)


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



