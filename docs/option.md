# options

### options.property

|              Name              | Type      | Default    | Description                                                  |
| :----------------------------: | --------- | ---------- | ------------------------------------------------------------ |
|             `dsn`              | `string`  | `""`       | dsn服务地址，上报接口的地址，post方法                        |
|           `disabled`           | `boolean` | `false`    | 默认是开启状态，为true时，会将sdk禁用                        |
|            `apikey`            | `string`  | `""`       | 每个项目对应一个apikey，用于存放错误集合的唯一标识           |
|            `debug`             | `boolean` | `false`    | 默认不会在控制台打印用户行为和错误信息，为true时将会在控台打印 |
|        `enableTraceId`         | `boolean` | `false`    | 为`true`时，页面的所有请求都会生成一个uuid，放入请求头中，和配置项：`traceIdFieldName`搭配使用 |
|       `traceIdFieldName`       | `string`  | `Trace-Id` | 如果`enableTraceId`为true时，将会在所有请求头中添加`key`为`Trace-Id`，`value`为`uuid`的`traceId`，与`includeHttpUrlTraceIdRegExp`搭配使用 |
|  `includeHttpUrlTraceIdRegExp  | ` RegExp` | `null`     | 如果你开启了`enableTraceId`，还需要配置该属性，比如将改属性置为：`/api/`，那么所有包含`api`的的接口地址都将塞入traceId |
|        `maxBreadcrumbs`        | `number`  | `20`       | 用户行为存放的最大容量，最大是100，当你配置超过100时，最终还是会设置成100，一方面是防止占更多的内存、一方面是保存超过100条用户行为没多大意义 |
|      `filterXhrUrlRegExp`      | `RegExp`  | `null`     | 默认为空，所有ajax都会被监听，不为空时，filterXhrUrlRegExp.test(xhr.url)为true时过滤 |
|          `silentXhr`           | `boolean` | `false`    | 默认会监控xhr，为true时，将不再监控                          |
|         `silentFetch`          | `boolean` | `false`    | 默认会监控fetch，为true时，将不再监控                        |
|        `silentConsole`         | `boolean` | `false`    | 默认会监控console，为true时，将不再监控                      |
|          `silentDom`           | `boolean` | `false`    | 默认会监听click事件，当用户点击的标签不是body时就会被放入breadcrumb，为true，将不在监听 |
|        `silentHistory`         | `boolean` | `false`    | 默认会监控popstate、pushState、replaceState，为true时，将不再监控 |
|         `silentError`          | `boolean` | `false`    | 默认会监控error，为true时，将不在监控                        |
|   `silentUnhandledrejection`   | `boolean` | `false`    | 默认会监控unhandledrejection，为true时，将不在监控           |
|       `silentHashchange`       | `boolean` | `false`    | 默认会监控hashchange，为true时，将不在监控                   |
|          `silentVue`           | `boolean` | `false`    | 默认会监控Vue的错误，为true时，将不在监控                    |
|       `silentWxOnError`        | `boolean` | `false`    | 默认会监控微信小程序App的onError错误，为true时，将不在监控   |
| `silentWxOnUnhandledRejection` | `boolean` | `false`    | 默认会监控微信小程序App的onUnhandledRejection，为true时，将不在监控 |
|    `silentWxOnPageNotFound`    | `boolean` | `false`    | 默认会监控微信小程序App的onPageNotFound，为true时，将不在监控 |
|  `silentWxOnShareAppMessage`   | `boolean` | `false`    | 默认会监控微信小程序App的onShareAppMessage，为true时，将不在监控 |
|       `silentMiniRoute`        | `boolean` | `false`    | 默认会监控微信小程序App的路由跳转，为true时，将不在监控      |

**示例：**用户行为栈最大长度为30

```typescript
MITO.init({
  ...
  maxBreadcrumbs: 30
})
```

### options.hook

```typescript
export interface HooksTypes {
  /**
   * 钩子函数，配置发送到服务端的xhr
   * 可以对当前xhr实例做一些配置：xhr.setRequestHeader()、xhr.withCredentials
   * 会在xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')、
   * xhr.withCredentials = true,后面调用该函数
   * ../param xhr XMLHttpRequest的实例
   */
  configReportXhr?(xhr: XMLHttpRequest): void
  /**
   * 钩子函数，在每次发送事件前会调用
   *
   * ../param event 有SDK生成的错误事件
   * ../returns 如果返回 null | undefined | boolean 时，将忽略本次上传
   */
  beforeDataReport?(event: ReportDataType): PromiseLike<ReportDataType | null> | ReportDataType | CANCEL
  /**
   * 钩子函数，在每次添加用户行为事件前都会调用
   *
   * ../param breadcrumb 由SDK生成的breacrumb事件栈
   * ../param hint 当次的生成的breadcrumb数据
   * ../returns 如果返回 null | undefined | boolean 时，将忽略本次的push
   */
  beforePushBreadcrumb?(breadcrumb: Breadcrumb, hint: BreadcrumbPushData): BreadcrumbPushData | CANCEL
  /**
   * 在状态小于400并且不等于0的时候回调用当前hook
   * ../param data 请求状态为200时返回的响应体
   * ../returns 如果返回 null | undefined | boolean 时，将忽略本次的上传
   */
  // afterSuccessHttp?<T>(data: T): string | CANCEL
  /**
   * 钩子函数，拦截用户页面的ajax请求，并在ajax请求发送前执行该hook，可以对用户发送的ajax请求做xhr.setRequestHeader
   * ../param config 当前请求的
   */
  beforeAppAjaxSend?(config: IRequestHeaderConfig, setRequestHeader: IBeforeAppAjaxSendConfig): void
  /**
   * 钩子函数，在beforeDataReport后面调用，在整合上报数据和本身SDK信息数据前调用，当前函数执行完后立即将数据错误信息上报至服务端
   * trackerId表示用户唯一键（可以理解成userId），需要trackerId的意义可以区分每个错误影响的用户数量
   */
  backTrackerId?(): string | number
}
```

#### configReportXhr

**示例**：上报服务端（你配置的dsn接口）时，可以自定义设置请求头，如下所示，设置了Content-Type

```
MITO.init({
  ...
  configReportXhr(xhr){
  	xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')
	}
})
```



#### beforeDataReport

```typescript
function(event: ReportDataType)
interface ReportDataType {
  type?: ERRORTYPES
  message?: string
  url: string
  name?: string
  stack?: any
  time?: number
  errorId?: number
  level: number
  // ajax
  elapsedTime?: number
  request?: {
    httpType?: string
    method: string
    url: string
    data: any
  }
  response?: {
    status: number
    statusText: string
    description: string
  }
  // vue
  componentName?: string
  propsData?: any
  // logerror
  customTag?: string
}
```

**示例**：如果错误事件发生在`test.com/test`地址下则不上报服务端

```typescript
MITO.init({
  ...
  beforeDataReport(event){
  	if (event.url === 'test.com/test') return false
	}
})
```



#### beforePushBreadcrumb

```typescript
function(breadcrumb: Breadcrumb, hint: BreadcrumbPushData)
interface BreadcrumbPushData {
  type: string
  data: any
}
export class Breadcrumb{
  private maxBreadcrumbs:number
  private stack:BreadcrumbPushData[]
  push()
  getStack()
}

```

**示例**：如果`type`是`Console`的就过滤，不会`push`到当前用户行为栈中

```typescript
MITO.init({
  ...
  beforePushBreadcrumb(breadcrumb, hint){
  	if (hint.type === 'Console') return false
	}
})
```

#### beforeAppAjaxSend

**示例**：拦截用户页面的ajax请求，并在ajax请求发送前执行该hook。在页面所有ajax请求时添加请求头，类似`axios`的request拦截器，

```typescript
MITO.init({
  ...
  beforeAppAjaxSend({method, url}, setRequestHeader){
  	if (method === 'GET') {
  		setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')
  	}
	}
})
```



#### backTrackerId

**示例**：trackerId表示用户唯一键（可以理解成userId），可以用uuid生成或用直接用userId，为了方便区分每个错误的用户数，会放入`authInfo`对象中

```typescript
MITO.init({
  ...
  backTrackerId(){
  	// 比如userId在localStorage中
  	return localStorage.getItem('userId')
	}
})
```

