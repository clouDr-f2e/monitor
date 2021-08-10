
# wx-mini-performance

## 指标

- APP启动耗时
- 脚本注入时间
- 页面初次渲染耗时
- 请求耗时
- TTI
- 内存警告

### 自定义完成时


在真实的业务场景中，业务渲染成功后，我们页面首屏接口还未完成，需要自定义完成首屏的时间，在@zyf2e/monitor-wx-mini-performance中你只需要简单的调用一下即可

```javascript
wxPerformance.customPaint()
```

## 如何使用@zyf2e/monitor-wx-mini-performance

### 安装

#### 使用npm

```bash
npm i @zyf2e/monitor-wx-mini-performance
```

### 使用cdn

```html
`<script src="https://cdn.jsdelivr.net/npm/@mitojs/wx-mini-performance/dist/wx-mini-performance.min.js"></script>`
```

### 使用

```javascript
// app.js
const MITO = require('./utils/wx-mini-performance.js')

const wxPerformance = new MITO.WxPerformance({
  appId: "your-appid",
  report: (data) => {
    // wx.request
    wx.request({})
  }
})
```


## 优化建议

- 分包加载，分包预下载
- 减少默认data的大小 
- 组件化方案
- 删除不必要的代码，tree-shaking
- 控制静态资源的大小


## 兼容性

因为@zyf2e/monitor-mini-performance 中使用到了wx.getPerformance()。所以小程序基础库 2.11.0 开始支持，低版本需做兼容处理。

## API文档
https://github.com/clouDr-f2e/mitojs/tree/dev/packages/mini-performance