# 埋点

由于埋点过于业务性，所以这次小程序的埋点只提供一些`hooks`和上报方法，不过可以利用这些`hooks`来个性化定制埋点上报

## 小程序埋点

### 小程序hooks
[wx-mini-hooks](https://github.com/clouDr-f2e/mitojs/blob/master/docs/option.md#wx-minihook)
### 无痕埋点
* 页面无痕

如果想做页面无痕，则需要在`mito`暴露出的`pageOnShow`和`pageOnHide`中进行无痕埋点，`pageOnShow`也就是wx中原生的`pageOnShow`事件，这里说明一下，`mito`中的`pageOnShow`是在原生的`pageOnShow`执行完后才执行的。比如如下的伪代码：

```js
function pageOnShow(page: IWxPageInstance) {
  // 进入页面埋点
}
function pageOnHide(page: IWxPageInstance) {
  // 离开页面埋点
}
MITO.init({
  trackDsn:''
  pageOnShow,
  pageOnHide
})
```
* 事件无痕

由于微信小程序拿不到点击节点的`tagName`、`domPath`（从根路径到该节点的路径），所以无法对按钮做唯一性校验，也就无法做抛出比较有用的hook（如果有小伙伴有任何方法的话可以微信告诉我，不胜感激，[微信二维码](https://github.com/clouDr-f2e/mitojs#issue)）
### 手动埋点
每个公司的埋点业务都是不一样的，手动埋点的规范也是如此，我这边粗略的定义了我几个类型：

```js
export enum EActionType {
  // 页面曝光
  PAGE = 'PAGE',
  // 事件埋点
  EVENT = 'EVENT',
  // 区域曝光
  VIEW = 'VIEW',
  // 时长埋点
  DURATION = 'DURATION',
  // 区域曝光的时长埋点
  DURATION_VIEW = 'DURATION_VIEW'
  // 其他埋点类型
  OTHER = 'OTHER'
}
```
并且暴露了两个方法：`sendTrackData`，`track`
#### sendTrackData
这个方法是直接向服务端发送你想要传的数据，可以理解成是一个正常的post函数，
#### track
这个方法是第一个入参是埋点类型，第二个是埋点参数，当然后续也会调用`sendTrackData`来请求服务端


### web埋点
**coding...**
