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

## less 解析 bug

1. 在 less 文件中使用 CSS 原生的 calc()函数，得出的结果错误，在 less 中 calc(100% - 4rem) 等带单位混合运算会被 less 解析忽略单位，全部按照百分比计算，此例中的计算被 less 编译成 calc(96%)。

原因分析
less 的计算方式跟 calc 方法有重叠，两者在一起有冲突

解决方案
更改 calc()函数的形式

/_编译错误的 css:calc(100% - 4rem)_/
/_更改形式如下，以下两种方法皆可_/
width:e("calc(100% - 4rem)");
width:calc(~"100% - 4rem");

## 修改地方

## 用户登录页面 '/src/UserLayout'

1. 标题
2. logo
3. 描述
4. copyright

### pages 可修改

1. 建议保留 ExceptionNotfind ExceptionNotpermission ExceptionServererror ExceptionTrigger ExceptionUnauthorized user
