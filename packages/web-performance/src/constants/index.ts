export enum metricsName {
  /* performance metrics */
  NT = 'navigation-timing',
  FP = 'first-paint',
  FCP = 'first-contentful-paint',
  LCP = 'largest-contentful-paint',
  CCP = 'custom-contentful-paint',
  FID = 'first-input-delay',
  RL = 'resource-flow',
  CLS = 'cumulative-layout-shift',
  FPS = 'fps',
  ACT = 'api-complete-time',
  /* information */
  DI = 'device-information',
  NI = 'network-information',
  PI = 'page-information'
}
