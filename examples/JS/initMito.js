MITO.init({
  debug: true,
  // silentConsole: true,
  maxBreadcrumbs: 10,
  dsn: 'http://localhost:2021/errors/upload',
  beforePushBreadcrumb(breadcrumb, cruBreadcrumbData) {
    if (cruBreadcrumbData.category === 'http') {
      const data = cruBreadcrumbData.data
      if (data.response.status >= 200 && data.response.status < 300) {
        data.response.data = ''
      }
    }
    return cruBreadcrumbData
  }
})
