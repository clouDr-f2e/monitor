# 性能监控

## 一、安装
使用npm
```bash
npm i @zyf2e/monitor-wx-mini-performance
```
使用yarn
```bash
yarn add @zyf2e/monitor-wx-mini-performance
```

<br/>

## 二、快速开始
```javascript
const wxPerformance = new MITO.WxPerformance({
  appId: "a1329cc0-563b-11eb-98fe-259847d73cdd",
  immediately: true,
  report: (data) => {
    console.log('WxPerformance data = ', data)
  }
})
```

<br/>

## 三、Instance

### 3.1 Constructor

  属性|类型|描述|是否必填|默认值
  |---|---|---|---|---|
  appId|string|应用标识|否|无
  version|string|应用版本号|否|无
  report|上报回调函数|function|是|无
  immediately|boolean|是否立即上报|否|false
  ignoreUrl|regexp|忽略请求正则|否|无
  maxBreadcrumbs|number|非立即上报最大存储|否|10
  needNetworkStatus|boolean|是否携带网络信息|否|true
  needBatteryInfo|boolean|是否携带电池信息|否|true
  needMemoryWarning|boolean|是否监听内存警告|否|true
  onAppHideReport|boolean|当immediately为false起效 是否需要在appHide时发送数据|否|true



### 3.2 Function

- CustomPaint

自定义渲染完成时，手动调用会上包自定义完成渲染的数据

<br/>

## 四、指标

### 4.1 WX_LIFE_STYLE

记录微信生命周期的时间

- AppOnLaunch = 'AppOnLaunch',
- AppOnShow = 'AppOnShow',
- PageOnLoad = 'PageOnLoad',
- PageOnReady = 'PageOnReady',
- PageOnUnload = 'PageOnUnload',

### 4.2 MEMORY_WARNING

微信内存警告

### 4.3 WX_PERFORMANCE

指标类型（entryType）| 	指标名称
|---|---|
路由（navigation）|	route: 路由性能；appLaunch: 小程序启动耗时
渲染（render）|	firstRender: 页面首次渲染耗时
脚本（script）| evaluateScript: 注入脚本耗时

### 4.4 WX_NETWORK

- request: 微信请求
- uploaderFile: 上传文件
- downloadFile: 下载文件

### 4.5 WX_USER_ACTION

用户首次点击时间

<br/>

## 五、数据

属性 | 名称 | 类型 | 值 
|---|---|---|---|
batteryLevel | 电池电量等级 | number | 0-100
item | 性能数据 | array | any 
networkType | 网络类型 | string | wifi' 、 '2g' 、 '3g' 、 '4g' 、 '5g' 、 'unknown' 、 'none'
page | 当前页面 | string | any
systemInfo | 系统信息 | Object | any
time | 发送时间 | string | any 
time | 发送时间 | number | any 
type | 性能指标 | string | 指标枚举
uuid | uuid | string | any
wxLaunch| 小程序launch的时间，可以作为本次launch的唯一标识 | number | any
