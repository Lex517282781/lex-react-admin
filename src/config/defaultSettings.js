const defaultSettings = {
  navTheme: 'light', // 菜单主题
  primaryColor: '#1890FF', // 后台主题色
  layout: 'sidemenu', // 菜单的位置: sidemenu or topmenu
  contentWidth: 'Fluid', // 内容布局: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: false, // sticky siderbar
  menu: {
    disableLocal: false
  },
  pwa: false,
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: ''
};

export default defaultSettings;
