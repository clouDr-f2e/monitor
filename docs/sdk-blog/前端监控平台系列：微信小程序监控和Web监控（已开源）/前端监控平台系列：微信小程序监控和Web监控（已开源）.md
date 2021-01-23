**本文作者：[cjinhuo](https://github.com/cjinhuo)，未经授权禁止转载。**

<h1 style="padding: 0px; font-weight: bold; color: black; font-size: 24px; text-align: center; line-height: 60px; margin-top: 10px; margin-bottom: 10px;">
  <span style="color: #2db7f5; border-bottom: 2px solid #2db7f5;" class="content">背景</span>
</h1>


接着前两个系列文章：

[前端监控平台系列：JS SDK（已开源）](https://juejin.cn/post/6862559324632252430#heading-17)

[前端监控平台系列：服务端功能设计与实现](https://juejin.cn/post/6901179615188877325)

这篇的主要目的讲下微信小程序(wx-mini)监控与Web监控的区别，以及如何编写，文章末尾附Github开源地址！！！


<h1 style="padding: 0px; font-weight: bold; color: black; font-size: 24px; text-align: center; line-height: 60px; margin-top: 10px; margin-bottom: 10px;">
  <span style="color: #2db7f5; border-bottom: 2px solid #2db7f5;" class="content">web监控与小程序监控</span>
</h1>

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block; padding-left: 10px;" class="content">web监控</span><span style="display: none;" class="suffix"></span></h2>

这篇：[前端监控平台系列：JS SDK（已开源）](https://juejin.cn/post/6862559324632252430#heading-17)文章已经讲的很清楚怎么劫持原生的函数，并拿到我们想要的信息，如果页面正常运行时则记录用户行为栈，如果页面报错时则上报该错误并将用户行为栈一并上报，这样有助于开发者更快的定位线上问题。

[在线体验demo](https://static.91jkys.com/web/mito-vue-demo/#/demo/one)

![mito-demo](https://tva1.sinaimg.cn/large/008eGmZEly1gmxgn4y1sag315g0m2hdt.gif)

[SDK信息收集-在线示例](*https://static.91jkys.com/f2e/mito-error-example/#/errors/2/info*)

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmxh6r1tesg30hs0aghdu.gif)


<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block; padding-left: 10px;" class="content">微信小程序监控</span><span style="display: none;" class="suffix"></span></h2>

微信小程序监控其实也是通过劫持微信官方抛出的全局对象的方法，由于小程序的运行环境并没有`window`和`document`对象，它只暴露了一个`wx`全局对象，所以变换下思路，比如我要拦截页面的`ajax`请求，在web端重写`window.XMLHttpRequest`和`fetch`，在微信小程序端则重写`wx.request`



**下面就来讲讲部分web端与微信小程序的监控编写思路区别**



<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block; padding-left: 10px;" class="content">监控ajax</span><span style="display: none;" class="suffix"></span></h2>

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">web端监控ajax</span><span style="display: none;" class="suffix"></span></h3>

![xhrReplace](https://i.loli.net/2020/08/16/KMH6LzIo2eOrv3T.png)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">web重写xhr</span>
</div>

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">微信小程序监控ajax</span><span style="display: none;" class="suffix"></span></h3>

![wx-network](https://tva1.sinaimg.cn/large/008eGmZEly1gmu4b200w6j313b0u0wg0.jpg)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">微信小程序重写request</span>
</div>

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block; padding-left: 10px;" class="content">监控页面路由</span><span style="display: none;" class="suffix"></span></h2>

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">web端监控页面路由</span><span style="display: none;" class="suffix"></span></h3>

在web端的`history`模式下需要重写`pushState`、`replaceState`，在`hash`模式下，需要监听`hashchange`事件:

![onpopstate](https://i.loli.net/2020/08/16/RmgZMnkjbw1XvuY.png)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">web重写onPopstate</span>
</div>

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">整体流程</span>
</div>

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">微信小程序监控路由</span><span style="display: none;" class="suffix"></span></h3>

需要重写`wx`原型的以下这几个方法，并拿到路由信息

![wx-route](https://tva1.sinaimg.cn/large/008eGmZEly1gmu6rtgoxtj30tm0dyjrt.jpg)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">微信小程序路由切换事件枚举</span>
</div>



这边需要注意一个小细节，如果是小程序后退的话是走到`navigateBack`回调，这是需要自己手动计算当前的`url`

![wx-calculate-route](https://tva1.sinaimg.cn/large/008eGmZEly1gmu79m7p1qj31ae0n6mye.jpg)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">计算后退时的路由</span>
</div>

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block; padding-left: 10px;" class="content">监控onerror</span><span style="display: none;" class="suffix"></span></h2>

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">web端监控onerror</span><span style="display: none;" class="suffix"></span></h3>

![web-error](https://tva1.sinaimg.cn/large/008eGmZEly1gmu838y3w7j30yw09c3yo.jpg)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">web监听error事件</span>
</div>

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">微信小程序监控onerror</span><span style="display: none;" class="suffix"></span></h3>

![wx-error](https://tva1.sinaimg.cn/large/008eGmZEly1gmu8dft3s3j30u00zdq45.jpg)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">微信小程序重写error函数</span>
</div>

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block; padding-left: 10px;" class="content">获取用户行为</span><span style="display: none;" class="suffix"></span></h2>

获取用户行为，比如click事件，在`web`端是可以直接在在`document`上监听的`click`事件，这样所有的子元素的`click`事件都会捕获到。但在小程序中并没有这种方式，所以借鉴百度的做法：重写所有的`Page`下的所有方法，拿到第一个入参`e`，判断这个参数是否含有`type`和`currentTarget`这种属性，有的话我就认为是类似`tab`、`touchmove`这种人为操作事件回调，当然要再继续往下判断，如果确实是人为操作事件那么就可以取出对应信息。

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">web端获取用户行为</span><span style="display: none;" class="suffix"></span></h3>

![web-click](https://tva1.sinaimg.cn/large/008eGmZEly1gmu8j3an0cj314y0csjrk.jpg)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">web捕获全局click事件</span>
</div>

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">微信小程序监控用户行为</span><span style="display: none;" class="suffix"></span></h3>

![wx-tab](https://tva1.sinaimg.cn/large/008eGmZEly1gmu94wqh3kj31290u0gnn.jpg)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">微信小程序捕获tap、touchmove事件</span>
</div>

由于微信小程序中的`e.currentTarget`没有标签的内容，所以只能拿到该元素的`dataSets`和`id`，所以就有了下面的工具函数

![wx-target-string](https://tva1.sinaimg.cn/large/008eGmZEly1gmu9ayoq45j31jq0heq3w.jpg)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">小程序获取currentTarget的id与dataSets</span>
</div>

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block; padding-left: 10px;" class="content">异同</span><span style="display: none;" class="suffix"></span></h2>

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">开发思路相同</span><span style="display: none;" class="suffix"></span></h3>

从上面几种监控来看，要想拿到对应信息，除了添加监听器就是截取对应的全局变量的属性或函数

<h3 style="margin-top: 20px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;" data-id="heading-7"><span style="display: none;" class="prefix"></span><span style="font-size: 16px; color: #2db7f5; display: inline-block; padding-left: 10px; border-left: 4px solid #2db7f5;" class="content">数据结构与重写思路不同</span><span style="display: none;" class="suffix"></span></h3>

比如`web`端的`onError`返回是一个`Error`对象，里面有`name`、message、`stack`属性，然而小程序的`onError`返回的是一个字符串，虽然`JSON.stringify`后的数据格式与`web`端差不多，但是如果我们想要获取信息，需要自己写正则来获取对应的`name`、`message`、`stack`信息

![wx-typeof-error](https://tva1.sinaimg.cn/large/008eGmZEly1gmuljdga99j30ob09q0t4.jpg)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">微信小程序的onError回调参数</span>
</div>


在web端我们想重写`fetch`的话先临时保存一份旧的引用地址，然后赋值一个新的函数，并且在这个函数的末尾返回旧的引用地址就行

![web-simple-fetch](https://tva1.sinaimg.cn/large/008eGmZEly1gmult2c6grj316m0bm74m.jpg)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">web简易版重写fetch</span>
</div>

在微信小程序中要想上面一种方式重写`wx.request`的话会出现错误：`TypeError: Cannot assign to read only property 'request' of object '#<Object>'`，在微信小程序控制台执行代码:`Object.getOwnPropertyDescriptors(wx.request)`:

```typescript
{
  "length": { "value": 0, "writable": false, "enumerable": false, "configurable": true },
  "name": { "value": "value", "writable": false, "enumerable": false, "configurable": true }
}
```

可以发现`wx.request`是不写的，细心的同学估计这时应该知道怎么办了，因为上面已经重写过`wx.request`了。这时需要用`Object.defineProperty`来重新给这个对象设置描述符了

![wx-simple-request](https://tva1.sinaimg.cn/large/008eGmZEly1gmum706se6j31dy0het98.jpg)

<div style="padding: 0px; font-weight: bold; color: black; font-size: 14px; text-align: center; line-height: 30px; margin-bottom: 10px;">
  <span style="color: #2db7f5;" class="content">微信小程序简易版重写request</span>
</div>
<h1 style="padding: 0px; font-weight: bold; color: black; font-size: 24px; text-align: center; line-height: 60px; margin-top: 10px; margin-bottom: 10px;">
  <span style="color: #2db7f5; border-bottom: 2px solid #2db7f5;" class="content">开源</span>
</h1>

无论上述你是否了解，现有开源[mitojs](https://github.com/clouDr-f2e/mitojs)监控SDK你都值得拥有，有丰富的hooks与配置项支持可高定制化公司业务，喜欢的小伙伴记得star😘



[mitojs](https://github.com/clouDr-f2e/mitojs)：一款轻量级的收集页面的用户点击行为、路由跳转、接口报错、代码报错、并上报服务端的SDK！！！

<h2 style="margin-top: 25px; margin-bottom: 15px; padding: 0px; font-weight: bold; color: black; font-size: 20px;"><span style="display: none;" class="prefix"></span><span style="color: #2db7f5; display: inline-block;" class="content">已实现功能点：</span><span style="display: none;" class="suffix"></span></h2>

已实现以下功能点：

\- [x] 🔨监听请求错误

\- [x] 🔨console

\- [x] 🔨路由跳转

\- [x] 🔨代码报错

\- [x] 🔨click、wx:tab、touchmove

\- [x] 🔨资源加载错误

\- [x] 🏅自定义上报错误

\- [x] 🚀丰富的hooks与配置项支持可高定制化

\- [x] 🌝支持IE8和安卓5以上

\- [x] 👌持续迭代与更新

\- [x] 支持react@next

\- [x] 支持Vue2.6

\- [x] 支持Vue3.0

\- [x] 完善的e2e测试

\- [x] 支持原生微信小程序

\- [x] 支持uni-app等微信小程序框架

\- [x] 完善的单元测试（coding）



### 收集信息平台展示

**该SDK能收集哪些信息：下面这些例子给你一一展示：**

[vue-示例](*https://static.91jkys.com/f2e/mito-error-example/#/errors/1/info*)

[react-示例](*https://static.91jkys.com/f2e/mito-error-example/#/errors/2/info*)

[js-示例](*https://static.91jkys.com/f2e/mito-error-example/#/errors/3/info*)

[wx-mini-示例](*https://static.91jkys.com/f2e/mito-error-example/#/errors/4/info*)