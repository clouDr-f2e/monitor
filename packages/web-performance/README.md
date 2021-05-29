# 性能监控

## 指标
### NavigationTiming
字段|描述|计算公式|备注
|---|----|------|---|
dnsLookup|DNS查询耗时|	domainLookupEnd - domainLookupStart
initial connection|TCP连接耗时|connectEnd - connectStart
SSL|SSL安全连接耗时|	connectEnd - secureConnectionStart|只在HTTPS下有效。
ttfb|请求响应耗时|responseStart - requestStart|https://developer.chrome.com/docs/devtools/network/reference/#timing
content download|内容传输耗时|responseEnd - responseStart
dom parse|DOM解析耗时|domInteractive - responseEnd
resource download|资源加载耗时|	loadEventStart - domContentLoadedEventEnd
dom Ready|DOM完成加载|domContentLoadedEventEnd - fetchStart
page load|页面完全加载|loadEventStart - fetchStart
### FP
### FCP
### CLP
### FID
### FPS
