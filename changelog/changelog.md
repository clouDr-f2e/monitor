### 21-02-05
* http_error上报的message字段更改：

旧版：`${message}`

新版：`${message} ${getRealPath(data.url)}`

新增了请求接口的真实地址

* 更改hook：beforeDataReport，原本是传入ReportDataType，这个类型下的信息是sdk收集的，但是发送前会再次整合成TransportDataType，所以真正的数据发送前应该是TransportDataType才对。

```js
export interface TransportDataType {
  authInfo: AuthInfo
  breadcrumb: BreadcrumbPushData[]
  data: ReportDataType
  record?: any[]
}
```
### 21-02-23
修复了微信小程序配置项:debug:true的问题、

修复了发布订阅的策略，现在配置silentConsole不会再重写原生的console





