## 项目结构

```
├── dist
│   └── types
│       ├── Vue
│       ├── core
│       ├── types
│       └── utils
├── docs
├── examples
└── src
    ├── Vue
    ├── core
    ├── types
    └── utils
```


core（核心）
	breadcrumb
		记录用户行为
		优化点：
			1.添加level
			2.添加click、console等等
	errorId
		生成错误id
	replace
		重写原生事件，并订阅事件的回调
	transformData
		转换数据
	transportData
		传输数据
	handleEvents
		处理异常事件的回调

utils（工具）
	browser
		与浏览器有关的工具函数：将地址字符串转成对象、返回节点的简介信息（class、id、innerText）
	logger
		重写console，当debug为true时，会在控制台打印用户行为信息
	helper
		常用工具函数：防抖、节流、事件重写封装
	queue
		异步队列
	Severity
		各个错误和信息的等级

load（加载文件）
	加载7个重写事件的回调，并在回调中返回收集的数据

Vue（接入vue）
	重写vue.config.errorHandler，并抽取信息
	重写vue.config.warnHandler，并抽取信息
