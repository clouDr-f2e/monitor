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
MITO.init()
```



# options
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


