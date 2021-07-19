## 指标定义
+ w3c 定义
  ![navigation](./assets/timing-overview.png)

+ 自定义（对目前Spa页面来说，大致是这样的）
  ![custom-navigation](./assets/custom-navigation.png)

+ processing及onLoad的具体步骤
  ![dom-parse](./assets/dom-parse.png)


## 如何使用指标
当我们收集到了一些指标后，我们需要对指标做出一些反馈。
譬如，FCP花费很长时间，该如何优化？LCP花费很长时间，改如何优化？

所以收集了指标之后，更好得分析指标，是让性能监控变得更有意义的关键。

这里以FCP来说明下，指标如何分析：
当前我们发现FCP花费时间很长时，分析步骤如下：
+ 页面准备阶段
  - 查看dnsLookup的耗时
  - 查看Tcp连接耗时
+ 页面请求阶段
  - 查看html请求返回耗时
+ 页面解析渲染阶段
  - 检查script是否有阻塞渲染
  - 检查第一个元素渲染的时机是否偏晚
  - 检查页面资源加载是否过大

**一般来说，在网络情况都正常的情况下，提高FCP最直接的办法是在html中加入base64图片的骨架屏。当然要确保整个html不要大于14kb([原因](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work#tcp_%E6%85%A2%E5%BC%80%E5%A7%8B_14kb_%E8%A7%84%E5%88%99))**

## 收集指标的兼容性
因为@mito/web-performance 中使用到了PerformanceObserver对象，所以在safari浏览器中不支持FP、FCP、LCP、FID指标的收集

## 自定义指标的收集

