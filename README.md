## 配置区域

### config 文件 ——> 'src/config'

1. defaultSettings.js

系统主题设置，具体有：菜单主题 后台主题色 菜单位置 菜单宽度 内容布局 头部布局等

2. customSetting.js

业务数据配置，具体有：登录页面的配置(logo, title, desc, copyright), 内容页面的配置(logo, title)

3. appPermissions.js

应用功能配置，具体有：

用户页面支持(账号登录|手机登录|自动登录|找回密码|其他方式登录|注册账户)
业务页面支持(系统设置|顶部搜索|顶部帮助)

## mock 服务开启 server

1. 建议安装 nodemon: npm i nodemon -g

## 问题

### antd 按需加载

1. babel-plugin-import 安装
2. package.json babel 填入 `"plugins": [ [ "import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" } ] ]`

### less 支持配置

1. less less-loader 安装
2. webpack.config.js 参照 sass 配置

### antd css 引入 @import '~antd/lib/style/themes/default.less';

报错提示：JavaScript is not enabled. Is it set in your options?

解决 降低 less 版本
在 webpack 中配置 antd 打包

### less 解析 bug

1. 在 less 文件中使用 CSS 原生的 calc()函数，得出的结果错误，在 less 中 calc(100% - 4rem) 等带单位混合运算会被 less 解析忽略单位，全部按照百分比计算，此例中的计算被 less 编译成 calc(96%)。

原因分析
less 的计算方式跟 calc 方法有重叠，两者在一起有冲突

解决方案
更改 calc()函数的形式

/_编译错误的 css:calc(100% - 4rem)_/
/_更改形式如下，以下两种方法皆可_/
width:e("calc(100% - 4rem)");
width:calc(~"100% - 4rem");
