window.MITO.init({
  // debug: true,
  silentConsole: true,
  maxBreadcrumbs: 10,
  dsn: 'http://localhost:2021/errors/upload',
  throttleDelayTime: 0,
  onRouteChange(from, to) {
    console.log('onRouteChange: _', from, to);
  }
})
