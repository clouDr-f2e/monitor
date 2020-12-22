// MITO.init({
//   debug: true,
//   // 默认20
//   maxBreadcrumbs: 10,
//   dsn: 'http://localhost:5000/errors/upload',
//   beforePushBreadcrumb(breadcrumb, cruBreadcrumbData) {
//     if (cruBreadcrumbData.category === 'http') {
//       console.log(cruBreadcrumbData)
//       const data = cruBreadcrumbData.data
//       if (data.response.status >= 200 && data.response.status < 300) {
//         data.response.data = ''
//       }
//     }
//     return cruBreadcrumbData
//   }
//   // 默认false
//   // enableTraceId: true,
//   // 默认截取所有接口
//   // filterXhrUrlRegExp: /\/likePoetry/
// })
