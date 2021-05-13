# mito Contributing Guide

## Setting up an Enviroment
To run the test suite and our code linter, node.js and yarn are required.

[`node` download](https://nodejs.org/download)
[`yarn` download](https://yarnpkg.com/en/docs/install)

```
$ yarn
$ yarn build
```

### npm global
`npm install --global rollup`

`npm install --global prettier`


## examples
```
$ yarn run examples
```

## test
### unit
```
yarn run unit
```

### e2e
```
$ yarn run e2e
```

**微信小程序 e2e**
* 请确保本地安装了开发工具并打开了安全端口
* 如何打开端口
* 微信开发工具设置 -> 安全设置 -> 安全 -> 打开服务端口
```
$ yarn e2e:mini
```



### local build
`npm run build -- --local=/Users/ks/Desktop/weappSdk/utils --types=false wx-mini`

local：你想生成的本地文件夹路径

types：是否生成声明文件

wx-mini：表示打包的模块，如果想打包多个模块，可以跟着多个模块名称：web wx-mini，不用=

### local watch
打开`watch`热更新

`npm run build -- --watch=true web`


### version script
`npm run version [version] [...modules]`

`npm run version 2.2.2 core`：表示将`core`包的`package.json`的`version`和`dependencies`的`@mitojs`开头的`version`改为2.2.2

`npm run version 2.2.2`表示将`packages`下面的所有包都改为`2.2.2`
