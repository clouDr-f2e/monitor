## [2.1.35](https://github.com/clouDr-f2e/mitojs/compare/2.1.34...2.1.35) (2021-11-09)


### Bug Fixes

* 兼容性问题, 数据includes换成indexOf ([b2eb753](https://github.com/clouDr-f2e/mitojs/commit/b2eb75313236ef01098b21ba83f7c4a7648064c6))



## [2.1.34](https://github.com/clouDr-f2e/mitojs/compare/v2.1.33...v2.1.34) (2021-10-26)

### Bug Fixes

* 修复 ccp 指标错误
* 删除 packages/types 中 @types/wechat-miniprogram 依赖


## [2.1.33](https://github.com/clouDr-f2e/mitojs/compare/v2.1.31...v2.1.32) (2021-10-20)

### Bug Fixes

* 修复 ccp 指标错误
* 更新 performance 文档


## [2.1.32](https://github.com/clouDr-f2e/mitojs/compare/v2.1.31...v2.1.32) (2021-10-19)
* 修复 ccp 指标错误


## [2.1.31](https://github.com/clouDr-f2e/mitojs/compare/v2.1.30...v2.1.31) (2021-10-18)
* 优化 ccp 指标
* 更新 performance 文档


## [2.1.30](https://github.com/clouDr-f2e/mitojs/compare/v2.1.29...v2.1.30) (2021-10-13)
* 新增 ccp 指标
* 更新 WebVitals 配置，删除customPaintMetrics属性，新增needCCP属性


## [2.1.29](https://github.com/clouDr-f2e/mitojs/compare/v2.1.28...v2.1.29) (2021-09-24)


### Bug Fixes

* **getNavigationTiming:** 修复navigation-timing中ssl不存在，计算错误 ([e1c1610](https://github.com/clouDr-f2e/mitojs/commit/e1c1610dcf04015babdc252ebc3ec9036fd3f59a))
* manual fix change log ([d4c1f9f](https://github.com/clouDr-f2e/mitojs/commit/d4c1f9f10a10bcfa8791f625f15beb68f786cef2))
* 修复navigation-timing中有值小于0时，不做上报处理，FP和FCP在页面隐藏后不做上报处理 ([8d0280b](https://github.com/clouDr-f2e/mitojs/commit/8d0280b1de062c070bb37086e6e9ffe3dd0fc8f1))
* 修复roundByFour中toFixed报错 ([2a30f4d](https://github.com/clouDr-f2e/mitojs/commit/2a30f4d7e8f4d4b45bb5e2a36f5bf5213a088ff4))



## [2.1.27](https://github.com/clouDr-f2e/mitojs/compare/v2.1.22...v2.1.27) (2021-09-02)


### Bug Fixes

* 修复safari兼容性问题 ([61ab1f8](https://github.com/clouDr-f2e/mitojs/commit/61ab1f8c9f0230cb4e8e8db430d613488c3f2601))
* 修复safari兼容性问题 ([b7b470b](https://github.com/clouDr-f2e/mitojs/commit/b7b470b302cbdbc14d57db105339e7cb2244e637))


### Features

* publish add personal registry ([cb42f31](https://github.com/clouDr-f2e/mitojs/commit/cb42f310763193568a912be50a0aca44f2949d5a))
* 添加一种type ([8e1fc90](https://github.com/clouDr-f2e/mitojs/commit/8e1fc90a924a5494c63c4227d69dcb8c3437fc3b))



## [2.1.22](https://github.com/clouDr-f2e/mitojs/compare/v2.1.20...v2.1.22) (2021-08-27)


### Performance Improvements

* 修复cls上报指标名称不正确 ([7d413ce](https://github.com/clouDr-f2e/mitojs/commit/7d413ce673bb18cf7eb0285793f940ef2ea55640))
* 修改自定义完成指标名称 ([5f8c10a](https://github.com/clouDr-f2e/mitojs/commit/5f8c10a1b3f4b74f76c0f147cc30a41f6dd2ab46))



## [2.1.20](https://github.com/clouDr-f2e/mitojs/compare/v2.1.18...v2.1.20) (2021-08-15)


### Bug Fixes

* download and upload file method ([8cc1af9](https://github.com/clouDr-f2e/mitojs/commit/8cc1af9b8e17f7b281a21008f7ea39ab88805b09))
* packagejson ([220a5e9](https://github.com/clouDr-f2e/mitojs/commit/220a5e995a7401650a7f35f1d1b17fa63b58f73e))
* remove console ([52b3231](https://github.com/clouDr-f2e/mitojs/commit/52b3231789382e9d62197c4e6b675c5b48335fa9))
* remove console ([ce8a23e](https://github.com/clouDr-f2e/mitojs/commit/ce8a23e98723d2fec3e90f4744c0c6d0c5fcb13c))


### Features

* add mini-performance e2e ([621d200](https://github.com/clouDr-f2e/mitojs/commit/621d200096aff03e249c94a8c532a166f77359ea))
* adjust api-extractor.json ([422cb31](https://github.com/clouDr-f2e/mitojs/commit/422cb3172742ba50f7b3c4d240ee068dc15541c4))
* adjust path ([f1cb78a](https://github.com/clouDr-f2e/mitojs/commit/f1cb78a6025723e8c353a5ad7a8ce5e98f2db556))
* change scope ([11bc77f](https://github.com/clouDr-f2e/mitojs/commit/11bc77f03b1ec89d0350a8da321c3d8fe9412d12))
* **performance:** 增加计算fps总次数配置项 ([71ef644](https://github.com/clouDr-f2e/mitojs/commit/71ef6444bb278e73dcce33b7f5433b9b318a1e33))



## [2.1.18](https://github.com/clouDr-f2e/mitojs/compare/v2.1.17...v2.1.18) (2021-07-13)


### Features

* add cls metrics ([7914d22](https://github.com/clouDr-f2e/mitojs/commit/7914d22188435fa42df8267b16b192ea6ad0b55b))


### Performance Improvements

* 在PerformanceObserver不支持时，通过performance.getEntriesByType('navigation')获取navigationTiming ([17e619d](https://github.com/clouDr-f2e/mitojs/commit/17e619dbef1903741c86784d93be0a126c1f8d9c))



## [2.1.17](https://github.com/clouDr-f2e/mitojs/compare/v2.1.16...v2.1.17) (2021-06-25)


### Features

* **core/options:** add maxDuplicateCount field avoid duplicate error report ([bb1acc6](https://github.com/clouDr-f2e/mitojs/commit/bb1acc6f263e70710adac21773925477d899d8f7))
* **core/options:** maxDuplicateCount default to 2 ([e484a49](https://github.com/clouDr-f2e/mitojs/commit/e484a49fd613629736a895445644f8dad9313885))



## [2.1.16](https://github.com/clouDr-f2e/mitojs/compare/v2.1.15...v2.1.16) (2021-06-12)


### Bug Fixes

* resource-flow 触发异常问题 ([8962093](https://github.com/clouDr-f2e/mitojs/commit/8962093e5c507e1f82b98044bec5a9ebda453afb))
* 修复web-performance 入口路径 ([4acbaed](https://github.com/clouDr-f2e/mitojs/commit/4acbaed086809302ab82d3bee2afb74544ecd801))


### Features

* 修复lcp指标存在时，不重复上报；pageInfo新增screen resolution ([155fb39](https://github.com/clouDr-f2e/mitojs/commit/155fb396400c8cdc2c16a266800e5af201bbc149))



## [2.1.15](https://github.com/clouDr-f2e/mitojs/compare/v2.1.14...v2.1.15) (2021-06-01)


### Features

* add device code ([a837362](https://github.com/clouDr-f2e/mitojs/commit/a83736209175835128a30c1ccb75f1da171fd157))
* add fps code ([f7cd37b](https://github.com/clouDr-f2e/mitojs/commit/f7cd37bd057986b242c1a51ea0972445c4172521))
* add network info ([bed9a3a](https://github.com/clouDr-f2e/mitojs/commit/bed9a3a0ec61c0f3bb0d1351b81d5a4ee7276451))
* add web performance example ([8d2fc96](https://github.com/clouDr-f2e/mitojs/commit/8d2fc9624549e19bdb75d68fd92077bb39fe2c07))
* edit calculateFps.ts ([fbfd34b](https://github.com/clouDr-f2e/mitojs/commit/fbfd34b841f1de7a33b1b2a9583a1a92045364a5))
* edit constants code ([647d094](https://github.com/clouDr-f2e/mitojs/commit/647d094f5d09ebc1beffb611ad14a0dfeca5f339))
* init web-performance ([b081a24](https://github.com/clouDr-f2e/mitojs/commit/b081a245659d419fb52ee1b2fa85d6ee1e3f03a3))
* update navigationTiming ([10f74b1](https://github.com/clouDr-f2e/mitojs/commit/10f74b1a9c3d021d91f2b2d23218af8e905a796d))
* update navigationTiming ([3593cf6](https://github.com/clouDr-f2e/mitojs/commit/3593cf6d12c2b88b6ffe339a7cc4532b1150370b))
* update navigationTiming ([1044aec](https://github.com/clouDr-f2e/mitojs/commit/1044aec8a4d738b4bcd402164a680f7c530bd567))
* web-performance ([8fd47d8](https://github.com/clouDr-f2e/mitojs/commit/8fd47d8583a2066f653adc58255b9e4e0c5ec7fe))
* **web-performance:** add version types files ([7bf3d4d](https://github.com/clouDr-f2e/mitojs/commit/7bf3d4dc920069822254c031ed87ea411a0703f8))



## [2.1.14](https://github.com/clouDr-f2e/mitojs/compare/v2.1.11...v2.1.14) (2021-05-17)



## [2.1.11](https://github.com/clouDr-f2e/mitojs/compare/v2.1.5...v2.1.11) (2021-05-12)



## [2.1.5](https://github.com/clouDr-f2e/mitojs/compare/2.1.1...v2.1.5) (2021-05-08)



## [2.1.1](https://github.com/clouDr-f2e/mitojs/compare/v2.0.4...2.1.1) (2021-04-28)



## [2.0.4](https://github.com/clouDr-f2e/mitojs/compare/v2.0.0...v2.0.4) (2021-04-12)



# [2.0.0](https://github.com/clouDr-f2e/mitojs/compare/v1.2.7...v2.0.0) (2021-03-09)



## [1.2.7](https://github.com/clouDr-f2e/mitojs/compare/v1.2.5...v1.2.7) (2021-02-24)


### Bug Fixes

* **wx-mini:** 修复Page多次调用注册事件问题 ([14ad198](https://github.com/clouDr-f2e/mitojs/commit/14ad198ef6c281300f184e8952916d6a097bc9d0))


### Features

* **wx-mini:** 支持behavior中的手势收集 ([73830f8](https://github.com/clouDr-f2e/mitojs/commit/73830f84924b393ca72930e502f32f8010f06f68))
* **wx-mini:** 收集Component中的手势收集&构造页面收集 ([f87b7e8](https://github.com/clouDr-f2e/mitojs/commit/f87b7e89d57a830137f08068c1e9cd4f8a5d91d6))
* **wx-mini:** 添加component中手势行为收集 ([48cb940](https://github.com/clouDr-f2e/mitojs/commit/48cb940db35cde39453603b5874e70f932f32193))



## [1.2.5](https://github.com/clouDr-f2e/mitojs/compare/v1.2.4...v1.2.5) (2021-01-23)



## [1.2.4](https://github.com/clouDr-f2e/mitojs/compare/v1.2.2...v1.2.4) (2021-01-19)


### Features

* **wxmini:** 处理小程序onUnhandledRejection ([e28bfda](https://github.com/clouDr-f2e/mitojs/commit/e28bfdabf0ec66987966ac42186b9c3738934608))
* **wx:** 优化request代码 ([2dd4ebc](https://github.com/clouDr-f2e/mitojs/commit/2dd4ebcd0ce8b312ff5ce0d0c34fb3eaf5e6d46f))
* **wx:** 优化touchmove上报逻辑，添加节流控制 ([582348d](https://github.com/clouDr-f2e/mitojs/commit/582348d6e2890830c281a0af6176ef8c492620fc))
* **wx:** 修复onError是apply调用问题&getCurrentRoute问题 ([ceabd16](https://github.com/clouDr-f2e/mitojs/commit/ceabd16457b83db2d857a0a81f3b808b470211b0))
* **wx:** 修复replaceApp中replaceOld的this指向 ([cae4f0a](https://github.com/clouDr-f2e/mitojs/commit/cae4f0ae26819c0a55ac66dbd77da12febfd5fe8))
* **wx:** 处理request statusCode error ([70e304e](https://github.com/clouDr-f2e/mitojs/commit/70e304e692ee0424e533618b7b05243892aab469))
* **wx:** 添加downfile uploadfile ([94b7fbf](https://github.com/clouDr-f2e/mitojs/commit/94b7fbf1986702744f35206dc0d6406f87d52be8))
* **wx:** 添加page onshow和onhide记录 ([05c6d16](https://github.com/clouDr-f2e/mitojs/commit/05c6d169c95dc9bb0fa5a583a2811a1ed4b16c03))
* **wx:** 添加pageOnShareAppMessage ([61e9ed2](https://github.com/clouDr-f2e/mitojs/commit/61e9ed2a0e3379f222363375812e97d8fe48700f))
* **wx:** 添加request error handler ([64032ec](https://github.com/clouDr-f2e/mitojs/commit/64032ec8e5386beb839c0f225913d504bfe9e342))
* **wx:** 添加route failhandler, 优化router处理 ([4f00cc5](https://github.com/clouDr-f2e/mitojs/commit/4f00cc5764bfacf6b2bc8eb5280c89480318bfe1))
* **wx:** 添加wx路由相关的用户行为收集 ([c8427e6](https://github.com/clouDr-f2e/mitojs/commit/c8427e641bc88153592aa266c58d766a7f169fe0))
* **wx:** 添加全局onPageNotFound处理 ([9779baa](https://github.com/clouDr-f2e/mitojs/commit/9779baad307dd9c78a247912468fe60f4ed0c138))
* **wx:** 添加分享到朋友圈的tab点击 ([4facf65](https://github.com/clouDr-f2e/mitojs/commit/4facf651c697900f37f19aaeaab5c090212d36f1))
* **wx:** 添加用户手势行为记录 ([ae8c573](https://github.com/clouDr-f2e/mitojs/commit/ae8c573e68e7cc7cf1d7895631e02679271edf86))
* **wx:** 移除多余代码 ([0172f7e](https://github.com/clouDr-f2e/mitojs/commit/0172f7e24e274ac3a62e579f0bcac6eaf5cbb938))



## [1.2.2](https://github.com/clouDr-f2e/mitojs/compare/v1.2.1...v1.2.2) (2021-01-01)



## [1.2.1](https://github.com/clouDr-f2e/mitojs/compare/1.2.0...v1.2.1) (2020-12-23)



# [1.2.0](https://github.com/clouDr-f2e/mitojs/compare/1.1.8...1.2.0) (2020-12-21)



## [1.1.8](https://github.com/clouDr-f2e/mitojs/compare/3a1afb2271bf5c732cd7d448826dce239fa4ea83...1.1.8) (2020-11-27)


### Features

* add cz ([3a1afb2](https://github.com/clouDr-f2e/mitojs/commit/3a1afb2271bf5c732cd7d448826dce239fa4ea83))
* handle React Error ([70b4d84](https://github.com/clouDr-f2e/mitojs/commit/70b4d846c66437b0ec0ce7aa918e7c2432eb7580))
* init react ([7b44c10](https://github.com/clouDr-f2e/mitojs/commit/7b44c1096fa0a1f9ff0a9a84830450673cc098fb))
* React test ([0317dbd](https://github.com/clouDr-f2e/mitojs/commit/0317dbda7723602a7c882705384c6e7f42178063))
* **src:** 把interface改为types ([d39df63](https://github.com/clouDr-f2e/mitojs/commit/d39df630edcc83d29a37009f1fe7a48edd94162b))
* 优化调用文件 ([b262eb7](https://github.com/clouDr-f2e/mitojs/commit/b262eb76182b80f7ffd007686be772b2c5db9449))


### BREAKING CHANGES

* 去除循环调用



