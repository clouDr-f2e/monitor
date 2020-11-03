# MITO-SDK

## overview

## install

### use npm

`npm i mito-broswer`

### use CDN

`<script></script>`



## use environment

### Vue2.6

```javascript
import MITO from 'mito-broswer'
import Vue from 'vue'
Vue.use(MITO.MitoVue)
MITO.init({})
```

### JS

```javascript
<script></script>
MITO.init({})
```



## global event

|    Name     |   Type   |                           Default                            | Description                              |
| :---------: | :------: | :----------------------------------------------------------: | :--------------------------------------- |
|   MitoVue   |  Object  |                      {install:Function}                      | Vue2.6 plugin,demo:Vue.use(MITO.MitoVue) |
| SDK_VERSION |  String  |                   version in package.json                    | SDK version                              |
|  SDK_NAME   |  String  |                     name in package.json                     | SDK name                                 |
|    init     | Function |                     (option:InitOptions)                     | pass options you need to Initialize SDK  |
|     log     | Function | (Info:string, tag:string, level = Severity.Normal, ex = '', type = ERRORTYPES.BUSINESS_ERROR) |                                          |




## InitOptions
|            Name            | Type      | Default                  | Description                                                  |
| :------------------------: | --------- | ------------------------ | ------------------------------------------------------------ |
|           `dsn`            | `string`  | `""`（需要来个默认地址） | dsn服务地址，上报接口的地址，post方法                        |
|         `disabled`         | `boolean` | `true`                   | 默认是开启状态，为true时，会将sdk禁用                        |
|          `apikey`          | `string`  | `""`                     | 每个项目对应一个apikey，用于存放错误集的唯一标识             |
|          `debug`           | `boolean` | `false`                  | 默认不会在控制台打印用户行为和错误信息，为true时将会在控台打印 |
|      `enableTraceId`      | `boolean` | `false`                  | 默认关闭`traceId`，开启时，页面的所有请求都会生成一个uuid，放入请求头中      |
| `traceIdFieldName` | `string` | `Trace-Id` | enableTraceId为true时，traceId放入请求头中的key，默认是Trace-Id |
|      `maxBreadcrumbs`      | `number`  | `20`                     | 用户行为存放的最大容量，最大是100，当你配置超过100时，最终还是会设置成100，一方面是防止占更多的内存、一方面是保存超过100条用户行为没多大意义 |
| `filterXhrUrlRegExp` | `RegExp` | null | 默认为空，所有ajax都会被监听，不为空时，filterXhrUrlRegExp.test(xhr.url)为true时过滤 |
|        `silentXhr`         | `boolean` | `false`                  | 默认会监控xhr，为true时，将不再监控                          |
|       `silentFetch`        | `boolean` | `false`                  | 默认会监控fetch，为true时，将不再监控                        |
|      `silentConsole`       | `boolean` | `false`                  | 默认会监控console，为true时，将不再监控                      |
|        `silentDom`         | `boolean` | `false`                  | 默认会监听click事件，当用户点击的标签不是body时就会被放入breadcrumb，为true，将不在监听 |
|      `silentHistory`       | `boolean` | `false`                  | 默认会监控popstate、pushState、replaceState，为true时，将不再监控 |
|       `silentError`        | `boolean` | `false`                  | 默认会监控error，为true时，将不在监控                        |
| `silentUnhandledrejection` | `boolean` | `false`                  | 默认会监控unhandledrejection，为true时，将不在监控           |
|     `silentHashchange`     | `boolean` | `false`                  | 默认会监控hashchange，为true时，将不在监控                   |
|        `silentVue`         | `boolean` | `false`                  | 默认会监控Vue的错误，为true时，将不在监控                    |

### InitOptions-hook

```typescript
export interface HooksTypes {
  /**
   * 钩子函数，配置发送到服务端的xhr
   * 可以对当前xhr实例做一些配置：xhr.setRequestHeader()、xhr.withCredentials
   * 会在xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')、
   * xhr.withCredentials = true,后面调用该函数
   * @param xhr XMLHttpRequest的实例
   */
  configReportXhr?(xhr: XMLHttpRequest): void
  /**
   * 钩子函数，在每次发送事件前会调用
   *
   * @param event 有SDK生成的错误事件
   * @returns 如果返回 null | undefined | boolean 时，将忽略本次上传
   */
  beforeDataReport?(event: ReportDataType): PromiseLike<Event | null> | Event | CANCEL
  /**
   * 钩子函数，在每次添加用户行为事件前都会调用
   *
   * @param breadcrumb 由SDK生成的breacrumb事件栈
   * @param hint 当次的生成的breadcrumb数据
   * @returns 如果返回 null | undefined | boolean 时，将忽略本次的push
   */
  beforePushBreadcrumb?(breadcrumb: Breadcrumb, hint: BreadcrumbPushData): BreadcrumbPushData | CANCEL
  /**
   * 在状态小于400并且不等于0的时候回调用当前hook
   * @param data 请求状态为200时返回的响应体
   * @returns 如果返回 null | undefined | boolean 时，将忽略本次的上传
   */
  // afterSuccessHttp?<T>(data: T): string | CANCEL
  /**
   * 钩子函数，拦截用户页面的ajax请求，并在ajax请求发送前执行该hook，可以对用户发送的ajax请求做xhr.setRequestHeader
   * @param config 当前请求的
   */
  beforeAppAjaxSend?(config: IRequestHeaderConfig, setRequestHeader: IBeforeAjaxSendConfig): void

  /**
   * 钩子函数，在beforeSend后面调用，在整合上报数据和本身SDK信息数据前调用，当前函数执行完后立即将数据错误信息上报至服务端
   * trackerId表示用户唯一键（可以理解成userId），需要trackerId的意义可以区分每个错误影响的用户数量
   */
  backTrackerId?(): string | number
}
```

