# template-npm-libary

- 环境：webpack5
- 包含 git 格式化，eslint

## babel 配置 兼容性/antd

```js
"babel": {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": "ie 10",
          "useBuiltIns": "usage",
          "corejs": {
            "version": 3,
            "proposals": true
          }
        }
      ]
    ],
    "plugins": [
      [
        "import",
        {
          "style": true,
          "libraryName": "antd"
        }
      ]
    ]
  }
```

## 项目搭建过程中问题总结

### 1. TS2739: Type '{}' is missing the following properties from type 'Readonly<IProps>': folderStore, baseStore

https://stackoverflow.com/questions/54735561/property-profilestore-is-missing-in-type-but-required-in-type-readonlya

### 2. babel 相关 浏览器兼容

https://segmentfault.com/a/1190000039347539

### 3. Webpack4 升级 Webpack5 IE 兼容性问题

https://juejin.cn/post/6946024729526403108

### 4. target: ['web', 'es5']导致 Uncaught TypeError: Cannot read property 'webpackHotUpdate' of undefined

https://stackoverflow.com/questions/51000346/uncaught-typeerror-cannot-read-property-webpackhotupdate-of-undefined

### 5. babel-loader 配置

https://github.com/babel/babel-loader

### 6. corejs@4 引用了 debug@4， 没有转义成 es5，降级到 debug@3

https://github.com/babel/babel/issues/10707

