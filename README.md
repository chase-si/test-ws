```
yarn install
```

启动websocket
到 ws 文件夹下
```
node index.js
```

# 前端
```
yarn
yarn start
```

## install patch-package
https://github.com/ds300/patch-package

### 修改package.json
```
"scripts": {
+  "postinstall": "patch-package"
}
```
### yarn add
```shell
yarn add patch-package postinstall-postinstall
```

## lightningchart 社区版去掉logo
```shell
# 安装特定版本
yarn add @arction/lcjs@3.2.0

# 修改 node_modules/@arction/lcjs/dist/lcjs.js 文件
# 将 ,s=i?jU(r):void 0,  全部替换为  ,s=void 0,

# 使用patch-package
yarn patch-package @arction/lcjs
```