# mito Contributing Guide

## Setting up an Enviroment
To run the test suite and our code linter, node.js and yarn are required.

[`node` download](https://nodejs.org/download)
[`yarn` download](https://yarnpkg.com/en/docs/install)

```
$ yarn
$ yarn build
```

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


### local build
`npm run build -- --local=/Users/ks/Desktop/weappSdk/utils --types=false wx-mini`

local：你想生成的本地文件夹路径

types：是否生成声明文件

wx-mini：表示打包的模块，如果想打包多个模块，可以跟着多个模块名称：web wx-mini，不用=

