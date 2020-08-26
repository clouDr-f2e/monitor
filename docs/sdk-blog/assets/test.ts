  handleError(errorEvent: ErrorEvent): void {
    const target = errorEvent.target
    if (target.localName) {
      // 资源加载错误
      // 提取有用数据
      const data = resourceTransform(errorEvent.target)
      // push到行为栈
      breadcrumb.push({...})
      // 上报错误
      return transportData.send(data)
    }
    // 代码错误
  }