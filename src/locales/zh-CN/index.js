import menu from './common/menu';
import exception from './common/exception';
import result from './common/result';
import component from './common/component';
import settings from './common/settings';
import globalHeader from './common/globalHeader';
import settingDrawer from './common/settingDrawer';

import analysis from './custom/analysis';
import monitor from './custom/monitor';
import form from './custom/form';
import login from './custom/login';

export default {
  'Ant Design Pro': 'Ant Design Pro',
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.home.introduce': '介绍',
  'app.forms.basic.title': '基础表单',
  'app.forms.basic.description':
    '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
  ...menu,
  ...exception,
  ...result,
  ...component,
  ...settings,
  ...globalHeader,
  ...settingDrawer,
  ...analysis,
  ...monitor,
  ...form,
  ...login
};
