## antd 按需加载

1. babel-plugin-import 安装
2. package.json babel 填入 `"plugins": [ [ "import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" } ] ]`

## less 支持配置

1. less less-loader 安装
2. webpack.config.js 参照 sass 配置

## antd css 引入 @import '~antd/lib/style/themes/default.less';

报错提示：JavaScript is not enabled. Is it set in your options?

解决 降低 less 版本
在 webpack 中配置 antd 打包
