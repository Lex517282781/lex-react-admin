import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import Routers from './Routers';
import store from './store';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './index.less';
import * as serviceWorker from './serviceWorker';

import zh_CN from './locales/zh-CN';

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/dist/locale-data/zh');
  require('@formatjs/intl-pluralrules/dist/locale-data/en');
}

if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/zh');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/en');
}

const messages = {
  zh: zh_CN
};

const locale = 'zh';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <IntlProvider locale={locale} messages={messages[locale]}>
            <Component />
          </IntlProvider>
        </ConfigProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Routers);

if (module.hot) {
  module.hot.accept(Routers, () => {
    render(Routers);
  });
}

serviceWorker.unregister();
