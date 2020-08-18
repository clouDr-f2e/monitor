**本文作者：[cjinhuo](https://github.com/cjinhuo)，未经授权禁止转载。**

<h1 style="padding: 0px; font-weight: bold; color: black; font-size: 24px; text-align: center; line-height: 60px; margin-top: 10px; margin-bottom: 10px;">
  <span style="color: #2db7f5; border-bottom: 2px solid #2db7f5;" class="content">背景</span>
</h1>



传统方式下一个前端项目发到正式环境后，所有报错信息只能通过用户使用时截图、口头描述发送到开发者，然后开发者来根据用户所描述的场景去模拟这个错误的产生，这效率肯定超级低，所以很多开源或收费的前端监控平台就破空而出，比如:

* [sentry](https://github.com/getsentry/sentry) 
* [webfunny](https://github.com/a597873885/webfunny_monitor)
* [fundebug](https://www.fundebug.com/) 

等等一些优秀的监控平台

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block; padding-left: 10px;" class="content">我所了解的监控平台</span><span style="display: none;" class="suffix"></span></h2>

[sentry](https://github.com/getsentry/sentry) ：从监控错误、错误统计图表、多重标签过滤和标签统计到触发告警，这一整套都很完善，团队项目需要充钱，而且数据量越大钱越贵

[fundebug](https://www.fundebug.com/)：除了监控错误，还有个黑科技，可以录屏，也就是记录错误发生的前几秒用户的所有操作，压缩后的体积只有几十 KB（个人按照官网走的教程没有录屏成功，可能是没充钱）

[webfunny](https://github.com/a597873885/webfunny_monitor)：也是含有监控错误的功能，可以支持千万级别日PV量，额外的亮点是可以远程调试、性能分析，可以docker私有化部署（免费），业务代码加密过。

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block; padding-left: 10px;" class="content">为什么不选择上面三个监控平台或者其他监控平台，为什么要自己搞？</span><span style="display: none;" class="suffix"></span></h2>

首先`sentry`和`fundebug`是需要投入大量金钱来作为支持的，`webfuuny`是可以尝试部署试试，由于没有开源，二次开发受限。从零搞起。



<h1 style="padding: 0px; font-weight: bold; color: black; font-size: 24px; text-align: center; line-height: 60px; margin-top: 10px; margin-bottom: 10px;">
  <span style="color: #2db7f5; border-bottom: 2px solid #2db7f5;" class="content">监控平台的组成</span>
</h1>

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block;" class="content">整体流程</span><span style="display: none;" class="suffix"></span></h2>

![](https://i.loli.net/2020/08/17/7XRZaT5WtzLBD1n.jpg)




从上图可以看出来，如果需要自研监控平台需要做三个部分：

1. APP监控SDK：收集错误信息并上报
2. server端：接收错误信息，处理数据并入库，并根据告警规则通知对应的开发人员
3. 可视化平台：从数据库拿出已处理过的数据渲染，可轻松定位到线上bug



<h1 style="padding: 0px; font-weight: bold; color: black; font-size: 24px; text-align: center; line-height: 60px; margin-top: 10px; margin-bottom: 10px;">
  <span style="font-size: 24px; color: #2db7f5; border-bottom: 2px solid #2db7f5;" class="content">监控SDK</span>
</h1>
<h2 style="margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 20px; color: #2db7f5; display: inline-block;" class="content">整体代码架构</span><span style="display: none;" class="suffix"></span></h2>



![flow](https://i.loli.net/2020/08/16/f71JYxXwTrPIdyc.png)



整体代码架构使用**发布-订阅**设计模式以便后续迭代功能，所以处理逻辑基本都在`HandleEvents`文件中

![handlerEvent](https://i.loli.net/2020/08/16/dYf7O91VCMqnobl.png)

<h2 style="margin-top: 30px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 20px; color: #2db7f5; display: inline-block; padding-left: 10px;" class="content">web错误信息收集</span><span style="display: none;" class="suffix"></span></h2>

一般情况下都是通过重写js原生事件然后拿到错误信息，比如`ajax请求`，通过重写`xhr`、`fetch`事件来截取接口信息，所以我们需要优先编写一个易于重写事件的函数来复用。

![replaceOld](https://i.loli.net/2020/08/15/DSz1dA3ENMkxT9U.png)

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">接口错误</span><span style="display: none;" class="suffix"></span></h3>

所有的请求第三方库都是基于`xhr`、`fetch`二次封装的，所以只需要重写这两个事件就可以拿到所有的接口请求的信息，通过判断`status`的值来判断当前接口是否是正常的。举个例子，重写`xhr`的代码操作：

![xhrReplace](https://i.loli.net/2020/08/16/KMH6LzIo2eOrv3T.png)

上面除了拿去接口的信息之外还做一个操作：如果是SDK发送的接口，就不用收集该接口的信息。如果需要发布事件就调用`triggerHandlers(EVENTTYPES.XHR, this.mito_xhr)`，类似的，`fetch`也是用这种方式来重写。



**关于接口跨域、超时的问题**：这两种情况发生的时候，接口返回的响应体和响应头里面都是空的，`status`等于0，所以很难区分两者，但是正常情况下，一般项目中都的请求都是复杂请求，所以在正式请求会先进行`option`进行预请求，如果是跨域的话基本几十毫秒就会返回来，所以以此作为临界值来判断跨域与超时的问题（如果是接口不存在）。

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">js代码错误&&资源错误</span><span style="display: none;" class="suffix"></span></h3>

监听`window`的`error`事件

```js
window.addEventLinstner('error',function(e){
  // 拿到错误信息，发布事件：triggerHandlers
}, true)
```

* 资源错误

判断`e.target.localName`是否有值，有的话就是资源错误，在`handleErrors`中拿到信息，并处理

* 代码错误

否则就是代码错误，这回调中可以拿到对应的错误代码文件、代码行数等等信息，然后通过[source-map](https://www.npmjs.com/package/source-map)这个`npm包`进行解析，就可以还原出线上真实代码错误的位置。

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">监听unhandledrejection</span><span style="display: none;" class="suffix"></span></h3>

当[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 被 `reject` 且没有 `reject` 处理器的时候，会触发 `unhandledrejection` 事件

![replaceUnhandlerejecttion](https://i.loli.net/2020/08/16/vNoiKQGeV1ZgWht.png)

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block;" class="content">用户行为信息收集</span><span style="display: none;" class="suffix"></span></h2>

单纯收集错误信息是可以提高错误定位的效率，但如果再配合上用户行为的话就锦上添花，定位错误的效率再上一层，如下图所示，可以清晰的看到用户做了哪些事：进了哪个页面 => 点击了哪个按钮 =>  触发了哪个接口：

![breadcrumb](https://i.loli.net/2020/08/16/mXYGnq3EvyCo29j.jpg)

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">dom事件信息</span><span style="display: none;" class="suffix"></span></h3>

`dom`事件获取包括很多：`click`、`input`、`doubleClick`等等，一种直接在window上面监听click事件（注意第三个参数为`true`）:

```javascript
window.addEventLinstner('click',function(e){
	// 利用节流，以防事件触发过快
  // 发布事件 triggerHandlers
}, true)
```

还有一种是通过重写`window.addEventListener`的方式来截取开发者对dom的监听事件。

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">路由切换信息</span><span style="display: none;" class="suffix"></span></h3>

在单页应用中有两种路由变换：**hashchange**、**history**

* **history**

当浏览器支持`history`模式时，会被以下两个事件所影响：`pushState`、`replaceState`，且这两个事件不会触发[onpopstate](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onpopstate)的回调，所以我们需要监听这个三个事件：

![onpopstate](https://i.loli.net/2020/08/16/RmgZMnkjbw1XvuY.png)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">onpopstate重写，pushState&&replaceState也是一样的写法</span>
</div>

* **hashchange**

当浏览器只支持`hashchange`时，就需要重写hashchange:

![hashchange](https://i.loli.net/2020/08/16/WeHN2TlSRQbkUCn.png)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">hashchange重写</span>
</div>

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">console信息</span><span style="display: none;" class="suffix"></span></h3>

正常情况下正式环境是不应该有`console`的，那为什么要收集`console`的信息？第一：非正常情况下，正式环境或预发环境也可能会有`console`，第二：很多时候也可以把`sdk`放入测试环境上面调试。所以最终还是决定收集`console`信息，但是在初始化的时候的传参来告诉`sdk`是否监听`console`的信息收集。

![relaceConsole](https://i.loli.net/2020/08/16/SNAWDBJ2FdOwi1v.png)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">console重写</span>
</div>

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block;" class="content">框架层错误信息收集</span><span style="display: none;" class="suffix"></span></h2>

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">Vue</span><span style="display: none;" class="suffix"></span></h3>

`vue2.6`官网提供了两个报错函数的回调：`Vue.config.errorHandler`和`Vue.config.warnHandler`

![errorHandle](https://i.loli.net/2020/08/16/trvimBeEfQIjgGp.png)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">vue错误信息收集</span>
</div>

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">React</span><span style="display: none;" class="suffix"></span></h3>

React16.13中提供了[componentDidCatch](https://zh-hans.reactjs.org/docs/react-component.html#componentdidcatch)钩子函数来回调错误信息，所以我们可以新建一个类`ErrorBoundary`来继承React，然后然后声明`componentDidCatch`钩子函数，可以拿到错误信息（目前没写react的错误收集，看官网文档简述，简易版应该是这样写的）。

![react-errro](https://i.loli.net/2020/08/16/ol1JZVdbRPDHqvQ.png)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">react错误信息收集</span>
</div>

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block;" class="content">自定义上报错误</span><span style="display: none;" class="suffix"></span></h2>

上面收集的是web端的代码错误、接口报错和框架层面的报错等等，还有一种是业务错误信息：比如点击支付的时候，可能服务端接口返回200，但是响应体是错误信息，就需要手动上报这块的错误信息。既然要手动上报，`SDK`就需要提供一个全局函数功能开发者调用：

```js
import MITO from 'mitojs'
MITO.log({
  info: '支付失败，余额不足'
})
```

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block;" class="content">Breadcrumb收集</span><span style="display: none;" class="suffix"></span></h2>

在上面收集完错误信息的时候，都在最后追加一行`breadcrumb.push(data)`，这样就可以保存用户的行为轨迹，默认情况设置`20`长度，也可以在初始化时可配置，但是建议最高不要超过`100`，因为如果信息过多，内存占用过大，对页面不太友好。



<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">类型整合</span><span style="display: none;" class="suffix"></span></h3>

在每个事件类型的回调的时候都将类型整合：比如用户点击、路由跳转都是属于用户行为，这样做的原因是让开发者更好过滤无用信息和精准定位到需要的信息。

![breadcrumb-category](https://i.loli.net/2020/08/17/oSAi56sZHQKepRy.png)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">用户行为类型整合</span>
</div>

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block;" class="content">Error id生成</span><span style="display: none;" class="suffix"></span></h2>

每个错误事件触发时都会有很多信息，我们需要尽量保证每个不同信息的错误生成的id不一样，这边采取的措施是先将每个错误的对象key按照一定规则递归排序，然后根据每个对象的值进行`hashCode`，得到一串`errorId`



<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block;" class="content">上报错误信息</span><span style="display: none;" class="suffix"></span></h2>

当SDK拿到错误的所有信息时需要上报到服务端，有几种方式上报服务端：

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">通过xhr上报</span><span style="display: none;" class="suffix"></span></h3>

通过`xhr`上报，如果设置成异步的时候，当用户跳转新页面或者关闭页面时就会丢失当前这个请求，如果设置成同步，又会让页面造成卡顿的现象



`sentry`目前是通过`xhr`发送的，不过它在发送前会推到它设置的一个请求缓冲区` _buffer`，以此来优化并发请求过多的问题。

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">Image的形式来发送请求</span><span style="display: none;" class="suffix"></span></h3>

**特点：**

1. 没有跨域问题、
2. 发 GET 请求之后不需要获取和处理数据、
3. 服务器也不需要发送数据、
4. 不会携带当前域名 cookie、不会阻塞页面加载，影响用户的体验，只需 **new Image** 对象、
5. 相比于 BMP/PNG 体积最小，可以节约 41% / 35% 的网络资源小

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">Navigator.sendBeacon</span><span style="display: none;" class="suffix"></span></h3>

**MDN：**可用于通过[HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP)将少量数据异步传输到Web服务器，统计和诊断代码通常要在 `unload` 或者 `beforeunload` 事件处理器中发起一个同步 `XMLHttpRequest` 来发送数据。同步的 `XMLHttpRequest` 迫使用户代理延迟卸载文档，并使得下一个导航出现的更晚。下一个页面对于这种较差的载入表现无能为力

**特点：**

1. 发出的是异步请求，并且是`POST`请求
2. 发出的请求，是放到的浏览器任务队列执行的，脱离了当前页面，所以不会阻塞当前页面的卸载和后面页面的加载过程，用户体验较好
3. 只能判断出是否放入浏览器任务队列，不能判断是否发送成功
4. `Beacon API`不提供相应的回调，因此后端返回最好省略`response body`
5. 兼容性不是很友好



<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block;" class="content">用户唯一标识</span><span style="display: none;" class="suffix"></span></h2>

为了方便统计用户量，在每次上报的时候会带一个唯一标识符`trackerId`，生成这个`trackerId`的途径有两种：

1. 如果你是用`ajax`上报的话，发现`cookie`中没有带`trackerId`这个字段，服务端生成并`setCookie`设置到用户端的`cookie`
2. 直接用SDK生成，在每次上报之前都判断`localstorage`是否存在`trackerId`，有则随着错误信息一起发送，没有的话生成一个并设置到`localstorage`



<h1 style="padding: 0px; font-weight: bold; color: black; font-size: 24px; text-align: center; line-height: 60px; margin-top: 10px; margin-bottom: 10px;">
  <span style="color: #2db7f5; border-bottom: 2px solid #2db7f5;" class="content">总结</span>
</h1>

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block;" class="content">SDK小结</span><span style="display: none;" class="suffix"></span></h2>

**订阅事件** => **重写原生事件** => **触发原生事件（发布事件）** => **拿到错误信息** => **提取有用的错误信息** => **上报服务端**



<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block;" class="content">关于开源</span><span style="display: none;" class="suffix"></span></h2>

SDK开源:[mitojs](https://github.com/clouDr-f2e/mitojs)，下一篇会讲服务端的表结构设计思路、怎样在**千万**条数据中多标签**毫秒**级查询事件，更好的告警机制通知开发人员。





感兴趣的小伙伴可以点个关注，后续好文不断！！！

