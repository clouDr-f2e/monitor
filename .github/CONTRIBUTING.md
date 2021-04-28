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



### local build
`npm run build -- --local=/Users/ks/Desktop/weappSdk/utils --types=false wx-mini`

local：你想生成的本地文件夹路径

types：是否生成声明文件

wx-mini：表示打包的模块，如果想打包多个模块，可以跟着多个模块名称：web wx-mini，不用=


### version script
`npm run version [version] [...modules]`

`npm run version 2.2.2 core`：表示将`core`包的`package.json`的`version`和`dependencies`的`@mitojs`开头的`version`改为2.2.2

`npm run version 2.2.2`表示将`packages`下面的所有包都改为`2.2.2`
